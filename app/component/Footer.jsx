import React from "react";
import {
  FaApple,
  FaFacebookF,
  FaGithub,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="w-full bg-[#050B20] flex flex-col items-center py-10">
      <img className="w-60" src="/dostagider-logo.png" />
      <p className="text-xs text-gray-200 font-sans mt-1">
        Fiyat güncellemeleri, alışveriş ipuçları ve daha fazlasını alın!
      </p>
      <div className="w-full px-5 lg:px-0 lg:w-1/4 h-12 flex items-center relative mt-5">
        <input
          className="bg-white outline-0 w-full h-12 pl-3 rounded-lg"
          type="text"
          placeholder="Email adresiniz"
        />
        <button className="text-white bg-orange-400 h-10 w-24 rounded-lg absolute right-6 lg:right-2 text-sm">
          Katıl
        </button>
      </div>
      <div className="container mt-12 grid grid-cols-3 lg:grid-cols-5 border-b border-gray-600 pb-8">
        <div className="text-white font-sans">
          <p className="text-base lg:text-lg">Şirket</p>
          <ul className="text-sm mt-5 space-y-4">
            <li className="cursor-pointer text-xs lg:text-base">
              <a href="/hakkimizda">Hakkımızda</a>
            </li>
            <li className="cursor-pointer text-xs lg:text-base">
              <a href="/blog">Blog</a>
            </li>
            <li className="cursor-pointer text-xs lg:text-base">
              <a href="/servisler">Servisler</a>
            </li>
            <li className="cursor-pointer text-xs lg:text-base">
              <a href="/SSS">SSS</a>
            </li>
            <li className="cursor-pointer text-xs lg:text-base">Şartlar</li>
            <li className="cursor-pointer text-xs lg:text-base">
              <a href="/iletisim">İletişim</a>
            </li>
          </ul>
        </div>

        <div className="text-white font-sans">
          <p className="text-base lg:text-lg">Hızlı Bağlantılar</p>
          <ul className="text-sm mt-5 space-y-4">
            <li className="cursor-pointer text-xs lg:text-base">İletişime geçin</li>
            <li className="cursor-pointer text-xs lg:text-base">Yardım merkezi</li>
            <li className="cursor-pointer text-xs lg:text-base">Canlı sohbet</li>
            <li className="cursor-pointer text-xs lg:text-base">Nasıl çalışır?</li>
          </ul>
        </div>

        <div className="text-white font-sans">
          <p className="text-base lg:text-lg">Markalarımız</p>
          <ul className="text-sm mt-5 space-y-4">
            <li className="cursor-pointer text-xs lg:text-base">Toyota</li>
            <li className="cursor-pointer text-xs lg:text-base">Audi</li>
            <li className="cursor-pointer text-xs lg:text-base">Mercedes-Benz</li>
            <li className="cursor-pointer text-xs lg:text-base">BMW</li>
            <li className="cursor-pointer text-xs lg:text-base">Volkswagen</li>
            <li className="cursor-pointer text-xs lg:text-base">Ford</li>
            <li className="cursor-pointer text-xs lg:text-base">Peugeot</li>
          </ul>
        </div>

        <div className="text-white font-sans">
          <p className="text-base lg:text-lg">Kasa Tipi</p>
          <ul className="text-sm mt-5 space-y-4">
            <li className="cursor-pointer text-xs lg:text-base">Sedan</li>
            <li className="cursor-pointer text-xs lg:text-base">Hatchback</li>
            <li className="cursor-pointer text-xs lg:text-base">SUV</li>
            <li className="cursor-pointer text-xs lg:text-base">Coupe</li>
            <li className="cursor-pointer text-xs lg:text-base">Pickup</li>
            <li className="cursor-pointer text-xs lg:text-base">MPV</li>
            <li className="cursor-pointer text-xs lg:text-base">Roadstar</li>
          </ul>
        </div>

        <div className="text-white font-sans">
          <p className="text-base lg:text-lg">Mobil Uygulamalarımız</p>
          <div className="w-full mt-5 flex items-center  space-x-6">
            <div className="w-16 h-16 bg-[#08133a] rounded-lg flex justify-center items-center cursor-pointer">
              <FaApple size={40} color="white" />
            </div>
            <div className="w-16 h-16 bg-[#08133a] rounded-lg flex justify-center items-center cursor-pointer">
              <FaGooglePlay size={30} color="white" />
            </div>
          </div>
          <p className="mt-7 font-sans font-semibold">Bizimle Bağlantı Kurun</p>
          <div className="flex items-center text-gray-300 mt-4 space-x-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
      <div className="container mt-5 text-white text-sm flex flex-col lg:flex-row justify-between items-center">
        <p className="text-xs lg:text-base">© 2025 Oğuz Adıgüzel Tüm hakları saklıdır.</p>
        <div className="flex items-center text-lg space-x-3">
          <p className="text-xs">İletişime geçin :</p>
          <FaLinkedinIn />
          <FaGithub />
          <CiMail />
        </div>
      </div>
    </div>
  );
};

export default Footer;
