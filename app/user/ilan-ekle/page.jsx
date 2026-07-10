"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
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
          ? " https://dostagider-api.onrender.com/ev-car-options/categories"
          : " https://dostagider-api.onrender.com/car-options/categories",
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
            ? ` https://dostagider-api.onrender.com/ev-car-options/filter?category=${selectCategory}&includeTechnical=true`
            : ` https://dostagider-api.onrender.com/car-options/filter?category=${selectCategory}`,
        );
        setCarBrandList(res.data.data[0]);
      }
      if (selectCategory && selectBrand && !selectModel) {
        const res = await axios.get(
          evCars
            ? ` https://dostagider-api.onrender.com/ev-car-options/filter?category=${selectCategory}&brand=${selectBrand}&includeTechnical=true`
            : ` https://dostagider-api.onrender.com/car-options/filter?category=${selectCategory}&brand=${selectBrand}`,
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
        className={`w-full h-full py-5 px-14 font-sans overflow-y-scroll relative ${evCars ? "" : ""}`}
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
          <div className="w-full grid grid-cols-6 gap-x-5 py-3 text-sm">
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
              <div key={index} className="w-1/2 py-3 grid grid-cols-5 gap-x-3">
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
          <div className="w-full grid grid-cols-4 gap-5 mt-5 text-sm">
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
            <div className="grid grid-cols-3 gap-8 mt-3">
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
            <div className="w-full grid grid-cols-8 gap-2 text-xs font-semibold mt-3">
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
            <div className="w-full grid grid-cols-6 gap-2 text-xs font-semibold mt-3">
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
            <div className="w-full grid grid-cols-6 gap-2 text-xs font-semibold mt-3">
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
            <div className="w-full grid grid-cols-6 gap-2 text-xs font-semibold mt-3">
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
            <div className="w-full grid grid-cols-3 gap-x-6 mt-3">
              <div className="col-span-1">
                <div className="relative h-[420px]">
                  <div className="absolute top-5 left-36">
                    {/* <p>Kaput</p> */}
                    {
                      formData.ekspertiz.kaput === "Boyalı" ? (
                        <span className="absolute top-8 text-blue-600 font-semibold left-[52px]">
                          B
                        </span>
                      ) : formData.ekspertiz.kaput === "Lokal Boyalı" ? (
                        <span className="absolute top-8 text-orange-300 font-semibold left-[50px]">
                          LB
                        </span>
                      ) : formData.ekspertiz.kaput === "Değişmiş" ? (
                        <span className="absolute top-8 text-red-600 font-semibold left-[52px]">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-8 text-black font-semibold left-[52px]">
                          O
                        </span>
                      ) // default
                    }

                    <svg
                      width="112"
                      height="81"
                      viewBox="0 0 112 81"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49807 12.0439L1.49807 80.0439M0.858917 79.5203L17.8589 74.5203M17.9131 74.5076L34.9131 71.5076M34.9688 71.501L50.9688 70.501M51 70.5H67M67.0552 70.5031L76.0552 71.5031M76.062 71.5039L84.062 72.5039M84.0894 72.5081L95.0894 74.5081M95.1437 74.5211L105.144 77.5211M105.158 77.5257L111.158 79.5257M110.501 80.0294L106.501 12.0294M7.64645 11.6464L12.6464 6.64645M12.8419 6.52566L21.8419 3.52566M21.9019 3.50971L31.9019 1.50971M31.9585 1.50173L43.9585 0.501727M44 0.5H75M75.0453 0.502053L86.0453 1.50205M86.0981 1.50971L96.0981 3.50971M96.2481 3.56588L103.248 7.56588M103.4 7.7L106.4 11.7"
                        stroke={colorMap[formData.ekspertiz.kaput] || "black"}
                      />
                    </svg>
                  </div>

                  <div className="absolute top-5 left-20">
                    {/* <p>Sol Ön Çamurluk</p> */}
                    {
                      formData.ekspertiz.solOnCamurluk === "Boyalı" ? (
                        <span className="absolute text-blue-600 font-semibold top-2 left-3">
                          B
                        </span>
                      ) : formData.ekspertiz.solOnCamurluk ===
                        "Lokal Boyalı" ? (
                        <span className="absolute text-orange-300 font-semibold top-2 left-3">
                          LB
                        </span>
                      ) : formData.ekspertiz.solOnCamurluk === "Değişmiş" ? (
                        <span className="absolute text-orange-600 font-semibold top-2 left-3">
                          D
                        </span>
                      ) : (
                        <span className="absolute text-black font-semibold top-2 left-3">
                          O
                        </span>
                      ) // default
                    }

                    <svg
                      width="54"
                      height="83"
                      viewBox="0 0 54 83"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 4V30M1 29.5H7M7.17556 29.5318L15.1756 32.5318M15.2906 32.5931L22.2906 37.5931M22.4 37.7L25.4 41.7M25.4472 41.7764L27.4472 45.7764M27.5 46V61M27.4851 61.1213L26.4851 65.1213M26.4472 65.2236L24.4472 69.2236M24.3536 69.3536L18.3536 75.3536M18.2773 75.416L15.2774 77.416M15.1213 77.4851L11.1213 78.4851M11 78.5H0M0.5 78V83M0 82.5H12M11.8143 82.5358L16.8143 80.5358M16.7227 80.584L19.7227 78.584M19.6464 78.6464L25.6464 72.6464M25.6 72.7L28.6 68.7M28.5528 68.7764L30.5528 64.7764M30.5257 64.8419L31.5257 61.8419M32 61.5H35M35.3674 61.6609L47.3674 74.6609M47 74.5H54M53.5086 75.0921L50.5086 59.0921M50.5111 59.1048L47.5111 45.1048M47.5169 45.1288L43.5169 30.1288M43.5203 30.1411L38.5203 13.1411M38.5358 13.1857L36.5358 8.1857M36.7226 8.41603L33.7226 6.41603M33.8419 6.47434L30.8419 5.47434M31 5.5H23M22.5528 5.22361L21.5528 3.22361M21.5257 3.15811L20.5257 0.158114M21 0.5H5M5.5 0V3M5 3.5H1"
                        stroke={
                          colorMap[formData.ekspertiz.solOnCamurluk] || "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute top-5 right-32">
                    {/* <p>Sağ Ön Çamurluk</p> */}
                    {
                      formData.ekspertiz.sagOnCamurluk === "Boyalı" ? (
                        <span className="absolute text-blue-600 font-semibold top-2 left-5">
                          B
                        </span>
                      ) : formData.ekspertiz.sagOnCamurluk ===
                        "Lokal Boyalı" ? (
                        <span className="absolute text-orange-300 font-semibold top-2 left-5">
                          LB
                        </span>
                      ) : formData.ekspertiz.sagOnCamurluk === "Değişmiş" ? (
                        <span className="absolute text-red-600 font-semibold top-2 left-5">
                          D
                        </span>
                      ) : (
                        <span className="absolute text-black font-semibold top-2 left-5">
                          O
                        </span>
                      ) // default
                    }

                    <svg
                      width="54"
                      height="83"
                      viewBox="0 0 54 83"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M52.5 4V30M53 29.5H47M46.8244 29.5318L38.8244 32.5318M38.7094 32.5931L31.7094 37.5931M31.6 37.7L28.6 41.7M28.5528 41.7764L26.5528 45.7764M26.5 46V61M26.5149 61.1213L27.5149 65.1213M27.5528 65.2236L29.5528 69.2236M29.6464 69.3536L35.6464 75.3536M35.7227 75.416L38.7226 77.416M38.8787 77.4851L42.8787 78.4851M43 78.5H54M53.5 78V83M54 82.5H42M42.1857 82.5358L37.1857 80.5358M37.2773 80.584L34.2773 78.584M34.3536 78.6464L28.3536 72.6464M28.4 72.7L25.4 68.7M25.4472 68.7764L23.4472 64.7764M23.4743 64.8419L22.4743 61.8419M22 61.5H19M18.6326 61.6609L6.6326 74.6609M7 74.5H0M0.491436 75.0921L3.49144 59.0921M3.4889 59.1048L6.4889 45.1048M6.48312 45.1288L10.4831 30.1288M10.4797 30.1411L15.4797 13.1411M15.4642 13.1857L17.4642 8.1857M17.2774 8.41603L20.2774 6.41603M20.1581 6.47434L23.1581 5.47434M23 5.5H31M31.4472 5.22361L32.4472 3.22361M32.4743 3.15811L33.4743 0.158114M33 0.5H49M48.5 0V3M49 3.5H53"
                        stroke={
                          colorMap[formData.ekspertiz.sagOnCamurluk] || "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute top-24 left-20">
                    {/* <p>Sol Ön Kapı</p> */}
                    {
                      formData.ekspertiz.solOnKapi === "Boyalı" ? (
                        <span className="absolute top-10 left-5 font-semibold text-blue-600">
                          B
                        </span>
                      ) : formData.ekspertiz.solOnKapi === "Lokal Boyalı" ? (
                        <span className="absolute top-10 left-4 font-semibold text-orange-300">
                          LB
                        </span>
                      ) : formData.ekspertiz.solOnKapi === "Değişmiş" ? (
                        <span className="absolute top-10 left-5 font-semibold text-red-600">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-10 left-5 font-semibold text-black">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="80"
                      height="105"
                      viewBox="0 0 80 105"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 22V88M0 21.5H7M6.84189 21.5257L12.8419 19.5257M12.7226 19.584L15.7226 17.584M15.6464 17.6464L20.6464 12.6464M20.6096 12.6877L24.6096 7.68765M24.5528 7.77639L26.5528 3.77639M26.5257 3.84189L27.5257 0.841886M27.5 1V0M28 0.5H31M31.3536 0.646447L44.3536 13.6464M44.4188 12.7269L59.4188 35.7269M59.462 35.8088L71.462 64.8088M71.4783 64.8544L78.4783 87.8544M78.499 87.9688L79.499 103.969M78.8995 104.49L0.89953 88.4898M43.5 22V92M43.0921 91.5086L75.0921 97.5086M74.5 98V88M74.5169 88.1288L70.5169 73.1288M70.5257 73.1581L67.5257 64.1581M67.5431 64.2031L63.5431 55.2031M63.5659 55.2481L55.5659 41.2481M55.584 41.2774L51.584 35.2774M51.5659 35.2481L47.5659 28.2481M47.584 28.2773L43.584 22.2773"
                        stroke={
                          colorMap[formData.ekspertiz.solOnKapi] || "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute top-24 right-32">
                    {/* <p>Sağ Ön Kapı</p> */}
                    {
                      formData.ekspertiz.sagOnKapi === "Boyalı" ? (
                        <span className="absolute text-blue-600 font-semibold top-10 right-5">
                          B
                        </span>
                      ) : formData.ekspertiz.sagOnKapi === "Lokal Boyalı" ? (
                        <span className="absolute text-orange-300 font-semibold top-10 right-5">
                          LB
                        </span>
                      ) : formData.ekspertiz.sagOnKapi === "Değişmiş" ? (
                        <span className="absolute text-red-600 font-semibold top-10 right-5">
                          D
                        </span>
                      ) : (
                        <span className="absolute text-black font-semibold top-10 right-5">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="81"
                      height="105"
                      viewBox="0 0 81 105"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M79.999 22V88M80.499 21.5H73.499M73.6571 21.5257L67.6571 19.5257M67.7764 19.584L64.7764 17.584M64.8526 17.6464L59.8526 12.6464M59.8895 12.6877L55.8895 7.68765M55.9462 7.77639L53.9462 3.77639M53.9734 3.84189L52.9734 0.841886M52.999 1V0M52.499 0.5H49.499M49.1455 0.646447L36.1455 13.6464M36.0802 12.7269L21.0802 35.7269M21.037 35.8088L9.03702 64.8088M9.02068 64.8544L2.02068 87.8544M2 87.9688L1 103.969M1.59949 104.49L79.5995 88.4898M36.999 22V92M37.4069 91.5086L5.40688 97.5086M5.99902 98V88M5.98214 88.1288L9.98214 73.1288M9.97337 73.1581L12.9734 64.1581M12.9559 64.2031L16.9559 55.2031M16.9331 55.2481L24.9331 41.2481M24.915 41.2774L28.915 35.2774M28.9331 35.2481L32.9331 28.2481M32.915 28.2773L36.915 22.2773"
                        stroke={
                          colorMap[formData.ekspertiz.sagOnKapi] || "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute top-32 right-[216px]">
                    {/* <p>Tavan</p> */}
                    {
                      formData.ekspertiz.tavan === "Boyalı" ? (
                        <span className="absolute text-blue-600 font-semibold top-16 left-[30px]">
                          B
                        </span>
                      ) : formData.ekspertiz.tavan === "Lokal Boyalı" ? (
                        <span className="absolute text-orange-300 font-semibold top-16 left-6">
                          LB
                        </span>
                      ) : formData.ekspertiz.tavan === "Değişmiş" ? (
                        <span className="absolute text-red-600 font-semibold top-16 left-[30px]">
                          D
                        </span>
                      ) : (
                        <span className="absolute text-black font-semibold top-16 left-[30px]">
                          O
                        </span>
                      ) // default
                    }

                    <svg
                      width="70"
                      height="160"
                      viewBox="0 0 73 140"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="72"
                        height="139"
                        stroke={colorMap[formData.ekspertiz.tavan] || "black"}
                      />
                    </svg>
                  </div>

                  <div className="absolute top-48 left-20">
                    {/* <p>Sol Arka Kapı</p> */}
                    {
                      formData.ekspertiz.solArkaKapi === "Boyalı" ? (
                        <span className="absolute top-7 left-5 font-semibold text-blue-600">
                          B
                        </span>
                      ) : formData.ekspertiz.solArkaKapi === "Lokal Boyalı" ? (
                        <span className="absolute top-7 left-4 font-semibold text-orange-300">
                          LB
                        </span>
                      ) : formData.ekspertiz.solArkaKapi === "Değişmiş" ? (
                        <span className="absolute top-7 left-5 font-semibold text-red-600">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-7 left-5 font-semibold text-black">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="81"
                      height="85"
                      viewBox="0 0 81 85"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.08833 0.507866L79.0883 14.5079M80.5 15V64M80.1857 64.4642L30.1857 84.4642M29.505 84.0707L28.505 77.0707M28.5358 77.1857L26.5358 72.1857M26.6 72.3L23.6 68.3M23.6464 68.3536L18.6464 63.3536M18.7227 63.416L12.7226 59.416M12.9293 59.495L5.92929 58.495M6 58.5H1M0.5 58V1M44.5 14V73M43.8167 72.5348L76.8167 59.5348M76.5 60V19M76.9106 19.4919L43.9106 13.4919"
                        stroke={
                          colorMap[formData.ekspertiz.solArkaKapi] || "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute top-48 right-32">
                    {/* <p>Sağ Arka Kapı</p> */}
                    {
                      formData.ekspertiz.sagArkaKapi === "Boyalı" ? (
                        <span className="absolute top-7 right-5 font-semibold text-blue-600">
                          B
                        </span>
                      ) : formData.ekspertiz.sagArkaKapi === "Lokal Boyalı" ? (
                        <span className="absolute top-7 right-4 font-semibold text-orange-300">
                          LB
                        </span>
                      ) : formData.ekspertiz.sagArkaKapi === "Değişmiş" ? (
                        <span className="absolute top-7 right-5 font-semibold text-red-600">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-7 right-5 font-semibold text-black">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="82"
                      height="86"
                      viewBox="0 0 82 86"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M80.4117 1L2.41167 15M1 15.4921V64.4921M1.31431 64.9564L51.3143 84.9564M51.995 84.5628L52.995 77.5628M52.9642 77.6778L54.9642 72.6778M54.9 72.7921L57.9 68.7921M57.8536 68.8457L62.8536 63.8457M62.7773 63.9082L68.7774 59.9082M68.5707 59.9871L75.5707 58.9871M75.5 58.9921H80.5M81 58.4921V1.49214M37 14.4921V73.4921M37.6833 73.0269L4.68326 60.0269M5 60.4921V19.4921M4.58944 19.9841L37.5894 13.9841"
                        stroke={
                          colorMap[formData.ekspertiz.sagArkaKapi] || "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute left-20 top-[265px]">
                    {/* <p>Sol Arka Çamurluk</p> */}
                    {
                      formData.ekspertiz.solArkaCamurluk === "Boyalı" ? (
                        <span className="absolute top-11 left-5 font-semibold text-blue-600">
                          B
                        </span>
                      ) : formData.ekspertiz.solArkaCamurluk ===
                        "Lokal Boyalı" ? (
                        <span className="absolute top-11 left-4 font-semibold text-orange-300">
                          LB
                        </span>
                      ) : formData.ekspertiz.solArkaCamurluk === "Değişmiş" ? (
                        <span className="absolute top-11 left-5 font-semibold text-red-600">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-11 left-5 font-semibold text-black">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="85"
                      height="88"
                      viewBox="0 0 85 88"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M84.5 7V16M84.4881 16.1085L82.4881 25.1085M82.4699 25.1709L78.4699 36.1709M78.4642 36.1857L72.4642 51.1857M72.4341 51.2481L64.4341 65.2481M64.4044 65.2941L56.4044 76.2941M56.416 76.2774L52.416 82.2774M52 82.5H28M28.3904 82.3123L24.3904 87.3123M24 87.5H10M9.58397 87.2774L5.58397 81.2774M6 81.5H1M0.5 81V52M1 51.5H9M8.90194 51.5097L13.9019 50.5097M13.7 50.6L17.7 47.6M17.6877 47.6096L22.6877 43.6096M22.6 43.7L25.6 39.7M25.5713 39.7428L28.5713 34.7428M28.5 35V23M28.5358 23.1857L26.5358 18.1857M26.5713 18.2572L23.5713 13.2572M23.6464 13.3536L19.6464 9.35355M19.7 9.4L15.7 6.4M15.7764 6.44721L11.7764 4.44721M12 4.5H1M0.5 4V1M1 0.5H8M8.09806 0.50971L13.0981 1.50971M13.1213 1.51493L17.1213 2.51493M17.3 2.6L25.3 8.6M25.4 8.7L31.4 16.7M31.4808 16.8626L33.4808 23.8626M33.5 24V28M32.8175 27.5345L83.8175 7.53451M47.5 26V41M46.6649 40.6289L77.6649 12.6289M46.8012 25.5412L76.8012 12.5412"
                        stroke={
                          colorMap[formData.ekspertiz.solArkaCamurluk] ||
                          "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute right-32 top-[265px]">
                    {/* <p>Sağ Arka Çamurluk</p> */}
                    {
                      formData.ekspertiz.sagArkaCamurluk === "Boyalı" ? (
                        <span className="absolute top-11 right-5 font-semibold text-blue-600">
                          B
                        </span>
                      ) : formData.ekspertiz.sagArkaCamurluk ===
                        "Lokal Boyalı" ? (
                        <span className="absolute top-11 right-4 font-semibold text-orange-300">
                          LB
                        </span>
                      ) : formData.ekspertiz.sagArkaCamurluk === "Değişmiş" ? (
                        <span className="absolute top-11 right-5 font-semibold text-red-600">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-11 right-5 font-semibold text-black">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="86"
                      height="89"
                      viewBox="0 0 86 89"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7.5V16.5M1.01191 16.6085L3.01191 25.6085M3.03011 25.6709L7.03011 36.6709M7.03576 36.6857L13.0358 51.6857M13.0659 51.7481L21.0659 65.7481M21.0956 65.7941L29.0956 76.7941M29.084 76.7774L33.084 82.7774M33.5 83H57.5M57.1096 82.8123L61.1096 87.8123M61.5 88H75.5M75.916 87.7774L79.916 81.7774M79.5 82H84.5M85 81.5V52.5M84.5 52H76.5M76.5981 52.0097L71.5981 51.0097M71.8 51.1L67.8 48.1M67.8123 48.1096L62.8123 44.1096M62.9 44.2L59.9 40.2M59.9287 40.2428L56.9287 35.2428M57 35.5V23.5M56.9642 23.6857L58.9642 18.6857M58.9287 18.7572L61.9287 13.7572M61.8536 13.8536L65.8536 9.85355M65.8 9.9L69.8 6.9M69.7236 6.94721L73.7236 4.94721M73.5 5H84.5M85 4.5V1.5M84.5 1H77.5M77.4019 1.00971L72.4019 2.00971M72.3787 2.01493L68.3787 3.01493M68.2 3.1L60.2 9.1M60.1 9.2L54.1 17.2M54.0192 17.3626L52.0192 24.3626M52 24.5V28.5M52.6825 28.0345L1.68255 8.03451M38 26.5V41.5M38.8351 41.1289L7.83514 13.1289M38.6988 26.0412L8.69881 13.0412"
                        stroke={
                          colorMap[formData.ekspertiz.sagArkaCamurluk] ||
                          "black"
                        }
                      />
                    </svg>
                  </div>

                  <div className="absolute left-36 top-80">
                    {/* <p>Bagaj</p> */}
                    {
                      formData.ekspertiz.bagaj === "Boyalı" ? (
                        <span className="absolute top-8 text-blue-600 font-semibold left-[52px]">
                          B
                        </span>
                      ) : formData.ekspertiz.bagaj === "Lokal Boyalı" ? (
                        <span className="absolute top-8 text-orange-300 font-semibold left-[50px]">
                          LB
                        </span>
                      ) : formData.ekspertiz.bagaj === "Değişmiş" ? (
                        <span className="absolute top-8 text-red-600 font-semibold left-[52px]">
                          D
                        </span>
                      ) : (
                        <span className="absolute top-8 text-black font-semibold left-[52px]">
                          O
                        </span>
                      ) // default
                    }
                    <svg
                      width="115"
                      height="82"
                      viewBox="0 0 115 82"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 0.5H100M100.499 0.968811L101.499 16.9688M101.481 16.8626L105.481 30.8626M105.471 30.8318L110.471 44.8318M110.485 44.8787L113.485 56.8787M113.499 56.9644L114.499 70.9644M114.207 71.4552L103.207 76.4552M103.098 76.4903L88.0981 79.4903M88.0415 79.4983L76.0415 80.4983M76.0238 80.4994L55.0238 81.4994M54.9737 81.4993L35.9737 80.4993M35.9293 80.495L21.9293 78.495M21.8626 78.4808L7.86264 74.4808M7.80304 74.4596L0.803036 71.4596M0.501266 70.9644L1.50127 56.9644M1.51761 56.8684L4.51761 45.8684M4.53576 45.8143L12.5358 25.8143M12.5128 25.8876L15.5128 12.8876M15.5 13V0M22.4979 5.04527L21.4979 16.0453M21.4831 16.1288L17.4831 31.1288M17.4709 31.1682L12.4709 45.1682M12.2481 44.5659L19.2481 48.5659M19.1437 48.5211L29.1437 51.5211M29.0383 51.5015L42.0383 52.5015M41.9872 52.5002L80.9872 51.5002M80.9293 51.505L94.9293 49.505M94.7764 49.5528L104.776 44.5528M104.553 45.2236L99.5528 35.2236M99.5149 35.1213L96.5149 23.1213M96.5097 23.0981L93.5097 8.09806M93.5 8V4M22 4.5H94"
                        stroke={colorMap[formData.ekspertiz.bagaj] || "black"}
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-3 gap-x-5">
                <div>
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
                  <div className="mt-3">
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
                  <div className="mt-3">
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
                  <div className="mt-3">
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
                <div>
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
                  <div className="mt-3">
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
                  <div className="mt-3">
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
                <div>
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
                  <div className="mt-3">
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
                  <div className="mt-3">
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
                  <div className="mt-3">
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
