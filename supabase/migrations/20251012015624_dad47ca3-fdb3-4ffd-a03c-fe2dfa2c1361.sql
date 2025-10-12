-- Grant SELECT permission to anon users so the view is accessible
GRANT SELECT ON public.defaulted_applications_view TO anon;

-- Note: This makes the view publicly accessible. 
-- For production, implement authentication and restrict to authenticated users only.