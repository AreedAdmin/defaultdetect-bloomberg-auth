-- Fix the PDF generation trigger to work with automatic data insertion
CREATE OR REPLACE FUNCTION public.trigger_pdf_generation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  function_url TEXT;
  supabase_url TEXT;
  service_key TEXT;
BEGIN
  -- Use hardcoded fallback for Supabase URL
  supabase_url := COALESCE(
    current_setting('app.settings.supabase_url', true),
    'https://xfbescugwgvhoheewtxd.supabase.co'
  );
  
  -- Try to get service key from settings
  service_key := current_setting('app.settings.service_role_key', true);
  
  -- Only proceed if we have a service key
  IF service_key IS NULL OR service_key = '' THEN
    RAISE WARNING 'Service role key not configured. PDF generation skipped for record ID: %. Please configure app.settings.service_role_key', NEW.id;
    RETURN NEW;
  END IF;
  
  -- Build the edge function URL
  function_url := supabase_url || '/functions/v1/generate-loan-pdf';
  
  -- Call edge function asynchronously via pg_net extension
  BEGIN
    PERFORM
      net.http_post(
        url := function_url,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || service_key
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

-- Similarly fix the ML prediction trigger
CREATE OR REPLACE FUNCTION public.trigger_ml_prediction_webhook()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  function_url TEXT;
  supabase_url TEXT;
  service_key TEXT;
BEGIN
  -- Only proceed if target is NULL (needs prediction)
  IF NEW.target IS NULL THEN
    -- Set status to pending
    NEW.ml_api_status := 'pending';
    
    -- Use hardcoded fallback for Supabase URL
    supabase_url := COALESCE(
      current_setting('app.settings.supabase_url', true),
      'https://xfbescugwgvhoheewtxd.supabase.co'
    );
    
    -- Try to get service key from settings
    service_key := current_setting('app.settings.service_role_key', true);
    
    -- Only proceed if we have a service key
    IF service_key IS NULL OR service_key = '' THEN
      RAISE WARNING 'Service role key not configured. ML prediction skipped for record ID: %', NEW.id;
      RETURN NEW;
    END IF;
    
    -- Build the edge function URL
    function_url := supabase_url || '/functions/v1/predict-default-risk';
    
    -- Call edge function asynchronously via pg_net extension
    BEGIN
      PERFORM
        net.http_post(
          url := function_url,
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || service_key
          ),
          body := jsonb_build_object(
            'record_id', NEW.id,
            'sk_id_curr', NEW.sk_id_curr
          )
        );
      
      RAISE NOTICE 'ML prediction webhook triggered for record ID: %, sk_id_curr: %', NEW.id, NEW.sk_id_curr;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to trigger ML prediction for record ID %: %', NEW.id, SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$$;