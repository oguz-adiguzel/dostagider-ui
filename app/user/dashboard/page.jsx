// "use client";
// import { useUser } from "@/app/contexts/UserContext";
// import api from "@/app/lib/axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { FaRegBookmark } from "react-icons/fa";
// import { LuView } from "react-icons/lu";
// import {
//   MdNoPhotography,
//   MdOutlineMessage,
//   MdOutlineUnpublished,
//   MdPublishedWithChanges,
// } from "react-icons/md";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const page = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const { user, setUser } = useUser();
//   const [dashboard, setDashboard] = useState();
//   const [hasFeaturedRequest, setHasFeaturedRequest] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       router.push("/login");
//     } else {
//       setLoading(false);
//       // getUserInfo();
//     }
//   }, [router]);

//   const getOverView = async () => {
//     try {
//       const response = await api.get("/dashboard/overview");
//       setDashboard(response.data.data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const checkFeatured = async () => {
//     if (user.role === "kurumsal") {
//       try {
//         const response = await api.get("/galleryFeatured/check");
//         setHasFeaturedRequest(response.data.hasFeaturedRequest);
//       } catch (error) {
//         console.log("error", error);
//       }
//     }
//   };

//   useEffect(() => {
//     getOverView();
//     checkFeatured();
//   }, [user]);

//   if (loading)
//     return (
//       <>
//         <div className="w-full grid grid-cols-3 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll pt-8 p-10">
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//         </div>
//         <div className="w-full grid grid-cols-4 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll px-10">
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//         </div>
//         <div className="w-full grid grid-cols-3 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll px-10">
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//           <Skeleton width={"100%"} height={150} />
//         </div>
//       </>
//     );

//   return (
//     <div className="w-full py-10 px-14 font-sans">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-semibold">Dashboard</h2>
//         {user?.role === "kurumsal" && (
//           <a
//             className="px-6 py-2 bg-orange-400 rounded-full text-sm text-white"
//             target="_blanck"
//             href={`/galeri/${user?.slug}`}
//           >
//             Sayfaya Git
//           </a>
//         )}
//       </div>
//       <div className="flex space-x-5 items-start">
//         {user?.role === "kurumsal" && (
//           <div className="w-1/3 p-5 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500 mt-10 ">
//             <div className="flex items-start space-x-3">
//               <div className="w-28 h-28 border border-gray-200 rounded-2xl flex justify-center items-center">
//                 {user?.logoUrl ? (
//                   <img
//                     className="w-full h-full object-contain"
//                     src={user?.logoUrl}
//                   />
//                 ) : (
//                   <MdNoPhotography size={40} color="gray" />
//                 )}
//               </div>
//               <div>
//                 <p className="text-lg font-semibold">{user?.galeriAdi}</p>
//                 <p className="font-semibold text-gray-600 mt-1 text-sm">
//                   Yetkili Adı
//                 </p>
//                 <p className="text-xs text-gray-400">{user?.yetkiliAdi}</p>
//                 <p className="font-semibold text-gray-600 mt-1 text-sm">
//                   Yetkili Soyadı
//                 </p>
//                 <p className="text-xs text-gray-400">{user?.yetkiliSoyadi}</p>
//               </div>
//             </div>
//           </div>
//         )}
//         {user?.role === "kurumsal" && (
//           <div className="w-1/5 p-5 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500 mt-10 ">
//             <p className="text-center font-semibold">Durum Bilgisi</p>
//             <div className="flex items-center space-x-1 mt-3 justify-center">
//               <div className="w-5 h-5 shadow-2xl bg-green-500 rounded-full animate-pulse"></div>
//               <p className="text-sm font-semibold text-green-400">
//                 Ödeme Alındı
//               </p>
//             </div>
//             <div className="flex items-center space-x-1 mt-3 justify-center">
//               <div className="w-5 h-5 shadow-2xl bg-green-500 rounded-full animate-pulse"></div>
//               <p className="text-sm font-semibold text-green-400">
//                 Admin Onaylı
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="w-full py-5 font-sans">
//         {/* LIMIT WARNING */}
//         {dashboard?.limits.limitFull && (
//           <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-6">
//             <p className="font-medium">
//               Aktif ilan limiti dolu. Yeni ilan ekleyebilmek için mevcut
//               ilanlardan birini yayından kaldırmalısınız.
//             </p>
//           </div>
//         )}

