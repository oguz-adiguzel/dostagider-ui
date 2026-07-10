"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";

const page = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Doğrulama yapılıyor...");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      const email = searchParams.get("email");
      const code = searchParams.get("code");

      if (!email || !code) {
        setMessage("Geçersiz doğrulama linki.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(" https://dostagider-api.onrender.com/users/verify", {
          email,
          code,
        });

        if (response.data.success || response.status === 200) {
          setMessage("🎉 Hesabınız başarıyla doğrulandı! Artık giriş yapabilirsiniz.");
          setSuccess(true);
        } else {
          setMessage(response.data.message || "Doğrulama başarısız.");
        }
      } catch (error) {
        console.error("Doğrulama hatası:", error);
        setMessage(
          error.response?.data?.message || "Sunucu hatası. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyAccount();
  }, [searchParams]);

  return (
    <div className="min-h-[900px] flex flex-col items-center justify-center bg-gray-50 p-4 relative">
      {/* ✅ Başarı durumunda confetti */}
      {success && <Confetti numberOfPieces={300} recycle={false} />}

      {/* ✅ Logo */}
      <img
        src="/dostagider-logo.png" // Kendi logonun yolunu buraya koy
        alt="logo"
        className="w-96 mb-6"
      />

      {/* ✅ Kart Tasarımı */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center border border-gray-200">
        {loading ? (
          <p className="text-gray-500 animate-pulse">{message}</p>
        ) : (
          <p className={`text-lg font-medium ${success ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default page;

