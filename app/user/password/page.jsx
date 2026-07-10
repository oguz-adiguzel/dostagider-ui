import React from "react";

const page = () => {
  return (
    <div className="w-full h-full py-10 px-14 font-sans overflow-y-scroll">
      <h2 className="text-3xl font-semibold">Şifre Değiştir</h2>
      <div className="w-1/2 py-10 border border-gray-300 rounded-2xl mt-10 px-8">
        <div className="w-full py-2 border border-gray-300 rounded-2xl px-3">
          <p className="text-xs text-gray-400">Eski Şifre</p>
          <input
            type="password"
            className="w-full outline-0 px-1"
            placeholder="Şifre..."
          />
        </div>
        <div className="w-full py-2 border border-gray-300 rounded-2xl px-3 mt-3">
          <p className="text-xs text-gray-400">Yeni Şifre</p>
          <input
            type="password"
            className="w-full outline-0 px-1"
            placeholder="Şifre..."
          />
        </div>
        <div className="w-full py-2 border border-gray-300 rounded-2xl px-3 mt-3">
          <p className="text-xs text-gray-400">Yeni Şifre Tekrar</p>
          <input
            type="password"
            className="w-full outline-0 px-1"
            placeholder="Şifre..."
          />
        </div>
        <button className="w-60 h-10 mt-7 bg-orange-400 text-white rounded-2xl cursor-pointer hover:shadow-md shadow-orange-400 duration-300 ">Kaydet</button>
      </div>
    </div>
  );
};

export default page;
