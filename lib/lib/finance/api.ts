import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { FeeItem, TransactionItem } from "./types";

export const getFees = async (): Promise<FeeItem[]> => {
  return apiClient(\\/fees\);
};

export const createFee = async (data: FeeItem) => {
  return apiClient(\\/fees\, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getTransactions = async (): Promise<TransactionItem[]> => {
  return apiClient(\\/transactions\);
};
