import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import jsPDF from 'https://esm.sh/jspdf@2.5.1'
import 'https://esm.sh/jspdf-autotable@3.8.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LoanRecord {
  id: number;
  sk_id_curr: number;
  code_gender?: string;
  flag_own_car?: number;
  flag_own_realty?: number;
  cnt_children?: number;
  cnt_fam_members?: number;
  name_education_type?: string;
  name_family_status?: string;
  name_housing_type?: string;
  occupation_type?: string;
  organization_type?: string;
  amt_income_total?: number;
  name_income_type?: string;
  amt_credit_x?: number;
  amt_annuity_x?: number;
  amt_goods_price_x?: number;
  days_birth?: number;
  days_employed?: number;
  risk_score?: number;
  target?: number;
  created_at?: string;
  [key: string]: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { record_id } = await req.json()
    console.log('🎨 Generating PDF for record:', record_id)

    // Fetch the record from database
    const { data: record, error: fetchError } = await supabase
      .from('loan_staging')
      .select('*')
      .eq('id', record_id)
      .single()

    if (fetchError || !record) {
      console.error('Error fetching record:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Record not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    console.log('📄 Record fetched, generating PDF...')

    // Generate PDF
    const pdfBuffer = await generatePDF(record as LoanRecord)

    // Upload to Supabase Storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')
    const dateStr = timestamp[0]
    const timeStr = timestamp[1].split('-').slice(0, 3).join('-')
    const userName = record.code_gender === 'M' ? 'Client' : 'Client'
    const filename = `Default_Bank_Report_${record.sk_id_curr}_${dateStr}_${timeStr}.pdf`
    const filePath = `reports/${filename}`

    console.log('📤 Uploading PDF to storage:', filePath)

    const { error: uploadError } = await supabase.storage
      .from('loan_applications')
      .upload(filePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      // Try to create bucket if it doesn't exist
      const { error: bucketError } = await supabase.storage.createBucket('loan_applications', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      })
      
      if (bucketError) {
        console.error('Bucket creation error:', bucketError)
      } else {
        // Retry upload
        const { error: retryError } = await supabase.storage
          .from('loan_applications')
          .upload(filePath, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true
          })
        
        if (retryError) {
          throw retryError
        }
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('loan_applications')
      .getPublicUrl(filePath)

    const pdfUrl = urlData.publicUrl

    // Update record with PDF path
    const { error: updateError } = await supabase
      .from('loan_staging')
      .update({ pdf_path: pdfUrl })
      .eq('id', record_id)

    if (updateError) {
      console.error('Error updating record with PDF path:', updateError)
    }

    console.log('✅ PDF generated and stored successfully:', pdfUrl)

    return new Response(
      JSON.stringify({ 
        success: true, 
        pdf_url: pdfUrl,
        filename: filename
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('❌ PDF generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function generatePDF(record: LoanRecord): Promise<Uint8Array> {
  const doc = new jsPDF() as any
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  const reportId = `FR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  const userName = record.code_gender === 'M' ? 'Client Male' : record.code_gender === 'F' ? 'Client Female' : 'Client'
  const riskScore = record.risk_score || 0.5
  const riskLevel = riskScore > 0.7 ? 'HIGH RISK' : riskScore > 0.4 ? 'MEDIUM RISK' : 'LOW RISK'

  // Helper function for page footer
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.text('DefaultDetect | Fraud Detection Report', 14, pageHeight - 15)
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 40, pageHeight - 15)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, pageHeight - 10)
    doc.text('CONFIDENTIAL - Internal Use Only', pageWidth / 2, pageHeight - 10, { align: 'center' })
  }

  // Cover Page
  doc.setFillColor(13, 26, 38)
  doc.rect(0, 0, pageWidth, 80, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('FRAUD DETECTION REPORT', pageWidth / 2, 35, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text('Comprehensive Risk Assessment Analysis', pageWidth / 2, 45, { align: 'center' })
  
  // Report metadata box
  doc.setDrawColor(240, 240, 240)
  doc.setLineWidth(0.5)
  doc.rect(20, 90, pageWidth - 40, 50)
  
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.text('Report ID:', 30, 100)
  doc.setFont('helvetica', 'bold')
  doc.text(reportId, 70, 100)
  
  doc.setFont('helvetica', 'normal')
  doc.text('Client:', 30, 110)
  doc.setFont('helvetica', 'bold')
  doc.text(userName, 70, 110)
  
  doc.setFont('helvetica', 'normal')
  doc.text('Generated:', 30, 120)
  doc.setFont('helvetica', 'bold')
  doc.text(new Date().toLocaleString(), 70, 120)
  
  doc.setFont('helvetica', 'normal')
  doc.text('SK_ID_CURR:', 30, 130)
  doc.setFont('helvetica', 'bold')
  doc.text(record.sk_id_curr.toString(), 70, 130)

  // Risk Score Box
  doc.setTextColor(0, 0, 0)
  doc.setFillColor(240, 248, 255)
  doc.rect(20, 150, pageWidth - 40, 30, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.text('Risk Assessment:', 30, 160)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  const riskColor = riskScore > 0.7 ? [220, 53, 69] : riskScore > 0.4 ? [255, 193, 7] : [40, 167, 69]
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2])
  doc.text(`${(riskScore * 100).toFixed(1)}%`, 30, 172)
  doc.setFontSize(14)
  doc.text(riskLevel, 80, 172)

  addFooter(1, 1)

  // Data Summary Page
  doc.addPage()
  let yPos = 20
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('DATA SUMMARY', 14, yPos)
  yPos += 10

  doc.autoTable({
    startY: yPos,
    head: [['Field', 'Value']],
    body: [
      ['Client ID', record.sk_id_curr?.toString() || 'N/A'],
      ['Gender', record.code_gender || 'N/A'],
      ['Owns Car', record.flag_own_car ? 'Yes' : 'No'],
      ['Owns Realty', record.flag_own_realty ? 'Yes' : 'No'],
      ['Children', record.cnt_children?.toString() || '0'],
      ['Family Members', record.cnt_fam_members?.toString() || 'N/A'],
      ['Education', record.name_education_type || 'N/A'],
      ['Family Status', record.name_family_status || 'N/A'],
      ['Housing', record.name_housing_type || 'N/A'],
      ['Occupation', record.occupation_type || 'N/A'],
      ['Organization', record.organization_type || 'N/A'],
      ['Total Income', record.amt_income_total ? `$${record.amt_income_total.toLocaleString()}` : 'N/A'],
      ['Income Type', record.name_income_type || 'N/A'],
      ['Credit Amount', record.amt_credit_x ? `$${record.amt_credit_x.toLocaleString()}` : 'N/A'],
      ['Days Birth', record.days_birth?.toString() || 'N/A'],
      ['Days Employed', record.days_employed?.toString() || 'N/A'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  })

  // Add footers
  const totalPages = doc.internal.pages.length - 1
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i)
    addFooter(i, totalPages)
  }

  // Convert to buffer
  const pdfOutput = doc.output('arraybuffer')
  return new Uint8Array(pdfOutput)
}
