// "use client";
// import React from "react";
// import { FaRegBookmark, FaRegUser, FaUsers } from "react-icons/fa";
// import { RiHome6Line, RiLockPasswordLine } from "react-icons/ri";
// import { FaRegRectangleList } from "react-icons/fa6";
// import { MdOutlineAccountBalance, MdOutlineMessage } from "react-icons/md";
// import { LuFileChartColumn, LuUsers } from "react-icons/lu";
// import { BiLogOut } from "react-icons/bi";
// import { usePathname, useRouter } from "next/navigation";
// import api from "@/app/lib/axios";
// import Cookies from "js-cookie";
// import { useUser } from "@/app/contexts/UserContext";
// import { useMessages } from "@/app/contexts/MessageContext";
// import Link from "next/link";

// const UserSideBar = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const isUserPage = pathname.includes("/user");

//   const { unreadCount } = useMessages();

//   const { user, fetchUser } = useUser();

//   const logOut = async () => {
//     try {
//       const res = await api.post("/users/logout");
//       Cookies.remove("accessToken");
//       fetchUser();
//       router.push("/");
//     } catch (error) {
//       console.log("logout error");
//     }
//   };

//   return (
//     <div className="">
//       <ul className="text-white flex flex-col items-center space-y-2">
//         <Link
//           href="/user/dashboard"
//           className={`flex items-center space-x-2 font-sans w-3/4  pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600 ${
//             pathname.includes("/dashboard") ? "bg-gray-600" : "bg-[#1E2437]"
//           }`}
//         >
//           <RiHome6Line color="white" size={23} />
//           <p className="mt-1">Dashboard</p>
//         </Link>
//         {user?.role === "kurumsal" && (
//           <Link
//             href="/user/galeri-yonetimi"
//             className={`flex items-center space-x-2 font-sans w-3/4  pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600 ${
//               pathname.includes("/galeri-yonetimi")
//                 ? "bg-gray-600"
//                 : "bg-[#1E2437]"
//             }`}
//           >
//             <MdOutlineAccountBalance color="white" size={23} />
//             <p className="mt-1">Galeri Yönetimi</p>
//           </Link>
//         )}
//         <Link
//           href="/user/my-profile"
//           className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600 ${
//             pathname.includes("/my-profile") ? "bg-gray-600" : "bg-[#1E2437]"
//           }`}
//         >
//           <FaRegUser color="white" size={23} />
//           <p className="mt-1">Profilim</p>
//         </Link>
//         {user?.role === "kurumsal" && (
//           <Link
//             href="/user/my-team"
//             className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600 ${
//               pathname.includes("/my-team") ? "bg-gray-600" : "bg-[#1E2437]"
//             }`}
//           >
//             <LuUsers color="white" size={26} />
//             <p className="mt-1">Ekibini Yönet</p>
//           </Link>
//         )}
//         <Link
//         // onClick={()=> router.push('/user/ilan-ekle?isEV=true')}
//           href="/user/ilan-ekle?isEV=true"
//           className={`flex items-center space-x-2 font-sans w-3/4 ${
//             pathname.includes("/ilan-ekle?isEV=true")
//               ? "bg-gray-600"
//               : "bg-[#1E2437]"
//           } pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600`}
//         >
//           <FaRegRectangleList color="white" size={23} />
//           <p className="mt-1">EV Araç İlan Ekle</p>
//         </Link>
//         <Link
//           href="/user/my-listing"
//           className={`flex items-center space-x-2 font-sans w-3/4 ${
//             pathname.includes("/my-listing") ? "bg-gray-600" : "bg-[#1E2437]"
//           } pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600`}
//         >
//           <FaRegRectangleList color="white" size={23} />
//           <p className="mt-1">İlanlarım</p>
//         </Link>
//         <Link
//           href="/user/my-favorite"
//           className={`flex items-center space-x-2 font-sans w-3/4 ${
//             pathname.includes("/my-favorite") ? "bg-gray-600" : "bg-[#1E2437]"
//           } pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600`}
//         >
//           <FaRegBookmark color="white" size={23} />
//           <p className="mt-1">Favori İlanlarım</p>
//         </Link>
//         <Link
//           href="/user/mesajlar"
//           className={`relative flex items-center space-x-2 font-sans w-3/4
//   ${pathname.includes("/messages") ? "bg-gray-600" : "bg-[#1E2437]"}
//   pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600`}
//         >
//           <div className="relative">
//             <MdOutlineMessage color="white" size={23} />

//             {unreadCount > 0 && (
//               <span
//                 className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
//         bg-red-500 text-white text-[10px] font-semibold
//         rounded-full flex items-center justify-center
//         ring-2 ring-[#1E2437]"
//               >
//                 {unreadCount}
//               </span>
//             )}
//           </div>

