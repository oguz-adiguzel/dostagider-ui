"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import api from "../lib/axios";
import { SiSpeedtest } from "react-icons/si";
import { LuFuel } from "react-icons/lu";
import { BsFuelPumpFill } from "react-icons/bs";
import { TbManualGearbox, TbManualGearboxFilled } from "react-icons/tb";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductPrice from "../component/ProductPrice";
import Cookies from "js-cookie";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const ShowCase = ({ page }) => {
  const [activeShowcaseData, setActiveShowcaseData] = useState();
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUser();
  const router = useRouter();

  const getActiveShowcase = async () => {
    try {
      const response = await api.get(
        `/vitrin/active/home${page === "electric" ? "?eV=true" : ""}`,
      );
      setActiveShowcaseData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addFavorite = async (id) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        const res = await api.post("/users/favori-ekle", {
          ilanId: id,
        });
        fetchUser();
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
      }
    } catch (error) {
      console.log("add favorite error", error);
      alert(error.response.data.message || "Hata Oluştu");
    }
  };

  const removeFav = async (id) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        const res = await api.post("/users/remove-favorite", {
          listingId: id,
        });
        fetchUser();
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
      }
    } catch (error) {
      console.log("user error", error);
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
  };

  useEffect(() => {
    getActiveShowcase();
  }, []);

  return (
    <div
      className={`w-full px-5 lg:px-0 ${page === "electric" ? "mt-0 py-10 bg-[#081135] text-white" : "mt-16"}`}
    >
      <ToastContainer />
      <div className="container mx-auto flex items-center justify-between ">
        <p className="text-xl font-semibold font-sans">Vitrin İlanları</p>
        <div className="flex items-center space-x-2">
          <div
            id="swiper-button-prev-showcase"
            className={`w-10 h-10 rounded-full  ${page === "electric" ? "bg-blue-900" : "bg-[#E9F2FF]"} flex justify-center items-center cursor-pointer`}
          >
            <FaAngleLeft />
          </div>
          <div
            id="swiper-button-next-showcase"
            className={`w-10 h-10 rounded-full  ${page === "electric" ? "bg-blue-900" : "bg-[#E9F2FF]"} flex justify-center items-center cursor-pointer`}
          >
            <FaAngleRight />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 flex">
        {loading && (
          <>
            <div className="w-full hidden lg:grid grid-cols-4 gap-x-8 justify-center items-center">
              <Skeleton width={"100%"} height={380} />
              <Skeleton width={"100%"} height={380} />
              <Skeleton width={"100%"} height={380} />
              <Skeleton width={"100%"} height={380} />
            </div>
            <div className="w-full grid lg:hidden grid-cols-1 gap-x-8 justify-center items-center">
              <Skeleton width={"100%"} height={380} />
            </div>
          </>
        )}
        {activeShowcaseData?.length !== 0 && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={4}
            navigation={{
              nextEl: "#swiper-button-next-showcase",
              prevEl: "#swiper-button-prev-showcase",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              400: {
                slidesPerView: 1.2,
              },
              639: {
                slidesPerView: 3,
              },
              865: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 4,
              },
              1500: {
                slidesPerView: 4,
              },
            }}
          >
            {activeShowcaseData?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`w-full border  rounded-xl  py-3 ${item.listingId.isEV ? "border-blue-400" : "border-gray-300"} ${item.listingId.isEV && page !== "electric" ? "shadow-2xl shadow-blue-400" : ""}`}
                >
                  <div className="w-full h-56 rounded-t-xl relative overflow-hidden">
                    <div
                      onClick={() => {
                        if (user?.favoriler.includes(item.listingId._id)) {
                          removeFav(item.listingId._id);
                        } else addFavorite(item.listingId._id);
                      }}
                      className="w-8 h-8 bg-white rounded-full absolute top-2 right-2 flex justify-center items-center cursor-pointer z-40"
                    >
                      {user?.favoriler.includes(item.listingId._id) ? (
                        <MdFavorite color="red" />
                      ) : (
                        <MdFavoriteBorder color="black" />
                      )}
                    </div>
                    <img
                      className="w-full h-full object-contain rounded-t-xl hover:scale-110 duration-500"
                      src={item.listingId.gorseller[0]}
                    />
                  </div>
                  <div className="w-full px-5 py-2">
                    <div className="w-full h-5 overflow-hidden flex">
                      <a
                        href={`/ilan/${item.listingId.ilanNo}`}
                        className="font-semibold w-full"
                      >
                        {item.listingId.baslik}
                      </a>
                    </div>

                    <div className="w-full flex justify-between mt-2 text-sm border-b border-gray-300 pb-1">
                      <p>
                        {item.listingId.brand} / {item.listingId.model}
                      </p>
                      <p>{item.listingId.aracYili}</p>
                    </div>

                    <div
                      className={`w-full grid grid-cols-3 mt-3 text-sm border-b border-gray-300 pb-2 ${page === "electric" ? "text-white" : "text-gray-700"}`}
                    >
                      <div className="flex flex-col items-center space-y-1 ">
                        <SiSpeedtest
                          color={page === "electric" ? "white" : "black"}
                          size={20}
                        />

                        <p className="font-semibold">{item.listingId.km}</p>
                      </div>
                      <div className="flex flex-col items-center space-y-1 ">
                        <BsFuelPumpFill
                          color={page === "electric" ? "white" : "black"}
                          size={20}
                        />
                        <p className=" font-semibold">{item.listingId.yakit}</p>
                      </div>
                      <div className="flex flex-col items-center space-y-1 ">
                        <TbManualGearboxFilled
                          color={page === "electric" ? "white" : "black"}
                          size={22}
                        />
                        <p className=" font-semibold">{item.listingId.vites}</p>
                      </div>
                    </div>

                    <div className="w-full flex justify-between items-center mt-4 text-sm pb-2">
                      <p
                        className={`text-lg font-bold font-sans  ${page === "electric" ? "text-blue-500" : "text-red-500"}`}
                      >
                        <ProductPrice
                          price={item.listingId.price}
                          locale={"tr"}
                        />
                        {/* ₺{item.listingId.price} */}
                      </p>
                      <a
                        href={`/ilan/${item.listingId.ilanNo}`}
                        className={`${page === "electric" ? "text-blue-300" : "text-orange-800"} cursor-pointer`}
                      >
                        Görüntüle
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {activeShowcaseData?.length < 3 && (
              <>
                <SwiperSlide>
                  <div className="text-center py-8 h-full">
                    <div className="flex flex-col h-full items-center justify-center rounded-3xl border border-gray-100 bg-gray-50/50 py-12 px-4 text-center backdrop-blur-sm">
                      <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        İlanın Burada Görünsün!
                      </h3>
                      <p className="mt-2 mb-6 text-gray-500">
                        İlanınızı vitrine ekleyin, satış sürecini hızlandırın.
                      </p>
                      {/* <a
                        href="/user/ilan-ekle"
                        className="rounded-lg bg-orange-400 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500"
                      >
                        Ücretsiz İlan Oluştur
                      </a> */}
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="text-center py-8 h-full">
                    <div className="flex flex-col h-full items-center justify-center rounded-3xl border border-gray-100 bg-gray-50/50 py-12 px-4 text-center backdrop-blur-sm">
                      <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        İlanın Burada Görünsün!
                      </h3>
                      <p className="mt-2 mb-6 text-gray-500">
                        İlanınızı vitrine ekleyin, satış sürecini hızlandırın.
                      </p>
                      {/* <a
                        href="/user/ilan-ekle"
                        className="rounded-lg bg-orange-400 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500"
                      >
                        Ücretsiz İlan Oluştur
                      </a> */}
                    </div>
                  </div>
                </SwiperSlide>

                 <SwiperSlide>
                  <div className="text-center py-8 h-full">
                    <div className="flex flex-col h-full items-center justify-center rounded-3xl border border-gray-100 bg-gray-50/50 py-12 px-4 text-center backdrop-blur-sm">
                      <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        İlanın Burada Görünsün!
                      </h3>
                      <p className="mt-2 mb-6 text-gray-500">
                        İlanınızı vitrine ekleyin, satış sürecini hızlandırın.
                      </p>
                      {/* <a
                        href="/user/ilan-ekle"
                        className="rounded-lg bg-orange-400 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500"
                      >
                        Ücretsiz İlan Oluştur
                      </a> */}
                    </div>
                  </div>
                </SwiperSlide>
              </>
            )}

            {loading === false && (
              <SwiperSlide>
                <a
                  // href={`/vitrin${page === "electric" ? "?isEV=true&page=1" : "?page=1"}`}
                  href={`/kategori?vitrin=true&page=1`}
                  className={`w-full h-full
      border border-gray-300 rounded-xl shadow-xl
      flex flex-col justify-center items-center
      ${page === "electric" ? "hover:bg-blue-100" : "hover:bg-orange-100"}
       transition
      cursor-pointer`}
                >
                  <div
                    className={`w-14 h-14 rounded-full ${page === "electric" ? "bg-blue-300" : "bg-orange-200"} flex items-center justify-center mb-3`}
                  >
                    <FaAngleRight
                      className={` ${page === "electric" ? "text-blue-600" : "text-orange-600"} text-2xl`}
                    />
                  </div>
                  <p
                    className={`text-lg font-semibold ${page === "electric" ? "text-blue-400" : "text-orange-500"} `}
                  >
                    Tüm vitrin ilanlarını gör
                  </p>
                </a>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>
      {activeShowcaseData?.length === 0 && (
        <div className="text-center py-8">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-gray-50/50 py-12 px-4 text-center backdrop-blur-sm">
            <div className="mb-4 rounded-full bg-orange-100 p-4 text-orange-600">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Vitrinde Yeriniz Hazır!
            </h3>
            <p className="mt-2 mb-6 text-gray-500">
              İlanınızı öne çıkarın, satış sürecini hızlandırın.
            </p>
            <a
              href="/user/ilan-ekle"
              className="rounded-lg bg-orange-400 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500"
            >
              Ücretsiz İlan Oluştur
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCase;
