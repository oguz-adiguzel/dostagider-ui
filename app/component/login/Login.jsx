"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const router = useRouter();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçerli bir email giriniz")
      .required("Email zorunludur"),
    password: Yup.string()
      .min(4, "Şifre en az 4 karakter olmalı")
      .required("Şifre zorunludur"),
  });

  // ✅ Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          " https://dostagider-api.vercel.app/users/login",
          { email: values.email, sifre: values.password },
          { withCredentials: true }
        );

        Cookies.set("accessToken", res.data.accessToken);

        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });

        router.push("/user/dashboard");
      } catch (err) {
        console.error("Login error:", err);

        toast.warn(err.response?.data?.message || "Giriş başarısız", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    },
  });

  return (
    <div className="w-full">
      <ToastContainer />

      <form onSubmit={formik.handleSubmit}>
        {/* EMAIL */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
          <p className="text-sm text-gray-400">
            Email veya Kullanıcı Adı
          </p>
          <input
            className="w-full outline-0 h-9"
            type="text"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.email}
          </p>
        )}

        {/* PASSWORD */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1 mt-5">
          <p className="text-sm text-gray-400">Parola</p>
          <input
            className="w-full outline-0 h-9"
            type="password"
            name="password"
            placeholder="Parola"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>

        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.password}
          </p>
        )}

        {/* OPTIONS */}
        <div className="w-full flex items-center justify-between mt-3 font-sans">
          <div className="flex items-center space-x-1">
            <input id="check" type="checkbox" />
            <label htmlFor="check" className="text-sm text-gray-700">
              Oturumu açık tut
            </label>
          </div>
          <a href="/sifremi-unuttum" className="text-sm text-orange-400 underline cursor-pointer">
            Şifremi Unuttum
          </a>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full h-16 mt-7 bg-orange-400 rounded-2xl text-sm text-white font-sans cursor-pointer hover:shadow-md shadow-orange-400 duration-300"
        >
          Giriş Yap
        </button>
      </form>

      {/* SOCIAL LOGIN */}
      <div className="w-full h-0.5 mt-12 bg-gray-300"></div>

      <div className="w-full mt-12 grid grid-cols-2 gap-x-12">
        <div className="py-6 border border-blue-500 rounded-2xl flex items-center justify-center space-x-1 cursor-pointer">
          <FaFacebookF size={20} color="blue" />
          <p className="text-sm text-blue-500">
            Facebook İle Giriş
          </p>
        </div>

        <div className="py-6 border border-red-500 rounded-2xl flex items-center justify-center space-x-1 cursor-pointer">
          <FaGoogle size={20} color="red" />
          <p className="text-sm text-red-500">
            Google İle Giriş
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
