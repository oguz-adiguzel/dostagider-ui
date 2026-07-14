// "use client";
// import api from "@/app/lib/axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { LuPencilLine } from "react-icons/lu";
// import { MdDeleteOutline, MdOutlineElectricalServices } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// const page = () => {
//   const [loading, setLoading] = useState(true);

//   const [carListing, setCarListing] = useState();
//   const router = useRouter();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const getMyListing = async () => {
//     try {
//       const res = await api.get("/ilan/my-listings");
//       setCarListing(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.log("user error", error);
//     }
//   };

//   const deleteMyListing = async (ilanNo) => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       router.push("/login");
//     } else {
//       try {
//         setLoading(true);
//         const res = await api.delete(`/ilan/ilan-sil?ilanNo=${ilanNo}`);
//         setLoading(false);
//         toast.info(res.data.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           // transition: Bounce,
//         });
//         getMyListing();
//       } catch (error) {
//         setLoading(false);
//         console.log("delete error", error);
//         toast.warn(error.response.data.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           // transition: Bounce,
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const token = Cookies.get("accessToken");
//     if (!token) {
//       router.push("/login");
//     } else {
//       getMyListing();
//     }
//   }, [router]);

//   const formattedDate = (listingDate) => {
//     const date = new Date(listingDate);
//     const format = date.toLocaleString("tr-TR", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     });
//     return format;
//   };

//   if (loading)
//     return (
//       <>
//         <ToastContainer />
//         <div className="w-full h-full flex justify-center items-center">
//           <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
//         </div>
//       </>
//     );

