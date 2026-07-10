"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../lib/axios";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        setUser(null);
        return;
      }

      const res = await api.get("/users/user-info");
      setUser(res.data.user);
    } catch (error) {
      console.log("fetchUser error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // İlk mount olduğunda otomatik user çek
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser, // 👈 EN KRİTİK KISIM
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
