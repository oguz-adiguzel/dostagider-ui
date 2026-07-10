"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(4, "En az 4 karakter")
        .required("Şifre zorunludur"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setMessage("");

        const res = await axios.post(
          " https://dostagider-api.onrender.com/users/reset-password",
          {
            email,
            token,
            newPassword: values.newPassword,
          },
        );
        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });

        setMessage(res.data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || "Bir hata oluştu.");
        toast.warn(err.response?.data?.message || "Giriş başarısız", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
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
            Yeni şifrenizi belirleyerek hesabınıza güvenli bir şekilde tekrar
            giriş yapabilirsiniz.
          </p>

          <ul className="space-y-3 text-sm">
            <li>✔ Güvenli şifre oluşturma</li>
            <li>✔ Tek kullanımlık doğrulama</li>
            <li>✔ Şifre değişikliği sonrası anında erişim</li>
            <li>✔ Hesap güvenliği korunur</li>
          </ul>

          <div className="mt-8 text-xs opacity-80">
            Güvenliğiniz bizim için önceliklidir.
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Yeni Şifre Belirle
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Hesabınıza erişmek için yeni şifrenizi oluşturun.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                name="newPassword"
                placeholder="Yeni şifre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 p-3 rounded-lg outline-none transition"
              />

              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
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
