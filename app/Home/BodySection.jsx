"use client";
import React, { useEffect, useState } from "react";
import api from "../lib/axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BodySection = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getAllTypes = async () => {
    try {
      const response = await api.get("/body-types");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getAllTypes();
  }, []);
  return (
    <div className="w-full px-5 lg:px-0 lg:container mx-auto mt-0">
      <div className="flex items-center justify-between">
        <p className="font-sans text-xl font-semibold">Bir Kasa Tipi Seçin</p>
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
      <div className="mt-1">
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
              slidesPerView: 6,
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
            <>
              <div className="w-full hidden lg:grid grid-cols-6 gap-x-8 justify-center items-center">
                <Skeleton width={"100%"} height={120} />
                <Skeleton width={"100%"} height={120} />
                <Skeleton width={"100%"} height={120} />
                <Skeleton width={"100%"} height={120} />
                <Skeleton width={"100%"} height={120} />
                <Skeleton width={"100%"} height={120} />
              </div>
              <div className="w-full grid lg:hidden grid-cols-2 gap-x-5 justify-center items-center">
                <Skeleton width={"100%"} height={100} />
                <Skeleton width={"100%"} height={100} />
              </div>
            </>
          )}
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div key={index} className="px-2 flex flex-col items-center">
                <img className="w-full" src={item.imageUrl} />
                <p className="text-sm font-semibold">{item.bodyType}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* {loading && (
        <div className="w-full grid grid-cols-6 gap-x-5 justify-center items-center">
          <Skeleton width={"100%"} height={180} />
          <Skeleton width={"100%"} height={180} />
          <Skeleton width={"100%"} height={180} />
          <Skeleton width={"100%"} height={180} />
          <Skeleton width={"100%"} height={180} />
          <Skeleton width={"100%"} height={180} />
        </div>
      )} */}
      {/* <div className="w-full grid grid-cols-6 gap-x-10">
        {data?.map((item, index) => (
          <div key={index} className="px-2 flex flex-col items-center">
            <img className="w-full" src={item.imageUrl} />
            <p className="text-sm font-semibold">{item.bodyType}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BodySection;
