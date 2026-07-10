import React from "react";

const InfoSection = () => {
  return (
    <div className="w-full px-5 lg:px-0 lg:container mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-24">
      <div className="py-10 lg:py-20 bg-[#E9F2FF] rounded-xl relative">
        <p className="text-3xl font-semibold font-sans ml-10 lg:ml-20">Araç mı</p>
        <p className="text-3xl font-semibold font-sans ml-10 lg:ml-20">arıyorsunuz ?</p>
        <p className="font-sans text-sm ml-10 lg:ml-20 mt-2">
          Müşterilerimize olağanüstü hizmet sunmaya kararlıyız.
        </p>

        <button className="bg-orange-400 w-32 h-12 text-white rounded-lg text-sm ml-10 lg:ml-20 mt-6 cursor-pointer">
          Başlayın
        </button>

        <img className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 w-24 lg:w-auto" src="electric-car.png" />
      </div>
      <div className="py-10 mt-5 lg:mt-0 lg:py-20 bg-orange-100 rounded-xl relative">
        <p className="text-3xl font-semibold font-sans ml-10 lg:ml-20">Aracınızı mı</p>
        <p className="text-3xl font-semibold font-sans ml-10 lg:ml-20">satıyorsunuz ?</p>
        <p className="font-sans text-sm ml-10 lg:ml-20 mt-2">
          Müşterilerimize olağanüstü hizmet sunmaya kararlıyız.
        </p>

        <button className="bg-orange-400 w-32 h-12 text-white rounded-lg text-sm ml-10 lg:ml-20 mt-6 cursor-pointer">
          Başlayın
        </button>

        <img className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 w-24 lg:w-auto" src="electric-car2.png" />
      </div>
    </div>
  );
};

export default InfoSection;
