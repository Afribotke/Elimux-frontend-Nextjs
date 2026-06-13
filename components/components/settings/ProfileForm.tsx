"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/settings/api";

export const ProfileForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const submit = async () => {
    await updateProfile(form);
    alert("Profile updated!");
  };

  return (
    <div className="p-6 bg-white rounded shadow w-96">
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

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};
