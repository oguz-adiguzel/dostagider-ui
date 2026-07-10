import React from "react";

const ElectricSection = ({page}) => {
  return (
    <div className={`electric-section ${page === 'electric' ? 'mt-0': 'mt-16'}`}>
      <div className="w-full lg:container px-5 lg:px-0 mx-auto">
        <div className="w-full lg:w-1/3 h-[300px] lg:h-[600px] text-white text-base lg:text-3xl flex flex-col justify-center">
          <p className="text-white">
            <span className="text-orange-400">Dostagider.</span><span className="text-orange-500">com</span> da
          </p>
          <p>Elektrikli araç ilanlarında</p>
          <p>Sınırsız ilan hakkı ve</p>
          <p>Ücretsiz vitrinde görünme imkanı ile</p>
          <p>Aracını kolayca sat</p>
          <button className="bg-[#405FF2] text-xs lg:text-sm w-28 lg:w-40 lg:h-10 h-8 rounded-sm mt-5 cursor-pointer">İlanları Keşfet</button>
        </div>
      </div>
    </div>
  );
};

export default ElectricSection;
