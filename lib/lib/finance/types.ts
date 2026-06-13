export interface FeeItem {
  id?: string;
  title: string;
  amount: number;
}

export interface TransactionItem {
  id?: string;
  amount: number;
  type: string;
  date: string;
}
