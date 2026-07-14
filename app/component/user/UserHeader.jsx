// "use client";
// import api from "@/app/lib/axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import React, { use, useEffect, useState } from "react";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { useUser } from "@/app/contexts/UserContext";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { CiRead } from "react-icons/ci";
// // import { socket } from "@/app/lib/socket";
// import { socket } from "../../lib/socket";

// import { toast, ToastContainer } from "react-toastify";
// import { Button } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { TiDeleteOutline } from "react-icons/ti";

// const UserHeader = () => {
//   const router = useRouter();
//   const { user, setUser } = useUser();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const [newNotification, setNewNotification] = useState(false);
//   const [notificationCount, setNotificationCount] = useState();
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const [anchorElNot, setAnchorElNot] = useState(null);
//   const openNot = Boolean(anchorElNot);
//   const handleClickNot = (event) => {
//     setAnchorElNot(event.currentTarget);
//     setNewNotification(false);
//   };
//   const handleCloseNot = () => {
//     setAnchorElNot(null);
//   };

//   const [notifications, setNotifications] = useState();

//   const getUserInfo = async () => {
//     async function fetchUser() {
//       try {
//         const token = Cookies.get("accessToken");
//         if (token) {
//           const res = await api.get("/users/user-info");
//           setUser(res.data.user);
//         }
//       } catch (error) {
//         console.log("user error header", error);
//       }
//     }

//     fetchUser();
//   };

