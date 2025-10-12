
Show all
10 tools used
Now let me examine more files to understand the complete architecture:

Show all
4 tools used
Perfect! Now I have a comprehensive understanding of the project. Let me create a detailed, professional README.md:

Comprehensive README.md for DefaultDetect - Loan Default Risk Detection Platform
Structure
I'll create a highly detailed README.md that covers:

1. Project Overview & Problem Statement
Real-world context: Financial institutions struggle with manual loan risk assessment processes that are slow, inconsistent, and prone to human error
The gap: Lack of automated, data-driven risk prediction systems that can process large volumes of applications efficiently
Business impact: Billions in potential losses from loan defaults due to inadequate risk assessment
2. Solution Summary
DefaultDetect: An intelligent loan default risk detection platform
Core innovation: Combines ML-powered risk prediction with automated document generation and comprehensive analytics
Architecture flow: Multi-tiered system with React frontend → Supabase backend → Edge Functions → ML API integration → PDF generation → Storage
Key differentiators: Auto-save functionality, real-time risk scoring, bulk data processing, automated PDF report generation
3. Full Tech Stack
Frontend:

React 18.3.1 with TypeScript 5.8.3 (Type safety, modern hooks)
Vite 5.4.19 (Lightning-fast HMR, optimized builds)
Tailwind CSS 3.4.17 + shadcn/ui (Consistent design system)
Radix UI components (Accessible, customizable primitives)
React Router DOM 6.30.1 (Client-side routing)
TanStack React Query 5.83.0 (Server state management)
Recharts 2.15.4 (Data visualization)
Framer Motion 11.18.2 (Animations)
React Hook Form 7.61.1 + Zod 3.25.76 (Form validation)
Backend & Database:

Supabase PostgreSQL (Relational database with PostGIS extension)
Supabase Auth (User authentication & authorization)
Supabase Storage (File storage with RLS policies)
Row Level Security (RLS) policies for data access control
Serverless Functions:

Supabase Edge Functions (Deno runtime)
Four main functions: generate-test-data, update-risk-mock, generate-loan-pdf, bulk-load-csv
PDF Generation:

jsPDF 3.0.3 (Client-side: form submissions)
jsPDF in Edge Functions (Server-side: automated generation)
Development & Build:

ESLint 9.32.0 (Code quality)
PostCSS + Autoprefixer (CSS processing)
Lovable Tagger (Component tracking)
4. Supabase Edge Functions
Function 1: generate-test-data

Purpose: Generate synthetic loan application data for testing
Trigger: HTTP POST request
Inputs: Optional count parameter
Logic:
Fetches random sample from loan_staging table
Generates realistic variations (income ±15%, age ±3 years, etc.)
Calculates derived metrics (credit_income_ratio, stability_score)
Inserts with target=null (triggers ML prediction)
Outputs: Generated record with SK_ID_CURR and database ID
Security: Public endpoint (verify_jwt = false) for demo purposes

Function 2: generate-loan-pdf

Purpose: Create detailed PDF fraud detection reports
Trigger: Database trigger AFTER UPDATE OF risk_score on loan_staging
Inputs: record_id
Logic:
Fetches complete loan record from database
Generates professional PDF with:
Cover page with risk score visualization
Data summary tables (personal info, financial data, documents)
Branded headers/footers
Uploads PDF to 'loan-pdfs' storage bucket
Updates loan_staging.pdf_path with storage URL
Outputs: PDF URL in storage, updated database record
Security: Automatic generation, service role permissions

Function 3: bulk-load-csv
Purpose: Bulk import large CSV datasets (1.18GB+)
Trigger: HTTP POST request
Inputs: filePath (CSV in storage), batchSize (default 500)
Logic:
Downloads CSV from Supabase storage
Parses with custom CSV parser (handles quotes, nulls)
Batch inserts into loan_staging table (500 rows/batch)
Progress logging for monitoring
Calls transform function (if exists)
Outputs: Import statistics (total, successful, errors)
Security: Public for demo, should be protected in production

5. Database Structure
Main Tables:
loan_staging (150+ columns)

