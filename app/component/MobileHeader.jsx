"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineElectricBolt, MdOutlineMenu, MdPhone } from "react-icons/md";
import { useUser } from "../contexts/UserContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiHome6Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

const MobileHeader = () => {
  const [menu, setMenu] = useState(false);
  const { user, setUser, fetchUser } = useUser();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  useEffect(() => {
    if (menu) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [menu]);

  return (
    <div className="relative">
      <div className="w-full py-5 flex justify-between items-center px-2">
        <img className="w-40 cursor-pointer" src="/dostagider-logo.png" />
        <div onClick={() => setMenu(!menu)} className="cursor-pointer">
          <MdOutlineMenu size={30} />
        </div>
      </div>
      <div
        className={`w-[97%] h-screen absolute top-0 z-50 bg-white ${
          menu ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between py-3 px-2">
          <img className="w-32 cursor-pointer" src="/dostagider-logo.png" />
          <div
            onClick={() => setMenu(!menu)}
            className="w-10 h-10 rounded-md bg-gray-200 flex justify-center items-center"
          >
            X
          </div>
        </div>
        {!user ? (
          <div className="w-11/12 mx-auto border py-3 px-6 rounded-2xl font-sans">
            <p className="font-semibold">Kayıt Olun</p>
            <p className="text-sm text-gray-600 mt-1">
              dostagider.com'a kayıt olun ve ayrıcalıklarımızdan yararlanmaya
              başlayın!
            </p>
            <div className="w-full flex items-center justify-around mt-3">
              <a
                href="/login"
                className="px-8 py-3 text-sm font-semibold border rounded-2xl"
              >
                Giriş Yap
              </a>
              <button className="px-8 py-3 text-sm font-semibold border rounded-2xl">
                Kayıt Ol
              </button>
            </div>
          </div>
        ) : (
           <>
              <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="w-3/4 mx-auto cursor-pointer border border-gray-400 rounded-2xl py-4 text-center"
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
        )}

        <ul className="ml-9 flex flex-col space-y-5 mt-6">
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/">Anasayfa</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/kategori">Araç Al</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a className="flex items-center space-x-1" href="/elektrikli-arac">
              <MdOutlineElectricBolt size={22} />
              <p>Elektrikli Araç</p>
            </a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/user/ilan-ekle">Araç Sat</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/arac-degerle">Araç Değerle</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/kurumsal">Kurumsal</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/sifir-arac">Sıfır Araç Listesi</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/ekspertiz">Expertiz</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
          <li className="flex justify-between items-center font-semibold text-gray-700">
            <a href="/blog">Blog</a>
            <div className="w-5 h-5 bg-gray-200 rounded-md flex justify-center items-center mr-9">
              <p>+</p>
            </div>
          </li>
        </ul>
        <div className="w-full mt-10 flex flex-col items-center">
          <MdPhone size={44} />
          <p className="mt-1">Desteğe ihtiyacınız var mı?</p>
          <p className="text-sm text-gray-600 mt-1">
            Size yardımcı olmamız için bizi arayabilirsiniz.
          </p>
          <p className="text-3xl font-semibold">0222 000 00 00</p>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
