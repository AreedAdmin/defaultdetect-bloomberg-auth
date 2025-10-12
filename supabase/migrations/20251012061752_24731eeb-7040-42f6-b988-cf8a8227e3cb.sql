-- Add ML prediction tracking columns to loan_staging table
ALTER TABLE loan_staging 
  ADD COLUMN IF NOT EXISTS prediction_timestamp TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS ml_api_status VARCHAR(20) DEFAULT 'pending';

-- Create index for efficient querying of prediction status
CREATE INDEX IF NOT EXISTS idx_loan_staging_ml_status ON loan_staging(ml_api_status);
CREATE INDEX IF NOT EXISTS idx_loan_staging_target_null ON loan_staging(target) WHERE target IS NULL;

-- Create function to trigger ML prediction webhook for new records only
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
    -- This doesn't block the INSERT operation
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_application_insert_only ON loan_staging;

-- Create trigger that fires AFTER INSERT only (not UPDATE)
-- This prevents processing of existing records
CREATE TRIGGER on_application_insert_only
  AFTER INSERT ON loan_staging
  FOR EACH ROW
  EXECUTE FUNCTION trigger_ml_prediction_webhook();

-- Create helper function to get pending predictions (useful for monitoring)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function to update prediction results (used by edge function)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comment for documentation
COMMENT ON COLUMN loan_staging.prediction_timestamp IS 'Timestamp when ML prediction was made';
COMMENT ON COLUMN loan_staging.ml_api_status IS 'Status of ML prediction: pending, processing, success, error';
COMMENT ON TRIGGER on_application_insert_only ON loan_staging IS 'Triggers ML prediction webhook for new records with NULL target only';