import { FaCar, FaRegClock } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { useMemo } from "react";

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
}) {
  // 🔝 updatedAt’e göre sırala
  const sortedConversations = useMemo(() => {
    return [...conversations].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }, [conversations]);

  return (
    <div className="w-full lg:w-80 border-r flex flex-col bg-gray-50">
      {/* HEADER */}
      <div className="p-5 border-b font-bold text-lg text-gray-800 bg-white">
        Sohbetler
      </div>

      {/* LISTE */}
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.map((conv) => {
          const isSelected = selectedId === conv._id;
          const isUnread = conv.unreadCount > 0 && !isSelected;

          const listingOwnerId =
            conv.listing?.user?._id || conv.listing?.user;
          const isListingOwner =
            listingOwnerId?.toString() === currentUserId;

          const otherParticipant = conv.participants.find(
            (p) => p.user?._id !== currentUserId
          );

          let otherName = "Kullanıcı";
          if (otherParticipant) {
            if (otherParticipant.userModel === "CorporateUser") {
              otherName = otherParticipant.user?.galeriAdi;
            }
            if (otherParticipant.userModel === "User") {
              const { isim, soyisim } = otherParticipant.user || {};
              otherName = `${isim ?? ""} ${soyisim ?? ""}`.trim();
            }
          }

          return (
            <div
              key={conv._id}
              onClick={() => onSelect(conv._id)}
              className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all
                ${
                  isSelected
                    ? "bg-blue-50 border-l-4 border-blue-500 shadow-sm"
                    : isUnread
                    ? "bg-orange-50 hover:bg-orange-100"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {/* SOL GÖRSEL */}
              {isListingOwner ? (
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg shrink-0">
                  {otherName?.[0] || "?"}
                </div>
              ) : (
                <div className="relative shrink-0">
                  <img
                    src={conv.listing?.gorseller?.[0]}
                    alt={conv.listing?.baslik}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full border">
                    <FaCar className="w-3 h-3 text-gray-700" />
                  </div>
                </div>
              )}

              {/* METİN */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm truncate">
                    {isListingOwner
                      ? otherName
                      : conv.listing?.baslik}
                  </div>

                  <div className="flex items-center text-xs text-gray-400 gap-1">
                    <FaRegClock className="w-3 h-3" />
                    {new Date(conv.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div
                  className={`flex items-center text-xs truncate mt-1 gap-1
                    ${
                      isUnread
                        ? "font-semibold text-gray-900"
                        : "text-gray-500"
                    }
                  `}
                >
                  {conv.lastMessage?.content || "Yeni sohbet"}

                  {!isUnread && conv.lastMessage && (
                    <MdDoneAll className="w-3 h-3 text-blue-400" />
                  )}
                </div>
              </div>

              {/* 🔔 UNREAD BADGE */}
              {isUnread && (
                <span className="ml-2 min-w-[20px] h-5 px-1 text-xs bg-orange-500 text-white rounded-full flex items-center justify-center">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