//   return (
//     <div className="w-full h-full py-10 px-14 font-sans overflow-y-scroll">
//       <ToastContainer />
//       <h2 className="text-3xl font-semibold">İlanlarım</h2>
//       <div className="w-full py-5 border border-gray-300 mt-10 rounded-2xl px-6">
//         <p className="mb-5 text-lg text-orange-400">
//           <span className="font-bold text-orange-500">{carListing?.count}</span>{" "}
//           İlan Listeleniyor
//         </p>
//         <table class="w-full table-fixed">
//           <thead className="bg-[#E9F2FF] h-14">
//             <tr className="text-blue-500 ">
//               <th>Resim</th>
//               <th>Bilgi</th>
//               <th>İlan Geçerlilik Tarihi</th>
//               <th>Görüntülenme</th>
//               <th>Aksiyon</th>
//               <th>Durum</th>
//             </tr>
//           </thead>
//           <tbody>
//               <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     slotProps={{
//                       list: {
//                         "aria-labelledby": "basic-button",
//                       },
//                     }}
//                   >
//                     <MenuItem
//                       disabled={selectedItem?.isShowcased}
//                       onClick={(e) => {
//                         handleClose(); // Menü kapanacaksa
//                         router.push(`/user/vitrin-odeme/${selectedItem?.ilanNo}`);
//                       }}
//                     >
//                       Vitrine Çıkar
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => {
//                         router.push(`/user/ilan-duzenle/${selectedItem?.ilanNo}`);
//                       }}
//                     >
//                       Düzenle
//                     </MenuItem>
//                     <MenuItem
//                       disabled={selectedItem?.isActive}
//                       onClick={() => {
//                         router.push(`/user/yeniden-yayinla/${selectedItem?.ilanNo}`);
//                       }}
//                     >
//                       Yayına Al
//                     </MenuItem>
//                     {<MenuItem>Öne Çıkar</MenuItem>}
//                   </Menu>
//             {carListing?.listings.map((item, index) => (
//               <tr className={`h-40 ${item.isEV ? 'border border-blue-300' : ''}`}>
//                 <td>
//                   <div className="w-52 h-36">
//                     <img
//                       className="w-full h-full object-contain"
//                       src={item.gorseller[0]}
//                     />
//                   </div>
//                 </td>
//                 <td className="text-center">
//                   <div className="font-sans">
//                     <a
//                       href={`/ilan/${item.ilanNo}`}
//                       // onClick={() => router.push(`/ilan/${item.ilanNo}`)}
//                       className=" font-semibold cursor-pointer hover:text-orange-500 duration-200 flex flex-col items-center justify-center space-x-3"
//                     >
//                       {
//                         item.isEV && <MdOutlineElectricalServices className="text-blue-500" size={30} />
//                       }
                     
//                      <p>  {item.baslik}</p>
                     
//                     </a>
//                     <p className="text-sm">
//                       {item.brand} / {item.model} /{" "}
//                       {item.variant1 ? item.variant1 : ""}{" "}
//                       {item.variant2 ? "/" : ""}{" "}
//                       {item.variant2 ? item.variant2 : ""}{" "}
//                       {item.varian3 ? "/" : ""}{" "}
//                       {item.variant3 ? item.variant3 : ""}
//                     </p>
//                   </div>
//                 </td>
//                 <td className="text-center text-sm text-red-400">
//                   {formattedDate(item.expiresAt)}
//                 </td>
//                 <td className="text-center font-semibold">{item.views}</td>
//                 <td className="flex justify-center items-center h-40 space-x-4">
//                   <div
//                     onClick={(e) => {
//                       setAnchorEl(e.currentTarget);
//                       setSelectedItem(item);
//                     }}
//                     className="h-10 w-10 border border-gray-300 rounded-2xl flex justify-center items-center cursor-pointer hover:border-gray-400 duration-300 hover:shadow-2xl"
//                   >
//                     <LuPencilLine />
//                   </div>
                
//                   <div
//                     onClick={() => deleteMyListing(item.ilanNo)}
//                     className="h-10 w-10 border border-gray-300 rounded-2xl flex justify-center items-center cursor-pointer hover:border-gray-400 duration-300 hover:shadow-2xl"
//                   >
//                     <MdDeleteOutline size={20} />
//                   </div>
//                 </td>
//                 <td className="text-center">
//                   {item.isActive === true ? (
//                     <p className="text-green-500">Yayında</p>
//                   ) : (
//                     <p className="text-red-500">Yayında Değil</p>
//                   )}
//                   {item.isShowcased === true ? (
//                     <p className="text-green-500">Vitrinde</p>
//                   ) : (
//                     <p className="text-red-500">Vitrinde Değil</p>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";

import api from "@/app/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineElectricalServices } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const UserListingsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [carListing, setCarListing] = useState({ listings: [], count: 0 });

  // MUI Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  // İlanları Getir
  const getMyListing = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/ilan/my-listings");
      setCarListing({
        listings: res.data?.listings || [],
        count: res.data?.count || 0,
      });
    } catch (error) {
      console.error("Listing fetch error:", error);
      toast.error("İlanlarınız yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  // İlan Silme
  const deleteMyListing = async (ilanNo) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    if (!window.confirm(`${ilanNo} numaralı ilanı silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setLoading(true);
      const res = await api.delete(`/ilan/ilan-sil?ilanNo=${ilanNo}`);
      toast.success(res.data.message || "İlan başarıyla silindi.", { theme: "dark" });
      await getMyListing();
    } catch (error) {
      console.error("Delete error:", error);
      const errMsg = error.response?.data?.message || "İlan silinirken bir hata oluştu.";
      toast.warn(errMsg, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      getMyListing();
    }
  }, [router, getMyListing]);

  // Tarih Formatlayıcı
  const formattedDate = (listingDate) => {
    if (!listingDate) return "-";
    const date = new Date(listingDate);
    return date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && carListing.listings.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <ToastContainer />
        <img className="w-24 h-24 animate-spin" src="/rim-loading.svg" alt="Yükleniyor..." />
        <p className="text-gray-500 text-sm font-medium">İlanlarınız yükleniyor, lütfen bekleyin...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-10 px-5 lg:px-14 font-sans overflow-y-auto">
      <ToastContainer />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">İlan Yönetimi</h2>
          <p className="text-sm text-gray-500 mt-1">
            Yayınladığınız ilanları buradan düzenleyebilir, silebilir veya vitrine taşıyabilirsiniz.
          </p>
        </div>
      </div>

      <div className="w-full py-5 border border-gray-200 mt-8 rounded-2xl px-6 bg-white shadow-sm">
        <p className="mb-5 text-lg text-gray-700">
          Toplam <span className="font-bold text-orange-500">{carListing.count}</span> adet ilan listeleniyor.
        </p>

        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-[#E9F2FF] text-blue-600 font-semibold text-sm border-b border-blue-100">
                <th className="py-4 px-4 rounded-l-xl w-48">Görsel</th>
                <th className="py-4 px-4">İlan Detayı</th>
                <th className="py-4 px-4 w-52">Son Geçerlilik Tarihi</th>
                <th className="py-4 px-4 w-32 text-center">İzlenme</th>
                <th className="py-4 px-4 w-40 text-center">Durum</th>
                <th className="py-4 px-4 rounded-r-xl w-36 text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {carListing.listings.map((item) => {
                const isEV = item.isEV === true || item.yakitTipi === "Elektrik";
                return (
                  <tr 
                    key={item.ilanNo} 
                    className={`hover:bg-gray-50/80 transition-colors duration-150 ${
                      isEV ? "bg-blue-50/30 border-l-4 border-l-blue-400" : ""
                    }`}
                  >
                    {/* Görsel Sütunu */}
                    <td className="py-4 px-4">
                      <div className="w-40 h-28 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 relative flex items-center justify-center">
                        {item.gorseller && item.gorseller[0] ? (
                          <img
                            className="w-full h-full object-cover"
                            src={item.gorseller[0]}
                            alt={item.baslik}
                          />
                        ) : (
                          <span className="text-xs text-gray-400">Görsel Yok</span>
                        )}
                        {isEV && (
                          <span className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full shadow-md">
                            <MdOutlineElectricalServices size={16} />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Bilgi Sütunu */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-md">
                        <a
                          href={`/ilan/${item.ilanNo}`}
                          className="font-bold text-gray-900 hover:text-orange-500 transition-colors duration-150 text-base line-clamp-1"
                        >
                          {item.baslik}
                        </a>
                        <p className="text-xs text-gray-400 font-semibold">
                          İlan No: #{item.ilanNo}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.brand} / {item.model}
                          {item.variant1 && ` / ${item.variant1}`}
                          {item.variant2 && ` / ${item.variant2}`}
                          {item.variant3 && ` / ${item.variant3}`}
                        </p>
                      </div>
                    </td>

                    {/* Tarih Sütunu */}
                    <td className="py-4 px-4 text-sm text-gray-600 font-medium">
                      {formattedDate(item.expiresAt)}
                    </td>

                    {/* İzlenme Sütunu */}
                    <td className="py-4 px-4 text-center font-semibold text-gray-700">
                      {item.views || 0}
                    </td>

                    {/* Durum Sütunu */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 items-center justify-center text-xs font-bold">
                        {item.isActive ? (
                          <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full">Yayında</span>
                        ) : (
                          <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full">Yayında Değil</span>
                        )}
                        {item.isShowcased ? (
                          <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full">Vitrinde</span>
                        ) : (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">Vitrinde Değil</span>
                        )}
                      </div>
                    </td>

                    {/* Aksiyon Sütunu */}
                    <td className="py-4 px-4">
                      <div className="flex justify-center items-center gap-2">
                        <div
                          onClick={(e) => handleMenuOpen(e, item)}
                          className="h-10 w-10 border border-gray-200 rounded-xl flex justify-center items-center cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-all duration-150 bg-white shadow-sm"
                          title="Seçenekler"
                        >
                          <LuPencilLine size={18} />
                        </div>
                        <div
                          onClick={() => deleteMyListing(item.ilanNo)}
                          className="h-10 w-10 border border-gray-200 rounded-xl flex justify-center items-center cursor-pointer hover:border-red-400 hover:text-red-500 transition-all duration-150 bg-white shadow-sm"
                          title="Sil"
                        >
                          <MdDeleteOutline size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MUI Menu Component (Tablonun Dışında - HTML Yapısını Bozmaz) */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          disabled={selectedItem?.isShowcased}
          onClick={() => {
            router.push(`/user/vitrin-odeme/${selectedItem?.ilanNo}`);
            handleMenuClose();
          }}
        >
          Vitrine Çıkar
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(`/user/ilan-duzenle/${selectedItem?.ilanNo}`);
            handleMenuClose();
          }}
        >
          Düzenle
        </MenuItem>
        <MenuItem
          disabled={selectedItem?.isActive}
          onClick={() => {
            router.push(`/user/yeniden-yayinla/${selectedItem?.ilanNo}`);
            handleMenuClose();
          }}
        >
          Yayına Al
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Öne Çıkar</MenuItem>
      </Menu>
    </div>
  );
};

export default UserListingsPage;