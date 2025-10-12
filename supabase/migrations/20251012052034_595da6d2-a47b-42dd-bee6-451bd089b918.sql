-- Fix materialized view refresh issue by changing to non-concurrent refresh
-- The concurrent refresh requires a unique index which may not be present

CREATE OR REPLACE FUNCTION public.refresh_defaulted_applications_view()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Changed from REFRESH MATERIALIZED VIEW CONCURRENTLY to regular refresh
  -- This allows the trigger to work without requiring a unique index
  REFRESH MATERIALIZED VIEW public.defaulted_applications_view;
  RETURN NULL;
END;
$function$;