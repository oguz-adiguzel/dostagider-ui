import React from "react";

const page = () => {
  return (
    <>
    <p className="mt-20 text-center text-4xl font-semibold">Dostagider.com Avantajlı Paketler</p>
    <p className="text-center text-gray-400">Paketini seç aracını daha hızlı sat</p>
    <div className="w-full lg:w-3/4 py-5 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-16 px-5 lg:px-0">
      <div className="py-20">
        <div className="w-full py-24 bg-gradient-to-b from-orange-400 to-orange-300 flex flex-col justify-center items-center rounded-2xl relative overflow-hidden">
          <p className="absolute text-orange-200 text-9xl bottom-0 left-3">
            Ücretsiz
          </p>
          <p className="font-sans font-bold text-7xl text-white">Ücretsiz</p>
          <p className="text-white">Sürekli geçerli</p>
          <div className="w-full py-10 font-sans text-white ">
            <p className="text-center font-semibold">
              30 gün geçerli 1 ilan hakkı
            </p>
            <p className="text-center font-semibold">
              Elektrikli araçlarda sınırsız ilan
            </p>
            <p className="text-center font-semibold">
              İlanlarda 10 fotoğraf yükleme
            </p>
            <div className="w-full flex justify-center">
              <button className="px-10 py-3 mt-10 bg-orange-400 text-white cursor-pointer">
                Ücretsiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 ">
        <div className="w-full py-24 bg-gradient-to-b from-orange-400 to-orange-300 flex flex-col justify-center items-center rounded-2xl relative overflow-hidden">
          <p className="absolute text-orange-200 text-9xl bottom-0 left-3">
            ₺39.99
          </p>
          <p className="font-sans font-bold text-7xl text-white">₺39.99</p>
          <p className="text-white">30 gün geçerli</p>
          <div className="w-full py-10 font-sans text-white ">
            <p className="text-center font-semibold">
              30 gün geçerli 2 ilan hakkı
            </p>
            <p className="text-center font-semibold">
              Elektrikli araçlarda sınırsız ilan
            </p>
            <p className="text-center font-semibold">
              İlanlarda 20 fotoğraf yükleme
            </p>
             <p className="text-center font-semibold">
              7 gün öne çıkanlarda görünme
            </p>
            <div className="w-full flex justify-center">
              <button className="px-10 py-3 mt-10 bg-orange-400 text-white cursor-pointer">
                Satın Al
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="w-full py-24 bg-gradient-to-b from-orange-400 to-orange-300 flex flex-col justify-center items-center rounded-2xl relative overflow-hidden">
          <p className="absolute text-orange-200 text-8xl bottom-0 left-3">
            Kurumsal
          </p>
          <p className="font-sans font-bold text-7xl text-white">Kurumsal</p>
          <p className="text-white">Kurumsal Plan</p>
          <div className="w-full py-10 font-sans text-white ">
            <p className="text-center font-semibold">
              Kurumsala özel ilan planlaması
            </p>
            <p className="text-center font-semibold">
              Elektrikli araçlarda sınırsız ilan
            </p>
            <p className="text-center font-semibold">
              İlanlarda 30 fotoğraf yükleme
            </p>
            <p className="text-center font-semibold">
              Kurumsal hoşgeldin paketi
            </p>
            <p className="text-center font-semibold">
              Kurumsal gösterim
            </p>
            <div className="w-full flex justify-center">
              <button className="px-10 py-3 mt-10 bg-orange-400 text-white cursor-pointer">
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default page;
