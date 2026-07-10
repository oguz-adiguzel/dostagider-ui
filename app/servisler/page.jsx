import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdContentPasteSearch, MdOutlineElectricBolt, MdOutlineSecurity } from "react-icons/md";


const page = () => {
  return (
    <div className="container mx-auto mb-32">
      <h1 className="text-2xl font-sans font-semibold mt-7">Servisler</h1>
      <div className="w-full grid grid-cols-2 mt-10 items-center">
        <div className="text-4xl font-sans font-semibold space-y-2 flex flex-col items-start">
          <h2 className="text-shadow-md text-shadow-orange-400">
            Araç Alım Satımını{" "}
          </h2>
          <h2 className="text-shadow-md text-shadow-orange-400">
            Kolaylaştıran Hizmetler
          </h2>
          <p className="text-sm font-normal">
            Çeşitli markalardan, binlerce araç arasından seçim yapın.
          </p>
          <p className="text-sm font-normal -mt-2">
            Aracınız için kolayca ilan açın ve satış sürecini hızlandırın.
          </p>
        </div>
        <img className="w-full" src="/kurumsal.png" />
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mt-32">
        <div className="border border-gray-300 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-center font-semibold text-lg">Hizmetlerimiz</h3>
          <p className="mt-1 text-sm text-center">
            dostagider.com, ikinci el araç alım ve satım sürecini daha kolay,
            hızlı ve güvenli hale getirmek için geliştirilmiş bir platformdur.
            Kullanıcılarımızın ihtiyaçlarını merkeze alarak tasarladığımız
            hizmetler sayesinde araç alım satım sürecini zahmetsiz bir deneyime
            dönüştürüyoruz.
          </p>
        </div>
        <div className="border border-gray-300 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-center font-semibold text-lg">
            Kolay İlan Oluşturma
          </h3>
          <p className="mt-1 text-sm text-center">
            Araç ilanınızı dakikalar içinde oluşturabilirsiniz. Kullanıcı dostu
            arayüzümüz sayesinde araç bilgilerinizi, fotoğraflarınızı ve
            açıklamalarınızı hızlıca ekleyerek ilanınızı yayınlayabilirsiniz.
          </p>
        </div>
        <div className="border border-gray-300 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-center font-semibold text-lg">
            Gelişmiş Araç Arama
          </h3>
          <p className="mt-1 text-sm text-center">
            Gelişmiş filtreleme sistemi sayesinde aradığınız araca kolayca
            ulaşabilirsiniz. Marka, model, fiyat, kilometre ve birçok farklı
            kriter ile arama yaparak size en uygun araçları hızlıca
            bulabilirsiniz.
          </p>
        </div>
         <div className="border border-gray-300 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-center font-semibold text-lg">
            Elektrikli Araç Desteği
          </h3>
          <p className="mt-1 text-sm text-center">
            Elektrikli araçların artan popülerliğini göz önünde bulundurarak platformumuzu bu yeni ekosisteme uygun şekilde geliştirdik. Elektrikli araçlara özel filtreler ve ilan yapısıyla kullanıcıların doğru araca daha kolay ulaşmasını sağlıyoruz.
          </p>
        </div>
         <div className="border border-gray-300 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-center font-semibold text-lg">
            Güvenli İletişim
          </h3>
          <p className="mt-1 text-sm text-center">
            Alıcı ve satıcıların güvenli şekilde iletişim kurabilmesi için platform içerisinde mesajlaşma altyapısı sunuyoruz. Böylece kullanıcılar araç hakkında detayları kolayca konuşabilir.
          </p>
        </div>
        <div className="border border-gray-300 rounded-2xl p-5 shadow-2xl">
          <h3 className="text-center font-semibold text-lg">
            Kullanıcı Dostu Deneyim
          </h3>
          <p className="mt-1 text-sm text-center">
            Modern teknolojiler kullanılarak geliştirilen platformumuz hızlı, sade ve anlaşılır bir kullanım deneyimi sunar. Hem masaüstü hem de mobil cihazlarda sorunsuz şekilde çalışır.
          </p>
        </div>
      </div>
      <div className="w-full  mt-32 grid grid-cols-4 gap-x-10 px-5">
        <div className="flex flex-col items-center rounded-4xl shadow-2xl shadow-orange-200 py-5">
            <IoCreateOutline size={40} color="orange" />
            <p className="mt-5 font-medium text-xl">Kolay İlan Oluşturma</p>
        </div>
        <div className="flex flex-col items-center rounded-4xl shadow-2xl shadow-orange-200  py-5">
            <MdContentPasteSearch  size={40} color="orange" />
            <p className="mt-5 font-medium text-xl">Akıllı Araç Arama</p>
        </div>
        <div className="flex flex-col items-center rounded-4xl shadow-2xl shadow-orange-200  py-5">
            <MdOutlineElectricBolt size={40} color="orange" />
            <p className="mt-5 font-medium text-xl">Elektrikli Araç Desteği</p>
        </div>
        <div className="flex flex-col items-center rounded-4xl shadow-2xl shadow-orange-200  py-5">
            <MdOutlineSecurity size={40} color="orange" />
            <p className="mt-5 font-medium text-xl">Güvenli Mesajlaşma</p>
        </div>
      </div>
    </div>
  );
};

export default page;
