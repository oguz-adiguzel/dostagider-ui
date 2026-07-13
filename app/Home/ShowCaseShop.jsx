"use client";
import React, { useEffect, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
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
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShowCaseShop = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(
        " https://dostagider-api.onrender.com/galleryFeatured/featured/active",
      );
      setData(response.data.galleries);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full mt-16">
      <div className="container mx-auto flex items-center justify-between ">
        <p className="text-xl font-semibold font-sans">Öne Çıkan Satıcılar</p>
        <div className="flex items-center space-x-2">
          <div
            id="swiper-button-prev-shop"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleLeft />
          </div>
          <div
            id="swiper-button-next-shop"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleRight />
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6">
        {data?.length !== 0 && (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={6}
            navigation={{
              nextEl: "#swiper-button-next-shop",
              prevEl: "#swiper-button-prev-shop",
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              400: {
                slidesPerView: 2.2,
              },
              639: {
                slidesPerView: 3,
              },
              865: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 6,
              },
              1500: {
                slidesPerView: 6,
              },
            }}
          >
            {loading && (
              <div className="w-full grid grid-cols-6 gap-x-8 justify-center items-center">
                <Skeleton width={"100%"} height={100} />
                <Skeleton width={"100%"} height={100} />
                <Skeleton width={"100%"} height={100} />
                <Skeleton width={"100%"} height={100} />
                <Skeleton width={"100%"} height={100} />
                <Skeleton width={"100%"} height={100} />
              </div>
            )}
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <a href={`galeri/${item.slug}`}>
                  <div className="w-full rounded-xl bg-white border border-gray-200 flex items-center justify-center space-x-2 pl-3 hover:scale-110 duration-200 cursor-pointer">
                    <div className="w-28 h-20 ">
                      <img
                        className="w-full h-full object-contain"
                        src={item.logoUrl}
                      />
                    </div>
                    <div className="h-20 overflow-hidden flex items-center">
                      <p className="font-sans font-semibold">
                        {item.galeriAdi}
                      </p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {data?.length === 0 && (
        <div className="text-center">
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
              Kurumsal üyelik oluşturun, galerinizi öne çıkarın.
            </p>
            <a
              href="/user/ilan-ekle"
              className="rounded-lg bg-orange-400 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500"
            >
              Kurumsal Üyelik Başvuru
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCaseShop;
