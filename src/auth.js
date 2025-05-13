// це фейкова перевірка (потім заміниш на перевірку токену)
export const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};
