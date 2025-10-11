import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { filePath = 'merged_df_clean.csv', batchSize = 500 } = await req.json();

    console.log(`Phase 2: Starting CSV bulk load from storage: ${filePath}`);
    console.log(`Using batch size: ${batchSize}`);

    // Step 1: Download CSV from storage
    console.log('Step 1: Downloading CSV from storage...');
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('data')
      .download(filePath);

    if (downloadError) {
      throw new Error(`Download failed: ${downloadError.message}`);
    }

    console.log('CSV file downloaded successfully');

    // Step 2: Parse CSV
    console.log('Step 2: Parsing CSV...');
    const csvText = await fileData.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const totalRows = lines.length - 1;
    console.log(`CSV has ${totalRows} data rows and ${headers.length} columns`);

    // Step 3: Clear staging table
    console.log('Step 3: Clearing staging table...');
    const { error: truncateError } = await supabase
      .from('loan_staging')
      .delete()
      .neq('SK_ID_CURR', 0); // Delete all rows

    if (truncateError) {
      console.warn('Could not truncate staging table:', truncateError.message);
    }

    // Step 4: Process CSV in batches
    console.log('Step 4: Processing CSV in batches...');
    let processedRows = 0;
    let successfulRows = 0;
    let errorCount = 0;
    
    const parseValue = (value: string): string | number | null => {
      if (!value) return null;
      const trimmed = value.trim().replace(/^"|"$/g, ''); // Remove quotes
      if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed === 'nan') {
        return null;
      }
      const num = parseFloat(trimmed);
      if (!isNaN(num)) {
        return num;
      }
      return trimmed;
    };

    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result;
    };

    // Process in batches
    for (let i = 1; i < lines.length; i += batchSize) {
      const batchEnd = Math.min(i + batchSize, lines.length);
      const batch = [];

      for (let j = i; j < batchEnd; j++) {
        const line = lines[j];
        if (!line.trim()) continue;

        try {
          const values = parseCSVLine(line);
          const row: Record<string, string | number | null> = {};
          
          headers.forEach((header, idx) => {
            row[header] = parseValue(values[idx] || '');
          });

          batch.push(row);
        } catch (err) {
          console.warn(`Error parsing row ${j}:`, err);
          errorCount++;
        }
      }

      if (batch.length > 0) {
        const { data, error: insertError } = await supabase
          .from('loan_staging')
          .insert(batch)
          .select();

        if (insertError) {
          console.error(`Batch insert error at rows ${i}-${batchEnd}:`, insertError.message);
          errorCount += batch.length;
        } else {
          successfulRows += data?.length || batch.length;
        }
      }

      processedRows = batchEnd - 1;
      const progress = ((processedRows / totalRows) * 100).toFixed(1);
      console.log(`Progress: ${progress}% (${processedRows}/${totalRows} rows)`);
    }

    console.log(`Step 4 complete: Processed ${processedRows} rows, ${successfulRows} successful, ${errorCount} errors`);

    // Step 5: Transform and load into production table
    console.log('Step 5: Transforming data into loan_applications table...');
    const { data: transformResult, error: transformError } = await supabase
      .rpc('transform_and_upsert_loan_staging');

    if (transformError) {
      throw new Error(`Transformation failed: ${transformError.message}`);
    }

    console.log('Phase 2 completed successfully!');

    return new Response(
      JSON.stringify({
        success: true,
        phase: 'Phase 2 Complete',
        stats: {
          totalRows: totalRows,
          processedRows: processedRows,
          successfulRows: successfulRows,
          errorCount: errorCount,
          transformResult: transformResult
        },
        message: 'CSV data loaded and transformed into loan_applications table'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in Phase 2:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: 'Check function logs for more information'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
