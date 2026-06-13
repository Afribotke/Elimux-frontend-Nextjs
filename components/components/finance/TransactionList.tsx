import { getTransactions } from "@/lib/finance/api";

export const TransactionList = async () => {
  const txns = await getTransactions();

  return (
    <div className="space-y-3">
      {txns.map((t) => (
        <div key={t.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">KES {t.amount}</p>
          <p className="text-sm text-gray-600">Type: {t.type}</p>
          <p className="text-sm text-gray-600">Date: {t.date}</p>
        </div>
      ))}
    </div>
  );
};
