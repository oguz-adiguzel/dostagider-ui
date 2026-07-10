"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import api from "../lib/axios";

const page = () => {
  const [brands, setBrands] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null);

  useEffect(() => {
    api.get("/price-lists").then((res) => {
      setBrands(res.data.data || res.data);
      setActiveBrand(res.data.data?.[0] || res.data?.[0]);
    });
  }, []);

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sıfır Araç Listesi",
    itemListElement: brands.flatMap((brand) =>
      brand.models.map((model, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Vehicle",
          name: `${brand.brand} ${model.name}`,
          brand: {
            "@type": "Brand",
            name: brand.brand,
          },
          fuelType: "Electric", // varsa modelden al
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            price: Math.min(...model.packages.map((p) => p.price)),
            availability: "https://schema.org/InStock",
          },
        },
      }))
    ),
  };

  return (
    <div className="w-full px-5 lg:px-0 lg:container mx-auto pb-20">
      <div className="flex items-center space-x-2 text-xs lg:mt-16">
        <p>Anasayfa</p>
        <p>/</p>
        <p>Sıfır Araç Listesi</p>
      </div>
      <h1 className="text-3xl font-semibold mt-2">Sıfır Araç Listesi</h1>
      <div className="w-full lg:w-3/4 mx-auto mt-7 lg:mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-700">
            Fiyat Bilgilendirmesi:
          </span>{" "}
          Bu sayfada yer alan sıfır araç fiyatları, ilgili markaların resmi
          kaynaklarından derlenmektedir. Fiyatlar; donanım, kampanya, vergi,
          stok durumu ve döviz kurlarına bağlı olarak değişiklik gösterebilir.
          Nihai satış fiyatı için yetkili satıcı ile iletişime geçilmesi tavsiye
          edilir. Platformumuzda yer alan bilgiler bağlayıcı nitelik taşımaz.
        </p>
      </div>
      <div className="flex items-center justify-between mt-12">
        <p className="font-semibold text-xl">Markalar</p>
        <div className="flex items-center space-x-2">
          <div
            id="swiper-button-prev"
            className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center cursor-pointer hover:bg-orange-500 duration-300"
          >
            <IoMdArrowDropleft size={30} />
          </div>
          <div
            id="swiper-button-next"
            className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center cursor-pointer hover:bg-orange-500 duration-300"
          >
            <IoMdArrowDropright size={30} />
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={8}
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
          {brands.map((brand) => (
            <SwiperSlide key={brand._id}>
              <div
                onClick={() => setActiveBrand(brand)}
                className={`w-full py-5 border rounded-2xl px-3 cursor-pointer
          ${
            activeBrand?.slug === brand.slug
              ? "border-orange-400"
              : "border-gray-300"
          }`}
              >
                <div className="w-full h-20 mx-auto">
                  <img
                    className="w-full h-full object-contain"
                    src={brand.logoUrl}
                    alt={brand.brand}
                  />
                </div>
                <p
                  className={`text-lg font-semibold text-center ${
                    activeBrand?.slug === brand.slug
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                >
                  {brand.brand}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full lg:w-3/4 mx-auto mt-10 space-y-8">
        {activeBrand?.models.map((model) => {
          const minPrice = Math.min(...model.packages.map((p) => p.price));

          return (
            <Accordion key={model.slug}>
              <AccordionSummary>
                <div className="w-full px-3 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-x-3">
                  <div className="col-span-1">
                    <img
                      className="w-full h-full object-contain"
                      src={model.photoUrl}
                    />
                  </div>

                  <div className="col-span-1 flex items-start lg:items-center lg:pl-3">
                    <p className="text-2xl font-semibold">{model.name}</p>
                  </div>

                  <div className="col-span-1 flex flex-col justify-center relative">
                    <p className="text-2xl font-semibold">
                      {minPrice.toLocaleString("tr-TR")} TL
                    </p>
                    <div className="text-xs lg:text-sm lg:absolute bottom-0">
                      <p className="text-gray-400 font-semibold">
                        Toplam {model.packages.length} farklı paket bulundu
                      </p>
                      <p className="text-orange-400">
                        Seçenekleri görmek için tıklayınız
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <div className="w-full">
                  <p className="font-semibold text-lg mb-2">Paketler</p>

                  {model.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="grid grid-cols-3 items-center py-3 border-t border-b px-8 text-sm lg:text-lg font-semibold"
                    >
                      <div>{pkg.name}</div>
                      <div className="text-center text-orange-400">
                        {pkg.motorType || "—"}
                      </div>
                      <div className="text-right">
                        {pkg.price.toLocaleString("tr-TR")} ₺
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(vehicleSchema),
        }}
      />
    </div>
  );
};

export default page;
