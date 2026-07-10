"use client";
import api from "@/app/lib/axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaListAlt, FaRegCreditCard } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [listingData, setListingData] = useState();
  const router = useRouter();

  const getListingData = async () => {
    try {
      const response = await api.get(`ilan/detay?ilanNo=${params.slug[0]}`);
      setListingData(response.data.ilan);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      router.push("/user/dashboard");
    }
  };

  const showcaseAdd = async () => {
    try {
      setLoading(true);
      const response = await api.post("/vitrin/request", {
        ilanNo: listingData.ilanNo,
      });
      setLoading(false);
      toast.info(response.data.message, {
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
      console.log("error", error);
      setLoading(false);
      toast.warn(error.response.data.message || "Bir şeyler ters gitti", {
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

  useEffect(() => {
    getListingData();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
      </div>
    );

  return (
    <div className="p-5 w-full">
      <ToastContainer />
      <p className="text-xl font-semibold">Vitrin İlan Ödeme Ekranı</p>
      <div className="w-3/4 mx-auto grid grid-cols-3 items-start gap-x-5 mt-8">
        <div className="col-span-2">
          <div className="border border-gray-400 p-5 w-full rounded-2xl">
            <div className="flex items-center space-x-3">
              <FaListAlt size={24} />
              <p className="text-gray-600 font-semibold">İlan Bilgileri</p>
            </div>
            <div className="flex space-x-8 mt-6">
              <img className="w-60" src={listingData?.gorseller[0]} />
              <div>
                <p className="font-semibold">{listingData?.baslik}</p>
                <p className="mt-2">
                  İlan No:{" "}
                  <span className="ml-1 font-semibold">
                    {listingData?.ilanNo}
                  </span>
                </p>
                <div className="flex items-center space-x-2 mt-2 font-semibold">
                  <p>{listingData?.brand}</p>
                  <p>{listingData?.model}</p>
                  <p>{listingData?.variant1 || ""}</p>
                  <p>{listingData?.variant2 || ""}</p>
                  <p>{listingData?.variant3 || ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-400 bg-green-100 p-5 w-full rounded-2xl mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaRegCreditCard size={24} />
                <p className="text-gray-600 font-semibold">Kart Bilgileri</p>
              </div>
              <div className="flex items-center space-x-3">
                <img className="w-12" src="/master.png" />
                <img className="w-12" src="/visa.webp" />
                <img className="w-12" src="/troy.png" />
                <img className="w-20" src="/world.png" />
              </div>
            </div>

            {listingData?.isEV === true && (
              <div className="w-full mt-10">
                <p className="font-semibold text-center">
                  Dostagider.com elektrikli araçlarda ücretsiz vitrin hakkı
                  sunar
                </p>
              </div>
            )}

            {listingData?.isEV === false && (
              <div className="w-full grid grid-cols-3 gap-x-3 mt-10">
                <div className="col-span-1">
                  <p className="font-semibold">Kart Numarası</p>
                  <p className="text-sm text-gray-500">
                    16 haneli kart numarasını giriniz
                  </p>
                </div>
                <div className="col-span-2">
                  <input
                    className="w-full h-10 border border-gray-500 rounded-full outline-0 px-3"
                    type="text"
                  />
                </div>
              </div>
            )}
            {listingData?.isEV === false && (
              <div className="w-full grid grid-cols-3 gap-x-3 mt-10">
                <div className="col-span-1">
                  <p className="font-semibold">Kart Üzerindeki İsim</p>
                  <p className="text-sm text-gray-500">
                    Kart üzerinde tanımlı olan ismi giriniz
                  </p>
                </div>
                <div className="col-span-2">
                  <input
                    className="w-full h-10 border border-gray-500 rounded-full outline-0 px-3"
                    type="text"
                  />
                </div>
              </div>
            )}
            {listingData?.isEV === false && (
              <div className="w-full grid grid-cols-2 gap-x-3">
                <div className="w-full grid grid-cols-3 gap-x-3 mt-10">
                  <div className="col-span-1">
                    <p className="font-semibold">Son Kullanım Tarihi</p>
                    <p className="text-sm text-gray-500">
                      Kart kullanım tarihi
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <input
                      className="w-20 h-10 border border-gray-500 rounded-full outline-0 px-3"
                      type="text"
                    />
                    <p className="text-2xl">/</p>
                    <input
                      className="w-20 h-10 border border-gray-500 rounded-full outline-0 px-3"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-x-3 mt-10">
                  <div className="col-span-1">
                    <p className="font-semibold">CVV2</p>
                    <p className="text-sm text-gray-500">
                      Kart güvenlik numarası
                    </p>
                  </div>
                  <div className="col-span-2">
                    <input
                      className="w-20 h-10 border border-gray-500 rounded-full outline-0 px-3"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-5 border border-gray-400 col-span-1 rounded-2xl">
          <div className="flex items-center space-x-3">
            <FaCartShopping size={24} />
            <p className="text-gray-600 font-semibold">Alışveriş Özeti</p>
          </div>
          <div className="w-full mt-6">
            <p className="text-orange-400 font-semibold">
              Dostagider.com Vitrin İlan Ücreti
            </p>
            <div className="mt-3 border-t border-b py-6 border-gray-300">
              <p className="font-semibold">Paket İçeriği</p>
              <p className="text-gray-500 mt-3">
                Dostagider.com ilgili ilan için 30 günlük vitrin gösterimi
              </p>
            </div>
            <div className="mt-3 border-t border-b py-6 border-gray-300">
              <p className="font-semibold">Toplam Ücret</p>
              <p className="font-semibold mt-3 text-4xl">
                {listingData?.isEV === true ? "Ücretsiz" : "399 TL"}
              </p>
            </div>
            <button
              onClick={() => showcaseAdd()}
              className="w-full py-2 rounded-full mt-6 bg-orange-400 text-white font-semibold cursor-pointer hover:bg-orange-300 duration-300"
            >
              {listingData?.isEV === true ? "Vitrine Çıkar" : "Ödemeyi Tamamla"}
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
