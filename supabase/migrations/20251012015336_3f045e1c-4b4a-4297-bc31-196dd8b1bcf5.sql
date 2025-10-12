-- Revoke public access to the materialized view
REVOKE SELECT ON public.defaulted_applications_view FROM anon;

-- Only allow authenticated users to view defaulted applications
-- This is safer as only logged-in users can query the view