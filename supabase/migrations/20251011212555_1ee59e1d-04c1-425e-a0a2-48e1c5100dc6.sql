-- Add risk_score and target_default columns to loan_applications table
ALTER TABLE public.loan_applications 
ADD COLUMN risk_score numeric,
ADD COLUMN target_default boolean;