//         {/* STATISTIC CARDS */}
//         <div className="w-full grid grid-cols-4 gap-x-6 mt-10">
//           {/* Active Listings */}
//           <div className="border border-gray-300 rounded-2xl py-12 px-10">
//             <div className="flex items-center justify-between">
//               <div className="space-y-2">
//                 <p className="text-base">Yayımlanan</p>
//                 <p className="text-2xl font-semibold">
//                   {dashboard?.statistics?.totalActive}
//                 </p>
//               </div>
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
//                 <MdPublishedWithChanges size={34} color="blue" />
//               </div>
//             </div>
//           </div>

//           {/* Favorites */}
//           <div className="border border-gray-300 rounded-2xl py-12 px-10">
//             <div className="flex items-center justify-between">
//               <div className="space-y-2">
//                 <p className="text-base">Favoriler</p>
//                 <p className="text-2xl font-semibold">
//                   {dashboard?.statistics?.favorites}
//                 </p>
//               </div>
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
//                 <FaRegBookmark size={34} color="blue" />
//               </div>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="border border-gray-300 rounded-2xl py-12 px-10">
//             <div className="flex items-center justify-between">
//               <div className="space-y-2">
//                 <p className="text-base">Mesajlar</p>
//                 <p className="text-2xl font-semibold">
//                   {dashboard?.statistics?.messages}
//                 </p>
//               </div>
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
//                 <MdOutlineMessage size={34} color="blue" />
//               </div>
//             </div>
//           </div>

//           {/* Inactive Listings */}
//           <div className="border border-gray-300 rounded-2xl py-12 px-10">
//             <div className="flex items-center justify-between">
//               <div className="space-y-2">
//                 <p className="text-base">Yayında Olmayan</p>
//                 <p className="text-2xl font-semibold">
//                   {dashboard?.statistics?.totalInactive}
//                 </p>
//               </div>
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
//                 <MdOutlineUnpublished size={34} color="blue" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* LIMITS BOX */}
//         <div className="w-full grid grid-cols-3 gap-x-6 mt-10">
//           <div className="border border-gray-300 rounded-2xl py-8 px-10">
//             <p className="text-base">Maksimum Yayında İlan</p>
//             <p className="text-2xl font-semibold">
//               {dashboard?.limits?.maxLimit}
//             </p>
//           </div>

//           <div className="border border-gray-300 rounded-2xl py-8 px-10">
//             <p className="text-base">Şu Anda Yayında</p>
//             <p className="text-2xl font-semibold">
//               {dashboard?.limits?.activeCount}
//             </p>
//           </div>

//           <div className="border border-gray-300 rounded-2xl py-8 px-10">
//             <p className="text-base">Durum</p>
//             <p
//               className={`text-2xl font-semibold ${
//                 dashboard?.limits?.limitFull ? "text-red-500" : "text-green-600"
//               }`}
//             >
//               {dashboard?.limits?.limitFull ? "Limit Dolu" : "Uygun"}
//             </p>
//           </div>

//           <div className="border border-gray-300 rounded-2xl py-8 px-10 mt-5">
//             <p className="text-base">Öne Çıkarma</p>
//             <p
//               className={`text-2xl font-semibold ${
//                 hasFeaturedRequest ? "text-green-500" : "text-red-600"
//               }`}
//             >
//               {hasFeaturedRequest ? "Eklenmiş" : "Eklenmemiş"}
//             </p>
//           </div>

