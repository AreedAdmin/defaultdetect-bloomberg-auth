-- Enable RLS on loan_staging table
ALTER TABLE loan_staging ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for analytics
CREATE POLICY "Allow public read access"
ON loan_staging
FOR SELECT
TO public
USING (true);