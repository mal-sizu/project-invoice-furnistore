import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { InvoiceFormData } from './validation';
import { amountToWords } from './amountToWords';

export async function generateInvoicePDF(data: InvoiceFormData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  
  // Load fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  // Colors matching the preview UI
  const primaryColor = rgb(0.17, 0.24, 0.31); // slate-800
  const secondaryColor = rgb(0.2, 0.68, 0.86); // blue-600
  const accentColor = rgb(0.15, 0.68, 0.38); // green-600
  const textColor = rgb(0.33, 0.33, 0.33); // slate-700
  const lightTextColor = rgb(0.47, 0.47, 0.47); // slate-600
  const bgColor = rgb(0.98, 0.98, 0.98); // slate-50
  const greenBgColor = rgb(0.95, 0.98, 0.95); // green-50
  
  let yPosition = height - 50;
  
  // Header Section
  page.drawText('Furnistore', {
    x: 50,
    y: yPosition,
    size: 24,
    font: boldFont,
    color: primaryColor,
  });
  
  yPosition -= 20;
  page.drawText('No 192, Artigala road, Meegoda', {
    x: 50,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  yPosition -= 15;
  page.drawText('+94763371762 | furnistore.lk@gmail.com', {
    x: 50,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  // Invoice Details (right side)
  const rightX = width - 250;
  let rightY = height - 50;
  
  page.drawText('INVOICE', {
    x: rightX,
    y: rightY,
    size: 20,
    font: boldFont,
    color: primaryColor,
  });
  
  rightY -= 20;
  page.drawText(`Invoice No: ${data.invoiceId}`, {
    x: rightX,
    y: rightY,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  rightY -= 15;
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  page.drawText(`Date: ${formattedDate}`, {
    x: rightX,
    y: rightY,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  yPosition -= 60;
  
  // Customer Info Section with background
  const customerInfoHeight = 100;
  page.drawRectangle({
    x: 50,
    y: yPosition - customerInfoHeight,
    width: width - 100,
    height: customerInfoHeight,
    color: bgColor,
  });
  
  yPosition -= 20;
  page.drawText('Bill to:', {
    x: 70,
    y: yPosition,
    size: 14,
    font: boldFont,
    color: primaryColor,
  });
  
  yPosition -= 20;
  page.drawText(`Name: ${data.customerName}`, {
    x: 70,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: textColor,
  });
  
  yPosition -= 15;
  page.drawText(`Contact: ${data.customerContact}`, {
    x: 70,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: textColor,
  });
  
  yPosition -= 15;
  page.drawText('Address:', {
    x: 70,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: textColor,
  });
  
  yPosition -= 15;
  const addressLines = data.customerAddress.split('\n');
  addressLines.forEach(line => {
    page.drawText(line, {
      x: 85,
      y: yPosition,
      size: 10,
      font: regularFont,
      color: textColor,
    });
    yPosition -= 15;
  });
  
  yPosition -= 20;
  page.drawText(`City: ${data.city}`, {
    x: 70,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: textColor,
  });
  
  yPosition -= 40;
  
  // Items Table Header
  const tableHeaderHeight = 30;
  page.drawRectangle({
    x: 50,
    y: yPosition - tableHeaderHeight,
    width: width - 100,
    height: tableHeaderHeight,
    color: primaryColor,
  });
  
  yPosition -= 20;
  page.drawText('Item Description', {
    x: 70,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  page.drawText('Warranty', {
    x: width - 250,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  page.drawText('Amount (Rs.)', {
    x: width - 150,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  yPosition -= 20;
  
  // Items
  const itemRowHeight = 40;
  data.items.forEach((item, index) => {
    // Alternating row background
    if (index % 2 === 0) {
      page.drawRectangle({
        x: 50,
        y: yPosition - itemRowHeight,
        width: width - 100,
        height: itemRowHeight,
        color: bgColor,
      });
    }
    
    // Item description
    page.drawText(item.description, {
      x: 70,
      y: yPosition - 15,
      size: 10,
      font: boldFont,
      color: textColor,
    });
    
    // Color
    page.drawText(`Color: ${item.color}`, {
      x: 70,
      y: yPosition - 30,
      size: 9,
      font: regularFont,
      color: lightTextColor,
    });
    
    // Warranty
    page.drawText(`${item.warranty} yrs warranty`, {
      x: width - 250,
      y: yPosition - 20,
      size: 10,
      font: regularFont,
      color: textColor,
    });
    
    // Amount
    page.drawText(item.amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }), {
      x: width - 150,
      y: yPosition - 20,
      size: 10,
      font: regularFont,
      color: textColor,
    });
    
    yPosition -= itemRowHeight;
  });
  
  yPosition -= 30;
  
  // Total Section with background
  const totalHeight = 80;
  page.drawRectangle({
    x: 50,
    y: yPosition - totalHeight,
    width: width - 100,
    height: totalHeight,
    color: greenBgColor,
  });
  
  yPosition -= 20;
  page.drawText('Total Amount:', {
    x: 70,
    y: yPosition,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);
  page.drawText(totalAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + ' LKR', {
    x: width - 200,
    y: yPosition,
    size: 20,
    font: boldFont,
    color: accentColor,
  });
  
  yPosition -= 25;
  page.drawText(amountToWords(totalAmount), {
    x: 70,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  yPosition -= 40;
  
  // Footer
  page.drawText('Thank you for your business!', {
    x: (width - 300) / 2,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });
  
  yPosition -= 20;
  page.drawText('Payment terms: Due upon receipt | Payment methods: Bank Transfer, Cash', {
    x: (width - 400) / 2,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  // Generate filename
  const now = new Date();
  const timestamp = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0') + '_' +
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0');
  
  const filename = `${data.invoiceId}_${data.city}_${timestamp}.pdf`;
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, filename);
  
  return filename;
}