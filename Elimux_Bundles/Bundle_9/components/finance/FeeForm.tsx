"use client";

import { useState } from "react";
import { createFee } from "@/lib/finance/api";

export const FeeForm = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
  });

  const submit = async () => {
    await createFee({ ...form, amount: Number(form.amount) });
    alert("Fee created!");
  };

  return (
    <div className="p-6 bg-white rounded shadow w-96">
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Fee Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Amount (KES)"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};