Purpose: Staging area for loan application data and ML predictions
Key columns:
id (bigint, PK): Internal record ID
sk_id_curr (bigint): Client unique identifier
sk_id_prev (bigint): Previous application ID
target (integer, nullable): Prediction result (0=no default, 1=default, null=pending)
risk_score (numeric): ML-predicted default probability (0.0-1.0)
ml_api_status (varchar): 'pending', 'processing', 'completed', 'error'
pdf_path (text): URL to generated report in storage
prediction_timestamp (timestamptz): When prediction was made
Personal info: code_gender, cnt_children, name_education_type, occupation_type
Financial: amt_income_total, amt_credit_x, amt_annuity_x
Regional: region_rating_client, urban_rural
Documents: flag_document_2 through flag_document_21
Computed metrics: credit_income_ratio, age_years, stability_score
Indexes: sk_id_curr, target, risk_score
Triggers:
on_loan_staging_insert → calls trigger_ml_prediction_webhook()
on_loan_staging_risk_updated → calls trigger_pdf_generation()
RLS: Public read access for demo
profiles (User profile table)

id (uuid, PK, FK to auth.users)
email (text)
display_name (text)
avatar_url (text)
created_at, updated_at (timestamptz)
RLS: Users can CRUD their own profile only
user_roles (Role-based access control)

id (uuid, PK)
user_id (uuid, FK to auth.users)
role (app_role enum: 'admin', 'user')
created_at (timestamptz)
RLS: Users view own roles, admins manage all roles
Database Functions:

trigger_ml_prediction_webhook(): Calls update-risk-mock edge function via pg_net
trigger_pdf_generation(): Calls generate-loan-pdf edge function via pg_net
update_updated_at_column(): Auto-updates timestamps on row changes
has_role(_user_id, _role): Security definer function for role checks
handle_new_user(): Trigger function to create profile on auth signup
Data Flow:

Form submission → loan_staging INSERT
INSERT trigger → update-risk-mock edge function
Edge function → UPDATE risk_score
UPDATE trigger → generate-loan-pdf edge function
PDF generated → Uploaded to storage → pdf_path updated
6. Frontend & User Interface
Design System:

