"use client";
import React, { useEffect, useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Thumbs,
} from "swiper/modules";
import { FaTimes, FaUser, FaUserAlt } from "react-icons/fa";
import { CiPhone, CiShare2 } from "react-icons/ci";
import {
  MdElectricBolt,
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineElectricalServices,
  MdOutlineNoPhotography,
} from "react-icons/md";
import {
  IoInformationCircleOutline,
  IoShareSocialOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import api from "@/app/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parse from "html-react-parser";
import ProductPrice from "@/app/component/ProductPrice";
import { useUser } from "@/app/contexts/UserContext";
import PopupLogin from "@/app/component/PopupLogin";
import { Tooltip } from "@mui/material";
import { SiSpeedtest } from "react-icons/si";
import { IoIosBatteryFull } from "react-icons/io";
import { PiEngineBold } from "react-icons/pi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "95%",
};

const styleComp = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState();
  const [isFav, setIsFav] = useState();

  const [open, setOpen] = React.useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [popupRoute, setPopupRoute] = useState(null);

  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [fsIndex, setFsIndex] = useState(0);

  const [showInactivePopup, setShowInactivePopup] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  const [reason, setReason] = useState();
  const [message, setMessage] = useState();

  const [openPrice, setOpenPrice] = React.useState(false);
  const handleOpenPrice = () => setOpenPrice(true);
  const handleClosePrice = () => setOpenPrice(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openComplain, setOpenComplain] = useState(false);
  const handleOpenComplain = () => setOpenComplain(true);
  const handleCloseComplain = () => setOpenComplain(false);

  const params = useParams();
  const router = useRouter();

  const { user, loading } = useUser();

  const getData = async () => {
    try {
      const res = await axios.get(
        ` https://dostagider-api.vercel.app/ilan/detay?ilanNo=${params.slug[0]}`,
      );

      setData(res.data.ilan);
      setLoadingPage(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // user undefined değilse artık karar verebiliriz
    if (user !== undefined) {
      setCheckedAuth(true);
    }
  }, [user]);

  useEffect(() => {
    if (!data) return;

    // ilan aktif → herkes görebilir
    if (data.isActive) return;

    // ⛔ user hala yükleniyor → BEKLE
    if (loading) return;

    const isOwner =
      user && user.ilanlar?.some((id) => id.toString() === data._id.toString());

    // ❌ kesin karar
    if (!user || !isOwner) {
      router.push("/not-found");
      return;
    }

    // ✅ owner
    setShowInactivePopup(true);
  }, [data, user, loading]);

  const handleMessage = async () => {
    const res = await api.post("/conversations", {
      targetId: data.user._id,
      targetModel: data.user.role === "kurumsal" ? "CorporateUser" : "User",
      listingId: data._id,
    });

    router.push(`/user/mesajlar?c=${res.data._id}`);
  };

  const convertDateMounth = () => {
    if (data.user.hesapOlusturmaTarihi.ay === 1) {
      return "Ocak";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 2) {
      return "Şubat";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 3) {
      return "Mart";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 4) {
      return "Nisan";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 5) {
      return "Mayıs";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 6) {
      return "Haziran";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 7) {
      return "Temmuz";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 8) {
      return "Ağustos";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 9) {
      return "Eylül";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 10) {
      return "Ekim";
    }
    if (data.user.hesapOlusturmaTarihi.ay === 11) {
      return "Kasım";
    }
    return "Aralık";
  };

  useEffect(() => {
    getData();
  }, []);

  const addFavorite = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        const res = await api.post("/users/favori-ekle", {
          ilanId: data._id,
        });
        checkFavorite();
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
      console.log("add favorite error", error);
      // toast.warn(error.response.data.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   // transition: Bounce,
      // });

      alert(error.response.data.message || "Hata Oluştu");
    }
  };

  const checkFavorite = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        // router.push("/login");
        return;
      } else {
        const res = await api.get(
          ` https://dostagider-api.vercel.app/users/status/${data._id}`,
        );
        setIsFav(res.data.favorited);
      }
    } catch (error) {
      console.log("check fav error", error);
    }
  };

  const colors = {
    kaput: "blue",
    tavan: "gray",
    on_cam: "gray",
    arka_cam: "gray",
    bagaj: "red",
    sag_on_kapi: "gray",
    sag_arka_kapi: "blue",
    sol_on_kapi: "gray",
    sol_arka_kapi: "red",
  };

  useEffect(() => {
    checkFavorite();
  }, [data]);

  const removeFav = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        const res = await api.post("/users/remove-favorite", {
          listingId: data._id,
        });
        checkFavorite();
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
      console.log("user error", error);
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

  const colorMap = {
    Orijinal: "black",
    Boyalı: "blue",
    "Lokal Boyalı": "orange",
    Değişmiş: "red",
  };

  const normalizeKey = (key) => {
    const formatted = key
      .replace(/([A-Z])/g, " $1") // Büyük harfleri önce boşluk ile ayırıyoruz
      .replace(/^./, (str) => str.toUpperCase()) // İlk harfi büyük yapıyoruz
      .replace("Camurluk", "Çamurluk") // Türkçeye özgü düzenleme
      .replace("Kapi", "Kapı") // Türkçeye özgü düzenleme
      .replace("On", "Ön"); // Türkçeye özgü düzenleme
    return formatted;
  };

  const ayikla = (obj) => {
    const boyali = [];
    const degismis = [];
    const lokalBoyali = [];

    for (let key in obj) {
      if (obj[key] === "Boyalı") {
        boyali.push(normalizeKey(key));
      } else if (obj[key] === "Değişmiş") {
        degismis.push(normalizeKey(key));
      } else if (obj[key] === "Lokal Boyalı") {
        lokalBoyali.push(normalizeKey(key));
      }
    }

    return { boyali, degismis, lokalBoyali };
  };

  const { boyali, degismis, lokalBoyali } = ayikla(data?.ekspertiz);

  const getColor = (partId) => coloredParts[partId] || "#ccc";

  const formattedDate = (listingDate) => {
    const date = new Date(listingDate);
    const format = date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return format;
  };

  const [loginResult, setLoginResult] = useState(null);

  const handlePopupResult = (data) => {
    setLoginResult(data);
  };

  useEffect(() => {
    if (loginResult === "message") {
      handleMessage();
    }
    if (loginResult === "fav") {
      // router.reload();
      // router.refresh()
      window.location.reload();
      // handleClose()
    }
  }, [loginResult]);

  const [carInfo, setCarInfo] = useState();

  const carOptionInfo = async () => {
    try {
      const response = await api.get(
        `/ev-car-options/filter?category=${data.category}&brand=${data.brand}&variant1=${data.variant1}&includeTechnical=true`,
      );
      setCarInfo(
        response.data.data[0].brands[0].models[0].variants[0].technical,
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const createReport = async () => {
    try {
      const res = await api.post("/report/create", {
        listingId: data._id,
        reason,
        message,
      });
      handleCloseComplain()
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
    } catch (error) {
      console.log("error", error);
      handleCloseComplain()
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

  useEffect(() => {
    carOptionInfo();
  }, [data]);

  const slides = data?.gorseller?.map((url) => ({
    src: url,
  }));

  if (loadingPage)
    return (
      <div className="w-full lg:w-4/6 mx-auto py-5 lg:py-20 grid grid-cols-1 lg:grid-cols-10 gap-x-16">
        <div className="col-span-7">
          <Skeleton width={"100"} height={200} />
          <Skeleton width={"100"} height={600} />
          <Skeleton width={"100"} height={300} />
          <Skeleton width={"100"} height={200} />
          <Skeleton width={"100"} height={900} />
        </div>
        <div className="col-span-3">
          <Skeleton width={"100"} height={140} />
          <Skeleton width={"100"} height={480} />
          <Skeleton width={"100"} height={600} />
          <Skeleton width={"100"} height={600} />
        </div>
      </div>
    );

  return (
    <>
      {showInactivePopup && (
        <div className="container mt-10 rounded-full mx-auto py-3 bg-red-400 animate-bounce">
          <p className="text-white font-semibold text-center text-sm">
            Bu ilan yayında değildir. Detay sayfasını sadece siz
            görüntüleyebilmektesiniz. Yeniden yayınlama adımlarını izleyiniz.
          </p>
        </div>
      )}

      <ToastContainer />
      <div className="w-full lg:w-4/6 mx-auto py-5 lg:py-20 grid grid-cols-1 lg:grid-cols-10 lg:gap-x-16 px-5 lg:px-0">
        <div className="col-span-7">
          <div className="flex items-center space-x-1">
            <p className="font-sans text-3xl font-semibold">{data?.baslik} </p>
            {data?.isEV && (
              <MdOutlineElectricalServices
                className="text-blue-500"
                size={36}
              />
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <p>{data?.brand}</p>
              <span>/</span>
              <p>{data?.model}</p>
              <span>/</span>
              <p>{data?.variant1 ? data?.variant1 : ""}</p>
              {data?.variant2 && <span>/</span>}
              <p>{data?.variant2 ? data?.variant2 : ""}</p>
              {data?.variant3 && <span>/</span>}
              <p>{data?.variant3 ? data?.variant3 : ""}</p>
            </div>

            <div className="flex items-center space-x-2 mt-2 lg:mt-0">
              <div
                onClick={() => {
                  if (user) {
                    if (isFav) {
                      removeFav();
                    } else addFavorite();
                  } else {
                    handleClickOpen();
                    setPopupAction("fav");
                  }
                }}
                className={`w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer`}
              >
                {isFav ? (
                  <MdFavorite color="red" />
                ) : (
                  <MdFavoriteBorder color="blue" />
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer">
                <IoShareSocialOutline color="blue" />
              </div>
              <div
                onClick={handleOpenComplain}
                className="w-10 h-10 rounded-full bg-[#E9F2FF] flex justify-center items-center cursor-pointer"
              >
                <IoWarningOutline color="blue" size={20} />
              </div>
              <Modal
                open={openComplain}
                onClose={handleCloseComplain}
                aria-labelledby="complain-modal-title"
              >
                <Box
                  sx={styleComp}
                  className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl outline-none"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-[#050B20]">
                        İlanı Şikayet Et
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Şikayetiniz incelenerek gerekli işlemler yapılacaktır.
                      </p>
                    </div>

                    <button
                      onClick={handleCloseComplain}
                      className="text-gray-400 hover:text-red-500 text-xl cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* İlan Bilgisi */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-5">
                    <p className="text-sm text-gray-500">İlan No</p>
                    <p className="font-semibold text-orange-500">
                      {data?.ilanNo}
                    </p>
                  </div>

                  {/* Şikayet Nedeni */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şikayet Nedeni
                    </label>

                    <select
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
                    >
                      <option value="">Şikayet nedeni seçiniz</option>
                      <option value="fake_listing">
                        Sahte / Gerçek Dışı İlan
                      </option>
                      <option value="wrong_information">
                        Yanlış Bilgi İçeriyor
                      </option>
                      <option value="fraud">Dolandırıcılık Şüphesi</option>
                      <option value="duplicate">Mükerrer İlan</option>
                      <option value="inappropriate">Uygunsuz İçerik</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>

                  {/* Açıklama */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama
                    </label>

                    <textarea
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Şikayetiniz ile ilgili detayları yazabilirsiniz..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-orange-400"
                    />
                  </div>

                  {/* Bilgi Kutusu */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
                    <p className="text-xs text-blue-700">
                      Yapılan şikayetler yönetici ekibi tarafından incelenir.
                      Gerektiğinde ilan yayından kaldırılabilir veya ilan sahibi
                      ile iletişime geçilebilir.
                    </p>
                  </div>

                  {/* Butonlar */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleCloseComplain}
                      className="px-5 py-1 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Vazgeç
                    </button>

                    <button
                      onClick={() => createReport()}
                      className="px-5 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-medium cursor-pointer"
                    >
                      Şikayeti Gönder
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>

          <div className=" mt-5 space-x-2 w-full lg:w-2/3 grid grid-cols-2 lg:gap-y-0 gap-y-2  lg:grid-cols-4 gap-x-4">
            <div className="w-full py-2 bg-[#E9F2FF] rounded-full text-[#405FF2] text-sm flex items-center justify-center space-x-2">
              <BsCalendar2Date size={20} />
              <p>{data?.aracYili}</p>
            </div>
            <div className="w-full py-2 bg-[#E9F2FF] rounded-full text-[#405FF2] text-sm  flex items-center justify-center space-x-2">
              <img className="w-4" src="/d-km.png" />
              <p>{data?.km}</p>
            </div>
            <div className="w-full py-2 bg-[#E9F2FF] rounded-full text-[#405FF2] text-sm  flex items-center justify-center space-x-2">
              <img className="w-4" src="/d-vites.png" />
              <p>{data?.vites}</p>
            </div>
            <div className="w-full py-2 bg-[#E9F2FF] rounded-full text-[#405FF2] text-sm  flex items-center justify-center space-x-2">
              <img className="w-4" src="/d-petrol.png" />
              <p>{data?.yakit}</p>
            </div>
          </div>
          {data?.gorseller.length > 0 ? (
            <>
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Thumbs]}
              >
                {data?.gorseller.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full flex h-auto lg:h-[600px] border border-gray-300 mt-8">
                      <img
                        onClick={() => {
                          setFullScreenOpen(true);
                          setFsIndex(index);
                        }}
                        className="w-full h-full object-contain cursor-zoom-in"
                        src={item}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6.5}
                watchSlidesProgress
                modules={[Thumbs]}
                style={{ marginTop: "10px" }}
              >
                {data?.gorseller.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`lg:h-24 h-12 border-2  ${
                        activeIndex === index
                          ? "border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      <img
                        className="w-full h-full object-contain"
                        src={item}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <div className="w-full h-[400px] flex justify-center items-center">
              <MdOutlineNoPhotography color="gray" size={90} />
            </div>
          )}

          <Lightbox
            open={fullScreenOpen}
            close={() => setFullScreenOpen(false)}
            slides={slides}
            index={fsIndex}
            plugins={[Thumbnails]}
          />

          <div
            className={`w-full p-3 border block lg:hidden mt-8 ${data.isEV ? "border-blue-400" : "border-gray-200"}  rounded-xl shadow-xl`}
          >
            <p className="font-sans">Fiyat</p>
            <p className="text-xl text-red-500 font-semibold">
              <ProductPrice price={data?.price} locale="tr-TR" />
            </p>
            <div className="w-full flex items-center space-x-1 text-sm mt-2 text-gray-500">
              <p className="font-semibold">{data?.sehir}</p>
              <p className="font-semibold">/</p>
              <p className="font-semibold">{data?.ilce}</p>
              <p className="font-semibold">/</p>
              <p className="font-semibold">{data?.mahalle}</p>
            </div>
          </div>

          {data?.isEV && (
            <div className="w-full mt-8 rounded-2xl py-7 bg-blue-950 shadow-2xl text-white">
              <div className="flex lg:hidden flex-col justify-center items-center">
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
              <div className="w-full py-3 grid grid-cols-4 lg:grid-cols-5 gap-x-3">
                <div className="lg:flex hidden flex-col justify-center items-center">
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
                  <Tooltip title="Menzil">
                    <SiSpeedtest color="white" size={26} />
                  </Tooltip>

                  <p className=" text-sm font-semibold">{carInfo?.range} KM</p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Tooltip title="Batarya Kapasitesi">
                    <IoIosBatteryFull color="white" size={28} />
                  </Tooltip>
                  <p className="text-sm font-semibold">
                    {carInfo?.batteryCapacity} KW/h
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Tooltip title="Motor Gücü">
                    <PiEngineBold color="white" size={26} />
                  </Tooltip>
                  <p className=" text-sm font-semibold">
                    {carInfo?.motorPower} Bg
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Tooltip title="Ortalama Tüketim">
                    <MdElectricBolt color="white" size={26} />
                  </Tooltip>
                  <p className=" text-sm font-semibold">
                    {carInfo?.avgConsumption} KW/h
                  </p>
                </div>
              </div>
            </div>
          )}

          <div
            className={`w-full border ${data?.isEV ? "border-blue-400" : "border-gray-200"} shadow-2xl rounded-xl py-6 px-3 mt-10`}
          >
            <p className="text-lg font-sans font-semibold">İlan Genel Bakış</p>

            <div className="w-full grid grid-cols-1 lg:grid-cols-4 mt-5">
              <div className="text-sm text-gray-700">
                <div className="flex items-center space-x-1 ">
                  <p className="font-semibold">İlan No: </p>
                  <p>{data?.ilanNo}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">İlan Tarihi: </p>
                  <p>{formattedDate(data?.createdAt)}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Marka: </p>
                  <p>{data?.brand}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Model: </p>
                  <p>{data?.model}</p>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <div className="flex items-center space-x-1 ">
                  <p className="font-semibold">Yıl: </p>
                  <p>{data?.aracYili}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Yakıt: </p>
                  <p>{data?.yakit}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Vites: </p>
                  <p>{data?.vites}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Araç Durumu: </p>
                  <p>İkinci El</p>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <div className="flex items-center space-x-1 ">
                  <p className="font-semibold">Kasa Tipi: </p>
                  <p>Hatchback 5 Kapı</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Çekiş: </p>
                  <p>Önden Çekiş</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Renk: </p>
                  <p>Beyaz</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">KM: </p>
                  <p>{data?.km} km</p>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <div className="flex items-center space-x-1 ">
                  <p className="font-semibold">Garanti: </p>
                  <p>Evet</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Ağır Hasar Kayıtlı: </p>
                  <p>Hayır</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Plaka: </p>
                  <p>TR</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Kimden: </p>
                  <p className="text-red-500">Sahibinden</p>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="font-semibold">Takas: </p>
                  <p>Evet</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full border ${data?.isEV ? "border-blue-400" : "border-gray-200"} shadow-2xl rounded-xl py-6 px-3 mt-10`}
          >
            <p className="text-lg font-sans font-semibold">Açıklama</p>
            <p className="mt-3 text-gray-600 text-sm">
              {parse(data?.aciklama)}
            </p>
          </div>

          <div
            className={`w-full border ${data?.isEV ? "border-blue-400" : "border-gray-200"} shadow-2xl rounded-xl py-6 px-3 mt-10`}
          >
            <p className="text-lg font-sans font-semibold">Özellikler</p>
            <div className="w-full mt-5">
              <p className="text-sm font-semibold text-red-500">Güvenlik</p>
              <div className="w-full mt-1 py-5 border border-gray-200 grid grid-cols-2 lg:grid-cols-4 text-sm font-sans font-medium">
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.abs ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={22} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.abs ? (
                      <p>ABS</p>
                    ) : (
                      <p className="text-gray-500">ABS</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.distronic ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.distronic ? (
                      <p>Distronic</p>
                    ) : (
                      <p className="text-gray-500">Distronic</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.havaYastıgıYolcu ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.havaYastıgıYolcu ? (
                      <p>Hava Yastığı (Yolcu)</p>
                    ) : (
                      <p className="text-gray-500">Hava Yastığı (Yolcu)</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.merkeziKilit ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.merkeziKilit ? (
                      <p>Merkezi Kilit</p>
                    ) : (
                      <p className="text-gray-500">Merkezi Kilit</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FaTimes size={18} color="gray" />
                    <p className="text-gray-500">Zırhlı Araç</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.aeb ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.aeb ? (
                      <p>AEB</p>
                    ) : (
                      <p className="text-gray-500">AEB</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <TiTick size={22} color="green" />
                    <p>ESP / VSA</p>
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.immobilizer ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.immobilizer ? (
                      <p>İmmobilizer</p>
                    ) : (
                      <p className="text-gray-500">İmmobilizer</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.seritTakip ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.seritTakip ? (
                      <p>Şerit Takip Sistemi</p>
                    ) : (
                      <p className="text-gray-500">Şerit Takip Sistemi</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.bas ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.bas ? (
                      <p>BAS</p>
                    ) : (
                      <p className="text-gray-500">BAS</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.geceGorusSistemi ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.geceGorusSistemi ? (
                      <p>Gece Görüş Sistemi</p>
                    ) : (
                      <p className="text-gray-500">Gece Görüş Sistemi</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.isofix ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.isofix ? (
                      <p>İsofix</p>
                    ) : (
                      <p className="text-gray-500">İsofix</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.yokusKalkis ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.yokusKalkis ? (
                      <p>Yokuş Kalkış Desteği</p>
                    ) : (
                      <p className="text-gray-500">Yokuş Kalkış Desteği</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.cocukKilidi ? (
                      <TiTick size={22} color="green" />
                    ) : (
                      <FaTimes size={18} color="gray" />
                    )}
                    {data?.teknikOzellikler.guvenlik.cocukKilidi ? (
                      <p>Çocuk Kilidi</p>
                    ) : (
                      <p className="text-gray-500">Çocuk Kilidi</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.havaYastıgıSürücü ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Hava Yastığı (Sürücü)</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Hava Yastığı (Sürücü)</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.korNokta ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Kör Nokta Uyarı Sistemi</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Kör Nokta Uyarı Sistemi</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.guvenlik.yorgunlukTespit ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Yorgunluk Tespit Sistemi</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">
                          Yorgunluk Tespit Sistemi
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-red-500 mt-6">
                İç Donanım
              </p>
              <div className="w-full mt-1 py-5 border border-gray-200 grid grid-cols-2 lg:grid-cols-4 text-sm font-sans font-medium">
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.hidrolikDireksiyon ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Hidrolik Direksiyon</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Hidrolik Direksiyon</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.elektrikliCam ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Elektrikli Camlar</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Elektrikli Camlar</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.onKolDayama ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Ön Koltuk Kol Dayaması</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Ön Koltuk Kol Dayaması</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.elektrikliKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Koltuklar (Elektrikli)</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Koltuklar (Elektrikli)</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.hizSabitleme ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Hız Sabitleme Sistemi</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Hız Sabitleme Sistemi</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.startStop ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Start / Stop</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Start / Stop</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.ucuncuSiraKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Üçüncü Sıra Koltuk</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Üçüncü Sıra Koltuk</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.ucuncuSiraKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Klima</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Klima</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.anahtarsizGiris ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Anahtarsız Griş ve Çalıştırma</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">
                          Anahtarsız Griş ve Çalıştırma
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <FaTimes size={18} color="gray" />
                    <p className="text-gray-500">Hafızalı Koltuk</p>
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.sogutmaliTorpido ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Soğutmalı Torpido</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Soğutmalı Torpido</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.geriGorus ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Geri Görüş Kamerası</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Geri Görüş Kamerası</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.deriKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Deri Koltuk</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Deri Koltuk</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.otmKararanDikiz ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Otm. Kararan Dikiz Aynası</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">
                          Otm. Kararan Dikiz Aynası
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.fonksiyonelDireksiyon ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Fonksiyonel Direksiyon</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Fonksiyonel Direksiyon</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.isitmaliKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Isıtmalı Koltuk</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Isıtmalı Koltuk</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.yolBilgisayari ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Yol Bilgisayarı</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Yol Bilgisayarı</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.kumasKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Kumaş Koltuk</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Kumaş Koltuk</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.onGorüsKamera ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Ön Görüş Kamerası</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Ön Görüş Kamerası</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.isitmaliDireksiyon ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Isıtmalı Direksiyon</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Isıtmalı Direksiyon</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.sogutmaliKoltuk ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Soğutmalı Koltuk</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Soğutmalı Koltuk</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.icDonanim.headUp ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Head-up Display</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Head-up Display</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm font-semibold text-red-500 mt-6">
                Dış Donanım
              </p>
              <div className="w-full mt-1 py-5 border border-gray-200 grid grid-cols-2 lg:grid-cols-4 text-sm font-sans font-medium">
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.ayaklaAcilanBagaj ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Ayakla Açılan Bagaj Kapağı</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">
                          Ayakla Açılan Bagaj Kapağı
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.isitmaliAyna ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Isıtmalı Ayna</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Isıtmalı Ayna</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.parkAsistani ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Park Asistanı</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Park Asistanı</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.cekiDemiri ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Römork Çeki Demiri</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Römork Çeki Demiri</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.hardtop ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Hardtop</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Hardtop</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.hafizaliAyna ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Hafızalı Ayna</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Hafızalı Ayna</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.sunroof ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Sunroof</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Sunroof</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.adaptifFar ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Adaptif Far</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Adaptif Far</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.parkSensorüArka ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Park Sensörü (Arka)</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Park Sensörü (Arka)</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <TiTick size={22} color="green" />
                    <p>Akıllı Bagaj Kapağı</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.elektrikliAyna ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Elektrikli Ayna</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Elektrikli Ayna</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.parkSensorüOn ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Park Sensörü (Ön)</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Park Sensörü (Ön)</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {data?.teknikOzellikler.dısDonanim.panoramikTavan ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Panoramik Cam Tavan</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Panoramik Cam Tavan</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-red-500 mt-6">
                Multimedya
              </p>
              <div className="w-full mt-1 py-5 border border-gray-200 grid grid-cols-2 lg:grid-cols-4 text-sm font-sans font-medium">
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.multimedya.android ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Android Auto</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Android Auto</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.multimedya.apple ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Apple CarPlay</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Apple CarPlay</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.multimedya.bluetooth ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>Bluetooth</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">Bluetooth</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    {data?.teknikOzellikler.multimedya.usb ? (
                      <>
                        <TiTick size={22} color="green" />
                        <p>USB / AUX</p>
                      </>
                    ) : (
                      <>
                        <FaTimes size={18} color="gray" />
                        <p className="text-gray-500">USB / AUX</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-red-500 mt-6">
                Boyalı ve Değişen Parça
              </p>
              <div className="flex items-center space-x-5 mt-3">
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-5 h-5 bg-black"></div>
                  <p>Orijinal</p>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-5 h-5 bg-orange-300"></div>
                  <p>Lokal Boyalı</p>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-5 h-5 bg-blue-600"></div>
                  <p>Boyalı</p>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-5 h-5 bg-red-600"></div>
                  <p>Değişen</p>
                </div>
              </div>
              <div className="w-full mt-1 py-5 px-5 border border-gray-200 grid grid-cols-1 lg:grid-cols-2 bg-orange-50">
                {/* Yeni SVG */}
                <svg
                  // width="281"
                  // height="307"
                  viewBox="0 0 281 307"
                  className="w-full h-auto max-w-[300px] mx-auto"
                  // viewBox="0 0 281 307"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  // className="ml-6"
                >
                  <path
                    d="M91.4981 23.0439L85.4981 91.0439M84.8589 90.5203L101.859 85.5203M101.913 85.5076L118.913 82.5076M118.969 82.501L134.969 81.501M135 81.5H151M151.055 81.5031L160.055 82.5031M160.062 82.5039L168.062 83.5039M168.089 83.5081L179.089 85.5081M179.144 85.5211L189.144 88.5211M189.158 88.5257L195.158 90.5257M194.501 91.0294L190.501 23.0294M91.6464 22.6464L96.6464 17.6464M96.8419 17.5257L105.842 14.5257M105.902 14.5097L115.902 12.5097M115.958 12.5017L127.958 11.5017M128 11.5H159M159.045 11.5021L170.045 12.5021M170.098 12.5097L180.098 14.5097M180.248 14.5659L187.248 18.5659M187.4 18.7L190.4 22.7"
                    stroke={colorMap[data?.ekspertiz.kaput] || "black"}
                  />
                  <text
                    x="140"
                    y="60"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.kaput] || "black"}
                  >
                    {data?.ekspertiz.kaput === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.kaput === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.kaput === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M2.5 4V30M2 29.5H8M8.17556 29.5318L16.1756 32.5318M16.2906 32.5931L23.2906 37.5931M23.4 37.7L26.4 41.7M26.4472 41.7764L28.4472 45.7764M28.5 46V61M28.4851 61.1213L27.4851 65.1213M27.4472 65.2236L25.4472 69.2236M25.3536 69.3536L19.3536 75.3536M19.2773 75.416L16.2774 77.416M16.1213 77.4851L12.1213 78.4851M12 78.5H1M1.5 78V83M1 82.5H13M12.8143 82.5358L17.8143 80.5358M17.7227 80.584L20.7227 78.584M20.6464 78.6464L26.6464 72.6464M26.6 72.7L29.6 68.7M29.5528 68.7764L31.5528 64.7764M31.5257 64.8419L32.5257 61.8419M33 61.5H36M36.3674 61.6609L48.3674 74.6609M48 74.5H55M54.5086 75.0921L51.5086 59.0921M51.5111 59.1048L48.5111 45.1048M48.5169 45.1288L44.5169 30.1288M44.5203 30.1411L39.5203 13.1411M39.5358 13.1857L37.5358 8.1857M37.7226 8.41603L34.7226 6.41603M34.8419 6.47434L31.8419 5.47434M32 5.5H24M23.5528 5.22361L22.5528 3.22361M22.5257 3.15811L21.5257 0.158114M22 0.5H6M6.5 0V3M6 3.5H2"
                    stroke={colorMap[data?.ekspertiz.solOnCamurluk] || "black"}
                  />
                  <text
                    x="33"
                    y="40"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.solOnCamurluk] || "black"}
                  >
                    {data?.ekspertiz.solOnCamurluk === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.solOnCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.solOnCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M278.5 4V30M279 29.5H273M272.824 29.5318L264.824 32.5318M264.709 32.5931L257.709 37.5931M257.6 37.7L254.6 41.7M254.553 41.7764L252.553 45.7764M252.5 46V61M252.515 61.1213L253.515 65.1213M253.553 65.2236L255.553 69.2236M255.646 69.3536L261.646 75.3536M261.723 75.416L264.723 77.416M264.879 77.4851L268.879 78.4851M269 78.5H280M279.5 78V83M280 82.5H268M268.186 82.5358L263.186 80.5358M263.277 80.584L260.277 78.584M260.354 78.6464L254.354 72.6464M254.4 72.7L251.4 68.7M251.447 68.7764L249.447 64.7764M249.474 64.8419L248.474 61.8419M248 61.5H245M244.633 61.6609L232.633 74.6609M233 74.5H226M226.491 75.0921L229.491 59.0921M229.489 59.1048L232.489 45.1048M232.483 45.1288L236.483 30.1288M236.48 30.1411L241.48 13.1411M241.464 13.1857L243.464 8.1857M243.277 8.41603L246.277 6.41603M246.158 6.47434L249.158 5.47434M249 5.5H257M257.447 5.22361L258.447 3.22361M258.474 3.15811L259.474 0.158114M259 0.5H275M274.5 0V3M275 3.5H279"
                    stroke={colorMap[data?.ekspertiz.sagOnCamurluk] || "black"}
                  />
                  <text
                    x="248"
                    y="40"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.sagOnCamurluk] || "black"}
                  >
                    {data?.ekspertiz.sagOnCamurluk === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.sagOnCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.sagOnCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M5.5 93V159M5 92.5H12M11.8419 92.5257L17.8419 90.5257M17.7226 90.584L20.7226 88.584M20.6464 88.6464L25.6464 83.6464M25.6096 83.6877L29.6096 78.6877M29.5528 78.7764L31.5528 74.7764M31.5257 74.8419L32.5257 71.8419M32.5 72V71M33 71.5H36M36.3536 71.6464L49.3536 84.6464M49.4188 83.7269L64.4188 106.727M64.462 106.809L76.462 135.809M76.4783 135.854L83.4783 158.854M83.499 158.969L84.499 174.969M83.8995 175.49L5.89953 159.49M48.5 93V163M48.0921 162.509L80.0921 168.509M79.5 169V159M79.5169 159.129L75.5169 144.129M75.5257 144.158L72.5257 135.158M72.5431 135.203L68.5431 126.203M68.5659 126.248L60.5659 112.248M60.584 112.277L56.584 106.277M56.5659 106.248L52.5659 99.2481M52.584 99.2773L48.584 93.2773"
                    stroke={colorMap[data?.ekspertiz.solOnKapi] || "black"}
                  />
                  <text
                    x="28"
                    y="130"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.solOnKapi] || "black"}
                  >
                    {data?.ekspertiz.solOnKapi === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.solOnKapi === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.solOnKapi === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>

                  <path
                    d="M274.999 93V159M275.499 92.5H268.499M268.657 92.5257L262.657 90.5257M262.776 90.584L259.776 88.584M259.853 88.6464L254.853 83.6464M254.889 83.6877L250.889 78.6877M250.946 78.7764L248.946 74.7764M248.973 74.8419L247.973 71.8419M247.999 72V71M247.499 71.5H244.499M244.145 71.6464L231.145 84.6464M231.08 83.7269L216.08 106.727M216.037 106.809L204.037 135.809M204.021 135.854L197.021 158.854M197 158.969L196 174.969M196.599 175.49L274.599 159.49M231.999 93V163M232.407 162.509L200.407 168.509M200.999 169V159M200.982 159.129L204.982 144.129M204.973 144.158L207.973 135.158M207.956 135.203L211.956 126.203M211.933 126.248L219.933 112.248M219.915 112.277L223.915 106.277M223.933 106.248L227.933 99.2481M227.915 99.2773L231.915 93.2773"
                    stroke={colorMap[data?.ekspertiz.sagOnKapi] || "black"}
                  />

                  <text
                    x="252"
                    y="131"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.sagOnCamurluk] || "black"}
                  >
                    {data?.ekspertiz.sagOnCamurluk === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.sagOnCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.sagOnCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M5.58833 154L83.5883 168M85 168.492V217.492M84.6857 217.956L34.6857 237.956M34.005 237.563L33.005 230.563M33.0358 230.678L31.0358 225.678M31.1 225.792L28.1 221.792M28.1464 221.846L23.1464 216.846M23.2227 216.908L17.2226 212.908M17.4293 212.987L10.4293 211.987M10.5 211.992H5.5M5 211.492V154.492M49 167.492V226.492M48.3167 226.027L81.3167 213.027M81 213.492V172.492M81.4106 172.984L48.4106 166.984"
                    stroke={colorMap[data?.ekspertiz.solArkaKapi] || "black"}
                  />
                  <text
                    x="28"
                    y="200"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.solArkaKapi] || "black"}
                  >
                    {data?.ekspertiz.solArkaKapi === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.solArkaKapi === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.solArkaKapi === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M274.412 161L196.412 175M195 175.492V224.492M195.314 224.956L245.314 244.956M245.995 244.563L246.995 237.563M246.964 237.678L248.964 232.678M248.9 232.792L251.9 228.792M251.854 228.846L256.854 223.846M256.777 223.908L262.777 219.908M262.571 219.987L269.571 218.987M269.5 218.992H274.5M275 218.492V161.492M231 174.492V233.492M231.683 233.027L198.683 220.027M199 220.492V179.492M198.589 179.984L231.589 173.984"
                    stroke={colorMap[data?.ekspertiz.sagArkaKapi] || "black"}
                  />
                  <text
                    x="252"
                    y="202"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.sagArkaKapi] || "black"}
                  >
                    {data?.ekspertiz.sagArkaKapi === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.sagArkaKapi === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.sagArkaKapi === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M84.5 225V234M84.4881 234.108L82.4881 243.108M82.4699 243.171L78.4699 254.171M78.4642 254.186L72.4642 269.186M72.4341 269.248L64.4341 283.248M64.4044 283.294L56.4044 294.294M56.416 294.277L52.416 300.277M52 300.5H28M28.3904 300.312L24.3904 305.312M24 305.5H10M9.58397 305.277L5.58397 299.277M6 299.5H1M0.5 299V270M1 269.5H9M8.90194 269.51L13.9019 268.51M13.7 268.6L17.7 265.6M17.6877 265.61L22.6877 261.61M22.6 261.7L25.6 257.7M25.5713 257.743L28.5713 252.743M28.5 253V241M28.5358 241.186L26.5358 236.186M26.5713 236.257L23.5713 231.257M23.6464 231.354L19.6464 227.354M19.7 227.4L15.7 224.4M15.7764 224.447L11.7764 222.447M12 222.5H1M0.5 222V219M1 218.5H8M8.09806 218.51L13.0981 219.51M13.1213 219.515L17.1213 220.515M17.3 220.6L25.3 226.6M25.4 226.7L31.4 234.7M31.4808 234.863L33.4808 241.863M33.5 242V246M32.8175 245.535L83.8175 225.535M47.5 244V259M46.6649 258.629L77.6649 230.629M46.8012 243.541L76.8012 230.541"
                    stroke={
                      colorMap[data?.ekspertiz.solArkaCamurluk] || "black"
                    }
                  />
                  <text
                    x="36"
                    y="280"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.solArkaCamurluk] || "black"}
                  >
                    {data?.ekspertiz.solArkaCamurluk === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.solArkaCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.solArkaCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <path
                    d="M196 225.5V234.5M196.012 234.608L198.012 243.608M198.03 243.671L202.03 254.671M202.036 254.686L208.036 269.686M208.066 269.748L216.066 283.748M216.096 283.794L224.096 294.794M224.084 294.777L228.084 300.777M228.5 301H252.5M252.11 300.812L256.11 305.812M256.5 306H270.5M270.916 305.777L274.916 299.777M274.5 300H279.5M280 299.5V270.5M279.5 270H271.5M271.598 270.01L266.598 269.01M266.8 269.1L262.8 266.1M262.812 266.11L257.812 262.11M257.9 262.2L254.9 258.2M254.929 258.243L251.929 253.243M252 253.5V241.5M251.964 241.686L253.964 236.686M253.929 236.757L256.929 231.757M256.854 231.854L260.854 227.854M260.8 227.9L264.8 224.9M264.724 224.947L268.724 222.947M268.5 223H279.5M280 222.5V219.5M279.5 219H272.5M272.402 219.01L267.402 220.01M267.379 220.015L263.379 221.015M263.2 221.1L255.2 227.1M255.1 227.2L249.1 235.2M249.019 235.363L247.019 242.363M247 242.5V246.5M247.683 246.035L196.683 226.035M233 244.5V259.5M233.835 259.129L202.835 231.129M233.699 244.041L203.699 231.041"
                    stroke={
                      colorMap[data?.ekspertiz.sagArkaCamurluk] || "black"
                    }
                  />
                  <text
                    x="250"
                    y="282"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.sagArkaCamurluk] || "black"}
                  >
                    {data?.ekspertiz.sagArkaCamurluk === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.sagArkaCamurluk === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.sagArkaCamurluk === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>

                  <path
                    d="M98 224.5H182M182.499 224.969L183.499 240.969M183.481 240.863L187.481 254.863M187.471 254.832L192.471 268.832M192.485 268.879L195.485 280.879M195.499 280.964L196.499 294.964M196.207 295.455L185.207 300.455M185.098 300.49L170.098 303.49M170.042 303.498L158.042 304.498M158.024 304.499L137.024 305.499M136.974 305.499L117.974 304.499M117.929 304.495L103.929 302.495M103.863 302.481L89.8626 298.481M89.803 298.46L82.803 295.46M82.5013 294.964L83.5013 280.964M83.5176 280.868L86.5176 269.868M86.5358 269.814L94.5358 249.814M94.5128 249.888L97.5128 236.888M97.5 237V224M104.498 229.045L103.498 240.045M103.483 240.129L99.4831 255.129M99.4709 255.168L94.4709 269.168M94.2481 268.566L101.248 272.566M101.144 272.521L111.144 275.521M111.038 275.501L124.038 276.501M123.987 276.5L162.987 275.5M162.929 275.505L176.929 273.505M176.776 273.553L186.776 268.553M186.553 269.224L181.553 259.224M181.515 259.121L178.515 247.121M178.51 247.098L175.51 232.098M175.5 232V228M104 228.5H176"
                    stroke={colorMap[data?.ekspertiz.bagaj] || "black"}
                  />
                  <text
                    x="142"
                    y="300"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.bagaj] || "black"}
                  >
                    {data?.ekspertiz.bagaj === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.bagaj === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.bagaj === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                  <rect
                    x="94.5"
                    y="99.5"
                    width="92"
                    height="116"
                    stroke={colorMap[data?.ekspertiz.tavan] || "black"}
                  />
                  <text
                    x="140"
                    y="165"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill={colorMap[data?.ekspertiz.tavan] || "black"}
                  >
                    {data?.ekspertiz.tavan === "Boyalı"
                      ? "B"
                      : data?.ekspertiz.tavan === "Lokal Boyalı"
                        ? "LB"
                        : data?.ekspertiz.tavan === "Değişmiş"
                          ? "D"
                          : "O"}
                  </text>
                </svg>

                <div>
                  <p className="text-blue-600 text-sm font-semibold">
                    Boyalı Parçalar
                  </p>
                  {boyali.map((item) => (
                    <p className="text-xs mt-1">{item}</p>
                  ))}

                  <p className="text-orange-300 text-sm font-semibold mt-4">
                    Lokal Boyalı Parçalar
                  </p>
                  {lokalBoyali.map((item) => (
                    <p className="text-xs mt-1">{item}</p>
                  ))}

                  <p className="text-red-600 text-sm font-semibold mt-4">
                    Değişen Parçalar
                  </p>
                  {degismis.map((item) => (
                    <p className="text-xs mt-1">{item}</p>
                  ))}
                  <div className="mt-6 p-2 border w-60 border-gray-400 rounded-md">
                    <p className="text-sm font-semibold font-sans">
                      Araç Tramer Bilgisi
                    </p>
                    <p className="text-xs">Tramer kaydı yoktur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div
            className={`w-full hidden lg:block p-3 border ${data.isEV ? "border-blue-400" : "border-gray-200"}  rounded-xl shadow-xl`}
          >
            <p className="font-sans">Fiyat</p>
            <div className="flex items-center justify-between">
              <p className="text-xl text-red-500 font-semibold">
                <ProductPrice price={data?.price} locale="tr-TR" />
              </p>
              <button
                onClick={handleOpenPrice}
                className="text-xs text-orange-500 cursor-pointer hover:text-orange-800 duration-300"
              >
                Geçmişi Görüntüle
              </button>
            </div>

            <div className="w-full flex items-center space-x-1 text-sm mt-2 text-gray-500">
              <p className="font-semibold">{data?.sehir}</p>
              <p className="font-semibold">/</p>
              <p className="font-semibold">{data?.ilce}</p>
              <p className="font-semibold">/</p>
              <p className="font-semibold">{data?.mahalle}</p>
            </div>
          </div>

          <div
            className={`w-full relative p-3 border ${data.isEV ? "border-blue-400" : "border-gray-200"}  rounded-xl shadow-xl mt-10`}
          >
            {data?.user.role === "kurumsal" && (
              <div className={`absolute -right-24 -top-7 flex items-center`}>
                <img className="w-16" src={"/kurumsal-rozet.png"} />
                <p className="text-[10px] bg-[#CA7D35] text-white font-semibold pl-0.5 py-0.5 pr-1 rounded-r-full -ml-0.5">
                  2 yıldır üye
                </p>
              </div>
            )}
            {/* <div className="w-14 h-14 rounded-full bg-gray-200 flex justify-center items-center">
            <FaUserAlt size={36} color="grey" />
            </div> */}
            <p className="font-sans text-gray-600 mt-2 font-semibold">
              {data?.user.role === "kurumsal" ? (
                <a
                  href={`/galeri/${data?.user.slug}`}
                  className={`${
                    data?.user.role === "kurumsal"
                      ? "text-lg text-orange-400 cursor-pointer hover:text-orange-500"
                      : ""
                  }`}
                >
                  {data?.user.galeriAdi}{" "}
                  <span className="text-xs text-black ml-1">Kurumsal Üye</span>
                </a>
              ) : (
                <span>{data?.user.isim} </span>
              )}

              <span className="uppercase">{data?.user.soyisim}</span>
            </p>
            {data?.user.role === "bireysel" && (
              <p className="text-xs text-gray-400 font-semibold mt-1">
                Bireysel Üye
              </p>
            )}
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <p>Hesap açma tarihi :</p>
              <p>
                {" "}
                {data ? convertDateMounth() : ""}{" "}
                {data?.user.hesapOlusturmaTarihi.yil}{" "}
              </p>
            </div>
            {data?.user.role === "bireysel" && (
              <div className="flex items-center space-x-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-[#E9F2FF] flex justify-center items-center">
                  <CiPhone size={18} color="#405FF2" />
                </div>

                <p className="text-sm text-gray-500">{data?.user.telefon}</p>
              </div>
            )}
            {data?.user.role === "kurumsal" && (
              <div className="w-full mt-3">
                {data?.user.ekip
                  .filter((item) => item._id === data?.memberTeam)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="px-5 py-2 border border-gray-400 "
                    >
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
                            <p className="text-sm text-gray-500">
                              {item.gorev}
                            </p>
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
            )}
            {data?.user.ekip?.filter((item) => item._id === data?.memberTeam)
              .length === 0 &&
              data?.user.role === "kurumsal" && (
                <div className="flex items-center space-x-2 mt-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex justify-center items-center">
                    <CiPhone size={24} color="orange" />
                  </div>

                  <p className=" text-gray-500 font-semibold">
                    {data?.user.telefon}
                  </p>
                </div>
              )}
            <button
              onClick={() => {
                if (user) {
                  handleMessage();
                } else {
                  handleClickOpen();
                  setPopupAction("message");
                  setPopupRoute(`/user/mesajlar?c=${res.data._id}`);
                }
              }}
              className="w-full h-12 bg-[#E9F2FF] text-[#405FF2] border border-[#405FF2] text-sm rounded-xl mt-6 cursor-pointer"
            >
              Mesaj Gönder
            </button>
            <button className="w-full h-12 bg-white border border-[#60C961] text-[#60C961] text-sm rounded-xl mt-3">
              Whatsapp Mesaj Gönder
            </button>
            <React.Fragment>
              <Dialog
                open={open}
                slots={{
                  transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "800px",
                      // Set your width here
                    },
                  },
                }}
              >
                <DialogTitle>
                  {popupAction === "message"
                    ? "Mesaj Gönderebilmek İçin Giriş Yapınız"
                    : "Favorilere Eklemek İçin Giriş Yapınız"}
                </DialogTitle>
                <DialogContent>
                  <PopupLogin
                    action={popupAction}
                    onResult={handlePopupResult}
                  />
                </DialogContent>
              </Dialog>
            </React.Fragment>
          </div>
          <div className="w-full h-[500px] mt-10">
            <img className="w-full h-full " src="/reklam-1.gif" />
          </div>
          <div className="w-full h-[500px] mt-5">
            <img className="w-full h-full " src="/reklam-2.gif" />
          </div>
          <div className="w-full h-[500px] mt-5">
            <img className="w-full h-full " src="/reklam-3.gif" />
          </div>
        </div>
      </div>

      <Modal
        open={openPrice}
        onClose={handleClosePrice}
        aria-labelledby="price-history-modal"
      >
        <Box
          sx={style}
          className="bg-white rounded-3xl shadow-2xl p-0 overflow-hidden border border-gray-200"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-orange-500 to-orange-400">
            <div>
              <h2 className="text-white text-2xl font-bold">
                İlan Fiyat Geçmişi
              </h2>

              <p className="text-orange-100 text-sm mt-1">
                İlanın geçmiş fiyat değişimleri
              </p>
            </div>

            <button
              onClick={handleClosePrice}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition text-white text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="max-h-[500px] overflow-y-auto px-6 py-2 bg-gray-50">
            {data?.priceHistory?.length > 0 ? (
              <div className="space-y-4">
                {[...data.priceHistory]
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((item, index) => {
                    const previousPrice =
                      data.priceHistory[data.priceHistory.length - index - 2]
                        ?.price;

                    const currentPrice = Number(
                      String(item.price).replace(/\./g, ""),
                    );

                    const oldPrice = Number(
                      String(previousPrice || 0).replace(/\./g, ""),
                    );

                    const isIncreased = currentPrice > oldPrice;
                    const isDecreased = currentPrice < oldPrice;

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-2xl border border-gray-200 px-5 py-3 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between">
                          {/* PRICE */}
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Güncellenen Fiyat
                            </p>

                            <h3 className="text-2xl font-bold text-gray-800">
                              {Number(
                                String(item.price).replace(/\./g, ""),
                              ).toLocaleString("tr-TR")}{" "}
                              ₺
                            </h3>
                          </div>

                          {/* STATUS */}
                          <div>
                            {index !== data.priceHistory.length - 1 && (
                              <>
                                {isIncreased && (
                                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    ↑ Fiyat Arttı
                                  </span>
                                )}

                                {isDecreased && (
                                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    ↓ Fiyat Düştü
                                  </span>
                                )}

                                {!isIncreased && !isDecreased && (
                                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    Değişmedi
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between border-t pt-3">
                          <p className="text-sm text-gray-500">
                            Güncelleme Tarihi
                          </p>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              {new Date(item.updatedAt).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>

                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg font-medium">
                              {new Date(item.updatedAt).toLocaleTimeString(
                                "tr-TR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">
                <p className="text-gray-500 text-lg font-medium">
                  Henüz fiyat geçmişi bulunmuyor.
                </p>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default page;
