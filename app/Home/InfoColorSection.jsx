import React from "react";

const InfoColorSection = ({page}) => {
  return (
    <>
      <div className={`w-full lg:container mx-auto bg-gray-50 grid grid-cols-2 lg:grid-cols-4 ${page === 'electric' ? 'mt-0' : 'mt-16'} py-10 rounded-2xl px-5 lg:px-16`}>
        <div className="flex flex-col justify-center text-orange-500">
          <p className="font-sans font-semibold text-base lg:text-3xl">Dostagider.com kimdir?</p>
          <p className="text-xs lg:text-sm">
           Türkiye'nin otomobil ilan platformlarında yeni yüzü
          </p>
        </div>
        <div className="flex justify-end">
          <img src="color-section-1.png" />
        </div>
        <div className="flex justify-end">
          <img src="color-section-2.png" />
        </div>
        <div className="flex justify-end">
          <img src="color-section-3.png" />
        </div>
      </div>
    </>
  );
};

export default InfoColorSection;
