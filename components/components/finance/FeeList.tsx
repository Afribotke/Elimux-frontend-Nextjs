import { getFees } from "@/lib/finance/api";

export const FeeList = async () => {
  const fees = await getFees();

  return (
    <div className="space-y-3">
      {fees.map((f) => (
        <div key={f.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{f.title}</p>
          <p className="text-sm text-gray-600">Amount: KES {f.amount}</p>
        </div>
      ))}
    </div>
  );
};