Theme: Dark mode with gradient backgrounds (navy #0b1220 to deep blue #0b1528)
Accent colors: Sky blue (#38bdf8), Indigo (#6366f1)
Typography: Inter font family, hierarchical sizing
Components: shadcn/ui library (Radix UI primitives + Tailwind)
Animations: Framer Motion for smooth transitions
Main Pages:

Dashboard (/dashboard)

Hero section with system overview
Stats cards: Total applications, defaulted applications, avg risk score
Defaulted applications table with sorting/filtering
Real-time data updates
Form (/form)

8-section multi-step form (109 fields total)
Auto-save functionality (localStorage + every 20 seconds)
Section validation before progression
Visual progress bar
Last saved indicator
Generate test data button
Sections:
Client Identification
Personal Information
Income & Financial Capacity
Age & Employment History
Contact Information
Regional & Location Data
Current Application Details
External Data Sources
Analytics (/analytics)

Search by SK_ID_CURR
Visualizations:
Basic Information card
Financial Analysis charts (income, credit ratios)
Contact Analysis
Social Circle Default Risk visualization
Recharts bar/pie charts
Real-time data fetching from Supabase
Bulk Import (/bulk-import)

CSV upload interface
Progress tracking
Batch processing status
Import statistics display
Form Success (/form-success)

Submission confirmation
Report summary
PDF download button
Confetti animation
Option to submit another application
User Interactions:

Form auto-saves after each section navigation
Required field validation (toast notifications)
Real-time form state management via React Context
Keyboard shortcuts (Enter to search/submit)
Loading states with spinners
Success/error toast notifications (sonner)
7. Core Functionalities & Logic
Storage Buckets & File Management:

Bucket: data - Stores CSV files for bulk import (1.18GB+ files)
Bucket: loan-pdfs - Stores generated fraud detection reports
Public bucket with RLS policies
Organized by date: reports/loan_report_{SK_ID_CURR}_{timestamp}.pdf
Access controls: Public read, service role write
Auto-generated URLs for browser access
Upload Flow:

CSV uploaded to 'data' bucket manually or via UI
bulk-load-csv function downloads and processes
Data inserted into loan_staging
Download Flow:

PDF generated by edge function
Uploaded to 'loan-pdfs' with unique filename
Public URL stored in loan_staging.pdf_path
Accessible via direct link or dashboard
PDF Generation and Storage:

Client-Side Generation (Form Submissions):

Library: jsPDF + jspdf-autotable
Trigger: User clicks "Submit Form" on final section
Process:
Validate all 109 fields across 8 sections
Generate 11-section professional report
Cover page with risk visualization
Data tables for each form section
Branded headers/footers on each page
Download to user's device
Filename: Default_Bank_Report_{UserName}_{Date}_{Time}.pdf
Server-Side Generation (Automated):

Library: jsPDF in Deno edge function
Trigger: Database trigger AFTER UPDATE OF risk_score
Process:
Fetch complete record from loan_staging
Generate 2-page report (cover + data summary)
Upload to Supabase Storage (loan-pdfs bucket)
Update database with pdf_path URL
Filename: loan_report_{SK_ID_CURR}_{timestamp}.pdf
Use case: Automated report generation for bulk imports and test data
Auto-Save Functionality:

LocalStorage Persistence:
Key: defaultdetect_draft
Value: JSON stringified FormData
Timestamp: defaultdetect_draft_timestamp
Triggers:
Automatic: Every 20 seconds (setInterval)
Manual: On "Next" button click (section navigation)
Recovery:
On form mount: Check for saved draft
Prompt user to restore or start fresh
Display "Last saved" indicator with relative time
Clear Draft:
On successful submission
On manual clear action
Form Validation:

Section-Level Validation:
Required fields by section (prevents moving to next section)
Toast notifications for missing fields
Fields: SK_ID_CURR, CODE_GENDER, AMT_INCOME_TOTAL, etc.
Final Validation:
All required fields across all 8 sections
Checked before form submission
Detailed error messages with field names
Authentication & Authorization:

User Roles:
user: Standard access (create applications, view own data)
admin: Full access (manage users, view all data)
Access Control:
RLS policies on all tables
has_role() function for permission checks
Profile creation on signup via trigger
Session Management:
Supabase Auth with localStorage persistence
Auto token refresh
Secure session cookies
Error Handling & Logging:

Frontend:
Try-catch blocks in async operations
Toast notifications for user-facing errors
Console.error for debugging
Edge Functions:
Comprehensive console.log throughout execution
Error responses with descriptive messages
Status codes: 200 (success), 400 (bad request), 404 (not found), 500 (server error)
Database:
Transaction rollbacks on errors
Trigger error handling with RAISE WARNING
ml_api_status tracking ('pending', 'error', 'completed')
8. Deployment & Environment Setup
Production Deployment:

Frontend: Deployed via Lovable platform (auto-deploy on git push)
Backend: Supabase hosted PostgreSQL + Edge Functions
Domain: Custom domain support via Lovable
SSL: Automatic HTTPS
Environment Variables:

SUPABASE_URL: https://xfbescugwgvhoheewtxd.supabase.co
SUPABASE_ANON_KEY: Public anon key (client-side)
SUPABASE_SERVICE_ROLE_KEY: Admin key (edge functions only)
Note: Keys managed securely, never exposed in frontend code
Local Development Setup:


# 1. Clone repository
git clone <repo-url>
cd defaultdetect

# 2. Install dependencies
npm install

# 3. Set up environment (no .env needed - keys in client.ts)
# Supabase credentials pre-configured

# 4. Start development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
Database Setup:


-- Run migrations in order from supabase/migrations/
-- Each migration creates tables, triggers, functions

-- Key migrations:
-- 1. Create profiles table + triggers
-- 2. Create loan_staging table
-- 3. Create storage buckets + RLS policies
-- 4. Create database functions
-- 5. Create triggers for edge functions
Edge Functions Setup:


# Functions auto-deploy with code pushes
# No manual deployment required

# Local testing (requires Supabase CLI):
supabase functions serve generate-test-data
