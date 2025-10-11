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

    console.log('Starting transformation from loan_staging to loan_applications...');

    // Call the transformation function that handles the upsert
    const { data: transformResult, error: transformError } = await supabase
      .rpc('transform_and_upsert_loan_staging');

    if (transformError) {
      throw new Error(`Transformation failed: ${transformError.message}`);
    }

    console.log('Transformation completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        result: transformResult,
        message: 'Data transformed and upserted successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
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