//   const getNotifications = async () => {
//     try {
//       const res = await api.get("/bildirim/user-notification");
//       setNotifications(res.data.notifications);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const readNotifications = async (id) => {
//     try {
//       const res = await api.put(`/bildirim/${id}/read`);
//       getNotifications();
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const deleteNotificationsAll = async () => {
//     try {
//       const res = await api.delete("/bildirim/delete-all");
//       getNotifications();
//       toast.info(res.data.message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         // transition: Bounce,
//       });
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       const res = await api.delete(`/bildirim/delete/${id}`);
//       getNotifications();
//       toast.info(res.data.message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         // transition: Bounce,
//       });
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       router.push("/login");
//     } else {
//       getUserInfo();
//     }
//   }, [router]);

//   useEffect(() => {
//     const handleNotification = (notification) => {
//       console.log("gelen bildirim soket", notification);

//       setNotifications((prev) => [notification, ...prev]);

//       // toast.success(notification.title);
//       setNewNotification(true);
//     };

//     socket.on("newNotification", handleNotification);

//     // cleanup
//     return () => {
//       socket.off("newNotification", handleNotification);
//     };
//   }, []);

//   useEffect(() => {
//     if (user) getNotifications();
//   }, [user]);

//   useEffect(() => {
//     if (notifications) {
//       const filter = notifications.filter((item) => item.isRead === false);
//       setNotificationCount(filter.length);
//     }
//   }, [notifications]);

//   return (
//     <>
//       <ToastContainer />
//       <div className="w-full h-28 bg-[#050B20] text-white flex items-center justify-between px-10">
//         {user?.role === "bireysel" && (
//           <img className="w-60 cursor-pointer" src="/dostagider-logo.png" />
//         )}
//         {user?.role === "kurumsal" && (
//           <img className="w-60 cursor-pointer" src="/kurumsal-logo.svg" />
//         )}
//         <div className="flex items-center space-x-6">
//           <ul className="flex items-center space-x-6 text-white font-sans">
//             <li className="cursor-pointer hover:text-orange-400 duration-200">
//               <a href="/">Anasayfa</a>
//             </li>
//             <li className="cursor-pointer hover:text-orange-400 duration-200">
//               <a href="/hakkimizda">Hakkında</a>
//             </li>
//             <li className="cursor-pointer hover:text-orange-400 duration-200">
//               İletişim
//             </li>
//             <li className="cursor-pointer hover:text-orange-400 duration-200">
//               Kurumsal
//             </li>
//           </ul>
//           <div
//             id="basic-button"
//             aria-controls={open ? "basic-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             onClick={handleClick}
//           >
//             {user?.role === "kurumsal" ? (
//               <p className="text-orange-400 uppercase cursor-pointer font-bold">
//                 {user?.galeriAdi}
//               </p>
//             ) : (
//               <p className="text-orange-400 uppercase cursor-pointer font-bold">
//                 {user?.isim} {user?.soyisim}
//               </p>
//             )}

//             {user?.role === "bireysel" ? (
//               <p className="text-center text-xs text-orange-300">
//                 Bireysel Üye
//               </p>
//             ) : (
//               <p className="text-center text-xs text-orange-300">
//                 Kurumsal Üye
//               </p>
//             )}
//           </div>

//           <Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             slotProps={{
//               list: {
//                 "aria-labelledby": "basic-button",
//               },
//             }}
//           >
//             <MenuItem onClick={handleClose}>
//               <p>
//                 {user?.isim} {user?.soyisim}
//               </p>
//             </MenuItem>
//             <MenuItem onClick={handleClose}>My account</MenuItem>
//             <MenuItem onClick={handleClose}>Çıkış Yap</MenuItem>
//           </Menu>
//           <button
//             onClick={() => router.push("/user/ilan-ekle")}
//             className="px-10 py-2 bg-orange-400 text-white text-sm rounded-full hover:bg-orange-300 duration-300 cursor-pointer"
//           >
//             İlan Ver
//           </button>
//           <div
//             onClick={handleClickNot}
//             className="w-10 h-10 bg-orange-100 flex items-center justify-center rounded-full text-orange-400 cursor-pointer"
//           >
//             <IoIosNotificationsOutline size={30} />
//           </div>
//           <div className="relative">
//             {notificationCount > 0 && (
//               <div className="w-5 h-5 rounded-full bg-red-400 absolute -left-9 -top-6 flex items-center justify-center">
//                 <p className="text-xs">{notificationCount}</p>
//               </div>
//             )}
//             <Menu
//               // id={menuId}
//               anchorEl={anchorElNot}
//               open={openNot}
//               onClose={handleCloseNot}
//               PaperProps={{
//                 style: {
//                   width: 600,
//                 },
//               }}
//             >
//               <div className="flex items-center justify-between px-5 pt-4 pb-2">
//                 <div>
//                   <p className="text-lg font-bold text-gray-800">Bildirimler</p>

//                   <p className="text-xs text-gray-500">
//                     Tüm sistem bildirimlerin
//                   </p>
//                 </div>

//                 <Button
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   startIcon={<MdDelete />}
//                   onClick={() => deleteNotificationsAll()}
//                 >
//                   Bildirimleri Temizle
//                 </Button>
//               </div>
//               {notifications?.map((item, index) => (
//                 <MenuItem key={index}>
//                   <div
//                     className={`w-full flex items-center justify-between border py-4 px-3 ${item.isRead ? "border-green-300 bg-green-50 text-green-500" : "border-blue-300 bg-blue-50 text-blue-500"}  rounded-lg `}
//                   >
//                     <div className="flex flex-col space-y-1">
//                       <p className="font-semibold text-sm">{item.title}</p>
//                       <p className="font-sans text-xs">{item.message}</p>
//                       {
//                         (item.metadata) && <div className="flex items-center space-x-3">
//                           <p className="text-sm text-red-400">Eski Fiyat : {item.metadata.oldPrice} TL</p>
//                           <p className="text-sm">Yeni Fiyat : {item.metadata.newPrice} TL</p>
//                         </div>
//                       }
//                       <p className="text-xs text-gray-500">
//                         {" "}
//                         {new Date(item.updatedAt).toLocaleDateString("tr-TR", {
//                           day: "numeric",
//                           month: "long",
//                           year: "numeric",
//                           hour: "numeric",
//                           minute: "numeric",
//                           second: "numeric",
//                         })}
//                       </p>
//                       {item.type === ("favorite_price_drop" && "listing") && (
//                         <a
//                           className="text-sm text-gray-600"
//                           target="_blanck"
//                           href={`${item.link}`}
//                         >
//                           İlana Git
//                         </a>
//                       )}
//                       {item.type === "admin" && (
//                         <p className="text-xs text-gray-500">
//                           Admin Tarafından Gönderilmiştir
//                         </p>
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <CiRead
//                         onClick={() => readNotifications(item._id)}
//                         size={24}
//                       />
//                       <TiDeleteOutline
//                         onClick={() => deleteNotification(item._id)}
//                         size={24}
//                       />
//                     </div>
//                   </div>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserHeader;

"use client";
import api from "@/app/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useUser } from "@/app/contexts/UserContext";
import { IoIosNotificationsOutline, IoIosMenu, IoIosClose, IoIosMore } from "react-icons/io";
import { CiRead } from "react-icons/ci";
import { socket } from "../../lib/socket";

import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

const UserHeader = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [newNotification, setNewNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState();

  // Mobil sağ menünün açık/kapalı durumu
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElNot, setAnchorElNot] = useState(null);
  const openNot = Boolean(anchorElNot);
  const handleClickNot = (event) => {
    setAnchorElNot(event.currentTarget);
    setNewNotification(false);
  };
  const handleCloseNot = () => {
    setAnchorElNot(null);
  };

  const [notifications, setNotifications] = useState();

  const getUserInfo = async () => {
    async function fetchUser() {
      try {
        const token = Cookies.get("accessToken");
        if (token) {
          const res = await api.get("/users/user-info");
          setUser(res.data.user);
        }
      } catch (error) {
        console.log("user error header", error);
      }
    }
    fetchUser();
  };

  const getNotifications = async () => {
    try {
      const res = await api.get("/bildirim/user-notification");
      setNotifications(res.data.notifications);
    } catch (error) {
      console.log("error", error);
    }
  };

  const readNotifications = async (id) => {
    try {
      const res = await api.put(`/bildirim/${id}/read`);
      getNotifications();
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteNotificationsAll = async () => {
    try {
      const res = await api.delete("/bildirim/delete-all");
      getNotifications();
      toast.info(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const res = await api.delete(`/bildirim/delete/${id}`);
      getNotifications();
      toast.info(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      getUserInfo();
    }
  }, [router]);

  useEffect(() => {
    const handleNotification = (notification) => {
      console.log("gelen bildirim soket", notification);
      setNotifications((prev) => [notification, ...prev]);
      setNewNotification(true);
    };

    socket.on("newNotification", handleNotification);

    return () => {
      socket.off("newNotification", handleNotification);
    };
  }, []);

  useEffect(() => {
    if (user) getNotifications();
  }, [user]);

  useEffect(() => {
    if (notifications) {
      const filter = notifications.filter((item) => item.isRead === false);
      setNotificationCount(filter.length);
    }
  }, [notifications]);

  return (
    <>
      <ToastContainer />

      {/* ========================================== */}
      {/* 1. PC HEADER (%100 ORİJİNAL KOD VE CSS ALANI) */}
      {/* ========================================== */}
      <div className="hidden lg:flex w-full h-28 bg-[#050B20] text-white items-center justify-between px-10">
        {user?.role === "bireysel" && (
          <img className="w-60 cursor-pointer" src="/dostagider-logo.png" alt="Logo" />
        )}
        {user?.role === "kurumsal" && (
          <img className="w-60 cursor-pointer" src="/kurumsal-logo.svg" alt="Logo" />
        )}
        <div className="flex items-center space-x-6">
          <ul className="flex items-center space-x-6 text-white font-sans">
            <li className="cursor-pointer hover:text-orange-400 duration-200">
              <a href="/">Anasayfa</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400 duration-200">
              <a href="/hakkimizda">Hakkında</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400 duration-200">
              İletişim
            </li>
            <li className="cursor-pointer hover:text-orange-400 duration-200">
              Kurumsal
            </li>
          </ul>
          <div
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="cursor-pointer"
          >
            {user?.role === "kurumsal" ? (
              <p className="text-orange-400 uppercase cursor-pointer font-bold">
                {user?.galeriAdi}
              </p>
            ) : (
              <p className="text-orange-400 uppercase cursor-pointer font-bold">
                {user?.isim} {user?.soyisim}
              </p>
            )}

            {user?.role === "bireysel" ? (
              <p className="text-center text-xs text-orange-300">
                Bireysel Üye
              </p>
            ) : (
              <p className="text-center text-xs text-orange-300">
                Kurumsal Üye
              </p>
            )}
          </div>

          <button
            onClick={() => router.push("/user/ilan-ekle")}
            className="px-10 py-2 bg-orange-400 text-white text-sm rounded-full hover:bg-orange-300 duration-300 cursor-pointer"
          >
            İlan Ver
          </button>
          
          <div
            onClick={handleClickNot}
            className="w-10 h-10 bg-orange-100 flex items-center justify-center rounded-full text-orange-400 cursor-pointer"
          >
            <IoIosNotificationsOutline size={30} />
          </div>
          
          <div className="relative">
            {notificationCount > 0 && (
              <div className="w-5 h-5 rounded-full bg-red-400 absolute -left-9 -top-6 flex items-center justify-center">
                <p className="text-xs">{notificationCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ========================================== */}
      {/* 2. MOBİL HEADER (ÇİFT HAMBURGER + ORTALI LOGO) */}
      {/* ========================================== */}
      <div className="flex lg:hidden w-full h-20 bg-[#050B20] text-white items-center justify-between px-4 relative">
        
        {/* Sol: Sidebar Hamburger Butonu */}
        <div className="flex items-center z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white text-3xl focus:outline-none p-1.5 hover:bg-slate-800 rounded transition-colors"
          >
            {isSidebarOpen ? <IoIosClose /> : <IoIosMenu />}
          </button>
        </div>

        {/* Orta: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {user?.role === "bireysel" && (
            <img className="w-36 cursor-pointer object-contain" src="/dostagider-logo.png" alt="Logo" />
          )}
          {user?.role === "kurumsal" && (
            <img className="w-36 cursor-pointer object-contain" src="/kurumsal-logo.svg" alt="Logo" />
          )}
        </div>

        {/* Sağ: Mobil Sağ Menü Hamburger Butonu */}
        <div className="flex items-center z-10">
          <button
            onClick={() => setIsRightMenuOpen(!isRightMenuOpen)}
            className="text-white text-3xl focus:outline-none p-1.5 hover:bg-slate-800 rounded transition-colors"
          >
            {isRightMenuOpen ? <IoIosClose /> : <IoIosMore />}
          </button>
        </div>

      </div>

      {/* Mobil Sağ Menü İçeriği */}
      {isRightMenuOpen && (
        <div className="lg:hidden w-full bg-[#0b122c] border-t border-slate-800 text-white flex flex-col items-center py-6 px-6 space-y-5">
          <ul className="flex flex-col items-center space-y-4 font-sans w-full text-center">
            <li className="cursor-pointer hover:text-orange-400 duration-200 py-1 w-full border-b border-slate-800/50">
              <a href="/">Anasayfa</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400 duration-200 py-1 w-full border-b border-slate-800/50">
              <a href="/hakkimizda">Hakkında</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400 duration-200 py-1 w-full border-b border-slate-800/50">İletişim</li>
            <li className="cursor-pointer hover:text-orange-400 duration-200 py-1 w-full border-b border-slate-800/50">Kurumsal</li>
          </ul>

          {/* Profil */}
          <div
            className="cursor-pointer select-none text-center bg-[#1e2437] py-3 px-6 rounded-xl w-full max-w-[280px]"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {user?.role === "kurumsal" ? (
              <p className="text-orange-400 uppercase font-bold text-sm truncate">
                {user?.galeriAdi}
              </p>
            ) : (
              <p className="text-orange-400 uppercase font-bold text-sm truncate">
                {user?.isim} {user?.soyisim}
              </p>
            )}
            <p className="text-xs text-orange-300 mt-0.5">
              {user?.role === "kurumsal" ? "Kurumsal Üye" : "Bireysel Üye"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 w-full max-w-[280px]">
            {/* İlan Ver Butonu */}
            <button
              onClick={() => {
                setIsRightMenuOpen(false);
                router.push("/user/ilan-ekle");
              }}
              className="flex-1 py-3 bg-orange-400 text-white text-sm font-semibold rounded-full hover:bg-orange-300 transition-colors text-center"
            >
              İlan Ver
            </button>

            {/* Bildirim Butonu */}
            <div className="relative">
              <div
                onClick={(e) => {
                  handleClickNot(e);
                }}
                className="w-11 h-11 bg-orange-100 flex items-center justify-center rounded-full text-orange-400 cursor-pointer"
              >
                <IoIosNotificationsOutline size={26} />
              </div>
              {notificationCount > 0 && (
                <div className="w-5 h-5 rounded-full bg-red-400 absolute -right-1 -top-1 flex items-center justify-center border-2 border-[#0b122c]">
                  <p className="text-[10px] font-bold text-white">{notificationCount}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MUI Menü Modalları (PC ve Mobil Ortak Kullanır) */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <p className="text-sm font-semibold">
            {user?.isim} {user?.soyisim}
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose}>Hesabım</MenuItem>
        <MenuItem onClick={handleClose}>Çıkış Yap</MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorElNot}
        open={openNot}
        onClose={handleCloseNot}
        PaperProps={{
          style: {
            width: '90vw',
            maxWidth: 600,
          },
        }}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-2">
          <div>
            <p className="text-base lg:text-lg font-bold text-gray-800">Bildirimler</p>
            <p className="text-xs text-gray-500">Tüm sistem bildirimlerin</p>
          </div>

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<MdDelete />}
            onClick={() => deleteNotificationsAll()}
            className="text-xs"
          >
            Temizle
          </Button>
        </div>

        {notifications?.map((item, index) => (
          <MenuItem key={index} className="whitespace-normal">
            <div
              className={`w-full flex flex-col sm:flex-row sm:items-center justify-between border gap-2 py-3 px-3 ${item.isRead ? "border-green-300 bg-green-50 text-green-500" : "border-blue-300 bg-blue-50 text-blue-500"} rounded-lg `}
            >
              <div className="flex flex-col space-y-1 max-w-[85%]">
                <p className="font-semibold text-xs lg:text-sm">{item.title}</p>
                <p className="font-sans text-[11px] lg:text-xs">{item.message}</p>
                {item.metadata && (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs text-red-400">Eski Fiyat : {item.metadata.oldPrice} TL</p>
                    <p className="text-xs">Yeni Fiyat : {item.metadata.newPrice} TL</p>
                  </div>
                )}
                <p className="text-[10px] text-gray-500">
                  {new Date(item.updatedAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </p>
                {item.type === ("favorite_price_drop" && "listing") && (
                  <a
                    className="text-xs text-gray-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${item.link}`}
                  >
                    İlana Git
                  </a>
                )}
                {item.type === "admin" && (
                  <p className="text-[10px] text-gray-500">Admin Tarafından Gönderilmiştir</p>
                )}
              </div>
              <div className="flex items-center space-x-2 self-end sm:self-center">
                <CiRead
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => readNotifications(item._id)}
                  size={24}
                />
                <TiDeleteOutline
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => deleteNotification(item._id)}
                  size={24}
                />
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserHeader;