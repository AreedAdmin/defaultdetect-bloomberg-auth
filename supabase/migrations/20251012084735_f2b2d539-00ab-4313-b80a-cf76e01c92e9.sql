-- Update triggers to work without requiring database-level service key
-- Since edge functions have verify_jwt=false, we don't need Authorization headers

CREATE OR REPLACE FUNCTION public.trigger_ml_prediction_webhook()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  function_url TEXT;
BEGIN
  -- Only proceed if target is NULL (needs prediction)
  IF NEW.target IS NULL THEN
    -- Set status to pending
    NEW.ml_api_status := 'pending';
    
    -- Build the edge function URL
    function_url := 'https://xfbescugwgvhoheewtxd.supabase.co/functions/v1/update-risk-mock';
    
    -- Call edge function asynchronously via pg_net extension
    BEGIN
      PERFORM
        net.http_post(
          url := function_url,
          headers := jsonb_build_object(
            'Content-Type', 'application/json'
          ),
          body := jsonb_build_object(
            'record_id', NEW.id
          )
        );
      
      RAISE NOTICE 'Mock risk update triggered for record ID: %, sk_id_curr: %', NEW.id, NEW.sk_id_curr;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to trigger mock risk update for record ID %: %', NEW.id, SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$$;

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
  function_url := 'https://xfbescugwgvhoheewtxd.supabase.co/functions/v1/generate-loan-pdf';
  
  -- Call edge function asynchronously via pg_net extension
  BEGIN
    PERFORM
      net.http_post(
        url := function_url,
        headers := jsonb_build_object(
          'Content-Type', 'application/json'
        ),
        body := jsonb_build_object(
          'record_id', NEW.id
        )
      );
    
    RAISE NOTICE 'PDF generation triggered for record ID: %, sk_id_curr: %', NEW.id, NEW.sk_id_curr;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Failed to trigger PDF generation for record ID %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$;