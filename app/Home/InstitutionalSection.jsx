import React from "react";

const InstitutionalSection = ({page}) => {
  return (
    <div className={`w-full px-5 lg:px-0 py-10  ${page === 'electric' ? 'mt-0 bg-[#0F1843]' : 'mt-20 bg-[#F9FBFC]'}`}>
      <div className="w-full lg:container mx-auto grid grid-cols-1 lg:grid-cols-2 px-0 lg:px-36">
        <div className={`flex flex-col justify-start lg:justify-center ${page === 'electric' ? 'text-white' : ''}`}>
            <p className="text-3xl font-sans font-semibold">Dostagider.com kurumsal</p>
            <p className="text-3xl font-sans font-semibold">sistemini keşfedin</p>
            <p className="text-sm mt-2">İşletmenizi dostagider.com'a taşıyın avantajlı</p>
            <p className="text-sm"> fırsatlardan yararlanın</p>
            <a href="/kurumsal" className="flex items-center justify-center bg-orange-400 hover:bg-orange-500 duration-200 text-white w-28 lg:w-32 h-10 text-xs rounded-md mt-4 cursor-pointer">
            <p>Kurumsal Başvuru</p>
            </a>
        </div>
        <div className="flex justify-start">
          <img className="w-auto" src="kurumsal.png" />
        </div>
      </div>
    </div>
  );
};

export default InstitutionalSection;
