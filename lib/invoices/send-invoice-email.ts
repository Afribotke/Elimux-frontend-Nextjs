import { Invoice } from "@/components/admin/invoices/invoice-types";

export interface SendInvoiceEmailOptions {
  invoice: Invoice;
  pdfBuffer?: Buffer;
  to: string;
  from?: string;
  subject?: string;
}

export async function sendInvoiceEmail({
  invoice,
  pdfBuffer,
  to,
  from = "billing@yourdomain.com",
  subject = \Invoice \ + invoice.invoiceNumber,
}: SendInvoiceEmailOptions) {
  const emailBody = buildInvoiceEmailHtml(invoice);

  console.log("Email prepared:", {
    to,
    subject,
    hasAttachment: !!pdfBuffer,
  });

  return {
    success: true,
    message: "Email prepared (provider integration pending)",
  };
}

export function buildInvoiceEmailHtml(invoice: Invoice) {
  return \
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2>Invoice \${
        invoice.invoiceNumber
      }\</h2>
      <p>Hello,</p>
      <p>Please find your invoice attached.</p>

      <h3>Invoice Summary</h3>
      <ul>
        <li><strong>Invoice Number:</strong> \${
          invoice.invoiceNumber
        }\</li>
        <li><strong>Issue Date:</strong> \${
          invoice.issueDate
        }\</li>
        <li><strong>Total Amount:</strong> \${
          invoice.currency
        }\ \${
          invoice.totalAmount.toFixed(2)
        }\</li>
        <li><strong>Status:</strong> \${
          invoice.status
        }\</li>
      </ul>

      <h3>Buyer Details</h3>
      <ul>
        <li><strong>Name:</strong> \${
          invoice.buyer.name
        }\</li>
        <li><strong>KRA PIN:</strong> \${
          invoice.buyer.pin
        }\</li>
      </ul>

      <h3>ETIMS Information</h3>
      <ul>
        <li><strong>ETIMS Status:</strong> \${
          invoice.etims?.etimsStatus || "Not Submitted"
        }\</li>
        \${
          invoice.etims?.etimsReceiptNumber
            ? <li><strong>Receipt:</strong> \${
                invoice.etims.etimsReceiptNumber
              }\</li>
            : ""
        }\
        \${
          invoice.etims?.prn
            ? <li><strong>PRN:</strong> \${
                invoice.etims.prn
              }\</li>
            : ""
        }\
      </ul>

      <p>Thank you for your business.</p>
      <p style="color: #777; font-size: 12px;">
        This invoice was generated electronically and is valid without a signature.
      </p>
    </div>
  \;
}
