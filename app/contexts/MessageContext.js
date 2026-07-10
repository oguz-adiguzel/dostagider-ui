"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { socket } from "../lib/socket";
import { useUser } from "./UserContext";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const { user } = useUser();

  // 🔹 pathname ref güncelle
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!user?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", user._id);

    const handleNewMessage = (message) => {
      console.log("🔔 newMessage alındı", message);

      if (!pathnameRef.current.includes("/mesajlar")) {
        setUnreadCount((prev) => prev + 1);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [user?._id]);

  // 🔹 Mesajlar sayfasına girince reset
  useEffect(() => {
    if (pathname.includes("/mesajlar")) {
      setUnreadCount(0);
    }
  }, [pathname]);

  return (
    <MessageContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
