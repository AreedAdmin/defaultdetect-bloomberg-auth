-- Update the trigger to call the new mock risk update function instead
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
      RAISE WARNING 'Service role key not configured. Mock risk update skipped for record ID: %', NEW.id;
      RETURN NEW;
    END IF;
    
    -- Build the edge function URL for the mock update function
    function_url := supabase_url || '/functions/v1/update-risk-mock';
    
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
      
      RAISE NOTICE 'Mock risk update triggered for record ID: %, sk_id_curr: %', NEW.id, NEW.sk_id_curr;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Failed to trigger mock risk update for record ID %: %', NEW.id, SQLERRM;
    END;
  END IF;
  
  RETURN NEW;
END;
$$;