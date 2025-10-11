-- Enable RLS on loan_staging table (staging table is internal use only)
ALTER TABLE public.loan_staging ENABLE ROW LEVEL SECURITY;

-- No policies needed - this table is for admin/system use only via psql COPY