//           <div className="border border-gray-300 rounded-2xl py-8 px-10 mt-5">
//             <div className="flex items-center justify-between">
//               <div className="space-y-2">
//                 <p className="text-base">Toplam İlan Görüntüleme</p>
//                 <p className="text-2xl font-semibold">
//                   {dashboard?.statistics?.totalViews}
//                 </p>
//               </div>
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
//                 <LuView size={34} color="blue" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";
import { useUser } from "@/app/contexts/UserContext";
import api from "@/app/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import {
  MdNoPhotography,
  MdOutlineMessage,
  MdOutlineUnpublished,
  MdPublishedWithChanges,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const [dashboard, setDashboard] = useState();
  const [hasFeaturedRequest, setHasFeaturedRequest] = useState(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const getOverView = async () => {
    try {
      const response = await api.get("/dashboard/overview");
      setDashboard(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkFeatured = async () => {
    if (user.role === "kurumsal") {
      try {
        const response = await api.get("/galleryFeatured/check");
        setHasFeaturedRequest(response.data.hasFeaturedRequest);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getOverView();
    checkFeatured();
  }, [user]);

  if (loading)
    return (
      <>
        {/* PC loading görünümü (Orijinal) */}
        <div className="hidden lg:block">
          <div className="w-full grid grid-cols-3 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll pt-8 p-10">
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
          </div>
          <div className="w-full grid grid-cols-4 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll px-10">
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
          </div>
          <div className="w-full grid grid-cols-3 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll px-10">
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
          </div>
        </div>

        {/* Mobil loading görünümü */}
        <div className="block lg:hidden p-6 space-y-6">
          <Skeleton width={"100%"} height={80} />
          <Skeleton width={"100%"} height={140} />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton width={"100%"} height={100} />
            <Skeleton width={"100%"} height={100} />
            <Skeleton width={"100%"} height={100} />
            <Skeleton width={"100%"} height={100} />
          </div>
        </div>
      </>
    );

  return (
    <>
      {/* ========================================== */}
      {/* 1. PC DASHBOARD (%100 ORİJİNAL KOD)        */}
      {/* ========================================== */}
      <div className="hidden lg:block w-full py-10 px-14 font-sans">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          {user?.role === "kurumsal" && (
            <a
              className="px-6 py-2 bg-orange-400 rounded-full text-sm text-white"
              target="_blanck"
              href={`/galeri/${user?.slug}`}
            >
              Sayfaya Git
            </a>
          )}
        </div>
        <div className="flex space-x-5 items-start">
          {user?.role === "kurumsal" && (
            <div className="w-1/3 p-5 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500 mt-10">
              <div className="flex items-start space-x-3">
                <div className="w-28 h-28 border border-gray-200 rounded-2xl flex justify-center items-center">
                  {user?.logoUrl ? (
                    <img
                      className="w-full h-full object-contain"
                      src={user?.logoUrl}
                    />
                  ) : (
                    <MdNoPhotography size={40} color="gray" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">{user?.galeriAdi}</p>
                  <p className="font-semibold text-gray-600 mt-1 text-sm">
                    Yetkili Adı
                  </p>
                  <p className="text-xs text-gray-400">{user?.yetkiliAdi}</p>
                  <p className="font-semibold text-gray-600 mt-1 text-sm">
                    Yetkili Soyadı
                  </p>
                  <p className="text-xs text-gray-400">{user?.yetkiliSoyadi}</p>
                </div>
              </div>
            </div>
          )}
          {user?.role === "kurumsal" && (
            <div className="w-1/5 p-5 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500 mt-10">
              <p className="text-center font-semibold">Durum Bilgisi</p>
              <div className="flex items-center space-x-1 mt-3 justify-center">
                <div className="w-5 h-5 shadow-2xl bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-green-400">
                  Ödeme Alındı
                </p>
              </div>
              <div className="flex items-center space-x-1 mt-3 justify-center">
                <div className="w-5 h-5 shadow-2xl bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-green-400">
                  Admin Onaylı
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full py-5 font-sans">
          {/* LIMIT WARNING */}
          {dashboard?.limits.limitFull && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-6">
              <p className="font-medium">
                Aktif ilan limiti dolu. Yeni ilan ekleyebilmek için mevcut
                ilanlardan birini yayından kaldırmalısınız.
              </p>
            </div>
          )}

          {/* STATISTIC CARDS */}
          <div className="w-full grid grid-cols-4 gap-x-6 mt-10">
            {/* Active Listings */}
            <div className="border border-gray-300 rounded-2xl py-12 px-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-base">Yayımlanan</p>
                  <p className="text-2xl font-semibold">
                    {dashboard?.statistics?.totalActive}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
                  <MdPublishedWithChanges size={34} color="blue" />
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="border border-gray-300 rounded-2xl py-12 px-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-base">Favoriler</p>
                  <p className="text-2xl font-semibold">
                    {dashboard?.statistics?.favorites}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
                  <FaRegBookmark size={34} color="blue" />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="border border-gray-300 rounded-2xl py-12 px-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-base">Mesajlar</p>
                  <p className="text-2xl font-semibold">
                    {dashboard?.statistics?.messages}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
                  <MdOutlineMessage size={34} color="blue" />
                </div>
              </div>
            </div>

            {/* Inactive Listings */}
            <div className="border border-gray-300 rounded-2xl py-12 px-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-base">Yayında Olmayan</p>
                  <p className="text-2xl font-semibold">
                    {dashboard?.statistics?.totalInactive}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
                  <MdOutlineUnpublished size={34} color="blue" />
                </div>
              </div>
            </div>
          </div>

          {/* LIMITS BOX */}
          <div className="w-full grid grid-cols-3 gap-x-6 mt-10">
            <div className="border border-gray-300 rounded-2xl py-8 px-10">
              <p className="text-base">Maksimum Yayında İlan</p>
              <p className="text-2xl font-semibold">
                {dashboard?.limits?.maxLimit}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl py-8 px-10">
              <p className="text-base">Şu Anda Yayında</p>
              <p className="text-2xl font-semibold">
                {dashboard?.limits?.activeCount}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl py-8 px-10">
              <p className="text-base">Durum</p>
              <p
                className={`text-2xl font-semibold ${
                  dashboard?.limits?.limitFull ? "text-red-500" : "text-green-600"
                }`}
              >
                {dashboard?.limits?.limitFull ? "Limit Dolu" : "Uygun"}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl py-8 px-10 mt-5">
              <p className="text-base">Öne Çıkarma</p>
              <p
                className={`text-2xl font-semibold ${
                  hasFeaturedRequest ? "text-green-500" : "text-red-600"
                }`}
              >
                {hasFeaturedRequest ? "Eklenmiş" : "Eklenmemiş"}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl py-8 px-10 mt-5">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-base">Toplam İlan Görüntüleme</p>
                  <p className="text-2xl font-semibold">
                    {dashboard?.statistics?.totalViews}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex justify-center items-center">
                  <LuView size={34} color="blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ========================================== */}
      {/* 2. MOBİL DASHBOARD (MOBİL UYUMLU ALAN)       */}
      {/* ========================================== */}
      <div className="block lg:hidden w-full py-6 px-4 font-sans">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          {user?.role === "kurumsal" && (
            <a
              className="px-6 py-2 bg-orange-400 rounded-full text-sm text-white text-center self-start sm:self-auto"
              target="_blanck"
              href={`/galeri/${user?.slug}`}
            >
              Sayfaya Git
            </a>
          )}
        </div>

        {/* Kurumsal Profil ve Durum Bilgisi */}
        <div className="flex flex-col space-y-4 mt-6">
          {user?.role === "kurumsal" && (
            <div className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500">
              <div className="flex items-start space-x-3">
                <div className="w-20 h-20 flex-shrink-0 border border-gray-200 rounded-2xl flex justify-center items-center">
                  {user?.logoUrl ? (
                    <img
                      className="w-full h-full object-contain"
                      src={user?.logoUrl}
                      alt="Logo"
                    />
                  ) : (
                    <MdNoPhotography size={30} color="gray" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold truncate">{user?.galeriAdi}</p>
                  <p className="font-semibold text-gray-600 mt-1 text-xs">
                    Yetkili
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.yetkiliAdi} {user?.yetkiliSoyadi}
                  </p>
                </div>
              </div>
            </div>
          )}

          {user?.role === "kurumsal" && (
            <div className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500">
              <p className="text-center font-semibold text-sm">Durum Bilgisi</p>
              <div className="flex flex-row justify-center gap-6 mt-3">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs font-semibold text-green-500">
                    Ödeme Alındı
                  </p>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs font-semibold text-green-500">
                    Admin Onaylı
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full py-2">
          {/* LIMIT WARNING */}
          {dashboard?.limits.limitFull && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-4">
              <p className="text-xs font-medium">
                Aktif ilan limiti dolu. Yeni ilan ekleyebilmek için mevcut
                ilanlardan birini yayından kaldırmalısınız.
              </p>
            </div>
          )}

          {/* STATISTIC CARDS (Mobil - 2'li Izgara) */}
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            {/* Active Listings */}
            <div className="border border-gray-300 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
              <div className="flex justify-between items-start">
                <p className="text-xs text-gray-600">Yayımlanan</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex justify-center items-center">
                  <MdPublishedWithChanges size={18} color="blue" />
                </div>
              </div>
              <p className="text-xl font-bold mt-2">
                {dashboard?.statistics?.totalActive}
              </p>
            </div>

            {/* Favorites */}
            <div className="border border-gray-300 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
              <div className="flex justify-between items-start">
                <p className="text-xs text-gray-600">Favoriler</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex justify-center items-center">
                  <FaRegBookmark size={18} color="blue" />
                </div>
              </div>
              <p className="text-xl font-bold mt-2">
                {dashboard?.statistics?.favorites}
              </p>
            </div>

            {/* Messages */}
            <div className="border border-gray-300 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
              <div className="flex justify-between items-start">
                <p className="text-xs text-gray-600">Mesajlar</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex justify-center items-center">
                  <MdOutlineMessage size={18} color="blue" />
                </div>
              </div>
              <p className="text-xl font-bold mt-2">
                {dashboard?.statistics?.messages}
              </p>
            </div>

            {/* Inactive Listings */}
            <div className="border border-gray-300 rounded-2xl p-4 flex flex-col justify-between min-h-[110px]">
              <div className="flex justify-between items-start">
                <p className="text-xs text-gray-600 font-sans">Yayında Olmayan</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex justify-center items-center">
                  <MdOutlineUnpublished size={18} color="blue" />
                </div>
              </div>
              <p className="text-xl font-bold mt-2">
                {dashboard?.statistics?.totalInactive}
              </p>
            </div>
          </div>

          {/* LIMITS & VIEWS BOX (Mobil - 1 veya 2'li Izgara) */}
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-300 rounded-2xl p-4">
              <p className="text-[11px] text-gray-600">Maksimum Limit</p>
              <p className="text-lg font-bold mt-1">
                {dashboard?.limits?.maxLimit}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl p-4">
              <p className="text-[11px] text-gray-600">Şu Anda Yayında</p>
              <p className="text-lg font-bold mt-1">
                {dashboard?.limits?.activeCount}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl p-4">
              <p className="text-[11px] text-gray-600">Durum</p>
              <p
                className={`text-lg font-bold mt-1 ${
                  dashboard?.limits?.limitFull ? "text-red-500" : "text-green-600"
                }`}
              >
                {dashboard?.limits?.limitFull ? "Limit Dolu" : "Uygun"}
              </p>
            </div>

            <div className="border border-gray-300 rounded-2xl p-4">
              <p className="text-[11px] text-gray-600">Öne Çıkarma</p>
              <p
                className={`text-lg font-bold mt-1 ${
                  hasFeaturedRequest ? "text-green-500" : "text-red-600"
                }`}
              >
                {hasFeaturedRequest ? "Eklenmiş" : "Eklenmemiş"}
              </p>
            </div>

            <div className="col-span-2 border border-gray-300 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Toplam İlan Görüntüleme</p>
                <p className="text-xl font-bold mt-1">
                  {dashboard?.statistics?.totalViews}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex justify-center items-center">
                <LuView size={20} color="blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;