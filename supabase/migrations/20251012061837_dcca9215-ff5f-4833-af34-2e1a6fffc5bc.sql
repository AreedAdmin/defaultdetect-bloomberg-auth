-- Fix search_path for ML prediction functions to prevent security issues

-- Recreate trigger function with proper search_path
CREATE OR REPLACE FUNCTION trigger_ml_prediction_webhook()
RETURNS TRIGGER AS $$
DECLARE
  function_url TEXT;
BEGIN
  -- Only proceed if target is NULL (needs prediction)
  IF NEW.target IS NULL THEN
    -- Set status to pending
    NEW.ml_api_status := 'pending';
    
    -- Build the edge function URL
    function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/predict-default-risk';
    
    -- Call edge function asynchronously via pg_net extension
    PERFORM
      net.http_post(
        url := function_url,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
        ),
        body := jsonb_build_object(
          'record_id', NEW.id,
          'sk_id_curr', NEW.sk_id_curr
        )
      );
    
    -- Log the trigger for debugging
    RAISE NOTICE 'ML prediction webhook triggered for record ID: %, sk_id_curr: %', NEW.id, NEW.sk_id_curr;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate get_pending_predictions with proper search_path
CREATE OR REPLACE FUNCTION get_pending_predictions(batch_size INTEGER DEFAULT 10)
RETURNS TABLE(
  id BIGINT,
  sk_id_curr BIGINT,
  ml_api_status VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    loan_staging.id,
    loan_staging.sk_id_curr,
    loan_staging.ml_api_status,
    loan_staging.created_at
  FROM loan_staging
  WHERE loan_staging.ml_api_status = 'pending'
    AND loan_staging.target IS NULL
  ORDER BY loan_staging.created_at DESC
  LIMIT batch_size;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate update_prediction_result with proper search_path
CREATE OR REPLACE FUNCTION update_prediction_result(
  p_record_id BIGINT,
  p_target INTEGER,
  p_risk_score DECIMAL,
  p_status VARCHAR
)
RETURNS VOID AS $$
BEGIN
  UPDATE loan_staging
  SET 
    target = p_target,
    risk_score = p_risk_score,
    prediction_timestamp = NOW(),
    ml_api_status = p_status,
    updated_at = NOW()
  WHERE id = p_record_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;