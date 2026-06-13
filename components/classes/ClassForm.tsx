"use client";

import { useState } from "react";
import { createClass } from "@/lib/classes/api";

export const ClassForm = () => {
  const [form, setForm] = useState({
    name: "",
    teacher: "",
  });

  const submit = async () => {
    await createClass(form);
    alert("Class created!");
  };

  return (
    <div className="p-6 bg-white rounded shadow w-96">
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Class Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Teacher"
        onChange={(e) => setForm({ ...form, teacher: e.target.value })}
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
