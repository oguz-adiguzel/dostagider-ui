"use client";
import api from "@/app/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineElectricalServices } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const page = () => {
  const [loading, setLoading] = useState(true);

  const [carListing, setCarListing] = useState();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getMyListing = async () => {
    try {
      const res = await api.get("/ilan/my-listings");
      setCarListing(res.data);
      setLoading(false);
    } catch (error) {
      console.log("user error", error);
    }
  };

  const deleteMyListing = async (ilanNo) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      try {
        setLoading(true);
        const res = await api.delete(`/ilan/ilan-sil?ilanNo=${ilanNo}`);
        setLoading(false);
        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
        });
        getMyListing();
      } catch (error) {
        setLoading(false);
        console.log("delete error", error);
        toast.warn(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      getMyListing();
    }
  }, [router]);

  const formattedDate = (listingDate) => {
    const date = new Date(listingDate);
    const format = date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return format;
  };

  if (loading)
    return (
      <>
        <ToastContainer />
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
        </div>
      </>
    );

  return (
    <div className="w-full h-full py-10 px-14 font-sans overflow-y-scroll">
      <ToastContainer />
      <h2 className="text-3xl font-semibold">İlanlarım</h2>
      <div className="w-full py-5 border border-gray-300 mt-10 rounded-2xl px-6">
        <p className="mb-5 text-lg text-orange-400">
          <span className="font-bold text-orange-500">{carListing?.count}</span>{" "}
          İlan Listeleniyor
        </p>
        <table class="w-full table-fixed">
          <thead className="bg-[#E9F2FF] h-14">
            <tr className="text-blue-500 ">
              <th>Resim</th>
              <th>Bilgi</th>
              <th>İlan Geçerlilik Tarihi</th>
              <th>Görüntülenme</th>
              <th>Aksiyon</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
              <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem
                      disabled={selectedItem?.isShowcased}
                      onClick={(e) => {
                        handleClose(); // Menü kapanacaksa
                        router.push(`/user/vitrin-odeme/${selectedItem?.ilanNo}`);
                      }}
                    >
                      Vitrine Çıkar
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push(`/user/ilan-duzenle/${selectedItem?.ilanNo}`);
                      }}
                    >
                      Düzenle
                    </MenuItem>
                    <MenuItem
                      disabled={selectedItem?.isActive}
                      onClick={() => {
                        router.push(`/user/yeniden-yayinla/${selectedItem?.ilanNo}`);
                      }}
                    >
                      Yayına Al
                    </MenuItem>
                    {<MenuItem>Öne Çıkar</MenuItem>}
                  </Menu>
            {carListing?.listings.map((item, index) => (
              <tr className={`h-40 ${item.isEV ? 'border border-blue-300' : ''}`}>
                <td>
                  <div className="w-52 h-36">
                    <img
                      className="w-full h-full object-contain"
                      src={item.gorseller[0]}
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="font-sans">
                    <a
                      href={`/ilan/${item.ilanNo}`}
                      // onClick={() => router.push(`/ilan/${item.ilanNo}`)}
                      className=" font-semibold cursor-pointer hover:text-orange-500 duration-200 flex flex-col items-center justify-center space-x-3"
                    >
                      {
                        item.isEV && <MdOutlineElectricalServices className="text-blue-500" size={30} />
                      }
                     
                     <p>  {item.baslik}</p>
                     
                    </a>
                    <p className="text-sm">
                      {item.brand} / {item.model} /{" "}
                      {item.variant1 ? item.variant1 : ""}{" "}
                      {item.variant2 ? "/" : ""}{" "}
                      {item.variant2 ? item.variant2 : ""}{" "}
                      {item.varian3 ? "/" : ""}{" "}
                      {item.variant3 ? item.variant3 : ""}
                    </p>
                  </div>
                </td>
                <td className="text-center text-sm text-red-400">
                  {formattedDate(item.expiresAt)}
                </td>
                <td className="text-center font-semibold">{item.views}</td>
                <td className="flex justify-center items-center h-40 space-x-4">
                  <div
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      setSelectedItem(item);
                    }}
                    className="h-10 w-10 border border-gray-300 rounded-2xl flex justify-center items-center cursor-pointer hover:border-gray-400 duration-300 hover:shadow-2xl"
                  >
                    <LuPencilLine />
                  </div>
                
                  <div
                    onClick={() => deleteMyListing(item.ilanNo)}
                    className="h-10 w-10 border border-gray-300 rounded-2xl flex justify-center items-center cursor-pointer hover:border-gray-400 duration-300 hover:shadow-2xl"
                  >
                    <MdDeleteOutline size={20} />
                  </div>
                </td>
                <td className="text-center">
                  {item.isActive === true ? (
                    <p className="text-green-500">Yayında</p>
                  ) : (
                    <p className="text-red-500">Yayında Değil</p>
                  )}
                  {item.isShowcased === true ? (
                    <p className="text-green-500">Vitrinde</p>
                  ) : (
                    <p className="text-red-500">Vitrinde Değil</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
