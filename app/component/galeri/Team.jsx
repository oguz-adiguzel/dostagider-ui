import React from "react";
import { FaUser } from "react-icons/fa";

const Team = (team) => {
  return (
    <div className="w-full">
      <p className="text-lg font-semibold">Ekibimiz</p>
      <div className="grid grid-cols-3 gap-10">
        {team?.team.map((item, index) => (
          <div key={index} className="px-5 py-2 border border-gray-400 ">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-100 flex justify-center items-center">
                {
                  item?.fotoUrl ? <img className="w-full object-contain" src={item?.fotoUrl} /> : <FaUser size={40} color="gray" />
                }
                
              </div>
              <div>
                <p className="font-semibold">
                  {item.ad} {item.soyad}
                </p>
                <p className="text-sm text-gray-500">{item.gorev}</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 mt-2 py-3">
              <p className="text-center text-orange-400 font-semibold">
                {item.telefon}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
