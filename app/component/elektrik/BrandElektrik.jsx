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
// import api from "../lib/axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import api from "@/app/lib/axios";

const BrandElektrik = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getAllBrands = async () => {
    try {
      const response = await api.get("/car-brands/all");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="w-full py-24 bg-[#04091C] px-5 lg:px-0">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-xl font-semibold font-sans text-white">
          Premium Markalarımızı Keşfedin
        </p>
        <div className="flex items-center space-x-2">
          <div
            id="swiper-button-prev"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleLeft />
          </div>
          <div
            id="swiper-button-next"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleRight />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={6}
          navigation={{
            nextEl: "#swiper-button-next",
            prevEl: "#swiper-button-prev",
          }}
           breakpoints={{
            0: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 2,
            },
            639: {
              slidesPerView: 3,
            },
            865: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 5,
            },
            1500: {
              slidesPerView: 6,
            },
          }}
        >
         {loading && (
                    <>
                    <div className="w-full hidden lg:grid grid-cols-6 gap-x-5 justify-center items-center">
                      <Skeleton width={"100%"} height={220} />
                      <Skeleton width={"100%"} height={220} />
                      <Skeleton width={"100%"} height={220} />
                      <Skeleton width={"100%"} height={220} />
                      <Skeleton width={"100%"} height={220} />
                      <Skeleton width={"100%"} height={220} />
                    </div>
                     <div className="w-full grid lg:hidden grid-cols-2 gap-x-5 justify-center items-center">
                      <Skeleton width={"100%"} height={150} />
                      <Skeleton width={"100%"} height={150} />
                    </div>
                    </>
                  )}

          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <a className="" href={`/kategori?brand=${item.brandName}`}>
              <div className="w-full py-2 lg:py-9 rounded-xl bg-white border border-gray-200 flex flex-col justify-center items-center hover:shadow-xl duration-300">
                <div className="w-28 h-28 ">
                  <img
                    className="w-full h-full object-contain"
                    src={item.logoUrl}
                  />
                </div>
                <p className="font-sans font-semibold">{item.brandName}</p>
              </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandElektrik;
