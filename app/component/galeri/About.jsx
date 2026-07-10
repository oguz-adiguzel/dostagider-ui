import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import parse from "html-react-parser";


const About = (about) => {
  
  return (
    <div className="w-full">
      <p className="font-semibold">Hakkımızda</p>
      <div className="mt-4">
        {parse(about.about)}
      </div>
      <p className="mt-14 font-semibold">İletişim Formu</p>
      <div className="w-full grid grid-cols-2 gap-x-14 mt-3">
        <div className="bg-gray-100 px-10 py-8">
          <div className="w-full grid grid-cols-2 gap-x-8">
            <div className="">
              <p className="text-sm font-semibold">Adınız</p>
              <input
                type="text"
                className="w-full h-10 border bg-white border-gray-300 shadow-2xl px-3"
              />
            </div>
            <div className="">
              <p className="text-sm font-semibold">Soyadınız</p>
              <input
                type="text"
                className="w-full h-10 border bg-white border-gray-300 shadow-2xl px-3"
              />
            </div>
          </div>
          <p className="text-sm font-semibold mt-5">Cep Telefonunuz</p>
          <input
            type="text"
            className="w-full h-10 border bg-white border-gray-300 shadow-2xl px-3"
          />
          <p className="text-sm font-semibold mt-5">Email Adresiniz</p>
          <input
            type="text"
            className="w-full h-10 border bg-white border-gray-300 shadow-2xl px-3"
          />
          <p className="text-sm font-semibold mt-5">Mesajınız</p>
          <textarea className="w-full h-60  border bg-white border-gray-300 shadow-2xl p-5"></textarea>
          <button className="w-full h-10 bg-orange-400 mt-4 text-sm text-white hover:bg-orange-500 duration-300 cursor-pointer">Mesaj Gönder</button>
        </div>
        <div className="bg-gray-100 flex flex-col items-center justify-center text-lg ">
            <p className="font-semibold">Sorularınız İçin Bize Ulaşınız</p>
            <p className="text-gray-600 px-40 text-center text-sm mt-2">Portföyümüzle ilgili aklınıza takılanlar için bize mesaj gönderin,mağazamız sorularınızı cevaplasın.</p>
            <FaEnvelopeOpenText size={190} color="orange" className="mt-3" />

        </div>
      </div>
    </div>
  );
};

export default About;
