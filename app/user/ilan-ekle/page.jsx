"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Cookies from "js-cookie";
import api from "@/app/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@/app/contexts/UserContext";
import { FaCheck, FaUser } from "react-icons/fa";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSearchParams } from "next/navigation";
import { MdElectricBolt, MdOutlineElectricalServices } from "react-icons/md";
import { SiSpeedtest } from "react-icons/si";
import { IoIosBatteryFull } from "react-icons/io";
import { PiEngineBold } from "react-icons/pi";
import { Tooltip } from "@mui/material";
import { IoInformationCircleOutline } from "react-icons/io5";
// export const dynamic = 'force-dynamic';

import dynamic from 'next/dynamic';

// Sunucu tarafında render edilmelerini (SSR) kapatıyoruz:
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const page = () => {
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

  const [noEkspertiz, setNoEkspertiz] = useState(false);

  const { user } = useUser();

  const [teamList, setTeamList] = useState();

  const [selectTeam, setSelectTeam] = useState();

  const [priceDisplay, setPriceDisplay] = useState("");

  const query = useSearchParams();

  const evCars = Boolean(query.get("isEV"));

  const formatPrice = (value) => {
    if (!value) return "";

    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    // Kullanıcının yazdığı her şeyden SADECE rakamları al
    const rawValue = e.target.value.replace(/\D/g, "");

    // Backend için RAW değer
    setFormData((prev) => ({
      ...prev,
      price: rawValue,
    }));

    // Ekranda görünen formatlı değer
    setPriceDisplay(formatPrice(rawValue));
  };

  const colorMap = {
    Orijinal: "black",
    Boyalı: "blue",
    "Lokal Boyalı": "orange",
    Değişmiş: "red",
  };

  const getCarCategories = async () => {
    try {
      const res = await axios.get(
        evCars
          ? " https://dostagider-api.vercel.app/ev-car-options/categories"
          : " https://dostagider-api.vercel.app/car-options/categories",
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
          evCars
            ? ` https://dostagider-api.vercel.app/ev-car-options/filter?category=${selectCategory}&includeTechnical=true`
            : ` https://dostagider-api.vercel.app/car-options/filter?category=${selectCategory}`,
        );
        setCarBrandList(res.data.data[0]);
      }
      if (selectCategory && selectBrand && !selectModel) {
        const res = await axios.get(
          evCars
            ? ` https://dostagider-api.vercel.app/ev-car-options/filter?category=${selectCategory}&brand=${selectBrand}&includeTechnical=true`
            : ` https://dostagider-api.vercel.app/car-options/filter?category=${selectCategory}&brand=${selectBrand}`,
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
        (item) => item.variant1 === selectVariant1,
      );
      setCarVariantList2(filter[0].children);
    }
  };
  const variantList3 = () => {
    if (selectVariant2) {
      carVariantList.forEach((element) => {
        const filter = element.children?.filter(
          (item) => item.variant2 === selectVariant2,
        );
        if (filter[0]) {
          setCarVariantList3(filter[0].children);
        }
      });
    }
  };

  const getTeamList = async () => {
    try {
      const response = await api.get(`/corporate/${user.slug}/ekip`);
      setTeamList(response.data.ekip);
    } catch (error) {
      console.log("error", error);
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

  useEffect(() => {
    if (user.role === "kurumsal") getTeamList();
  }, [user]);

  useEffect(() => {
    formData.noExpertiz = noEkspertiz;
  }, [noEkspertiz]);

  useEffect(() => {
    if (selectTeam) formData.memberTeam = selectTeam._id;
  }, [selectTeam]);

  useEffect(() => {
    formData.sehir = user.sehir;
    formData.ilce = user.ilce;
    formData.mahalle = user.mahalle;
  }, [user]);

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const [formData, setFormData] = useState({
    category: "",
    baslik: "",
    brand: selectBrand,
    model: "",
    sehir: "",
    ilce: "",
    mahalle: "",
    variant1: "",
    variant2: "",
    variant3: "",
    aracYili: "",
    vites: "",
    km: "",
    kasaTipi: "",
    price: 0,
    garanti: "",
    agirHasarKaydi: "",
    takas: "",
    aciklama: "",
    noExpertiz: null,
    memberTeam: "",
    teknikOzellikler: {
      guvenlik: {
        abs: false,
        aeb: false,
        bas: false,
        cocukKilidi: false,
        distronic: false,
        geceGorusSistemi: false,
        havaYastıgıSürücü: false,
        havaYastıgıYolcu: false,
        immobilizer: false,
        isofix: false,
        korNokta: false,
        merkeziKilit: false,
        seritTakip: false,
        yokusKalkis: false,
        yorgunlukTespit: false,
      },
      icDonanim: {
        hidrolikDireksiyon: false,
        ucuncuSiraKoltuk: false,
        deriKoltuk: false,
        kumasKoltuk: false,
        elektrikliCam: false,
        klima: false,
        otmKararanDikiz: false,
        onGorüsKamera: false,
        onKolDayama: false,
        anahtarsizGiris: false,
        fonksiyonelDireksiyon: false,
        isitmaliDireksiyon: false,
        elektrikliKoltuk: false,
        isitmaliKoltuk: false,
        sogutmaliKoltuk: false,
        hizSabitleme: false,
        sogutmaliTorpido: false,
        yolBilgisayari: false,
        headUp: false,
        startStop: false,
        geriGorus: false,
      },
      dısDonanim: {
        ayaklaAcilanBagaj: false,
        hardtop: false,
        adaptifFar: false,
        elektrikliAyna: false,
        isitmaliAyna: false,
        hafizaliAyna: false,
        parkSensorüArka: false,
        parkSensorüOn: false,
        parkAsistani: false,
        sunroof: false,
        panoramikTavan: false,
        cekiDemiri: false,
      },
      multimedya: {
        android: false,
        apple: false,
        bluetooth: false,
        usb: false,
      },
    },
    ekspertiz: {
      kaput: "Orijinal",
      onTampon: "Orijinal",
      arkaTampon: "Orijinal",
      tavan: "Orijinal",
      bagaj: "Orijinal",
      solOnCamurluk: "Orijinal",
      sagOnCamurluk: "Orijinal",
      solArkaCamurluk: "Orijinal",
      sagArkaCamurluk: "Orijinal",
      solOnKapi: "Orijinal",
      sagOnKapi: "Orijinal",
      solArkaKapi: "Orijinal",
      sagArkaKapi: "Orijinal",
    },
  });

  // const handleChangeForm = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

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

  const handleCheckboxChange = (category, field) => {
    setFormData((prev) => ({
      ...prev,
      teknikOzellikler: {
        ...prev.teknikOzellikler,
        [category]: {
          ...prev.teknikOzellikler[category],
          [field]: !prev.teknikOzellikler[category][field],
        },
      },
    }));
  };

  const handleAciklamaChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      aciklama: content,
    }));
  };

  const handleEkspertizChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ekspertiz: {
        ...prev.ekspertiz,
        [name]: value, // hangi name geldiyse onu güncelliyoruz
      },
    }));
  };

  const addListing = async () => {
    setLoading(true);
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      // Dosya / File nesnesi ile karışmaması için File kontrolü
      if (value instanceof File) {
        data.append(key, value);
      } else if (value !== null && typeof value === "object") {
        // Nested obje (teknikOzellikler, ekspertiz, vb.) -> stringify
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value ?? "");
      }
    });

    // Görselleri ekle
    images.forEach((file) => {
      data.append("images", file); // backend'de "req.files" ile yakalanır
    });

    if (evCars) {
      data.append("isEV", true);
    }

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        if (!user.sehir || !user.ilce || !user.mahalle) {
          toast.warn("Adres Bilgilerinizi Güncelleyiniz", {
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
          setLoading(false);
          return;
        }
        const res = await api.post("/ilan/ilan-ekle", data);
        setLoading(false);
        toast.info(res.data.message, {
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
    } catch (error) {
      console.log("add error", error);
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
      setLoading(false)
    }
  };

  if (loading)
    return (
      <>
        <ToastContainer />
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
        </div>
      </>
    );

  function SortableImage({ file, index, handleRemove }) {
    const { setNodeRef, attributes, listeners, transform, transition } =
      useSortable({ id: index });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative w-full h-28 sm:h-32 md:h-36 group cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 duration-200 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(index);
            }}
            className="bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="w-full h-full object-contain rounded-lg shadow bg-white"
        />

        {index === 0 && (
          <span className="absolute bottom-1 left-1 text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded">
            Kapak
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`w-full h-full py-5 px-5 lg:px-14 font-sans overflow-y-scroll relative ${evCars ? "" : ""}`}
      >
        {evCars && (
          <div className="w-full top-40 absolute opacity-10 -z-50 flex justify-center items-center">
            <img className="" src="/electric-bg.svg" />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">
            {evCars ? "EV Araç" : ""} İlan Ekle
          </h2>
          {evCars && (
            <MdOutlineElectricalServices className="text-blue-500" size={40} />
          )}
        </div>
        {evCars && (
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            ⚡ Elektrikli Araç İlanı Oluşturuyorsunuz
          </div>
        )}
        <div
          className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"}  mt-5 rounded-2xl px-6 font-sans`}
        >
          <p className="font-semibold">Araç Bilgi</p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-x-5 py-3 text-sm">
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
                  <option className="capitalize" value={item.brand} key={index}>
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
          {evCars && carVariantList
            ?.filter((item, index) => item.variant1 === selectVariant1)
            .map((tech, index) => (
              <div key={index} className="w-full lg:w-1/2 py-3 grid grid-cols-3 lg:grid-cols-5 gap-y-5 lg:gap-y-0 gap-x-3">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center space-x-1">
                    <p className="font-semibold">WLTP</p>
                    <Tooltip
                      title="WLTP olarak da bilinen Uluslararası Uyumlu Hale Getirilmiş Hafif Araç Test Prosedürü, yeni binek araçların resmi yakıt tasarrufu ve emisyon seviyelerini belirlemek için kullanılan yeni yasal yöntemdir.
                       Bu prosedür, Avrupa Birliği (AB) tarafından önceki test çevriminin araç sahiplerinin gerçek hayatta yaşadığı tüketim değerlerini yansıtmadığı yönündeki eleştirisine yanıt olarak geliştirildi."
                    >
                      <IoInformationCircleOutline size={20} />
                    </Tooltip>
                  </div>

                  <p className="text-xs text-center font-sans">
                    Normlarına göre araç verileri
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <SiSpeedtest color="gray" size={26} />
                  <p className="text-gray-600 text-sm font-semibold">
                    {tech.technical.range} KM
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <IoIosBatteryFull color="gray" size={28} />
                  <p className="text-gray-600 text-sm font-semibold">
                    {tech.technical.batteryCapacity} KW/h
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <PiEngineBold color="gray" size={26} />
                  <p className="text-gray-600 text-sm font-semibold">
                    {tech.technical.motorPower} Bg
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <MdElectricBolt color="gray" size={26} />
                  <p className="text-gray-600 text-sm font-semibold">
                    {tech.technical.avgConsumption} KW/h
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div
          className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"} mt-10 rounded-2xl px-6 font-sans`}
        >
          <p className="font-semibold">İlan Genel Bakış</p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5 text-sm">
            <div>
              <p className="font-semibold">İlan Başlığı</p>
              <input
                className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                type="text"
                name="baslik"
                onChange={handleChangeForm}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-5">
              <div>
                <p className="font-semibold">Araç Yılı</p>
                <input
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                  type="text"
                  name="aracYili"
                  onChange={handleChangeForm}
                />
              </div>
              <div>
                <p className="font-semibold">Araç KM</p>
                <input
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                  name="km"
                  type="text"
                  onChange={handleChangeForm}
                />
              </div>
            </div>
            <div
              className={`grid ${evCars ? "grid-cols-1" : "grid-cols-2"}  gap-x-5`}
            >
              <div>
                <p className="font-semibold">Vites</p>
                <select
                  onChange={handleChangeForm}
                  name="vites"
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                >
                  <option>Seçim Yapın</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Otomatik">Otomatik</option>
                </select>
              </div>
              <div className={evCars ? "hidden" : "block"}>
                <p className="font-semibold">Yakıt</p>
                <select
                  onChange={handleChangeForm}
                  name="yakit"
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                >
                  <option>Seçim Yapın</option>
                  <option value="Dizel">Dizel</option>
                  <option value="Benzin">Benzin</option>
                  <option value="LPG">Benzin/LPG</option>
                  <option value="Hybrid">Hybrid</option>
                  {/* <option value="Elektrik">Elektrik</option> */}
                  <option value="Diğer">Elektrik</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              <div>
                <p className="font-semibold">Araç Durumu</p>
                <select className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl">
                  <option>Seçim Yapın</option>
                  <option>İkinci El</option>
                  <option>Sıfır</option>
                </select>
              </div>
              <div>
                <p className="font-semibold">Kasa Tipi</p>
                <select
                  onChange={handleChangeForm}
                  name="kasaTipi"
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                >
                  <option>Seçim Yapın</option>
                  <option value="Hatchback 5 Kapı">Hatchback 5 Kapı</option>
                  <option value="Hatchback 3 Kapı">Hatchback 3 Kapı</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Cabrio">Cabrio</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Pickup">Pickup</option>
                  <option value="MPV">MPV</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              <div>
                <p className="font-semibold">Çekiş Tipi</p>
                <select className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl">
                  <option>Seçim Yapın</option>
                  <option>Önden Çekii</option>
                  <option>Arkadan İtiş</option>
                  <option>4 Çeker</option>
                </select>
              </div>
              <div>
                <p className="font-semibold">Kasa Tipi</p>
                <select className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl">
                  <option>Seçim Yapın</option>
                  <option>Hatchback 5 Kapı</option>
                  <option>Hatchback 3 Kapı</option>
                  <option>Sedan</option>
                  <option>Cabrio</option>
                  <option>Coupe</option>
                  <option>Pickup</option>
                  <option>MPV</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              <div>
                <p className="font-semibold">Renk</p>
                <select className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl">
                  <option>Seçim Yapın</option>
                  <option>Beyaz</option>
                  <option>Siyah</option>
                  <option>Kırmızı</option>
                  <option>Mavi</option>
                  <option>Gri</option>
                </select>
              </div>
              <div>
                <p className="font-semibold">Garanti</p>
                <select
                  onChange={handleChangeForm}
                  name="garanti"
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                >
                  <option>Seçim Yapın</option>
                  <option value={true}>Evet</option>
                  <option value={false}>Hayır</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              <div>
                <p className="font-semibold">Ağır Hasar Kayıtlı</p>
                <select
                  onChange={handleChangeForm}
                  name="agirHasarKaydi"
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                >
                  <option>Seçim Yapın</option>
                  <option value={true}>Evet</option>
                  <option value={false}>Hayır</option>
                </select>
              </div>
              <div>
                <p className="font-semibold">Takas</p>
                <select
                  onChange={handleChangeForm}
                  name="takas"
                  className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                >
                  <option>Seçim Yapın</option>
                  <option value={true}>Evet</option>
                  <option value={false}>Hayır</option>
                </select>
              </div>
            </div>
            <div>
              <p className="font-semibold">Fiyat</p>
              {/* <input
              className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
              type="text"
              name="price"
              onChange={handleChangeForm}
            /> */}

              <input
                className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                type="text"
                value={priceDisplay}
                onChange={handlePriceChange}
                inputMode="numeric"
                placeholder="Örn: 1.200.000"
              />
            </div>
          </div>
        </div>
        <div
          className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"} mt-10 rounded-2xl px-6 font-sans`}
        >
          <p className="font-semibold">Açıklama</p>
          <ReactQuill
            theme="snow"
            value={formData.aciklama}
            onChange={handleAciklamaChange}
            className="mt-2"
          />
        </div>

        {user?.role === "kurumsal" && (
          <div
            className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"}  mt-10 rounded-2xl px-6 font-sans`}
          >
            <p className="font-semibold">Ekip Üyesi Seçimi</p>
            <p className="text-sm text-gray-400">
              Seçilen üyenin iletişim bilgileri ilanda belirtilir
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-3">
              {teamList?.map((item, index) => (
                <div key={index} className="px-5 py-2 border border-gray-400 ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-24 bg-gray-100 flex justify-center items-center">
                        {item.fotoUrl ? (
                          <img
                            className="w-full h-full object-contain"
                            src={item.fotoUrl}
                          />
                        ) : (
                          <FaUser size={40} color="gray" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">
                          {item.ad} {item.soyad}
                        </p>
                        <p className="text-sm text-gray-500">{item.gorev}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mt-3">
                      <div
                        onClick={() => setSelectTeam(item)}
                        className={`w-11 h-11 ${
                          selectTeam === item ? "bg-green-200" : "bg-blue-100"
                        } rounded-full flex items-center justify-center cursor-pointer hover:shadow-2xl duration-300`}
                      >
                        <FaCheck size={22} color="blue" />
                      </div>
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
        )}

        <div
          className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"} mt-10 rounded-2xl px-6 font-sans`}
        >
          <p className="font-semibold">Araç Özellikleri</p>
          <div
            className={`w-full p-3 border ${evCars ? "border-blue-400" : "border-gray-400"}  rounded-2xl mt-5`}
          >
            <p className="text-sm text-orange-400">Güvenlik</p>
            <div className="w-full grid grid-cols-2 lg:grid-cols-8 gap-2 text-xs font-semibold mt-3">
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.teknikOzellikler.guvenlik.abs}
                  onChange={() => handleCheckboxChange("guvenlik", "abs")}
                />
                <p>ABS</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.aeb}
                  onChange={() => handleCheckboxChange("guvenlik", "aeb")}
                  type="checkbox"
                />
                <p>AEB</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.bas}
                  onChange={() => handleCheckboxChange("guvenlik", "bas")}
                  type="checkbox"
                />
                <p>BAS</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.cocukKilidi}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "cocukKilidi")
                  }
                  type="checkbox"
                />
                <p>Çocuk Kilidi</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.distronic}
                  onChange={() => handleCheckboxChange("guvenlik", "distronic")}
                  type="checkbox"
                />
                <p>Distronic</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input type="checkbox" />
                <p>ESP / VSA</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.geceGorusSistemi}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "geceGorusSistemi")
                  }
                  type="checkbox"
                />
                <p>Gece Görüş Sistemi</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.havaYastıgıSürücü}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "havaYastıgıSürücü")
                  }
                  type="checkbox"
                />
                <p>Hava Yastığı (Sürücü)</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.havaYastıgıYolcu}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "havaYastıgıYolcu")
                  }
                  type="checkbox"
                />
                <p>Hava Yastığı (Yolcu)</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.immobilizer}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "immobilizer")
                  }
                  type="checkbox"
                />
                <p>İmmobilizer</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.isofix}
                  onChange={() => handleCheckboxChange("guvenlik", "isofix")}
                  type="checkbox"
                />
                <p>İsofix</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.korNokta}
                  onChange={() => handleCheckboxChange("guvenlik", "korNokta")}
                  type="checkbox"
                />
                <p>Kör Nokta Uyarı</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.merkeziKilit}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "merkeziKilit")
                  }
                  type="checkbox"
                />
                <p>Merkezi Kilit</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.seritTakip}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "seritTakip")
                  }
                  type="checkbox"
                />
                <p>Şerit Takip Sistemi</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.yokusKalkis}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "yokusKalkis")
                  }
                  type="checkbox"
                />
                <p>Yokuş Kalkış Sistemi</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.guvenlik.yorgunlukTespit}
                  onChange={() =>
                    handleCheckboxChange("guvenlik", "yorgunlukTespit")
                  }
                  type="checkbox"
                />
                <p>Yorgunluk Tespit Sistemi</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input type="checkbox" />
                <p>Zırhlı Araç</p>
              </div>
            </div>
          </div>
          <div
            className={`w-full p-3 border ${evCars ? "border-blue-400" : "border-gray-300"}  rounded-2xl mt-5`}
          >
            <p className="text-sm text-orange-400">İç Donanım</p>
            <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-2 text-xs font-semibold mt-3">
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={
                    formData.teknikOzellikler.icDonanim.hidrolikDireksiyon
                  }
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "hidrolikDireksiyon")
                  }
                  type="checkbox"
                />
                <p>Hidrolik Direksiyon</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.ucuncuSiraKoltuk}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "ucuncuSiraKoltuk")
                  }
                  type="checkbox"
                />
                <p>Üçüncü Sıra Koltuk</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.deriKoltuk}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "deriKoltuk")
                  }
                  type="checkbox"
                />
                <p>Deri Koltuk</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.kumasKoltuk}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "kumasKoltuk")
                  }
                  type="checkbox"
                />
                <p>Kumaş Koltuk</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.elektrikliCam}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "elektrikliCam")
                  }
                  type="checkbox"
                />
                <p>Elektrikli Camlar</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.klima}
                  onChange={() => handleCheckboxChange("icDonanim", "klima")}
                  type="checkbox"
                />
                <p>Klima</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.otmKararanDikiz}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "otmKararanDikiz")
                  }
                  type="checkbox"
                />
                <p>Otm. Kararan Dikiz Aynası</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.onGorüsKamera}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "onGorüsKamera")
                  }
                  type="checkbox"
                />
                <p>Ön Görüş Kamerası</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.onKolDayama}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "onKolDayama")
                  }
                  type="checkbox"
                />
                <p>Ön Koltuk Kol Dayaması</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.anahtarsizGiris}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "anahtarsizGiris")
                  }
                  type="checkbox"
                />
                <p>Anahtarsız Griş ve Çalıştırma</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={
                    formData.teknikOzellikler.icDonanim.fonksiyonelDireksiyon
                  }
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "fonksiyonelDireksiyon")
                  }
                  type="checkbox"
                />
                <p>Fonksiyonel Direksiyon</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={
                    formData.teknikOzellikler.icDonanim.isitmaliDireksiyon
                  }
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "isitmaliDireksiyon")
                  }
                  type="checkbox"
                />
                <p>Isıtmalı Direksiyon</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.elektrikliKoltuk}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "elektrikliKoltuk")
                  }
                  type="checkbox"
                />
                <p>Koltuklar (Elektrikli)</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.sogutmaliTorpido}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "sogutmaliTorpido")
                  }
                  type="checkbox"
                />
                <p>Soğutmalı Torpido</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.yolBilgisayari}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "yolBilgisayari")
                  }
                  type="checkbox"
                />
                <p>Yol Bilgisayarı</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.headUp}
                  onChange={() => handleCheckboxChange("icDonanim", "headUp")}
                  type="checkbox"
                />
                <p>Head-up Display</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.hizSabitleme}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "hizSabitleme")
                  }
                  type="checkbox"
                />
                <p>Hız Sabitleme Sistemi</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.geriGorus}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "geriGorus")
                  }
                  type="checkbox"
                />
                <p>Geri Görüş Kamerası</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.icDonanim.startStop}
                  onChange={() =>
                    handleCheckboxChange("icDonanim", "startStop")
                  }
                  type="checkbox"
                />
                <p>Start / Stop</p>
              </div>
            </div>
          </div>

          <div className="w-full p-3 border border-gray-400 rounded-2xl mt-5">
            <p className="text-sm text-orange-400">Dış Donanım</p>
            <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-2 text-xs font-semibold mt-3">
              <div className="flex items-center space-x-1 text-gray-700">
                <input type="checkbox" />
                <p>Hidrolik Direksiyon</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={
                    formData.teknikOzellikler.dısDonanim.ayaklaAcilanBagaj
                  }
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "ayaklaAcilanBagaj")
                  }
                  type="checkbox"
                />
                <p>Ayakla Açılabilen Bagaj Kapağı</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.hardtop}
                  onChange={() => handleCheckboxChange("dısDonanim", "hardtop")}
                  type="checkbox"
                />
                <p>Hardtop</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.adaptifFar}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "adaptifFar")
                  }
                  type="checkbox"
                />
                <p>Adaptif Far</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.elektrikliAyna}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "elektrikliAyna")
                  }
                  type="checkbox"
                />
                <p>Elektrikli Ayna</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.isitmaliAyna}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "isitmaliAyna")
                  }
                  type="checkbox"
                />
                <p>Isıtmalı Ayna</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.hafizaliAyna}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "hafizaliAyna")
                  }
                  type="checkbox"
                />
                <p>Hafızalı Ayna</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.parkSensorüArka}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "parkSensorüArka")
                  }
                  type="checkbox"
                />
                <p>Park Sensörü (Arka)</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.parkSensorüOn}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "parkSensorüOn")
                  }
                  type="checkbox"
                />
                <p>Park Sensörü (Ön)</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.parkAsistani}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "parkAsistani")
                  }
                  type="checkbox"
                />
                <p>Park Asistanı</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.sunroof}
                  onChange={() => handleCheckboxChange("dısDonanim", "sunroof")}
                  type="checkbox"
                />
                <p>Sunroof</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input type="checkbox" />
                <p>Akıllı Bagaj Kapağı</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.panoramikTavan}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "panoramikTavan")
                  }
                  type="checkbox"
                />
                <p>Panaromik Cam Tavan</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.dısDonanim.cekiDemiri}
                  onChange={() =>
                    handleCheckboxChange("dısDonanim", "cekiDemiri")
                  }
                  type="checkbox"
                />
                <p>Römork Çeki Demiri</p>
              </div>
            </div>
          </div>

          <div
            className={`w-full p-3 border ${evCars ? "border-blue-400" : "border-gray-400"} rounded-2xl mt-5`}
          >
            <p className="text-sm text-orange-400">Multimedya</p>
            <div className="w-full grid grid-cols-2 lg:grid-cols-6 gap-2 text-xs font-semibold mt-3">
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.multimedya.android}
                  onChange={() => handleCheckboxChange("multimedya", "android")}
                  type="checkbox"
                />
                <p>Android Auto</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.multimedya.apple}
                  onChange={() => handleCheckboxChange("multimedya", "apple")}
                  type="checkbox"
                />
                <p>Apple CarPlay</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.multimedya.bluetooth}
                  onChange={() =>
                    handleCheckboxChange("multimedya", "bluetooth")
                  }
                  type="checkbox"
                />
                <p>Bluetooth</p>
              </div>
              <div className="flex items-center space-x-1 text-gray-700">
                <input
                  checked={formData.teknikOzellikler.multimedya.usb}
                  onChange={() => handleCheckboxChange("multimedya", "usb")}
                  type="checkbox"
                />
                <p>USB / AUX</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"}  mt-10 rounded-2xl px-6 font-sans`}
        >
          <div className="flex items-center space-x-2">
            <p className="font-semibold">Medya</p>
            <p className="text-xs text-gray-500">
              Sürükleyerek sıralama yapabilirsiniz. Gönderilen sıra ile
              yayınlanacaktır
            </p>
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (!over || active.id === over.id) return;

              setImages((prev) => arrayMove(prev, active.id, over.id));
            }}
          >
            <SortableContext
              items={images.map((_, index) => index)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
                {images.map((file, index) => (
                  <SortableImage
                    key={index}
                    file={file}
                    index={index}
                    handleRemove={handleRemove}
                  />
                ))}

                {/* Ekleme */}
                <label className="w-full h-28 sm:h-32 md:h-36 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <span className="text-gray-500 text-sm">Ekle</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div
          className={`w-full py-5 border ${evCars ? "border-blue-400" : "border-gray-300"} mt-10 rounded-2xl px-6 font-sans`}
        >
          <p className="font-semibold">Ekspertiz</p>
          <div className="flex items-center space-x-1 mt-2">
            <input
              onChange={(e) => setNoEkspertiz(e.target.checked)}
              type="checkbox"
            />
            <p className="text-sm">Eklemek istemiyorum</p>
          </div>
          {!noEkspertiz && (
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-6 mt-3">
              <div className="col-span-1">
              <svg
                  // width="281"
                  // height="307"
                  viewBox="0 0 281 307"
                  className="w-full h-auto lg:max-w-[300px] mx-auto"
                  // viewBox="0 0 281 307"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // className="ml-6"
                >
                  <path
                    d="M91.4981 23.0439L85.4981 91.0439M84.8589 90.5203L101.859 85.5203M101.913 85.5076L118.913 82.5076M118.969 82.501L134.969 81.501M135 81.5H151M151.055 81.5031L160.055 82.5031M160.062 82.5039L168.062 83.5039M168.089 83.5081L179.089 85.5081M179.144 85.5211L189.144 88.5211M189.158 88.5257L195.158 90.5257M194.501 91.0294L190.501 23.0294M91.6464 22.6464L96.6464 17.6464M96.8419 17.5257L105.842 14.5257M105.902 14.5097L115.902 12.5097M115.958 12.5017L127.958 11.5017M128 11.5H159M159.045 11.5021L170.045 12.5021M170.098 12.5097L180.098 14.5097M180.248 14.5659L187.248 18.5659M187.4 18.7L190.4 22.7"
                    stroke={colorMap[formData?.ekspertiz.kaput] || "black"}
                  />
                  <text
                    x="140"
                    y="60"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.kaput] || "black"}
                  >
                    {formData?.ekspertiz.kaput === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.kaput === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.kaput === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M2.5 4V30M2 29.5H8M8.17556 29.5318L16.1756 32.5318M16.2906 32.5931L23.2906 37.5931M23.4 37.7L26.4 41.7M26.4472 41.7764L28.4472 45.7764M28.5 46V61M28.4851 61.1213L27.4851 65.1213M27.4472 65.2236L25.4472 69.2236M25.3536 69.3536L19.3536 75.3536M19.2773 75.416L16.2774 77.416M16.1213 77.4851L12.1213 78.4851M12 78.5H1M1.5 78V83M1 82.5H13M12.8143 82.5358L17.8143 80.5358M17.7227 80.584L20.7227 78.584M20.6464 78.6464L26.6464 72.6464M26.6 72.7L29.6 68.7M29.5528 68.7764L31.5528 64.7764M31.5257 64.8419L32.5257 61.8419M33 61.5H36M36.3674 61.6609L48.3674 74.6609M48 74.5H55M54.5086 75.0921L51.5086 59.0921M51.5111 59.1048L48.5111 45.1048M48.5169 45.1288L44.5169 30.1288M44.5203 30.1411L39.5203 13.1411M39.5358 13.1857L37.5358 8.1857M37.7226 8.41603L34.7226 6.41603M34.8419 6.47434L31.8419 5.47434M32 5.5H24M23.5528 5.22361L22.5528 3.22361M22.5257 3.15811L21.5257 0.158114M22 0.5H6M6.5 0V3M6 3.5H2"
                    stroke={colorMap[formData?.ekspertiz.solOnCamurluk] || "black"}
                  />
                  <text
                    x="33"
                    y="40"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.solOnCamurluk] || "black"}
                  >
                    {formData?.ekspertiz.solOnCamurluk === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.solOnCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.solOnCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M278.5 4V30M279 29.5H273M272.824 29.5318L264.824 32.5318M264.709 32.5931L257.709 37.5931M257.6 37.7L254.6 41.7M254.553 41.7764L252.553 45.7764M252.5 46V61M252.515 61.1213L253.515 65.1213M253.553 65.2236L255.553 69.2236M255.646 69.3536L261.646 75.3536M261.723 75.416L264.723 77.416M264.879 77.4851L268.879 78.4851M269 78.5H280M279.5 78V83M280 82.5H268M268.186 82.5358L263.186 80.5358M263.277 80.584L260.277 78.584M260.354 78.6464L254.354 72.6464M254.4 72.7L251.4 68.7M251.447 68.7764L249.447 64.7764M249.474 64.8419L248.474 61.8419M248 61.5H245M244.633 61.6609L232.633 74.6609M233 74.5H226M226.491 75.0921L229.491 59.0921M229.489 59.1048L232.489 45.1048M232.483 45.1288L236.483 30.1288M236.48 30.1411L241.48 13.1411M241.464 13.1857L243.464 8.1857M243.277 8.41603L246.277 6.41603M246.158 6.47434L249.158 5.47434M249 5.5H257M257.447 5.22361L258.447 3.22361M258.474 3.15811L259.474 0.158114M259 0.5H275M274.5 0V3M275 3.5H279"
                    stroke={colorMap[formData?.ekspertiz.sagOnCamurluk] || "black"}
                  />
                  <text
                    x="248"
                    y="40"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.sagOnCamurluk] || "black"}
                  >
                    {formData?.ekspertiz.sagOnCamurluk === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.sagOnCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.sagOnCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M5.5 93V159M5 92.5H12M11.8419 92.5257L17.8419 90.5257M17.7226 90.584L20.7226 88.584M20.6464 88.6464L25.6464 83.6464M25.6096 83.6877L29.6096 78.6877M29.5528 78.7764L31.5528 74.7764M31.5257 74.8419L32.5257 71.8419M32.5 72V71M33 71.5H36M36.3536 71.6464L49.3536 84.6464M49.4188 83.7269L64.4188 106.727M64.462 106.809L76.462 135.809M76.4783 135.854L83.4783 158.854M83.499 158.969L84.499 174.969M83.8995 175.49L5.89953 159.49M48.5 93V163M48.0921 162.509L80.0921 168.509M79.5 169V159M79.5169 159.129L75.5169 144.129M75.5257 144.158L72.5257 135.158M72.5431 135.203L68.5431 126.203M68.5659 126.248L60.5659 112.248M60.584 112.277L56.584 106.277M56.5659 106.248L52.5659 99.2481M52.584 99.2773L48.584 93.2773"
                    stroke={colorMap[formData?.ekspertiz.solOnKapi] || "black"}
                  />
                  <text
                    x="28"
                    y="130"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.solOnKapi] || "black"}
                  >
                    {formData?.ekspertiz.solOnKapi === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.solOnKapi === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.solOnKapi === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>

                  <path
                    d="M274.999 93V159M275.499 92.5H268.499M268.657 92.5257L262.657 90.5257M262.776 90.584L259.776 88.584M259.853 88.6464L254.853 83.6464M254.889 83.6877L250.889 78.6877M250.946 78.7764L248.946 74.7764M248.973 74.8419L247.973 71.8419M247.999 72V71M247.499 71.5H244.499M244.145 71.6464L231.145 84.6464M231.08 83.7269L216.08 106.727M216.037 106.809L204.037 135.809M204.021 135.854L197.021 158.854M197 158.969L196 174.969M196.599 175.49L274.599 159.49M231.999 93V163M232.407 162.509L200.407 168.509M200.999 169V159M200.982 159.129L204.982 144.129M204.973 144.158L207.973 135.158M207.956 135.203L211.956 126.203M211.933 126.248L219.933 112.248M219.915 112.277L223.915 106.277M223.933 106.248L227.933 99.2481M227.915 99.2773L231.915 93.2773"
                    stroke={colorMap[formData?.ekspertiz.sagOnKapi] || "black"}
                  />

                  <text
                    x="252"
                    y="131"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.sagOnCamurluk] || "black"}
                  >
                    {formData?.ekspertiz.sagOnCamurluk === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.sagOnCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.sagOnCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M5.58833 154L83.5883 168M85 168.492V217.492M84.6857 217.956L34.6857 237.956M34.005 237.563L33.005 230.563M33.0358 230.678L31.0358 225.678M31.1 225.792L28.1 221.792M28.1464 221.846L23.1464 216.846M23.2227 216.908L17.2226 212.908M17.4293 212.987L10.4293 211.987M10.5 211.992H5.5M5 211.492V154.492M49 167.492V226.492M48.3167 226.027L81.3167 213.027M81 213.492V172.492M81.4106 172.984L48.4106 166.984"
                    stroke={colorMap[formData?.ekspertiz.solArkaKapi] || "black"}
                  />
                  <text
                    x="28"
                    y="200"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.solArkaKapi] || "black"}
                  >
                    {formData?.ekspertiz.solArkaKapi === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.solArkaKapi === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.solArkaKapi === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M274.412 161L196.412 175M195 175.492V224.492M195.314 224.956L245.314 244.956M245.995 244.563L246.995 237.563M246.964 237.678L248.964 232.678M248.9 232.792L251.9 228.792M251.854 228.846L256.854 223.846M256.777 223.908L262.777 219.908M262.571 219.987L269.571 218.987M269.5 218.992H274.5M275 218.492V161.492M231 174.492V233.492M231.683 233.027L198.683 220.027M199 220.492V179.492M198.589 179.984L231.589 173.984"
                    stroke={colorMap[formData?.ekspertiz.sagArkaKapi] || "black"}
                  />
                  <text
                    x="252"
                    y="202"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.sagArkaKapi] || "black"}
                  >
                    {formData?.ekspertiz.sagArkaKapi === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.sagArkaKapi === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.sagArkaKapi === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M84.5 225V234M84.4881 234.108L82.4881 243.108M82.4699 243.171L78.4699 254.171M78.4642 254.186L72.4642 269.186M72.4341 269.248L64.4341 283.248M64.4044 283.294L56.4044 294.294M56.416 294.277L52.416 300.277M52 300.5H28M28.3904 300.312L24.3904 305.312M24 305.5H10M9.58397 305.277L5.58397 299.277M6 299.5H1M0.5 299V270M1 269.5H9M8.90194 269.51L13.9019 268.51M13.7 268.6L17.7 265.6M17.6877 265.61L22.6877 261.61M22.6 261.7L25.6 257.7M25.5713 257.743L28.5713 252.743M28.5 253V241M28.5358 241.186L26.5358 236.186M26.5713 236.257L23.5713 231.257M23.6464 231.354L19.6464 227.354M19.7 227.4L15.7 224.4M15.7764 224.447L11.7764 222.447M12 222.5H1M0.5 222V219M1 218.5H8M8.09806 218.51L13.0981 219.51M13.1213 219.515L17.1213 220.515M17.3 220.6L25.3 226.6M25.4 226.7L31.4 234.7M31.4808 234.863L33.4808 241.863M33.5 242V246M32.8175 245.535L83.8175 225.535M47.5 244V259M46.6649 258.629L77.6649 230.629M46.8012 243.541L76.8012 230.541"
                    stroke={
                      colorMap[formData?.ekspertiz.solArkaCamurluk] || "black"
                    }
                  />
                  <text
                    x="36"
                    y="280"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.solArkaCamurluk] || "black"}
                  >
                    {formData?.ekspertiz.solArkaCamurluk === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.solArkaCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.solArkaCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M196 225.5V234.5M196.012 234.608L198.012 243.608M198.03 243.671L202.03 254.671M202.036 254.686L208.036 269.686M208.066 269.748L216.066 283.748M216.096 283.794L224.096 294.794M224.084 294.777L228.084 300.777M228.5 301H252.5M252.11 300.812L256.11 305.812M256.5 306H270.5M270.916 305.777L274.916 299.777M274.5 300H279.5M280 299.5V270.5M279.5 270H271.5M271.598 270.01L266.598 269.01M266.8 269.1L262.8 266.1M262.812 266.11L257.812 262.11M257.9 262.2L254.9 258.2M254.929 258.243L251.929 253.243M252 253.5V241.5M251.964 241.686L253.964 236.686M253.929 236.757L256.929 231.757M256.854 231.854L260.854 227.854M260.8 227.9L264.8 224.9M264.724 224.947L268.724 222.947M268.5 223H279.5M280 222.5V219.5M279.5 219H272.5M272.402 219.01L267.402 220.01M267.379 220.015L263.379 221.015M263.2 221.1L255.2 227.1M255.1 227.2L249.1 235.2M249.019 235.363L247.019 242.363M247 242.5V246.5M247.683 246.035L196.683 226.035M233 244.5V259.5M233.835 259.129L202.835 231.129M233.699 244.041L203.699 231.041"
                    stroke={
                      colorMap[formData?.ekspertiz.sagArkaCamurluk] || "black"
                    }
                  />
                  <text
                    x="250"
                    y="282"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.sagArkaCamurluk] || "black"}
                  >
                    {formData?.ekspertiz.sagArkaCamurluk === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.sagArkaCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.sagArkaCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>

                  <path
                    d="M98 224.5H182M182.499 224.969L183.499 240.969M183.481 240.863L187.481 254.863M187.471 254.832L192.471 268.832M192.485 268.879L195.485 280.879M195.499 280.964L196.499 294.964M196.207 295.455L185.207 300.455M185.098 300.49L170.098 303.49M170.042 303.498L158.042 304.498M158.024 304.499L137.024 305.499M136.974 305.499L117.974 304.499M117.929 304.495L103.929 302.495M103.863 302.481L89.8626 298.481M89.803 298.46L82.803 295.46M82.5013 294.964L83.5013 280.964M83.5176 280.868L86.5176 269.868M86.5358 269.814L94.5358 249.814M94.5128 249.888L97.5128 236.888M97.5 237V224M104.498 229.045L103.498 240.045M103.483 240.129L99.4831 255.129M99.4709 255.168L94.4709 269.168M94.2481 268.566L101.248 272.566M101.144 272.521L111.144 275.521M111.038 275.501L124.038 276.501M123.987 276.5L162.987 275.5M162.929 275.505L176.929 273.505M176.776 273.553L186.776 268.553M186.553 269.224L181.553 259.224M181.515 259.121L178.515 247.121M178.51 247.098L175.51 232.098M175.5 232V228M104 228.5H176"
                    stroke={colorMap[formData?.ekspertiz.bagaj] || "black"}
                  />
                  <text
                    x="142"
                    y="300"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.bagaj] || "black"}
                  >
                    {formData?.ekspertiz.bagaj === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.bagaj === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.bagaj === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <rect
                    x="94.5"
                    y="99.5"
                    width="92"
                    height="116"
                    stroke={colorMap[formData?.ekspertiz.tavan] || "black"}
                  />
                  <text
                    x="140"
                    y="165"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[formData?.ekspertiz.tavan] || "black"}
                  >
                    {formData?.ekspertiz.tavan === "Boyalı"
                      ? "B"
                      : formData?.ekspertiz.tavan === "Lokal Boyalı"
                        ? "LB"
                        : formData?.ekspertiz.tavan === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                </svg>
              </div>
              <div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-x-5 mt-5 lg:mt-0">
                <div className="grid lg:flex flex-col grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-semibold">Sol Ön Çamurluk</p>
                    <select
                      name="solOnCamurluk"
                      value={formData.ekspertiz.solOnCamurluk}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Sol Ön Kapı</p>
                    <select
                      name="solOnKapi"
                      value={formData.ekspertiz.solOnKapi}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Sol Arka Kapı</p>
                    <select
                      name="solArkaKapi"
                      value={formData.ekspertiz.solArkaKapi}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Sol Arka Çamurluk</p>
                    <select
                      name="solArkaCamurluk"
                      value={formData.ekspertiz.solArkaCamurluk}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                </div>
                <div className="grid lg:flex flex-col grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-semibold">Kaput</p>
                    <select
                      name="kaput"
                      value={formData.ekspertiz.kaput}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Tavan</p>
                    <select
                      name="tavan"
                      value={formData.ekspertiz.tavan}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Bagaj</p>
                    <select
                      name="bagaj"
                      value={formData.ekspertiz.bagaj}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                </div>
                <div className="grid lg:flex flex-col grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-semibold">Sağ Ön Çamurluk</p>
                    <select
                      name="sagOnCamurluk"
                      value={formData.ekspertiz.sagOnCamurluk}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Sağ Ön Kapı</p>
                    <select
                      name="sagOnKapi"
                      value={formData.ekspertiz.sagOnKapi}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Sağ Arka Kapı</p>
                    <select
                      name="sagArkaKapi"
                      value={formData.ekspertiz.sagArkaKapi}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                  <div className="lg:mt-3">
                    <p className="text-sm font-semibold">Sağ Arka Çamurluk</p>
                    <select
                      name="sagArkaCamurluk"
                      value={formData.ekspertiz.sagArkaCamurluk}
                      onChange={handleEkspertizChange}
                      className="border outline-0 border-gray-500 px-3 py-1 text-sm rounded-full"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Boyalı">Boyalı</option>
                      <option value="Lokal Boyalı">Lokal Boyalı</option>
                      <option value="Değişmiş">Değişen</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center items-center mt-7">
          <button
            onClick={() => addListing()}
            className="w-64 h-10 bg-orange-400 text-white font-semibold font-sans rounded-full cursor-pointer hover:bg-orange-300 duration-300"
          >
            İlan Ekle
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
