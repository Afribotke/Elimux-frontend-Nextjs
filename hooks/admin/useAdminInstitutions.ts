"use client";

import { useEffect, useState } from "react";

export default function useAdminInstitutions() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/institutions");
      const data = await res.json();
      setInstitutions(data);
    } catch (err) {
      console.error("Failed to fetch institutions:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return { institutions, loading, refresh: fetchInstitutions };
}