//           <p className="mt-1">Mesajlarım</p>
//         </Link>
//         <Link
//           href="/user/paketler"
//           className={`flex items-center space-x-2 font-sans w-3/4 ${
//             pathname.includes("/paketler") ? "bg-gray-600" : "bg-[#1E2437]"
//           } pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600`}
//         >
//           <LuFileChartColumn color="white" size={23} />
//           <p className="mt-1">Paketler</p>
//         </Link>
//         <Link
//           href="/user/password"
//           className={`flex items-center space-x-2 font-sans w-3/4 ${
//             pathname.includes("/password") ? "bg-gray-600" : "bg-[#1E2437]"
//           } pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600`}
//         >
//           <RiLockPasswordLine color="white" size={23} />
//           <p className="mt-1">Parola Değiştir</p>
//         </Link>
//         <li
//           onClick={() => logOut()}
//           className="flex items-center space-x-2 font-sans w-3/4 bg-[#1E2437] pl-10 py-4 rounded-2xl cursor-pointer hover:bg-gray-600"
//         >
//           <BiLogOut color="white" size={23} />
//           <p className="mt-1">Çıkış Yap</p>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default UserSideBar;

"use client";
import React from "react";
import { FaRegBookmark, FaRegUser, FaUsers } from "react-icons/fa";
import { RiHome6Line, RiLockPasswordLine } from "react-icons/ri";
import { FaRegRectangleList } from "react-icons/fa6";
import { MdOutlineAccountBalance, MdOutlineMessage } from "react-icons/md";
import { LuFileChartColumn, LuUsers } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import Cookies from "js-cookie";
import { useUser } from "@/app/contexts/UserContext";
import { useMessages } from "@/app/contexts/MessageContext";
import Link from "next/link";

const UserSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isUserPage = pathname.includes("/user");

  const { unreadCount } = useMessages();
  const { user, fetchUser } = useUser();

  const logOut = async () => {
    try {
      const res = await api.post("/users/logout");
      Cookies.remove("accessToken");
      fetchUser();
      router.push("/");
    } catch (error) {
      console.log("logout error");
    }
  };

  return (
    // Mobilde sidebar açıldığında üstten ve alttan taşmaları önlemek için py-6 ekledik h-screen ile uyumlu hale getirdik.
    <div className="py-6 h-full flex flex-col justify-between">
      <div>
        {/* Mobil görünümde menünün üstünde küçük bir logo / başlık alanı (PC'de zaten header'da var diye gizli) */}
        <div className="px-8 pb-3 block lg:hidden border-b border-gray-800 mb-4">
          {user?.role === "kurumsal" && (
            <img className="w-40 sm:w-48 lg:w-60 cursor-pointer object-contain" src="/kurumsal-logo.svg" alt="Logo" />
          )}
          {user?.role === "bireysel" && (
            <img className="w-40 sm:w-48 lg:w-60 cursor-pointer object-contain" src="/dostagider-logo.png" alt="Logo" />
          )}
        </div>

        <ul className="text-white flex flex-col items-center space-y-2">
          <Link
            href="/user/dashboard"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/dashboard") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <RiHome6Line color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">Dashboard</p>
          </Link>

          {user?.role === "kurumsal" && (
            <Link
              href="/user/galeri-yonetimi"
              className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
                pathname.includes("/galeri-yonetimi")
                  ? "bg-gray-600"
                  : "bg-[#1E2437]"
              }`}
            >
              <MdOutlineAccountBalance color="white" size={23} className="shrink-0" />
              <p className="mt-1 truncate">Galeri Yönetimi</p>
            </Link>
          )}

          <Link
            href="/user/my-profile"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/my-profile") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <FaRegUser color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">Profilim</p>
          </Link>

          {user?.role === "kurumsal" && (
            <Link
              href="/user/my-team"
              className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
                pathname.includes("/my-team") ? "bg-gray-600" : "bg-[#1E2437]"
              }`}
            >
              <LuUsers color="white" size={26} className="shrink-0" />
              <p className="mt-1 truncate">Ekibini Yönet</p>
            </Link>
          )}

          <Link
            href="/user/ilan-ekle?isEV=true"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/ilan-ekle?isEV=true")
                ? "bg-gray-600"
                : "bg-[#1E2437]"
            }`}
          >
            <FaRegRectangleList color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">EV Araç İlan Ekle</p>
          </Link>

          <Link
            href="/user/my-listing"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/my-listing") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <FaRegRectangleList color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">İlanlarım</p>
          </Link>

          <Link
            href="/user/my-favorite"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/my-favorite") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <FaRegBookmark color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">Favori İlanlarım</p>
          </Link>

          <Link
            href="/user/mesajlar"
            className={`relative flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/messages") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <div className="relative shrink-0">
              <MdOutlineMessage color="white" size={23} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center ring-2 ring-[#1E2437]">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="mt-1 truncate">Mesajlarım</p>
          </Link>

          <Link
            href="/user/paketler"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/paketler") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <LuFileChartColumn color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">Paketler</p>
          </Link>

          <Link
            href="/user/password"
            className={`flex items-center space-x-2 font-sans w-3/4 pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600 ${
              pathname.includes("/password") ? "bg-gray-600" : "bg-[#1E2437]"
            }`}
          >
            <RiLockPasswordLine color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">Parola Değiştir</p>
          </Link>

          <li
            onClick={() => logOut()}
            className="flex items-center space-x-2 font-sans w-3/4 bg-[#1E2437] pl-10 py-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-600"
          >
            <BiLogOut color="white" size={23} className="shrink-0" />
            <p className="mt-1 truncate">Çıkış Yap</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSideBar;