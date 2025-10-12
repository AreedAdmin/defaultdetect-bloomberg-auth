-- Enable required extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to trigger PDF generation via edge function
CREATE OR REPLACE FUNCTION public.trigger_pdf_generation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  function_url TEXT;
BEGIN
  -- Build the edge function URL
  function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/generate-loan-pdf';
  
  -- Call edge function asynchronously via pg_net extension
  PERFORM
    net.http_post(
      url := function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'record_id', NEW.id
      )
    );
  
  -- Log the trigger for debugging
  RAISE NOTICE 'PDF generation triggered for record ID: %, sk_id_curr: %', NEW.id, NEW.sk_id_curr;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_loan_staging_insert_generate_pdf ON loan_staging;

-- Create trigger that fires after INSERT
CREATE TRIGGER on_loan_staging_insert_generate_pdf
  AFTER INSERT ON loan_staging
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_pdf_generation();

-- Add comment for documentation
COMMENT ON TRIGGER on_loan_staging_insert_generate_pdf ON loan_staging IS 
'Automatically generates PDF report when new loan records are inserted';

COMMENT ON FUNCTION public.trigger_pdf_generation() IS 
'Triggers the generate-loan-pdf edge function to create a PDF report for newly inserted loan records';
