"use client";

import { useUser } from "@/app/contexts/UserContext";
import api from "@/app/lib/axios";
import { socket } from "@/app/lib/socket";
import { useEffect, useState, useRef, useMemo } from "react";
import { FiExternalLink } from "react-icons/fi";

export default function MessagePanel({ conversation }) {
  const conversationId = conversation?._id;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const { user } = useUser();
  const currentUserId = user?._id;

  // 🔹 İlan sahibi mi?
  const listingOwnerId =
    conversation?.listing?.user?._id || conversation?.listing?.user;

  const isListingOwner = listingOwnerId?.toString() === currentUserId;

  // 🔹 Karşı taraf
  const otherParticipant = useMemo(() => {
    return conversation?.participants?.find(
      (p) => p.user?._id !== currentUserId
    );
  }, [conversation, currentUserId]);

  // 🔹 Karşı taraf ismi
  const otherName = useMemo(() => {
    if (!otherParticipant) return "Kullanıcı";

    if (otherParticipant.userModel === "CorporateUser") {
      return otherParticipant.user?.galeriAdi || "Kurumsal";
    }

    if (otherParticipant.userModel === "User") {
      const { isim, soyisim } = otherParticipant.user || {};
      return `${isim ?? ""} ${soyisim ?? ""}`.trim() || "Kullanıcı";
    }

    return "Kullanıcı";
  }, [otherParticipant]);

  // 📥 Mesajları çek
  useEffect(() => {
    if (!conversationId) return;

    api.get(`/messages/${conversationId}`).then((res) => {
      setMessages(res.data);
    });
  }, [conversationId]);

  // 🔽 Otomatik scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId]);

  // 📤 Mesaj gönder
  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await api.post("/messages", {
      conversationId,
      content: text,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Bir sohbet seç
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* 🔷 HEADER */}
      <div className="border-b bg-white px-6 py-4 flex items-center gap-4">
        {/* SOL GÖRSEL */}
        {isListingOwner ? (
          <div
            className="w-10 h-10 rounded-full bg-blue-500 text-white
            flex items-center justify-center font-semibold"
          >
            {otherName?.[0]}
          </div>
        ) : (
          <img
            src={conversation.listing?.gorseller?.[0]}
            alt={conversation.listing?.baslik}
            className="w-10 h-10 rounded-lg object-cover"
          />
        )}

        {/* METİN */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">
            {isListingOwner ? otherName : conversation.listing?.baslik}
          </div>

          <div className="text-sm text-gray-500 truncate">
            {isListingOwner ? conversation.listing?.baslik : otherName}
          </div>
        </div>
        {/* 👉 İLANI GÖR */}
        {conversation?.listing?._id && (
          <a
            href={`/ilan/${conversation.listing.ilanNo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
      ml-auto
      flex items-center gap-1
      text-sm font-medium text-orange-600
      border border-orange-600 px-3 py-1.5
      rounded-lg hover:bg-orange-50 transition
    "
          >
            <FiExternalLink size={16} />
            İlanı Gör
          </a>
        )}
      </div>

      {/* MESAJLAR */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const senderId = msg.sender?._id || msg.sender;
          const isMine = senderId === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[70%] px-4 py-2 text-sm 
                  rounded-xl 
                  relative
                  break-words
                  ${
                    isMine
                      ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow rounded-bl-none"
                  }
                `}
              >
                {msg.content}
                <span
                  className={`absolute bottom-0 ${
                    isMine ? "-right-1" : "-left-1"
                  } w-2 h-2 bg-inherit transform rotate-45`}
                  style={{ backgroundColor: isMine ? undefined : "white" }}
                ></span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* MESAJ GİRİŞ */}
      <div className="border-t p-3 bg-white flex items-center gap-3 shadow-inner">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Mesaj yaz..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400"
        />
        <button
          onClick={sendMessage}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md transition-all transform hover:scale-105"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
