-- Create storage bucket for loan PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'loan-pdfs',
  'loan-pdfs',
  false,
  10485760,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view their PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage all PDFs" ON storage.objects;

-- Create RLS policies for loan-pdfs bucket
CREATE POLICY "Authenticated users can upload PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'loan-pdfs');

CREATE POLICY "Authenticated users can view their PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'loan-pdfs');

CREATE POLICY "Service role can manage all PDFs"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'loan-pdfs');

-- Update the trigger to fire AFTER risk score is set
DROP TRIGGER IF EXISTS trigger_pdf_generation_after_insert ON public.loan_staging;
DROP TRIGGER IF EXISTS trigger_pdf_generation_after_risk ON public.loan_staging;

-- Create trigger that fires when risk_score is updated
CREATE TRIGGER trigger_pdf_generation_after_risk
  AFTER UPDATE OF risk_score
  ON public.loan_staging
  FOR EACH ROW
  WHEN (NEW.risk_score IS NOT NULL AND (OLD.risk_score IS NULL OR OLD.risk_score != NEW.risk_score))
  EXECUTE FUNCTION public.trigger_pdf_generation();