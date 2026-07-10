"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const PopupLogin = ({ action, onResult }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
const router = useRouter()
  const handleLogin = async () => {
    try {
      const res = await axios.post(" https://dostagider-api.onrender.com/users/login", {
        email,
        sifre: password,
      });
      Cookies.set("accessToken", res.data.accessToken);

      if (res) {
        if (action === "message") {
          const result = "message";
          onResult(result);
        }
        if (action === "fav") {
          const result = "fav";
          onResult(result);
        }
      }

      //   router.push("/user/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.warn(err.response.data.message, {
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
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="w-full h-16 border border-[#E9E9E9]  px-2 py-1 mt-6">
        <p className="text-sm text-gray-400">Email veya Kullanıcı Adı</p>
        <input
          className="w-full outline-0 h-9"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full h-16 border border-[#E9E9E9] px-2 py-1 mt-5">
        <p className="text-sm text-gray-400">Parola</p>
        <input
          className="w-full outline-0 h-9"
          type="text"
          placeholder="Parola"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full flex items-center justify-between mt-3 font-sans">
        <div className="flex items-center space-x-1">
          <input id="check" type="checkbox" />
          <label htmlFor="check" className="text-sm text-gray-700">
            Oturumu açık tut
          </label>
        </div>
        <p className="text-sm text-orange-400 underline cursor-pointer">
          Şifremi Unuttum
        </p>
      </div>
      <button
        onClick={() => handleLogin()}
        // type="button"
        className="w-full h-10 mt-7 bg-orange-400 rounded-2xl text-sm text-white font-sans cursor-pointer hover:shadow-md shadow-orange-400 duration-300"
      >
        Giriş Yap
      </button>
      <p className="mt-6 text-center text-sm">
        Hesabınız bulunmuyorsa{" "}
        <span className="text-orange-400 font-semibold cursor-pointer">
          buradan
        </span>{" "}
        hesap açabilirsiniz
      </p>
      <div className="w-full grid grid-cols-11 gap-x-3 items-center mt-6">
        <div className="col-span-5 h-0.5 bg-gray-300"></div>
        <p className="col-span-1 text-xs text-gray-400">VE YA</p>
        <div className="col-span-5 h-0.5 bg-gray-300"></div>
      </div>
      <div className="w-full mt-12 space-y-3">
        <div className="py-3 border border-blue-500 rounded-2xl flex items-center justify-center space-x-1 cursor-pointer">
          <FaFacebookF size={20} color="blue" />
          <p className="text-sm text-blue-500">Facebook İle Giriş</p>
        </div>
        <div className="py-3 border border-red-500 rounded-2xl flex items-center justify-center space-x-1 cursor-pointer">
          <FaGoogle size={20} color="red" />
          <p className="text-sm text-red-500">Google İle Giriş</p>
        </div>
      </div>
    </div>
  );
};

export default PopupLogin;
