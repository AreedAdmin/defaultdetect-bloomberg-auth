-- Create the trigger to automatically call the mock risk update function
-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS loan_staging_ml_prediction ON public.loan_staging;

-- Create the trigger on INSERT
CREATE TRIGGER loan_staging_ml_prediction
  AFTER INSERT ON public.loan_staging
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_ml_prediction_webhook();

-- Verify the trigger was created
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'loan_staging_ml_prediction'
  ) THEN
    RAISE NOTICE 'Trigger loan_staging_ml_prediction created successfully';
  ELSE
    RAISE WARNING 'Failed to create trigger loan_staging_ml_prediction';
  END IF;
END $$;