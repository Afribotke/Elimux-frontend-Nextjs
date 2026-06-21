"use client";

import { useEffect, useState } from "react";

export default function useAdminCountries() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/countries");
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, loading, refresh: fetchCountries };
}

