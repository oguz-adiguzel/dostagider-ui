"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/app/lib/axios";
import ConversationList from "@/app/component/user/ConversationList";
import MessagePanel from "@/app/component/user/MessagePanel";
import { useUser } from "@/app/contexts/UserContext";
import { socket } from "@/app/lib/socket";
export const dynamic = 'force-dynamic';


export default function page() {
  const searchParams = useSearchParams();
  const initialConversationId = searchParams.get("c");

  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(initialConversationId);

   const { user } = useUser(); // user._id
     
    const currentUserId = user?._id;

    const selectedConversation = conversations.find(
  c => c._id === selectedId
);
  

  useEffect(() => {
    api.get("/conversations").then(res => {
      setConversations(res.data);
    });
  }, []);

//   useEffect(() => {
//   if (!currentUserId) return;

//   socket.connect();
//   socket.emit("join", currentUserId);

//   socket.on("conversationUpdated", updatedConversation => {
//     setConversations(prev => {
//       const exists = prev.find(c => c._id === updatedConversation._id);

//       let newList;

//       if (exists) {
//         // 🔁 Var olanı güncelle
//         newList = prev.map(c =>
//           c._id === updatedConversation._id ? updatedConversation : c
//         );
//       } else {
//         // ➕ Yeni conversation
//         newList = [updatedConversation, ...prev];
//       }

//       // 🔝 updatedAt'e göre sırala
//       return newList.sort(
//         (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//       );
//     });
//   });

//   return () => {
//     socket.off("conversationUpdated");
//     socket.disconnect();
//   };
// }, [currentUserId]);

useEffect(() => {
  if (!currentUserId) return;

  socket.connect();
  socket.emit("join", currentUserId);

  const handleConversationUpdated = (updatedConversation) => {
    setConversations(prev => {
      const exists = prev.find(c => c._id === updatedConversation._id);

      let newList;

      if (exists) {
        newList = prev.map(c =>
          c._id === updatedConversation._id
            ? {
                ...c,
                ...updatedConversation,
              }
            : c
        );
      } else {
        newList = [updatedConversation, ...prev];
      }

      return newList.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    });
  };

  socket.on("conversationUpdated", handleConversationUpdated);

  return () => {
    socket.off("conversationUpdated", handleConversationUpdated);
    // ❌ socket.disconnect YOK
  };
}, [currentUserId]);

  return (
     <div className="h-[calc(100vh-64px)] bg-gray-100 p-4">
    <div className="flex h-full bg-white rounded-xl shadow overflow-hidden">
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        currentUserId={currentUserId}
        onSelect={setSelectedId}
      />

      <MessagePanel conversationId={selectedId} conversation={selectedConversation} />
    </div>
  </div>
  );
}
