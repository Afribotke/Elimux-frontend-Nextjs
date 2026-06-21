import { Invoice } from "./invoice-types";

interface InvoicePdfTemplateProps {
  invoice: Invoice;
}

export function InvoicePdfTemplate({ invoice }: InvoicePdfTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#333',
        padding: '32px',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', margin: 0 }}>INVOICE</h1>
        <p style={{ margin: '4px 0', color: '#555' }}>
          Invoice Number: {invoice.invoiceNumber}
        </p>
        <p style={{ margin: '4px 0', color: '#555' }}>
          Issue Date: {invoice.issueDate}
        </p>
      </div>

      {/* Seller & Buyer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <div style={{ width: '48%' }}>
          <h3 style={{ marginBottom: '8px' }}>Seller</h3>
          <p style={{ margin: 0 }}>{invoice.seller.name}</p>
          <p style={{ margin: 0 }}>PIN: {invoice.seller.pin}</p>
          {invoice.seller.email && <p style={{ margin: 0 }}>{invoice.seller.email}</p>}
          {invoice.seller.city && <p style={{ margin: 0 }}>{invoice.seller.city}</p>}
        </div>

        <div style={{ width: '48%' }}>
          <h3 style={{ marginBottom: '8px' }}>Buyer</h3>
          <p style={{ margin: 0 }}>{invoice.buyer.name}</p>
          <p style={{ margin: 0 }}>PIN: {invoice.buyer.pin}</p>
          {invoice.buyer.email && <p style={{ margin: 0 }}>{invoice.buyer.email}</p>}
          {invoice.buyer.city && <p style={{ margin: 0 }}>{invoice.buyer.city}</p>}
        </div>
      </div>

      {/* Line Items */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '24px',
        }}
      >
        <thead>
          <tr>
            <th style={th}>Item Code</th>
            <th style={th}>Description</th>
            <th style={thRight}>Qty</th>
            <th style={thRight}>Unit Price</th>
            <th style={thRight}>Tax</th>
            <th style={thRight}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item) => (
            <tr key={item.id}>
              <td style={td}>{item.itemCode}</td>
              <td style={td}>{item.description}</td>
              <td style={tdRight}>{item.quantity}</td>
              <td style={tdRight}>
                {invoice.currency} {item.unitPrice.toFixed(2)}
              </td>
              <td style={tdRight}>{item.taxAmount.toFixed(2)}</td>
              <td style={tdRight}>{item.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ width: '100%', marginBottom: '24px' }}>
        <div style={totalRow}>
          <span>Subtotal</span>
          <span>
            {invoice.currency} {invoice.subTotal.toFixed(2)}
          </span>
        </div>
        <div style={totalRow}>
          <span>Total Tax</span>
          <span>
            {invoice.currency} {invoice.totalTax.toFixed(2)}
          </span>
        </div>
        <div style={{ ...totalRow, fontWeight: 'bold' }}>
          <span>Total Amount</span>
          <span>
            {invoice.currency} {invoice.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ETIMS Metadata */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '8px' }}>ETIMS Information</h3>
        <p style={{ margin: 0 }}>
          Status: {invoice.etims?.etimsStatus || 'Not Submitted'}
        </p>
        {invoice.etims?.etimsReceiptNumber && (
          <p style={{ margin: 0 }}>
            Receipt: {invoice.etims.etimsReceiptNumber}
          </p>
        )}
        {invoice.etims?.prn && <p style={{ margin: 0 }}>PRN: {invoice.etims.prn}</p>}
        {invoice.etims?.submissionTimestamp && (
          <p style={{ margin: 0 }}>
            Submitted: {invoice.etims.submissionTimestamp}
          </p>
        )}
        {invoice.etims?.lastErrorMessage && (
          <p style={{ margin: 0, color: 'red' }}>
            Error: {invoice.etims.lastErrorMessage}
          </p>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid #ddd',
          textAlign: 'center',
          fontSize: '11px',
          color: '#777',
        }}
      >
        <p>Thank you for your business.</p>
        <p>This invoice was generated electronically and is valid without a signature.</p>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px',
  borderBottom: '1px solid #ddd',
  fontWeight: 'bold',
};

const thRight: React.CSSProperties = {
  ...th,
  textAlign: 'right',
};

const td: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #eee',
};

const tdRight: React.CSSProperties = {
  ...td,
  textAlign: 'right',
};

const totalRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 0',
};



