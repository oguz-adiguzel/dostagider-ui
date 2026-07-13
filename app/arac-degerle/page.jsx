"use client";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ProductPrice from "../component/ProductPrice";

const page = () => {
  const [comp, setComp] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [carCategories, setCarCategories] = useState();
  const [carBrandList, setCarBrandList] = useState();
  const [carModelList, setCarModelList] = useState();
  const [carVariantList, setCarVariantList] = useState();
  const [carVariantList2, setCarVariantList2] = useState();
  const [carVariantList3, setCarVariantList3] = useState();

  const [selectCategory, setSelectCategory] = useState();
  const [selectBrand, setSelectBrand] = useState();
  const [selectModel, setSelecModel] = useState();
  const [selectVariant1, setSelectVariant1] = useState();
  const [selectVariant2, setSelectVariant2] = useState();
  const [selectVariant3, setSelectVariant3] = useState();

  const getCarCategories = async () => {
    try {
      const res = await axios.get(
        " https://dostagider-api.vercel.app/car-options/categories"
      );
      setCarCategories(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("get categories error", error);
    }
  };

  const getCarOptionsList = async () => {
    try {
      if (selectCategory && !selectBrand) {
        const res = await axios.get(
          `https://dostagider-api.vercel.app/car-options/filter?category=${selectCategory}`
        );
        setCarBrandList(res.data.data[0]);
      }
      if (selectCategory && selectBrand && !selectModel) {
        const res = await axios.get(
          `https://dostagider-api.vercel.app/car-options/filter?category=${selectCategory}&brand=${selectBrand}`
        );
        setCarModelList(res.data.data[0].brands[0].models);
      }
    } catch (error) {
      console.log("option error", error);
    }
  };

  const variantList = () => {
    if (selectModel) {
      const filter = carModelList.filter((item) => item.name === selectModel);
      setCarVariantList(filter[0].variants);
    }
  };
  const variantList2 = () => {
    if (selectVariant1) {
      const filter = carVariantList.filter(
        (item) => item.variant1 === selectVariant1
      );
      setCarVariantList2(filter[0].children);
    }
  };
  const variantList3 = () => {
    if (selectVariant2) {
      carVariantList.forEach((element) => {
        const filter = element.children?.filter(
          (item) => item.variant2 === selectVariant2
        );
        if (filter[0]) {
          setCarVariantList3(filter[0].children);
        }
      });
    }
  };

  const [formData, setFormData] = useState({
    category: "",
    brand: selectBrand,
    model: "",
    variant1: "",
    variant2: "",
    variant3: "",
    aracYili: "",
    aracKm: "",
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    // Boolean olması gereken alanları kontrol et
    if (name === "agirHasarKaydi" || name === "garanti" || name === "takas") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true", // string → boolean dönüşüm
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    variantList();
    formData.model = selectModel;
  }, [selectModel]);

  useEffect(() => {
    variantList2();
    formData.variant1 = selectVariant1;
  }, [selectVariant1]);

  useEffect(() => {
    variantList3();
    formData.variant2 = selectVariant2;
  }, [selectVariant2]);
  useEffect(() => {
    formData.variant3 = selectVariant3;
  }, [selectVariant3]);

  useEffect(() => {
    getCarOptionsList();
    formData.category = selectCategory;
    formData.brand = selectBrand;
  }, [selectCategory, selectBrand]);

  useEffect(() => {
    getCarCategories();
  }, []);

  const estimateCar = async () => {
    try {
      const response = await axios.get(
        ` https://dostagider-api.vercel.app/ilan/arac-degerle?category=${
          formData.category
        }&brand=${formData.brand}&model=${formData.model}${
          formData.variant1 ? `&variant1=${formData.variant1}` : ""
        }${formData.variant2 ? `&variant2=${formData.variant2}` : ""}${
          formData.variant3 ? `&variant3=${formData.variant3}` : ""
        }&aracYili=${formData.aracYili}&km=${formData.aracKm}`
      );
      setData(response.data);
      toast.info(
        `${response.data.totalListings} İlan Üzerinden Tarama Yapıldı`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
        }
      );
    } catch (error) {
      console.log("error", error);
      toast.warn(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
    }
  };

  return (
    <div className="pb-10">
      <ToastContainer />
      <div className="w-full h-[500px] bg-[url(/arac-degerle.jpg)] bg-cover bg-center mt-3 relative">
        <div className="w-full h-full bg-black absolute opacity-20"></div>
        <div className="container px-5 lg:px-0 mx-auto h-full flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-xs text-white mb-2 font-semibold">
            <p>Anasayfa</p>
            <p>/</p>
            <p>Araç Değerle</p>
          </div>
          <h1 className="text-4xl font-semibold text-orange-400">
            Dostagider.com Araç Değerleme
          </h1>
          <p className="mt-3 font-semibold">
            Aracınızın marka, model, kilometre ve üretim yılı bilgilerine göre
            sistemdeki ilanları tarayarak{" "}
          </p>
          <p className="font-semibold">
            ortalama fiyat, en düşük fiyat ve en yüksek fiyat aralığını hızlıca
            hesaplayın.
          </p>
          <p className="font-semibold">
            Güvenilir ve güncel verilerle aracınızın gerçek piyasa değerini
            kolayca öğrenin.
          </p>
        </div>
      </div>
      <div className="w-full px-5 lg:px-0 lg:container mx-auto mt-12">
        <p className="text-lg font-semibold text-gray-700">
          Dostagider.com Araç Değerleme Detaylı Bilgi
        </p>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-y-0 gap-x-16 mt-5">
          <div className="px-10 py-10 border border-gray-300 rounded-2xl shadow-xl">
            <h2 className="text-gray-600 font-semibold">
              Araç Değerleme Nedir?
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Araç değerleme, bir otomobilin marka, model, kilometre ve üretim
              yılı gibi bilgileri baz alınarak güncel piyasa verileri üzerinden
              gerçek satış değerinin hesaplanmasıdır. Böylece aracınızın
              piyasadaki ortalama, minimum ve maksimum fiyat aralığını hızlı ve
              doğru şekilde öğrenebilirsiniz.
            </p>
          </div>
          <div className="px-10 py-10 border border-gray-300 rounded-2xl shadow-xl">
            <h2 className="text-gray-600 font-semibold">Nasıl Hesaplıyoruz?</h2>
            <p className="mt-3 text-sm text-gray-500">
              Sistemimiz, girdiğiniz marka, model, kilometre ve araç yılı
              bilgilerine göre veritabanındaki güncel ilanları tarar. Toplanan
              verilere dayanarak aracın ortalama, en düşük ve en yüksek fiyat
              aralığını otomatik olarak hesaplayarak size en doğru piyasa
              değerini sunar.
            </p>
          </div>
          <div className="px-10 py-10 border border-gray-300 rounded-2xl shadow-xl">
            <h2 className="text-gray-600 font-semibold">
              Önemli Bilgilendirme?
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Bu araç değerleme sonuçları tamamen mevcut ilan verileri üzerinden
              otomatik olarak hazırlanır ve kesin bir fiyat garantisi içermez.
              Bu verilere dayanarak yapılan işlemlerden doğabilecek herhangi bir
              maddi veya manevi zarardan dostagider.com sorumlu değildir.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`w-full lg:container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 lg:py-20 lg:px-10 shadow-2xl rounded-2xl`}
      >
        <div
          className={` flex flex-col justify-center items-start ${
            comp ? "px-5" : "lg:pl-16 lg:pr-36 px-5 lg:px-0"
          }`}
        >
          {comp && (
            <>
              <p className="font-semibold">
                Araç Değerleme İçin Bilgileri Giriniz
              </p>{" "}
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5 py-3 text-sm mt-5">
                <div>
                  <p className="text-orange-500">Kategori</p>
                  <select
                    onChange={(e) => setSelectCategory(e.target.value)}
                    className="w-full py-2 border border-gray-400 rounded-2xl mt-1 capitalize"
                  >
                    <option>Seçim Yapınız</option>
                    {carCategories?.map((item, index) => (
                      <option key={index} className="capitalize" value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-orange-500">Marka</p>
                  <select
                    onChange={(e) => setSelectBrand(e.target.value)}
                    className="w-full py-2 border border-gray-400 rounded-2xl mt-1"
                  >
                    <option>Seçim Yapınız</option>
                    {carBrandList?.brands.map((item, index) => (
                      <option
                        className="capitalize"
                        value={item.brand}
                        key={index}
                      >
                        {item.brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-orange-500">Model</p>
                  <select
                    onChange={(e) => setSelecModel(e.target.value)}
                    className="w-full py-2 border border-gray-400 rounded-2xl mt-1"
                  >
                    <option>Seçim Yapınız</option>
                    {carModelList?.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-orange-500">Varyant 1</p>
                  <select
                    onChange={(e) => setSelectVariant1(e.target.value)}
                    className="w-full py-2 border border-gray-400 rounded-2xl mt-1"
                  >
                    <option>Seçim Yapınız</option>
                    {carVariantList?.map((item, index) => (
                      <option value={item.variant1} key={index}>
                        {item.variant1}
                      </option>
                    ))}
                  </select>
                </div>
                {carVariantList2 && (
                  <div>
                    <p className="text-orange-500">Varyant 2</p>
                    <select
                      onChange={(e) => setSelectVariant2(e.target.value)}
                      className="w-full py-2 border border-gray-400 rounded-2xl mt-1"
                    >
                      <option>Seçim Yapınız</option>
                      {carVariantList2?.map((item, index) => (
                        <option value={item.variant2} key={index}>
                          {item.variant2}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {carVariantList3 && (
                  <div>
                    <p className="text-orange-500">Varyant 3</p>
                    <select
                      onChange={(e) => setSelectVariant3(e.target.value)}
                      className="w-full py-2 border border-gray-400 rounded-2xl mt-1"
                    >
                      <option>Seçim Yapınız</option>
                      {carVariantList3?.map((item, index) => (
                        <option value={item.variant3} key={index}>
                          {item.variant3}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-8 mt-4">
                <div>
                  <p className="text-orange-500 text-sm">Araç Yılı</p>
                  <input
                    name="aracYili"
                    onChange={handleChangeForm}
                    type="text"
                    className="w-full py-2 border border-gray-400 rounded-2xl mt-1 px-3"
                  />
                </div>
                <div>
                  <p className="text-orange-500 text-sm">Araç Km</p>
                  <input
                    name="aracKm"
                    onChange={handleChangeForm}
                    type="text"
                    className="w-full py-2 border border-gray-400 rounded-2xl mt-1 px-3"
                  />
                </div>
                <div>
                  <button
                    onClick={() => estimateCar()}
                    type="text"
                    className="w-full py-2 border border-gray-400 rounded-2xl bg-orange-400 text-white cursor-pointer text-sm mt-6"
                  >
                    Değerle
                  </button>
                </div>
              </div>
            </>
          )}
          {!comp && (
            <>
              <h2 className="font-semibold text-xl">Araç Değerle</h2>
              <p className="text-sm mt-2">
                Almak veya satmak istediğiniz aracın tahmini piyasa değerini
                “Araç Değerleme Servisi” ile öğrenin! Bu servisimiz
                dostagider.com'daki güncel ve kapsamlı ilan verilerinden
                yararlanılarak sunulmaktadır.
              </p>
              <button
                onClick={() => setComp(true)}
                className="text-white text-sm px-9 lg:px-14 py-2 lg:py-3 mt-5 rounded-full border-2 border-orange-500 bg-orange-400 hover:bg-orange-500 duration-300 cursor-pointer"
              >
                Araç Değerle
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Araç değerleme servisinde gösterilen bilgilere dayanarak
                alım-satım dahil herhangi bir işlem yapılması veya yapılamaması
                halinde kullanıcıların veya 3.kişilerin uğrayabileceği
                zararlardan dostagider.com sorumlu değildir. Hesaplamada aracın
                boya, hasar durumu ve ek donanım özellikleri gözetilmemiştir
              </p>
            </>
          )}
        </div>
        <div className=" py-12 flex justify-center relative mt-6 lg:mt-0">
          <div className="absolute flex flex-col items-center left-6 lg:left-24 bottom-20 text-sm">
            <p>Düşük Fiyat</p>
            <p className="font-bold text-lg text-orange-500">
              {
                data ?  <ProductPrice price={data?.minPrice} locale="tr-TR" /> : <span className="text-sm">Bekleniyor</span>
              }
             
            </p>
          </div>
          <div className="absolute flex flex-col items-center right-6 lg:right-24 bottom-20 text-sm">
            <p>Yüksek Fiyat</p>
            <p className="font-bold text-lg text-orange-500">
              {
                data ? <ProductPrice price={data?.maxPrice} locale="tr-TR" /> : <span className="text-sm">Bekleniyor</span>
              }
              
            </p>
          </div>
          <div className="absolute flex flex-col items-center top-0 text-sm">
            <p>Ortalama Fiyat</p>
             <p className="font-bold text-lg text-orange-500">
              {
                data ? <ProductPrice price={data?.averagePrice} locale="tr-TR" /> : <span className="text-sm">Bekleniyor</span>
              }
              
            </p>
          </div>
          <img className="lg:w-auto w-40" src="gauge-chart.svg" />
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <h3 className="text-lg font-semibold">Sıkça Sorulan Sorular</h3>
        <div className="mt-8 shadow-2xl">
          <Accordion className="py-5 my-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                className="text-orange-600 font-semibold"
                component="span"
              >
                1. Araç değerleme sonuçları ne kadar güvenilir?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Değerleme, sistemdeki güncel ilanların ortalaması alınarak
              oluşturulur. Gerçek piyasa satışı birçok faktöre bağlı olduğundan
              sonuçlar yol gösterici niteliktedir, kesin fiyat garantisi vermez.
            </AccordionDetails>
          </Accordion>
          <Accordion className="py-5 my-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                className="text-orange-600 font-semibold"
                component="span"
              >
                2. Sonuçlar hangi verilere göre hesaplanıyor?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Marka, model, kilometre ve araç yılı bilgilerini baz alarak
              sistemdeki ilan verileri taranır. Bu bilgiler doğrultusunda en
              düşük, en yüksek ve ortalama fiyatlar hesaplanır.
            </AccordionDetails>
          </Accordion>
          <Accordion className="py-5 my-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography
                className="text-orange-600 font-semibold"
                component="span"
              >
                3. Değerleme sonucunda neden farklı fiyat aralıkları çıkıyor?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              İlanlardaki araçların durumu, donanımı, hasar kaydı, bakımları ve
              satıcı tercihleri farklılık gösterebilir. Bu nedenle fiyat aralığı
              belirli bir skalada sunulur.
            </AccordionDetails>
          </Accordion>
          <Accordion className="py-5 my-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography
                className="text-orange-600 font-semibold"
                component="span"
              >
                4. Değerleme yapabilmek için üyelik gerekli mi?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Hayır, araç değerleme işleminden faydalanmak için üyelik zorunlu
              değildir. Gerekli bilgileri girerek hemen sonuçları
              görüntüleyebilirsiniz.
            </AccordionDetails>
          </Accordion>
          <Accordion className="py-5 my-2">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography
                className="text-orange-600 font-semibold"
                component="span"
              >
                5. Değerleme sonucu ile aracımı hemen satabilir miyim?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Değerleme yalnızca bir piyasa analizi sağlar. Aracın gerçek satış
              süreci; aracın durumu, pazarlık payı ve alıcı talepleri gibi
              faktörlere bağlı olarak değişebilir.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default page;
