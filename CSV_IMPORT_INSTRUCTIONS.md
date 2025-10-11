# CSV Bulk Import Instructions

This guide explains how to use PostgreSQL's COPY command to efficiently load your 1.18GB CSV file into the database.

## Prerequisites

1. ✅ Storage bucket 'data' created
2. ✅ CSV file uploaded to storage bucket
3. ✅ Staging table `loan_staging` created
4. ✅ Transformation function `transform_and_upsert_loan_staging()` created

## Method 1: Direct COPY via psql (FASTEST - Recommended for 1.18GB file)

### Step 1: Download your CSV from Supabase Storage

1. Go to your Supabase Dashboard → Storage → data bucket
2. Download `merged_df_clean.csv` to your local machine

### Step 2: Connect to your database via psql

```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.xfbescugwgvhoheewtxd.supabase.co:5432/postgres"
```

Replace `[YOUR-PASSWORD]` with your database password (found in Supabase Dashboard → Project Settings → Database)

### Step 3: Run the COPY command

```sql
-- Load CSV into staging table (2-5 minutes for 1.4M rows)
COPY public.loan_staging FROM '/path/to/your/merged_df_clean.csv' 
WITH (
    FORMAT csv,
    HEADER true,
    DELIMITER ',',
    NULL '',
    ENCODING 'UTF8'
);
```

Replace `/path/to/your/merged_df_clean.csv` with the actual path where you downloaded the file.

### Step 4: Transform and load into production table

```sql
-- Transform and upsert into loan_applications (converts 0/1 to boolean, etc.)
SELECT public.transform_and_upsert_loan_staging();
```

### Step 5: Clean up staging table

```sql
-- Clear staging table after successful import
TRUNCATE TABLE public.loan_staging;
```

## Method 2: Using Edge Function (SLOWER - Use for smaller files)

If you prefer using the edge function approach (which processes the CSV through the API layer):

```bash
# Call the bulk-load-csv edge function
curl -X POST https://xfbescugwgvhoheewtxd.supabase.co/functions/v1/bulk-load-csv \
  -H "Authorization: Bearer [YOUR-ANON-KEY]" \
  -H "Content-Type: application/json" \
  -d '{"filePath": "merged_df_clean.csv"}'
```

⚠️ **Warning**: This method will be significantly slower for a 1.18GB file due to:
- Network download time from storage
- Processing through the edge function
- API insertion rate limits

Expected time: 30-60 minutes vs 2-5 minutes with direct COPY.

## Performance Optimization (Optional)

For even faster imports, you can temporarily disable triggers:

```sql
-- Before COPY
ALTER TABLE public.loan_applications DISABLE TRIGGER ALL;

-- Run your COPY and transformation commands here

-- After completion
ALTER TABLE public.loan_applications ENABLE TRIGGER ALL;
ANALYZE public.loan_applications;
```

## Verification

Check the number of rows loaded:

```sql
-- Check staging table
SELECT COUNT(*) FROM public.loan_staging;

-- Check production table
SELECT COUNT(*) FROM public.loan_applications;

-- View sample data
SELECT * FROM public.loan_applications LIMIT 10;
```

## Troubleshooting

### Connection refused
- Ensure your IP is allowed in Supabase Dashboard → Project Settings → Database → Connection pooling

### Permission denied
- Verify you're using the correct database password
- Make sure you're connecting as the `postgres` user

### File not found
- Check the absolute path to your CSV file
- On Windows, use forward slashes: `C:/Users/YourName/Downloads/file.csv`

### Data type errors
- Ensure your CSV matches the expected column structure
- Check for malformed rows in your CSV
- Use `NULL` or empty string for missing values

## Column Mapping Reference

Your CSV columns are automatically mapped to the staging table:
- All uppercase CSV columns → lowercase database columns
- Integer flags (0/1) → boolean in production table
- Text fields → preserved as-is
- Numeric fields → numeric/double precision types

The transformation function handles all type conversions automatically.

## Next Steps

After successful import:
1. Verify data integrity with sample queries
2. Run any additional data validation
3. Drop the staging table if no longer needed: `DROP TABLE public.loan_staging;`
4. Consider adding indexes on frequently queried columns for better performance

## Need Help?

- Check the Supabase logs for any errors
- View edge function logs in Supabase Dashboard → Edge Functions → bulk-load-csv → Logs
- Verify RLS policies if you encounter permission errors
