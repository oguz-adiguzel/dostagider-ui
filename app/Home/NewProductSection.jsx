"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import api from "../lib/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductPrice from "../component/ProductPrice";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";


const NewProductSection = () => {
  const [newListingData, setNewListingData] = useState();
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUser();
  const router = useRouter();

  const getNewListingData = async () => {
    try {
      const response = await api.get("/ilan/yeni-ilanlar");
      setNewListingData(response.data.listings);
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
      // alert(error.response.data.message || "Hata Oluştu");
       toast.warn(error.response.data.message , {
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
    getNewListingData();
  }, []);
  return (
    <div className="w-full px-5 lg:px-0 lg:container mx-auto mt-16">
      {/* <ToastContainer /> */}
      <div className="w-full flex items-center justify-between ">
        <p className="text-xl font-semibold font-sans">Yeni Eklenen İlanlar</p>
        <div className="flex items-center space-x-2">
          <div
            id="swiper-button-prev-new"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleLeft />
          </div>
          <div
            id="swiper-button-next-new"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleRight />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 flex gap-x-16">
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
        {newListingData?.length !== 0 && <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            nextEl: "#swiper-button-next-new",
            prevEl: "#swiper-button-prev-new",
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
          {newListingData?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full border border-gray-300 rounded-xl shadow-xl">
                <div className="w-full h-56 rounded-t-xl relative overflow-hidden">
                  <div
                    onClick={() => {
                      if (user?.favoriler.includes(item._id)) {
                        removeFav(item._id);
                      } else addFavorite(item._id);
                    }}
                    className="w-8 h-8 bg-white rounded-full absolute top-2 right-2 flex justify-center items-center cursor-pointer z-40"
                  >
                    {user?.favoriler.includes(item._id) ? (
                      <MdFavorite color="red" />
                    ) : (
                      <MdFavoriteBorder color="black" />
                    )}
                  </div>
                  <img
                    className="w-full h-full rounded-t-xl hover:scale-110 duration-500 object-contain"
                    src={item.gorseller[0]}
                  />
                </div>
                <div className="w-full px-5 py-2 bg-[#050B20] rounded-b-xl text-white">
                  <div className="w-full h-5 overflow-hidden flex">
                    <a
                      href={`/ilan/${item.ilanNo}`}
                      className="font-semibold w-full hover:text-orange-400 duration-200"
                    >
                      {item.baslik}
                    </a>
                  </div>

                  <div className="w-full flex justify-between mt-2 text-sm border-b border-gray-300 pb-1">
                    <p>
                      {item.brand} / {item.model}
                    </p>
                    <p>{item.aracYili}</p>
                  </div>

                  <div className="w-full grid grid-cols-3 mt-3 text-sm border-b border-gray-600 pb-2">
                    <div className="flex flex-col items-center space-y-1 ">
                      <img src="km-icon-white.png" />
                      <p className="text-white font-semibold">{item.km} km</p>
                    </div>
                    <div className="flex flex-col items-center space-y-1 ">
                      <img src="petrol-icon-white.png" />
                      <p className="text-white font-semibold">{item.yakit}</p>
                    </div>
                    <div className="flex flex-col items-center space-y-1 ">
                      <img src="vites-icon-white.png" />
                      <p className="text-white font-semibold">{item.vites}</p>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center mt-4 text-sm pb-2">
                    <p className="text-lg font-bold font-sans text-white">
                      <ProductPrice price={item.price} locale={"tr"} />
                      {/* {item.price} ₺ */}
                    </p>
                    <p className="text-white cursor-pointer text-xs">
                      {item.sehir} / {item.ilce}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {loading === false && (
            <SwiperSlide>
              <a
                href="/kategori?sort=date_desc&page=1"
                className="w-full h-full
      border border-gray-300 rounded-xl shadow-xl
      flex flex-col justify-center items-center
      hover:bg-orange-50 transition
      cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <FaAngleRight className="text-orange-600 text-2xl" />
                </div>
                <p className="text-lg font-semibold text-orange-700">
                  Tüm ilanlarını gör
                </p>
              </a>
            </SwiperSlide>
          )}
        </Swiper>}
      </div>

      {newListingData?.length === 0 && (
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
              Platformda Yeriniz Hazır!
            </h3>
            <p className="mt-2 mb-6 text-gray-500">
              İlanınızı ekleyin, burada görünmeye başlayın.
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

export default NewProductSection;
