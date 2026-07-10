import React from "react";

const page = () => {
  return (
    <div className="w-full py-5 lg:py-20 px-5 lg:px-0 text-gray-700">
      <div className="container mx-auto">
        <div className="flex items-center space-x-2 text-xs">
          <p>Anasayfa</p>
          <p>/</p>
          <p>Kurumsal</p>
        </div>
        <h1 className="text-3xl font-semibold mt-2">Kurumsal</h1>
        <div className="w-full grid grid-cols-1 gap-y-5 lg:gap-y-0 lg:grid-cols-2 lg:mt-32">
          <div className="lg:pr-52 flex flex-col space-y-3 pt-10 lg:pt-20">
            <p className="text-2xl lg:text-4xl font-semibold">Kurumsal Üyelik Paketi</p>
            <p className="text-sm lg:text-lg">
              Dostagider platformunda araç galerilerine özel olarak hazırlanan
              Kurumsal Üyelik Paketi, geniş ilan yayınlama hakları, marka
              vitrini oluşturma fırsatı ve öne çıkarma avantajlarıyla satış
              gücünüzü artırmak için tasarlandı.
            </p>
            <button className="bg-orange-400 h-10 w-40 text-white rounded-full text-sm font-semibold lg:mt-2 cursor-pointer hover:bg-orange-300"><a href="/kurumsal/basvuru">Hemen Oluştur</a></button>
          </div>
          <img className="w-full rounded-4xl shadow-2xl" src="kurumsal-1.jpg" />
        </div>

        <p className="mt-10 text-2xl font-semibold">Sizi Neler Bekliyor ?</p>
        <div className="lg:pl-20">
          <div className="flex items-center space-x-4 mt-3 lg:mt-10">
            <div className="w-7 h-7 bg-green-500 rounded-md hidden lg:block"></div>
            <div className="flex flex-col">
              <p className="font-semibold lg:text-xl">
                Aylık 10 İlan Yayınlama Hakkı
              </p>
              <p className="text-xs lg:text-base">
                Kurumsal üyeler, her ay 10 adet araç ilanı yayınlama hakkına
                sahip olur. Bireysel kullanıcılarla karşılaştırıldığında daha
                fazla araç sergileme imkânı sunar.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-3 lg:mt-10">
            <div className="w-7 h-7 bg-green-500 rounded-md hidden lg:block"></div>
            <div className="flex flex-col">
              <p className="font-semibold lg:text-xl">
                Geniş Fotoğraf Yükleme Avantajı
              </p>
              <p className="text-xs lg:text-base">Bireysel üyeler: 10 fotoğraf / ilan</p>
              <p className="text-xs lg:text-base">Kurumsal üyeler: 20 fotoğraf / ilan</p>
              <p className="text-xs lg:text-base">Her aracı daha detaylı anlatma özgürlüğü sizinle.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-3 lg:mt-10">
            <div className="w-7 h-7 bg-green-500 rounded-md hidden lg:block"></div>
            <div className="flex flex-col">
              <p className="font-semibold lg:text-xl">
                Kendi Mağaza Sayfanız (Dükkan)
              </p>
              <p className="text-xs lg:text-base">
                Her kurumsal üyeye platform içerisinde özel bir sayfa tahsis
                edilir. Bu alan sizin dijital galeri vitrininiz olarak
                konumlanır:
              </p>
              <ul className="list-disc ml-10">
                <li className="text-xs lg:text-base">Galeri adı ve logosu</li>
                <li className="text-xs lg:text-base">Firma bilgileri</li>
                <li className="text-xs lg:text-base">Yayındaki tüm ilanlar</li>
                <li className="text-xs lg:text-base">İletişim bilgileri</li>
                <li className="text-xs lg:text-base">Konum bilgisi</li>
              </ul>
              <p className="text-xs lg:text-base">
                Bu sayfa, ziyaretçilerin markanızı doğrudan inceleyebileceği
                kişisel bir dükkan niteliğindedir.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-3 lg:mt-10">
            <div className="w-7 h-7 bg-green-500 rounded-md hidden lg:block"></div>
            <div className="flex flex-col">
              <p className="font-semibold lg:text-xl">
                Ana Sayfada Öne Çıkarma Ayrıcalığı
              </p>
              <p className="text-xs lg:text-base">
                Kurumsal üyeler, ilanlarını ana sayfadaki “Öne Çıkanlar”
                alanında sergileyebilir.
              </p>
              <p className="text-xs lg:text-base">
                Bu özellik sadece kurumsal müşterilere özeldir. Bireysel üyeler
                bu bölüme ilan ekleyemez.
              </p>
            </div>
          </div>
            <div className="flex items-center space-x-4 mt-3 lg:mt-10">
            <div className="w-7 h-7 bg-green-500 rounded-md hidden lg:block"></div>
            <div className="flex flex-col">
              <p className="font-semibold lg:text-xl">
                Marka Değeri ve Güvenilirlik
              </p>
              <p className="text-xs lg:text-base">
               Kurumsal üyelik, alıcıların gözünde daha profesyonel ve güvenilir bir profil oluşturmanıza yardımcı olur. İlanlarınıza olan dönüş oranını artırır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
