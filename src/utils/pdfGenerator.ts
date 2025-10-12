import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from '@/types/formData';

export const generatePDF = (formData: FormData, reportId: string, userName: string, riskScore: number, riskLevel: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function for page footer
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`DefaultDetect | Fraud Detection Report`, 14, pageHeight - 15);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 40, pageHeight - 15);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, pageHeight - 10);
    doc.text(`CONFIDENTIAL - Internal Use Only`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  };

  // Cover Page
  doc.setFillColor(13, 26, 38); // Dark navy
  doc.rect(0, 0, pageWidth, 80, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('FRAUD DETECTION REPORT', pageWidth / 2, 35, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Comprehensive Risk Assessment Analysis', pageWidth / 2, 45, { align: 'center' });
  
  // Report metadata box
  doc.setDrawColor(240, 240, 240);
  doc.setLineWidth(0.5);
  doc.rect(20, 90, pageWidth - 40, 50);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text('Report ID:', 30, 100);
  doc.setFont('helvetica', 'bold');
  doc.text(reportId, 70, 100);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Client:', 30, 110);
  doc.setFont('helvetica', 'bold');
  doc.text(userName, 70, 110);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Generated:', 30, 120);
  doc.setFont('helvetica', 'bold');
  doc.text(new Date().toLocaleString(), 70, 120);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Classification:', 30, 130);
  doc.setFillColor(220, 53, 69);
  doc.rect(70, 125, 60, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('CONFIDENTIAL', 72, 131);
  
  // Risk Score Box
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(240, 248, 255);
  doc.rect(20, 150, pageWidth - 40, 30, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Risk Assessment:', 30, 160);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const riskColor = riskScore > 0.7 ? [220, 53, 69] : riskScore > 0.4 ? [255, 193, 7] : [40, 167, 69];
  doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.text(`${(riskScore * 100).toFixed(1)}%`, 30, 172);
  doc.setFontSize(14);
  doc.text(riskLevel, 80, 172);

  addFooter(1, 1);

  // Section 1: Client Identification
  doc.addPage();
  yPosition = 20;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('1. CLIENT IDENTIFICATION', 14, yPosition);
  yPosition += 10;

  autoTable(doc, {
    startY: yPosition,
    head: [['Field', 'Value']],
    body: [
      ['Client ID (SK_ID_CURR)', formData.SK_ID_CURR?.toString() || 'N/A'],
      ['Previous Application ID', formData.SK_ID_PREV?.toString() || 'N/A'],
      ['Community ID', formData.community_id?.toString() || 'N/A'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 2: Personal Information
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('2. PERSONAL INFORMATION', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Field', 'Value']],
    body: [
      ['Gender', formData.CODE_GENDER || 'N/A'],
      ['Owns Car', formData.FLAG_OWN_CAR ? 'Yes' : 'No'],
      ['Owns Realty', formData.FLAG_OWN_REALTY ? 'Yes' : 'No'],
      ['Number of Children', formData.CNT_CHILDREN.toString()],
      ['Family Members', formData.CNT_FAM_MEMBERS.toString()],
      ['Education Type', formData.NAME_EDUCATION_TYPE || 'N/A'],
      ['Family Status', formData.NAME_FAMILY_STATUS || 'N/A'],
      ['Housing Type', formData.NAME_HOUSING_TYPE || 'N/A'],
      ['Occupation', formData.OCCUPATION_TYPE || 'N/A'],
      ['Organization Type', formData.ORGANIZATION_TYPE || 'N/A'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 3: Income & Financial
  doc.addPage();
  yPosition = 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('3. INCOME & FINANCIAL CAPACITY', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Field', 'Value']],
    body: [
      ['Total Income', formData.AMT_INCOME_TOTAL ? `$${formData.AMT_INCOME_TOTAL.toLocaleString()}` : 'N/A'],
      ['Income Type', formData.NAME_INCOME_TYPE || 'N/A'],
      ['Credit Amount', formData.AMT_CREDIT_x ? `$${formData.AMT_CREDIT_x.toLocaleString()}` : 'N/A'],
      ['Annuity Amount', formData.AMT_ANNUITY_x ? `$${formData.AMT_ANNUITY_x.toLocaleString()}` : (formData.AMT_ANNUITY_x_missing ? 'Missing' : 'N/A')],
      ['Goods Price', formData.AMT_GOODS_PRICE_x ? `$${formData.AMT_GOODS_PRICE_x.toLocaleString()}` : (formData.AMT_GOODS_PRICE_x_missing ? 'Missing' : 'N/A')],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 4: Age & Employment
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('4. AGE & EMPLOYMENT HISTORY', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Field', 'Value (Days)']],
    body: [
      ['Days Birth', formData.DAYS_BIRTH?.toString() || 'N/A'],
      ['Days Employed', formData.DAYS_EMPLOYED?.toString() || 'N/A'],
      ['Days Registration', formData.DAYS_REGISTRATION?.toString() || 'N/A'],
      ['Days ID Publish', formData.DAYS_ID_PUBLISH?.toString() || 'N/A'],
      ['Days Last Phone Change', formData.DAYS_LAST_PHONE_CHANGE?.toString() || 'N/A'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 5: Contact Information
  doc.addPage();
  yPosition = 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('5. CONTACT INFORMATION', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Contact Type', 'Available']],
    body: [
      ['Mobile', formData.FLAG_MOBIL ? '✓' : '✗'],
      ['Employment Phone', formData.FLAG_EMP_PHONE ? '✓' : '✗'],
      ['Work Phone', formData.FLAG_WORK_PHONE ? '✓' : '✗'],
      ['Contact Mobile', formData.FLAG_CONT_MOBILE ? '✓' : '✗'],
      ['Phone', formData.FLAG_PHONE ? '✓' : '✗'],
      ['Email', formData.FLAG_EMAIL ? '✓' : '✗'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 6: Regional & Social
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('6. REGIONAL & LOCATION DATA', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Field', 'Value']],
    body: [
      ['Region Population Relative', formData.REGION_POPULATION_RELATIVE ? 'Yes' : 'No'],
      ['Region Rating (Client)', formData.REGION_RATING_CLIENT.toString()],
      ['Region Rating (City)', formData.REGION_RATING_CLIENT_W_CITY.toString()],
      ['Region Mismatch (Live)', formData.REG_REGION_NOT_LIVE_REGION ? 'Yes' : 'No'],
      ['Region Mismatch (Work)', formData.REG_REGION_NOT_WORK_REGION ? 'Yes' : 'No'],
      ['City Mismatch Score', formData.CITY_REGION_MISMATCH_SCORE.toString()],
      ['Urban/Rural', formData.URBAN_RURAL ? 'Urban' : 'Rural'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 7: Application Details
  doc.addPage();
  yPosition = 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('7. CURRENT APPLICATION DETAILS', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Field', 'Value']],
    body: [
      ['Contract Type', formData.NAME_CONTRACT_TYPE_x || 'N/A'],
      ['Type Suite', formData.NAME_TYPE_SUITE_x || 'N/A'],
      ['Weekday (Start)', formData.WEEKDAY_APPR_PROCESS_START_x || 'N/A'],
      ['Hour (Start)', formData.HOUR_APPR_PROCESS_START_x.toString()],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 8: External Sources
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('8. EXTERNAL DATA SOURCES', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Source', 'Value']],
    body: [
      ['External Source 2', formData.EXT_SOURCE_2?.toString() || (formData.EXT_SOURCE_2_missing ? 'Missing' : 'N/A')],
      ['External Source 3', formData.EXT_SOURCE_3?.toString() || (formData.EXT_SOURCE_3_missing ? 'Missing' : 'N/A')],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 9: Social Circle & Credit Bureau
  doc.addPage();
  yPosition = 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('9. SOCIAL CIRCLE & CREDIT BUREAU', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Metric', 'Value']],
    body: [
      ['30-Day Social Observations', formData.OBS_30_CNT_SOCIAL_CIRCLE.toString()],
      ['30-Day Social Defaults', formData.DEF_30_CNT_SOCIAL_CIRCLE.toString()],
      ['60-Day Social Observations', formData.OBS_60_CNT_SOCIAL_CIRCLE.toString()],
      ['60-Day Social Defaults', formData.DEF_60_CNT_SOCIAL_CIRCLE.toString()],
      ['Bureau Requests (Hour)', formData.AMT_REQ_CREDIT_BUREAU_HOUR.toString()],
      ['Bureau Requests (Day)', formData.AMT_REQ_CREDIT_BUREAU_DAY.toString()],
      ['Bureau Requests (Week)', formData.AMT_REQ_CREDIT_BUREAU_WEEK.toString()],
      ['Bureau Requests (Month)', formData.AMT_REQ_CREDIT_BUREAU_MON.toString()],
      ['Bureau Requests (Quarter)', formData.AMT_REQ_CREDIT_BUREAU_QRT.toString()],
      ['Bureau Requests (Year)', formData.AMT_REQ_CREDIT_BUREAU_YEAR.toString()],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Section 10: Documents
  doc.addPage();
  yPosition = 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('10. DOCUMENTS PROVIDED', 14, yPosition);
  yPosition += 5;

  const documents = [
    ['Document 2', formData.FLAG_DOCUMENT_2 ? '✓' : '✗'],
    ['Document 3', formData.FLAG_DOCUMENT_3 ? '✓' : '✗'],
    ['Document 4', formData.FLAG_DOCUMENT_4 ? '✓' : '✗'],
    ['Document 5', formData.FLAG_DOCUMENT_5 ? '✓' : '✗'],
    ['Document 6', formData.FLAG_DOCUMENT_6 ? '✓' : '✗'],
    ['Document 7', formData.FLAG_DOCUMENT_7 ? '✓' : '✗'],
    ['Document 8', formData.FLAG_DOCUMENT_8 ? '✓' : '✗'],
    ['Document 9', formData.FLAG_DOCUMENT_9 ? '✓' : '✗'],
    ['Document 10', formData.FLAG_DOCUMENT_10 ? '✓' : '✗'],
    ['Document 11', formData.FLAG_DOCUMENT_11 ? '✓' : '✗'],
    ['Document 12', formData.FLAG_DOCUMENT_12 ? '✓' : '✗'],
    ['Document 13', formData.FLAG_DOCUMENT_13 ? '✓' : '✗'],
    ['Document 14', formData.FLAG_DOCUMENT_14 ? '✓' : '✗'],
    ['Document 15', formData.FLAG_DOCUMENT_15 ? '✓' : '✗'],
    ['Document 16', formData.FLAG_DOCUMENT_16 ? '✓' : '✗'],
    ['Document 17', formData.FLAG_DOCUMENT_17 ? '✓' : '✗'],
    ['Document 18', formData.FLAG_DOCUMENT_18 ? '✓' : '✗'],
    ['Document 19', formData.FLAG_DOCUMENT_19 ? '✓' : '✗'],
    ['Document 20', formData.FLAG_DOCUMENT_20 ? '✓' : '✗'],
    ['Document 21', formData.FLAG_DOCUMENT_21 ? '✓' : '✗'],
  ];

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Document', 'Provided']],
    body: documents,
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 50, halign: 'center' }
    }
  });

  // Section 11: Previous Applications
  doc.addPage();
  yPosition = 20;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('11. PREVIOUS LOAN ATTRIBUTES', 14, yPosition);
  yPosition += 5;

  autoTable(doc, {
    startY: yPosition + 5,
    head: [['Field', 'Value']],
    body: [
      ['Contract Type', formData.NAME_CONTRACT_TYPE_y || 'N/A'],
      ['Annuity Amount', formData.AMT_ANNUITY_y ? `$${formData.AMT_ANNUITY_y.toLocaleString()}` : 'N/A'],
      ['Application Amount', formData.AMT_APPLICATION ? `$${formData.AMT_APPLICATION.toLocaleString()}` : 'N/A'],
      ['Credit Amount', formData.AMT_CREDIT_y ? `$${formData.AMT_CREDIT_y.toLocaleString()}` : 'N/A'],
      ['Goods Price', formData.AMT_GOODS_PRICE_y ? `$${formData.AMT_GOODS_PRICE_y.toLocaleString()}` : 'N/A'],
      ['Application Weekday', formData.WEEKDAY_APPR_PROCESS_START_y || 'N/A'],
      ['Application Hour', formData.HOUR_APPR_PROCESS_START_y.toString()],
      ['Cash Loan Purpose', formData.NAME_CASH_LOAN_PURPOSE || 'N/A'],
      ['Contract Status', formData.NAME_CONTRACT_STATUS || 'N/A'],
      ['Payment Type', formData.NAME_PAYMENT_TYPE || 'N/A'],
      ['Rejection Reason', formData.CODE_REJECT_REASON || 'N/A'],
      ['Client Type', formData.NAME_CLIENT_TYPE || 'N/A'],
      ['Goods Category', formData.NAME_GOODS_CATEGORY || 'N/A'],
      ['Portfolio', formData.NAME_PORTFOLIO || 'N/A'],
      ['Product Type', formData.NAME_PRODUCT_TYPE || 'N/A'],
      ['Channel Type', formData.CHANNEL_TYPE || 'N/A'],
      ['Seller Industry', formData.NAME_SELLER_INDUSTRY || 'N/A'],
      ['Payment Count', formData.CNT_PAYMENT?.toString() || 'N/A'],
      ['Yield Group', formData.NAME_YIELD_GROUP || 'N/A'],
      ['Product Combination', formData.PRODUCT_COMBINATION || 'N/A'],
    ],
    theme: 'striped',
    headStyles: { fillColor: [13, 26, 38], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });

  // Add footers to all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  // Save with custom filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T');
  const dateStr = timestamp[0];
  const timeStr = timestamp[1].split('-').slice(0, 3).join('-');
  const filename = `Default_Bank_Report_${userName.replace(/\s+/g, '_')}_${dateStr}_${timeStr}.pdf`;
  
  doc.save(filename);
  return filename;
};
