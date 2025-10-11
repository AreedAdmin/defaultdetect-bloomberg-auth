-- Create the 'data' storage bucket for CSV uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('data', 'data', false);

-- Create RLS policy to allow authenticated users to upload
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'data');

-- Create RLS policy to allow authenticated users to read
CREATE POLICY "Allow authenticated users to read"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'data');

-- Create RLS policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'data');