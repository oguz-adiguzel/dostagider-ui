import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const page = () => {
  return (
    <div className="container mx-auto mb-32">
      <h1 className="text-2xl font-sans font-semibold mt-7">İletişim</h1>

      <iframe
        className="rounded-2xl mt-10"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d98139.24319000589!2d30.462414354647233!3d39.76544582233534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc3e08220c0e5f%3A0xbc89395938049a08!2sEski%C5%9Fehir!5e0!3m2!1str!2str!4v1773065562655!5m2!1str!2str"
        width="100%"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <p className="mt-12 text-2xl font-semibold">İletişime Geçin</p>
      <div className="w-full grid grid-cols-2 gap-x-16 mt-5">
        <div>
          <div className="w-full grid grid-cols-2 gap-x-5">
            <input
              type="text"
              className="w-full h-14 rounded-xl border border-gray-300 outline-0 px-2"
              placeholder="İsim"
            />
            <input
              type="text"
              className="w-full h-14 rounded-xl border border-gray-300 outline-0 px-2"
              placeholder="Soyisim"
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-x-5 mt-7">
            <input
              type="text"
              className="w-full h-14 rounded-xl border border-gray-300 outline-0 px-2"
              placeholder="Email"
            />
            <input
              type="text"
              className="w-full h-14 rounded-xl border border-gray-300 outline-0 px-2"
              placeholder="Telefon"
            />
          </div>
          <textarea
            className="w-full h-96 border border-gray-300 rounded-xl p-5 mt-7"
            placeholder="Mesaj"
          ></textarea>
          <button className="mt-3 px-8 py-2 bg-orange-400 hover:bg-orange-500 duration-200 rounded-xl text-white cursor-pointer">
            Mesaj Gönder
          </button>
        </div>
        <div className="w-full border border-gray-300 p-10 rounded-2xl">
          <p className="text-lg font-semibold">İletişim bilgileri</p>
          <div className="text-sm mt-7">
            <p className="font-semibold">Platform İsmi</p>
            <p className="text-gray-500">dostagider.com</p>
          </div>
          <div className="text-sm mt-7">
            <p className="font-semibold">Proje Bilgisi</p>
            <p className="text-gray-500">Otomobil İlan Platformu</p>
          </div>
          <div className="text-sm mt-7">
            <p className="font-semibold">Sorumlu Kişi</p>
            <p className="text-gray-500">Oğuz Adıgüzel</p>
          </div>
          <div className="text-sm mt-7">
            <p className="font-semibold">Kullanılan Teknolojiler</p>
            <p className="text-gray-500">Nextjs, Nodejs, MongoDB</p>
          </div>
          <div className="text-sm mt-7">
            <p className="font-semibold">Proje Yapısı</p>
            <p className="text-gray-500">
              Bireysel ve Kurumsal üyelik sistemi, Elektrikli araç ilan
              ayrıcalıkları, Kurumsal Üye abonelik sistemi, Vitrin gibi
              sistemler için ödeme ekranları.
            </p>
          </div>
          <div className="text-sm mt-7">
            <p className="font-semibold">İletişim Kanalları</p>
            <div className="flex items-center space-x-2 mt-2">
              <a target="_blanck" href="https://www.linkedin.com/in/oğuz-adıgüzel/">
                <FaLinkedin size={24} />
              </a>
              <a target="_blanck" href="https://github.com/oguz-adiguzel">
                <FaGithub size={24} />
              </a>
              <a href="mailto:oguz_adiguzel@outlook.com">
                <IoMail size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
