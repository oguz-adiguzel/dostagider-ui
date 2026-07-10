"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { TiTick } from "react-icons/ti";
const page = () => {
  return (
    <div className="container mx-auto py-20">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold font-sans">
          Paketler ve Ücretlendirme
        </h1>
        <p className="w-[600px] text-gray-500">
          İlanlarınızı daha fazla kişiye ulaştırmak ve satış sürecinizi
          hızlandırmak için ihtiyacınıza uygun paketleri keşfedin.
        </p>
      </div>
      <p className="mt-14 text-sm text-gray-400 text-center">
        Tüm fiyatlar KDV dahil olarak belirtilmiştir. dostagider.com, paket
        içerikleri ve fiyatlandırma üzerinde önceden bildirimde bulunmaksızın
        değişiklik yapma hakkını saklı tutar.
      </p>
      <p className="text-sm text-gray-400 text-center">
        Satın alınan hizmetler, belirtilen süre ve koşullar dahilinde
        geçerlidir.
      </p>
      <p className="mt-20 text-center font-semibold text-3xl font-sans">
        İlan Yeniden Yayınlama Paketleri
      </p>
      <div className="w-3/4 mx-auto mt-8">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          //   slidesPerView={"auto"}
          //   spaceBetween={30}
          slidesPerView={2}
          tabIndex={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Temel</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  7 gün ekstra ilan hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Paket sonunda ilan yayından kalkar
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺49</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Standart</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  14 gün ekstra ilan hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Paket sonunda ilan yayından kalkar
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺89</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Premium</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  30 gün ekstra ilan hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Paket sonunda ilan yayından kalkar
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺149</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <p className="mt-32 text-center font-semibold text-3xl font-sans">
        Vitrin İlan Yayınlama Paketleri
      </p>
      <div className="w-3/4 mx-auto mt-8">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          //   slidesPerView={"auto"}
          //   spaceBetween={30}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Temel</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  7 gün ekstra ilan hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Paket sonunda ilan yayından kalkar
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺49</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Standart</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  14 gün ekstra ilan hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Paket sonunda ilan yayından kalkar
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺89</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Premium</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  30 gün ekstra ilan hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Paket sonunda ilan yayından kalkar
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺149</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <p className="mt-32 text-center font-semibold text-3xl font-sans">
        Üyelik Paketleri
      </p>
        <div className="w-3/4 mx-auto mt-8">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          //   slidesPerView={"auto"}
          //   spaceBetween={30}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Bireysel Üyelik</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  1 adet ilan yayında bulundurma hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenmez
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  İlanlarda 10 adet görsel yükleme hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  1 adet ilan hakkının yanında 3 adet elektrikli araç ilan ekleme hakkı
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺0</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-50 rounded-3xl px-10 pb-10">
              <div className="h-28 border-b border-gray-200 flex items-center justify-between">
                <p className="text-3xl font-semibold font-sans">Kurumsal Üyelik</p>
              </div>
              <div className="flex items-center mt-10">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  20 adet ilan yayında bulundurma hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Aylık olarak yenilenen abonelik sistemi
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  İlanlarda 20 adet görsel yükleme hakkı
                </p>
              </div>
              <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                 20 adet ilan hakkının yanında 10 adet elektrikli araç ilan ekleme hakkı
                </p>
              </div>
               <div className="flex items-center mt-1">
                <TiTick className="text-gray-500 " size={20} />
                <p className=" text-sm text-gray-600">
                  Kurumsala özel galeri sayfası
                </p>
              </div>
              <div className="mt-10 py-5 border-t border-gray-200">
                <p className="text-6xl font-sans font-semibold">₺5000</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default page;
