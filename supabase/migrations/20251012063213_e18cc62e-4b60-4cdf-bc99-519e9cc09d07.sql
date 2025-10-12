-- Drop the trigger that causes the pg_net error
DROP TRIGGER IF EXISTS on_application_insert_only ON loan_staging;

-- Keep the function in case it's needed later, but we won't use it as a trigger
-- The edge function will handle calling predict-default-risk directly