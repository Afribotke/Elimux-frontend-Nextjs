export const apiClient = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(\API Error: \\);
  }

  return res.json();
};
