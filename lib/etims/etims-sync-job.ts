import { EtimsService } from "./etims-service";
import { Invoice } from "@/components/admin/invoices/invoice-types";

/**
 * TODO: Replace with your real DB query.
 * Should return all invoices where:
 *   invoice.etims.etimsStatus === 'pending'
 */
async function loadPendingInvoices(): Promise<Invoice[]> {
  console.log("Loading pending ETIMS invoices...");
  return []; // placeholder
}

/**
 * TODO: Replace with your real DB update logic.
 */
async function updateInvoiceEtimsMetadata(
  invoiceId: string,
  data: any
): Promise<void> {
  console.log("Updating invoice", invoiceId, data);
}

/**
 * runEtimsSyncJob
 * ----------------
 * Polls ETIMS for all pending invoices and updates their status.
 */
export async function runEtimsSyncJob() {
  const etims = new EtimsService();
  const pendingInvoices = await loadPendingInvoices();

  console.log(\Found \ pending ETIMS invoices\);

  for (const invoice of pendingInvoices) {
    try {
      const result = await etims.checkStatus(invoice.invoiceNumber);

      await updateInvoiceEtimsMetadata(invoice.id, {
        etimsStatus: result.status,
        etimsReceiptNumber: result.etims_receipt_number,
        lastErrorMessage: result.status === "failed" ? result.message : null,
        submissionTimestamp: result.timestamp,
        rawEtimsResponse: result.raw_response,
      });

      console.log(
        \ETIMS sync updated invoice \ → \\
      );
    } catch (err: any) {
      console.error(
        \ETIMS sync failed for invoice \\,
        err
      );
    }
  }

  return {
    success: true,
    processed: pendingInvoices.length,
  };
}
