import React from "react";
import { TiTick } from "react-icons/ti";

const page = () => {
  return (
    <div className="w-full py-32">
      <h1 className="text-center text-3xl font-sans font-semibold">
        Üyelik Planları
      </h1>
      <div className="container mx-auto grid grid-cols-4 gap-x-5 mt-20 px-20">
        <div className="border rounded-2xl border-gray-200 shadow-md p-3 relative">
          <p className="text-2xl font-sans font-semibold">Ücretsiz</p>
          <p className="font-extralight mt-2">Temel Plan</p>
          <p className="text-sm mt-3 text-gray-500">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit.
          </p>
          <div className="flex items-center space-x-2 mt-5">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Aylık 1 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Yılda 5 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">120 gün ilan görünürlüğü</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">
              Elektrikli araçlarda sınırsız ilan
            </p>
          </div>
          <div className="w-full flex justify-center mt-10 absolute bottom-3 pr-3">
            <button className="px-10 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded-full text-sm cursor-pointer">
              Şimdi Satın Al
            </button>
          </div>
        </div>

        <div className="border rounded-2xl border-gray-200 shadow-md p-3 relative">
          <p className="text-2xl font-sans font-semibold">₺120</p>
          <p className="font-extralight mt-2">Standart Plan</p>
          <p className="text-sm mt-3 text-gray-500">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit.
          </p>
          <div className="flex items-center space-x-2 mt-5">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Aylık 2 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Yılda 8 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">180 gün ilan görünürlüğü</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">
              Elektrikli araçlarda sınırsız ilan
            </p>
          </div>
          <div className="w-full flex justify-center mt-10 absolute bottom-3 pr-3">
            <button className="px-10 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded-full text-sm cursor-pointer">
              Şimdi Satın Al
            </button>
          </div>
        </div>
        <div className="border rounded-2xl border-gray-200 shadow-md p-3 relative">
          <p className="text-2xl font-sans font-semibold">₺380</p>
          <p className="font-extralight mt-2">Gelişmiş Plan</p>
          <p className="text-sm mt-3 text-gray-500">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit.
          </p>
          <div className="flex items-center space-x-2 mt-5">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Aylık 4 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Yılda 8 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Sınırsız ilan görünürlüğü</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">
              Elektrikli araçlarda sınırsız ilan
            </p>
          </div>
          <div className="w-full flex justify-center mt-10 absolute bottom-3 pr-3">
            <button className="px-10 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded-full text-sm cursor-pointer">
              Şimdi Satın Al
            </button>
          </div>
        </div>

         <div className="border rounded-2xl border-gray-200 shadow-md p-3">
          <p className="text-2xl font-sans font-semibold">₺2500</p>
          <p className="font-extralight mt-2">Kurumsal Plan</p>
          <p className="text-sm mt-3 text-gray-500">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit.
          </p>
          <div className="flex items-center space-x-2 mt-5">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Aylık 10 ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Yılda sınırsız ilan hakkı</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Sınırsız ilan görünürlüğü</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Kurumsal logo ekleme</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Galeri ismine özel ürünler</p>
          </div>
           <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">Kurumsala özel kampanyalar</p>
          </div>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex justify-center items-center">
              <TiTick color="orange" />
            </div>
            <p className="text-sm text-gray-600">
              Elektrikli araçlarda sınırsız ilan
            </p>
          </div>
          <div className="w-full flex justify-center mt-10 pb-1">
            <button className="px-10 py-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white duration-300 rounded-full text-sm cursor-pointer">
              İletişime Geçin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
