import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record_id } = await req.json();
    
    console.log(`Processing mock risk update for record ID: ${record_id}`);

    if (!record_id) {
      throw new Error('record_id is required');
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate random risk score between 0.1 and 0.28
    const riskScore = Math.random() * (0.28 - 0.1) + 0.1;
    const roundedRiskScore = Math.round(riskScore * 1000) / 1000; // Round to 3 decimal places

    console.log(`Generated risk score: ${roundedRiskScore}`);

    // Update the record with target=0 and the random risk score
    const { data, error } = await supabase
      .from('loan_staging')
      .update({
        target: 0,
        risk_score: roundedRiskScore,
        prediction_timestamp: new Date().toISOString(),
        ml_api_status: 'completed'
      })
      .eq('id', record_id)
      .select();

    if (error) {
      console.error('Error updating record:', error);
      throw error;
    }

    console.log(`Successfully updated record ${record_id}`, data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        record_id,
        target: 0,
        risk_score: roundedRiskScore,
        message: 'Mock risk score updated successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in update-risk-mock function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});