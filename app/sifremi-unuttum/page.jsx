"use client";

import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Geçerli bir email girin")
        .required("Email zorunludur"),
    }),
    // onSubmit: async (values) => {
    //   try {
    //     setLoading(true);
    //     setMessage("");

    //     const res = await axios.post(
    //       "http://localhost:5000/users/forgot-password",
    //       values
    //     );

    //     setMessage(res.data.message);
    //   } catch (err) {
    //     setMessage(
    //       err.response?.data?.message || "Bir hata oluştu."
    //     );
    //   } finally {
    //     setLoading(false);
    //   }
    // },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        setMessage("");

        const res = await axios.post(
          " https://dostagider-api.onrender.com/users/forgot-password",
          values,
        );

        setMessage(res.data.message);

        // 🔥 BURASI
        if (res.data.previewUrl) {
          window.open(res.data.previewUrl, "_blank");
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE - INFO */}
        <div className="bg-orange-400 text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">dostagider.com</h1>

          <p className="text-base mb-6">
            Şifrenizi mi unuttunuz? Endişelenmeyin. Hesabınıza tekrar
            erişebilmeniz için size bir sıfırlama bağlantısı göndereceğiz.
          </p>

          <ul className="space-y-3 text-sm">
            <li>✔ Güvenli şifre sıfırlama</li>
            <li>✔ 15 dakika geçerli link</li>
            <li>✔ Tek kullanımlık doğrulama</li>
            <li>✔ Hesap güvenliği önceliğimizdir</li>
          </ul>

          <div className="mt-8 text-xs opacity-80">
            Otomobil ilanlarını güvenle yönetmek için hesabınızı koruyun.
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Şifremi Unuttum
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Email adresinizi girin, size sıfırlama linki gönderelim.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email adresiniz"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 p-3 rounded-lg outline-none transition"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}
            </button>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-700">
                {message}
              </p>
            )}

            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-sm text-orange-500 hover:underline"
              >
                Giriş sayfasına dön
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
