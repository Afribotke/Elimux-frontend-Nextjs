"use client";

import { useEffect, useState } from "react";

export default function useAdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, loading, refresh: fetchLogs };
}

