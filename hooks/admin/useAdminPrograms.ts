"use client";

import { useEffect, useState } from "react";

export default function useAdminPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/programs");
      const data = await res.json();
      setPrograms(data);
    } catch (err) {
      console.error("Failed to fetch programs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { programs, loading, refresh: fetchPrograms };
}

