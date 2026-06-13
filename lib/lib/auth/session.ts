export const saveSession = (token: string) => {
  localStorage.setItem("elimux_token", token);
};

export const getSession = () => {
  return localStorage.getItem("elimux_token");
};

export const clearSession = () => {
  localStorage.removeItem("elimux_token");
};
