"use client";

import { useState } from "react";
import { apiLogin } from "@/lib/auth/auth-client";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await apiLogin({ email, password });
    alert("Logged in!");
  };

  return (
    <div className="border p-6 rounded-lg shadow-md w-80 bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full px-3 py-2 mb-3 rounded"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};
