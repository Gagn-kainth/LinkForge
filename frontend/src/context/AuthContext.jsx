import { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  signup as apiSignup,
  fetchMe,
  getToken,
  setToken,
  clearToken,
} from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("checking"); 

  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      if (!token) {
        setStatus("ready");
        return;
      }
      try {
        const data = await fetchMe();
        setUser(data.user);
      } catch {
        clearToken();
      } finally {
        setStatus("ready");
      }
    }
    restoreSession();
  }, []);

  async function login(email, password) {
    const data = await apiLogin(email, password);
    setToken(data.token);
    setUser(data.user);
  }

  async function signup(email, password) {
    const data = await apiSignup(email, password);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  const value = { user, status, login, signup, logout, isLoggedIn: Boolean(user) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
