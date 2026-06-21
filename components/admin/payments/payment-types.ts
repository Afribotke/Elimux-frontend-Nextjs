export type PaymentStatus =
  | "paid"
  | "pending"
  | "failed"
  | "refunded"
  | string;

export type PaymentMethod =
  | "mpesa"
  | "card"
  | "bank"
  | "cash"
  | string;

export interface Payment {
  id: string;

  studentId: string;
  studentName: string;

  enrollmentId: string;
  enrollmentLabel: string;

  institutionId: string;
  institutionName: string;

  amount: number;
  currency: string;

  method: PaymentMethod;
  status: PaymentStatus;

  reference: string;
  description?: string;

  createdAt: string;
  updatedAt?: string | null;
}
