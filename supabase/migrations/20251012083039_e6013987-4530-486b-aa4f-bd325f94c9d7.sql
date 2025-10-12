-- Configure the database to use the service role key from edge function environment
-- This allows triggers to call edge functions with proper authentication
DO $$
DECLARE
  service_key TEXT;
BEGIN
  -- Note: In production, the actual key value should be set manually via:
  -- ALTER DATABASE postgres SET app.settings.service_role_key = 'your-actual-key';
  -- For now, we'll just ensure the setting exists
  BEGIN
    service_key := current_setting('app.settings.service_role_key', true);
    IF service_key IS NULL OR service_key = '' THEN
      RAISE NOTICE 'Service role key not yet configured. Please set it using: ALTER DATABASE postgres SET app.settings.service_role_key = ''your-service-role-key'';';
    ELSE
      RAISE NOTICE 'Service role key is already configured.';
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not check service role key setting: %', SQLERRM;
  END;
END $$;