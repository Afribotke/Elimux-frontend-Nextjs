import { Invoice } from "@/components/admin/invoices/invoice-types";
import { EtimsClient } from "./client";
import { submitInvoiceToEtims } from "./submit-invoice";
import { checkEtimsStatus } from "./check-status";
import { mockSubmitInvoice, mockCheckStatus } from "./mock-etims";
import { EtimsSubmissionResponse } from "./types";

export class EtimsService {
  private useMock: boolean;
  private client: EtimsClient | null;

  constructor() {
    this.useMock = process.env.ETIMS_MOCK === "true";

    this.client = this.useMock
      ? null
      : new EtimsClient({
          baseUrl: process.env.ETIMS_BASE_URL!,
          apiKey: process.env.ETIMS_API_KEY,
        });
  }

  /**
   * submitInvoice
   * -------------
   * Submits an invoice to ETIMS (mock or real).
   */
  async submitInvoice(invoice: Invoice): Promise<EtimsSubmissionResponse> {
    if (this.useMock) {
      return mockSubmitInvoice({
        invoice_number: invoice.invoiceNumber,
        invoice_date: invoice.issueDate,
        seller_pin: invoice.seller.pin,
        buyer_pin: invoice.buyer.pin,
        currency: invoice.currency,
        payment_mode: invoice.paymentMode || "cash",
        line_items: invoice.lineItems.map((item) => ({
          item_code: item.itemCode,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          tax_rate: item.taxRate,
          tax_amount: item.taxAmount,
          total_amount: item.totalAmount,
        })),
        subtotal: invoice.subTotal,
        total_tax: invoice.totalTax,
        total_amount: invoice.totalAmount,
        prn: invoice.etims?.prn,
        payment_reference: invoice.etims?.paymentReference,
        payment_channel: invoice.etims?.paymentChannel,
      });
    }

    return submitInvoiceToEtims(this.client!, invoice);
  }

  /**
   * checkStatus
   * -----------
   * Polls ETIMS for the latest invoice status.
   */
  async checkStatus(invoiceNumber: string): Promise<EtimsSubmissionResponse> {
    if (this.useMock) {
      return mockCheckStatus(invoiceNumber);
    }

    return checkEtimsStatus(this.client!, invoiceNumber);
  }
}



