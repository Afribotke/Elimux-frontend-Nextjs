import { EtimsInvoicePayload, EtimsSubmissionResponse } from "./types";

export const SAMPLE_ETIMS_PAYLOAD: EtimsInvoicePayload = {
  invoice_number: "INV-ETIMS-001",
  invoice_date: new Date().toISOString(),
  seller_pin: "P051234567A",
  buyer_pin: "P059876543B",
  currency: "KES",
  payment_mode: "cash",
  line_items: [
    {
      item_code: "ITEM-001",
      description: "Sample Service",
      quantity: 1,
      unit_price: 1000,
      tax_rate: 16,
      tax_amount: 160,
      total_amount: 1160,
    },
  ],
  subtotal: 1000,
  total_tax: 160,
  total_amount: 1160,
  prn: "PRN123456",
  payment_reference: "MPESA-REF-123",
  payment_channel: "mpesa",
};

export const SAMPLE_ETIMS_SUCCESS_RESPONSE: EtimsSubmissionResponse = {
  status: "success",
  etims_receipt_number: "ETR-123456",
  message: "Invoice processed successfully",
  timestamp: new Date().toISOString(),
  raw_response: {
    code: "00",
    description: "SUCCESS",
  },
};

export const SAMPLE_ETIMS_FAILED_RESPONSE: EtimsSubmissionResponse = {
  status: "failed",
  etims_receipt_number: undefined,
  message: "Invalid buyer PIN",
  timestamp: new Date().toISOString(),
  raw_response: {
    code: "400",
    description: "INVALID_BUYER_PIN",
  },
};

