"use client";
import React from "react";
import { MdOutlineNoPhotography } from "react-icons/md";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import ProductPrice from "./ProductPrice";
import { PiChargingStation } from "react-icons/pi";

const ListingCard = (data) => {
  const router = useRouter();
  return (
    <div
      className={`border ${data.data.isEV ? "border-blue-400" : "border-gray-300"}  rounded-xl p-3`}
    >
      {data?.data?.gorseller?.length > 0 ? (
        <>
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Thumbs]}
            pagination={true}
            mousewheel={true}
            navigation
          >
            {data.data.gorseller?.map((img) => (
              <SwiperSlide>
                <a href={`/ilan/${data.data.ilanNo}`}>
                <div className="w-full h-52 relative group cursor-pointer">
                  {data.data.isEV && (
                    <div className="absolute top-2 left-2 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <PiChargingStation size={28} className="text-blue-400" />
                    </div>
                  )}

                  {data.data.isShowcased && (
                    <p className="absolute top-2 right-2 px-4 py-0.5 font-semibold text-xs bg-orange-500 text-white flex items-center justify-center">
                      Vitrin
                    </p>
                  )}
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={img}
                  />
                </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="w-full h-52 flex justify-center items-center">
          <MdOutlineNoPhotography color="gray" size={90} />
        </div>
      )}

      <div className="flex datas-center space-x-1 mt-2 text-sm font-sans">
        <p className="font-semibold">{data.data.brand}</p>
        <p>{data.data.model}</p>
        <p>{data.data.variant1}</p>
        <p>{data.data.variant2 ? data.data.variant2 : ""}</p>
        <p>{data.data.variant3 ? data.data.variant3 : ""}</p>
      </div>
      <div className="w-full h-7 mt-2 overflow-hidden">
        <a
          href={`/ilan/${data.data.ilanNo}`}
          className={`font-sans cursor-pointer ${data.data.isEV ? 'hover:text-blue-500' : 'hover:text-orange-500'} hover:font-semibold  duration-200`}
        >
          {data.data.baslik}
        </a>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-7 gap-y-3 font-sans mt-2">
        <div className="py-1 bg-gray-200 flex datas-center justify-center">
          <p className="text-sm">{data.data.aracYili}</p>
        </div>
        <div className="py-1 bg-gray-200 flex datas-center justify-center">
          <p className="text-sm">
            {data.data.km} <span className="font-semibold">Km</span>
          </p>
        </div>
        <div className="py-1 bg-gray-200 flex datas-center justify-center">
          <p className="text-sm">{data.data.yakit}</p>
        </div>
        <div className="py-1 bg-gray-200 flex datas-center justify-center">
          <p className="text-sm">{data.data.vites}</p>
        </div>
      </div>
      <div className="w-full flex justify-between datas-center mt-4 font-sans">
        <p className="font-semibold text-lg">
          {data.data.price ? (
            <ProductPrice price={data.data.price} locale={"tr"} />
          ) : (
            "Belirtilmemiş"
          )}
        </p>
        <p className="text-sm text-red-600">
          {data.data.sehir ? data.data.sehir : "Belirtilmemiş"}
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
