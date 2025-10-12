-- Create materialized view for defaulted applications
CREATE MATERIALIZED VIEW IF NOT EXISTS public.defaulted_applications_view AS
SELECT DISTINCT ON (sk_id_curr)
  sk_id_curr,
  name_contract_type_x,
  income_per_person,
  def_30_cnt_social_circle,
  name_client_type,
  phone_change_years_ago,
  GREATEST(
    COALESCE(amt_credit_x, 0) - (COALESCE(amt_annuity_x, 0) * COALESCE(cnt_payment, 0)), 
    0
  ) AS outstanding_loan_amount,
  amt_credit_x AS original_loan_amount,
  amt_annuity_x AS monthly_payment,
  cnt_payment AS payments_made,
  created_at
FROM public.loan_staging
WHERE target = 1
ORDER BY sk_id_curr, created_at DESC NULLS LAST;

-- Create indexes on the materialized view for better query performance
CREATE INDEX IF NOT EXISTS idx_defaulted_view_sk_id ON public.defaulted_applications_view(sk_id_curr);
CREATE INDEX IF NOT EXISTS idx_defaulted_view_outstanding ON public.defaulted_applications_view(outstanding_loan_amount);
CREATE INDEX IF NOT EXISTS idx_defaulted_view_client_type ON public.defaulted_applications_view(name_client_type);

-- Create function to refresh the materialized view
CREATE OR REPLACE FUNCTION public.refresh_defaulted_applications_view()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.defaulted_applications_view;
  RETURN NULL;
END;
$$;

-- Create trigger to auto-refresh the view when loan_staging changes
DROP TRIGGER IF EXISTS trigger_refresh_defaulted_view ON public.loan_staging;
CREATE TRIGGER trigger_refresh_defaulted_view
AFTER INSERT OR UPDATE OR DELETE ON public.loan_staging
FOR EACH STATEMENT
EXECUTE FUNCTION public.refresh_defaulted_applications_view();

-- Grant select permissions on the view
GRANT SELECT ON public.defaulted_applications_view TO authenticated;
GRANT SELECT ON public.defaulted_applications_view TO anon;