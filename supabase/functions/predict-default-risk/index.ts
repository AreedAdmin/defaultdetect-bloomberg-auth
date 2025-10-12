import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PredictionRequest {
  record_id: number;
  sk_id_curr: number;
}

interface MLAPIResponse {
  target: number;
  risk_score: number;
  prediction_timestamp: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const ML_API_URL = Deno.env.get('ML_API_URL');
    const ML_API_KEY = Deno.env.get('ML_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Validate environment variables
    if (!ML_API_URL) {
      console.error('ML_API_URL not configured');
      return new Response(
        JSON.stringify({ error: 'ML API URL not configured' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!ML_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { record_id, sk_id_curr }: PredictionRequest = await req.json();

    if (!record_id) {
      console.error('Missing record_id in request');
      return new Response(
        JSON.stringify({ error: 'Missing record_id' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing prediction for record_id: ${record_id}, sk_id_curr: ${sk_id_curr}`);

    // Create Supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Update status to 'processing'
    await supabase
      .from('loan_staging')
      .update({ ml_api_status: 'processing' })
      .eq('id', record_id);

    // Fetch the full record from database
    const { data: recordData, error: fetchError } = await supabase
      .from('loan_staging')
      .select('*')
      .eq('id', record_id)
      .single();

    if (fetchError || !recordData) {
      console.error('Error fetching record:', fetchError);
      await supabase
        .from('loan_staging')
        .update({ ml_api_status: 'error' })
        .eq('id', record_id);
      
      return new Response(
        JSON.stringify({ error: 'Record not found' }), 
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Record fetched successfully, calling ML API...');

    // Call ML API with retry logic
    let mlResponse: Response | null = null;
    let lastError: Error | null = null;
    const maxRetries = 3;
    const retryDelays = [1000, 2000, 4000]; // Exponential backoff

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(`ML API call attempt ${attempt + 1}/${maxRetries}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        mlResponse = await fetch(`${ML_API_URL}/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ML_API_KEY,
          },
          body: JSON.stringify(recordData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (mlResponse.ok) {
          console.log('ML API call successful');
          break; // Success, exit retry loop
        } else {
          throw new Error(`ML API returned status ${mlResponse.status}`);
        }
      } catch (error) {
        lastError = error as Error;
        console.error(`ML API call attempt ${attempt + 1} failed:`, error);
        
        if (attempt < maxRetries - 1) {
          console.log(`Retrying in ${retryDelays[attempt]}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelays[attempt]));
        }
      }
    }

    // Check if all retries failed
    if (!mlResponse || !mlResponse.ok) {
      console.error('All ML API retry attempts failed:', lastError);
      await supabase
        .from('loan_staging')
        .update({ 
          ml_api_status: 'error',
          updated_at: new Date().toISOString()
        })
        .eq('id', record_id);
      
      return new Response(
        JSON.stringify({ 
          error: 'ML API call failed after retries',
          details: lastError?.message 
        }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse ML API response
    const predictionResult: MLAPIResponse = await mlResponse.json();
    console.log('Prediction result:', predictionResult);

    // Validate prediction result
    if (predictionResult.target === undefined || predictionResult.risk_score === undefined) {
      console.error('Invalid prediction result:', predictionResult);
      await supabase
        .from('loan_staging')
        .update({ ml_api_status: 'error' })
        .eq('id', record_id);
      
      return new Response(
        JSON.stringify({ error: 'Invalid ML API response' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update database with prediction results
    const { error: updateError } = await supabase
      .from('loan_staging')
      .update({
        target: predictionResult.target,
        risk_score: predictionResult.risk_score,
        prediction_timestamp: new Date().toISOString(),
        ml_api_status: 'success',
        updated_at: new Date().toISOString()
      })
      .eq('id', record_id);

    if (updateError) {
      console.error('Error updating record with prediction:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update record' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully updated record ${record_id} with prediction`);

    return new Response(
      JSON.stringify({ 
        success: true,
        record_id,
        target: predictionResult.target,
        risk_score: predictionResult.risk_score
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in predict-default-risk function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
