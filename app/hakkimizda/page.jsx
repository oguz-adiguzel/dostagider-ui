import React from "react";
import { TiTick } from "react-icons/ti";

const page = () => {
  return (
    <div className="container mx-auto mb-32">
      <h1 className="text-2xl font-sans font-semibold mt-7">Hakkımızda</h1>
      <div className="w-full grid grid-cols-2 mt-10 items-center">
        <div className="text-4xl font-sans font-semibold space-y-2">
          <h2 className="text-shadow-md text-shadow-orange-400">Araç Alım Satımında Yeni Nesil</h2>
          <h2 className="text-shadow-md text-shadow-orange-400"> Deneyim</h2>
          {/* <h2>Araç Alım Satımında </h2> */}
          <h2 className="text-shadow-md text-shadow-orange-400">Dostça Bir Başlangıç</h2>
        </div>
        <div className=" text-gray-600">
          <p className="font-semibold">
            dostagider.com, ikinci el araç alım satım sürecini daha güvenli,
            daha şeffaf ve daha pratik hale getirmek amacıyla geliştirilmiş
            modern bir ilan platformudur.
          </p>
          <p className="mt-3">
            Bu platform, piyasadaki karmaşık, güven problemi yaratan ve
            kullanıcı deneyimini ikinci plana atan sistemlere bir alternatif
            olarak doğdu. Amacımız; araç alım satımını herkes için daha
            erişilebilir, anlaşılır ve güvenilir bir hale getirmek.
          </p>
          <p className="mt-3">
            <span className="text-orange-600 font-semibold">
              dostagider.com
            </span>{" "}
            arkasında hazır bir sistem değil, sıfırdan tasarlanmış bir yazılım
            vizyonu var. Platformun tüm teknik altyapısı, kullanıcı deneyimi ve
            güvenlik yapısı birebir geliştirilerek inşa edildi. Modern web
            teknolojileri kullanılarak performans, güvenlik ve ölçeklenebilirlik
            ön planda tutuldu.
          </p>
          <p className="mt-3">
            Biz yalnızca bir ilan sitesi değil;
            <ul>
              <li>✔ Kullanıcı dostu arayüzü olan</li>
              <li>✔ Hızlı ve sade ilan oluşturma süreci sunan</li>
              <li>
                ✔ Elektrikli ve içten yanmalı araçları doğru kategorize eden
              </li>
              <li>✔ Güvenli iletişim altyapısı sağlayan</li>
              <li></li>
            </ul>
            bir dijital araç pazarı oluşturuyoruz.
          </p>
          <p className="mt-3">
            Startup ruhuyla sürekli gelişen, kurumsal bakış açısıyla güven veren
            bir yapı inşa ediyoruz. Her yeni özellik, gerçek kullanıcı
            ihtiyaçları düşünülerek tasarlanıyor.
          </p>
          <p className="mt-3">
            dostagider.com büyürken temel ilkemiz değişmeyecek: Şeffaflık, güven
            ve teknoloji.
          </p>
          <p className="mt-1 font-semibold">Şeffaflık, güven ve teknoloji.</p>

          <p className="mt-3">
            Çünkü bizce araç alım satımı sadece bir işlem değil, karşılıklı
            güvene dayanan bir başlangıçtır.
          </p>
          <p className="mt-3">dostagider.com, yazılım tutkusu ve girişimci bakış açısıyla <span className="text-orange-600 font-semibold">
              Oğuz Adıgüzel
            </span>{" "} tarafından geliştirilmiştir.</p>
        </div>
      </div>
      <div className="w-full py-20 mt-10 grid grid-cols-12 gap-x-9">
        <div className="col-span-2 flex flex-col justify-between">
          <div className="w-full bg-orange-400 h-80 rounded-2xl">
            <p></p>
          </div>
          <img className="w-full h-56" src="about-1.png" />
        </div>
        <div className="col-span-5">
          <img className="w-full" src="about-2.png" />
        </div>
        <div className="col-span-5 flex flex-col justify-between">
          <img className="w-full h-1/2" src="about-3.png" />
          <div className="w-full h-60 grid grid-cols-10 gap-x-6">
            <div className="col-span-4 h-full">
              <img className="w-full h-full" src="about-4.png" />
            </div>
            <div className="col-span-6 h-full">
              <img className="w-full h-full" src="about-5.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
        <p className="text-2xl font-sans font-semibold">
          Neden Bizi Seçmelisiniz?
        </p>
        <div className="w-full grid grid-cols-4 gap-x-5 mt-8">
          <div className="flex flex-col items-center">
            <img src="about-icon-1.png" />
            <p className="font-sans mt-5 font-semibold">
              Özel Finansman Teklifleri
            </p>
            <p className="text-sm mt-1 text-center">
              Size para kazandıracak finansal çözümler bulabilen stressiz finans
              departmanımız.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="about-icon-2.png" />
            <p className="font-sans mt-5 font-semibold">
              Güvenilir Araba Bayii
            </p>
            <p className="text-sm mt-1 text-center">
              Size para kazandıracak finansal çözümler bulabilen stressiz finans
              departmanımız.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="about-icon-3.png" />
            <p className="font-sans mt-5 font-semibold">Şeffaf Fiyatlandırma</p>
            <p className="text-sm mt-1 text-center">
              Size para kazandıracak finansal çözümler bulabilen stressiz finans
              departmanımız.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="about-icon-4.png" />
            <p className="font-sans mt-5 font-semibold">Uzman Araba Servisi</p>
            <p className="text-sm mt-1 text-center">
              Size para kazandıracak finansal çözümler bulabilen stressiz finans
              departmanımız.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-32 grid grid-cols-2 px-32">
        <div className="shadow-2xl ">
          <img src="about-bg.png" />
        </div>
        <div className="bg-[#EEF1FB] rounded-r-2xl shadow-2xl p-24 font-sans">
          <h3 className="text-2xl font-semibold">
            Arabanız İçin Adil Bir Fiyat Alın
          </h3>
          <h3 className="text-2xl font-semibold">Bugün Bize Satın</h3>
          <p className="text-sm mt-3">
            Müşterilerimize olağanüstü hizmet, rekabetçi fiyatlandırma ve geniş
            bir yelpazede ürün sunmaya kararlıyız.
          </p>
          <div className="flex items-center space-x-3 mt-5">
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
              <TiTick />
            </div>
            <p className="text-sm font-semibold">Aracınız için en iyi fiyat.</p>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
              <TiTick />
            </div>
            <p className="text-sm font-semibold">7/24 yol yardım</p>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
              <TiTick />
            </div>
            <p className="text-sm font-semibold">Gün içerisinde araç satışı.</p>
          </div>
          <button className="text-sm bg-orange-400 text-white px-7 py-3 rounded-md mt-8 cursor-pointer">
            Hemen Fiyat Alın
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
