"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import api from "../lib/axios";
import { useUser } from "../contexts/UserContext";
import Cookies from "js-cookie";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import { RiHome6Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineElectricBolt } from "react-icons/md";

const Header = () => {
  const router = useRouter();
  const { user, setUser, fetchUser } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [searchText, setSearchText] = useState("");
  const [searcData, setSearchData] = useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    if (e.target.value) {
      setAnchorElNot(e.currentTarget);
    } else {
      setAnchorElNot(null);
    }
  };

  const [anchorElNot, setAnchorElNot] = useState(null);
  const openNot = Boolean(anchorElNot);

  const handleClickNot = (event) => {
    setAnchorElNot(event.currentTarget);
  };
  const handleCloseNot = () => {
    setAnchorElNot(null);
  };

  const getSearchData = async () => {
    try {
      const res = await api.get(`/ilan/arama?q=${searchText}`);
      setSearchData(res.data.searchData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logOut = async () => {
    try {
      const res = await api.post("/users/logout");
      Cookies.remove("accessToken");
      handleClose();
      fetchUser();
      // setUser(null);
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
    } catch (error) {
      console.log("logout error", error);
    }
  };

  useEffect(() => {
    if (searchText.length > 2) getSearchData();
  }, [searchText]);


  return (
    <>
  {/* <ToastContainer /> */}
  {/* Ana yapıya ve px-20 boşluğuna dokunmadık, items-center ile dikeyde hizaladık */}
  <div className="w-full py-6 flex justify-between items-center px-20">
    <div className="flex items-center space-x-4 shrink-0">
      <a href="/">
        <img
          onClick={() => router.push("/")}
          className="w-60 cursor-pointer"
          src="/dostagider-logo.png"
          alt="Logo"
        />
      </a>

      <input
        onChange={handleSearchChange}
        type="text"
        className="border border-orange-400 rounded-md px-2 py-1 w-64 shadow-md shadow-orange-300 outline-orange-600"
        placeholder="İlan no veya galeri adı ile ara"
      />
      <div className="relative">
        <Menu
          // id={menuId}
          anchorEl={anchorElNot}
          open={openNot}
          onClose={handleCloseNot}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          PaperProps={{
            style: {
              width: 400,
            },
          }}
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div>
              <p className="text-base font-bold text-gray-800">
                Arama Verisi
              </p>
            </div>
          </div>

          {
            searcData?.length === 0 && <MenuItem>
              <p className="text-sm">Aramanıza uygun veri bulunamadı</p>
            </MenuItem>
          }

          {searcData?.map((item, index) => (
            <MenuItem key={index}>
              <a
                href={
                  item.type === "listing"
                    ? `/ilan/${item.ilanNo}`
                    : `/galeri/${item.slug}`
                }
              >
                <div className="flex space-x-3">
                  <div className="w-24 h-20 border border-gray-300 rounded-md">
                    <img
                      className="w-full h-full object-contain"
                      src={item.logoUrl || item.image}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-500 font-semibold text-sm">
                      {item.galeriAdi || item.baslik}
                    </p>
                    {item.type === "listing" && (
                      <p className="text-gray-500 text-xs capitalize">
                        {item.category} / {item.brand} / {item.model} /{" "}
                        {item.variant1}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>

    <li className="list-none flex items-center space-x-3 xl:space-x-4 2xl:space-x-6 text-xs xl:text-sm text-gray-700 shrink-0">
      <ul className="cursor-pointer hover:text-orange-400">
        <a href="/">Anasayfa</a>
      </ul>
      <ul className="cursor-pointer hover:text-orange-400">
        <a href="/kategori">Araç Al</a>
      </ul>

      <ul className="cursor-pointer hover:text-orange-400">
        <a className="flex items-center space-x-1" href="/elektrikli-arac">
          <MdOutlineElectricBolt size={20} />
          {/* whitespace-nowrap yazının alt satıra kırılmasını önler */}
          <p className="whitespace-nowrap">Elektrikli Araç</p> 
        </a>
      </ul>

      <ul className="cursor-pointer hover:text-orange-400 whitespace-nowrap">Araç Sat</ul>
      <ul className="cursor-pointer hover:text-orange-400 whitespace-nowrap">
        <a href="/arac-degerle">Araç Değerle</a>
      </ul>
      <ul className="cursor-pointer hover:text-orange-400 whitespace-nowrap">
        <a href="/kurumsal">Kurumsal</a>
      </ul>
      <ul className="cursor-pointer hover:text-orange-400 whitespace-nowrap">
        <a href="/sifir-arac">Sıfır Araç Listesi</a>
      </ul>
      <ul className="cursor-pointer hover:text-orange-400 whitespace-nowrap">
        <a href="/ekspertiz">Expertiz</a>
      </ul>
      <ul className="cursor-pointer hover:text-orange-400 whitespace-nowrap">
        <a href="/blog">Blog</a>
      </ul>
    </li>

    <div className="flex items-center shrink-0">
      {user ? (
        <>
          <div
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="cursor-pointer"
          >
            {user?.role === "kurumsal" ? (
              <p className="text-orange-400 uppercase cursor-pointer font-bold text-sm">
                {user?.galeriAdi}
              </p>
            ) : (
              <p className="text-orange-400 uppercase cursor-pointer font-bold text-sm">
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
            <MenuItem onClick={() => router.push("/user/dashboard")}>
              <div className="flex items-center space-x-1">
                <RiHome6Line color="black" size={20} />
                <p className="text-sm">Dashboard</p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => router.push("/user/my-profile")}>
              <div className="flex items-center space-x-1">
                <FaRegUser color="black" size={20} />
                <p className="text-sm">Profil Düzenle</p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => router.push("/user/my-listing")}>
              <div className="flex items-center space-x-1">
                <FaRegRectangleList color="black" size={20} />
                <p className="text-sm">İlanlarım</p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => logOut()}>
              <div className="flex items-center space-x-1">
                <BiLogOut color="black" size={20} />
                <p className="text-sm">Çıkış Yap</p>
              </div>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <a
          href="/login"
          className="flex items-center space-x-1 cursor-pointer hover:bg-orange-500 duration-200 text-white bg-orange-400 px-3 py-2 rounded-full"
        >
          <p className="text-xs">Giriş Yap</p>
          <p className="text-xs">/</p>
          <p className="text-xs">Üye Ol</p>
        </a>
      )}

      {/* <button className="ml-6 px-3 py-2 bg-orange-400 text-white text-sm cursor-pointer hover:rounded-full whitespace-nowrap">
        Ücretsiz İlan Ver
      </button> */}
    </div>
  </div>
</>
  );
};

export default Header;
