"use client";

import { useState } from "react";
import { apiRegister } from "@/lib/auth/auth-client";

export const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    await apiRegister(form);
    alert("Account created!");
  };

  return (
    <div className="border p-6 rounded-lg shadow-md w-80 bg-white">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </div>
  );
};
