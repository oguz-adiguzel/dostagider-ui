"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import api from "../lib/axios";

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

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSection = ({page}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await api.get("/blogs");
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`w-full px-5 lg:px-0 ${page === 'electric' ? 'bg-[#081135] lg:mt-0 text-white' : 'bg-[#F9FBFC] lg:mt-16'}  py-10 lg:py-20  `}>
      <div className="container mx-auto flex items-center justify-between ">
        <p className="text-xl font-semibold font-sans">Son Blog Yazıları</p>
        <div className="flex items-center space-x-2">
          <div
            id="swiper-button-prev-blog"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleLeft color="black" />
          </div>
          <div
            id="swiper-button-next-blog"
            className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
          >
            <FaAngleRight color="black" />
          </div>
        </div>
      </div>
      {loading && (
        <div className="container mx-auto mt-5 grid grid-cols-3 gap-x-8 justify-center items-center">
          <Skeleton width={"100%"} height={310} />
          <Skeleton width={"100%"} height={310} />
          <Skeleton width={"100%"} height={310} />
        </div>
      )}
      {!loading && (
        <div className="container mx-auto mt-8">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: "#swiper-button-next-blog",
              prevEl: "#swiper-button-prev-blog",
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
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="border p-3 rounded-2xl border-gray-300 h-64 lg:h-72">
                  <div className="h-44 lg:h-56 w-full rounded-xl overflow-hidden relative">
                    <div className="px-4 py-2 text-xs bg-white rounded-full absolute top-5 left-5 z-50 shadow-md flex justify-center items-center">
                      <p className="font-semibold text-black">{item.category}</p>
                    </div>
                    <img
                      className="w-full h-full object-cover rounded-xl hover:scale-110 duration-300"
                      src={item.imageUrl}
                    />
                  </div>
                  <div className="flex space-x-4 text-gray-600 text-xs mt-2">
                    <p>Admin</p>
                    <p>03.05.2025</p>
                  </div>
                  <a
                    href={`blogDetay/${item.slug}`}
                    className="font-semibold cursor-pointer hover:text-orange-500 duration-300"
                  >
                    {item.title}
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
