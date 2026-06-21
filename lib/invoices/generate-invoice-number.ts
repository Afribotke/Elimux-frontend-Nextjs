export interface InvoiceNumberParams {
  branchCode: string; // e.g. '001'
  financialYear: number; // e.g. 2026
  lastSequenceNumber: number; // last used sequence
}

/**
 * generateInvoiceNumber
 * ---------------------
 * Produces ETIMS-compliant invoice numbers:
 *
 *   BRANCH/YEAR/SEQUENCE
 *   001/2026/000123
 *
 * This ensures:
 * - Sequential numbering
 * - Zero-padded sequence
 * - Branch-aware numbering
 * - Year-aware numbering
 */
export function generateInvoiceNumber({
  branchCode,
  financialYear,
  lastSequenceNumber,
}: InvoiceNumberParams) {
  const nextSequence = lastSequenceNumber + 1;

  // ETIMS requires 6-digit padded sequence numbers
  const paddedSequence = String(nextSequence).padStart(6, "0");

  const invoiceNumber = \\/\/\\;

  return {
    invoiceNumber,
    sequenceNumber: nextSequence,
  };
}
