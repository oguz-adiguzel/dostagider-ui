"use client";
export const dynamic = 'force-dynamic';
import { useUser } from "@/app/contexts/UserContext";
import api from "@/app/lib/axios";
import { SetMeal, TrendingUpRounded } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoIosWarning } from "react-icons/io";
import { FaListAlt, FaRegCreditCard } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import Cards from "react-credit-cards-2";

// import 'react-credit-cards/es/styles-compiled.css';
import "react-credit-cards-2/dist/es/styles-compiled.css";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [sehir, setSehir] = useState("");
  const [ilce, setIlce] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [ilceList, setİlceList] = useState();
  const [mahalleList, setMahalleList] = useState();
  const { user, fetchUser } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [sehirList, setSehirList] = useState();
  const [vergiNo, setVergiNo] = useState();
  const [vergiDairesi, setVergiDairesi] = useState();
  const [galeriAdi, setGaleriAdi] = useState();

  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [hakkimizda, setHakkimizda] = useState();

  const [logo, setLogo] = useState();
  const [cover, setCover] = useState();
  const [open, setOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [hasFeaturedRequest, setHasFeaturedRequest] = useState(true);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getİlceList = async () => {
    try {
      const response = await axios.get(
        `https://api.turkiyeapi.dev/v1/districts?province=${sehir}`,
      );

      setİlceList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSehirList = async () => {
    try {
      const response = await axios.get(
        `https://api.turkiyeapi.dev/v1/provinces`,
      );
      setSehirList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getMahalleList = async () => {
    try {
      const response = await axios.get(
        `https://api.turkiyeapi.dev/v1/neighborhoods?province=${sehir}&district=${ilce}`,
      );
      setMahalleList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateUserInfo = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
      } else {
        const res = await api.put("/users/profil-guncelle", {
          isim: name,
          soyisim: surName,
          sehir: sehir,
          ilce: ilce,
          mahalle: mahalle,
          telefon: phone,
        });
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
        await fetchUser();
      }
    } catch (error) {
      console.log("update error", error);
      setLoading(false);
      toast.warn("Bir şeyler ters gitti", {
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

  const createFeatured = async () => {
    setLoading(true);
    try {
      const response = await api.post("/galleryFeatured/request", {
        packageDays: selectedPackage.duration,
      });
      setLoading(false);
      handleClose();
      alert(response.data.message);
      // toast.info(response.data.message, {
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
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkFeatured = async () => {
    if (user.role === "kurumsal") {
      try {
        const response = await api.get("/galleryFeatured/check");
        setHasFeaturedRequest(response.data.hasFeaturedRequest);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    if (sehir) getİlceList();
  }, [sehir]);

  useEffect(() => {
    if (sehir && ilce) {
      getMahalleList();
    }
  }, [ilce]);

  useEffect(() => {
    getSehirList();
  }, []);

  useEffect(() => {
    setName(user?.role === "kurumsal" ? user?.yetkiliAdi : user?.isim);
    setSurName(user?.role === "kurumsal" ? user?.yetkiliSoyadi : user?.soyisim);
    setMail(user?.email);
    setPhone(user?.telefon);
    setLoading(false);
    setIlce(user?.ilce);
    setMahalle(user?.mahalle);
    setSehir(user?.sehir);
    setVergiNo(user?.vergiNo);
    setVergiDairesi(user?.vergiDairesi);
    setGaleriAdi(user?.galeriAdi);
    setHakkimizda(user?.hakkimizda);
    setLogo(user?.logoUrl);
    setCover(user?.coverPhotoUrl);
    checkFeatured();
  }, [user]);


  const fullAddress = `${mahalle || ""}, ${ilce || ""}, ${sehir || ""}, Türkiye`;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    fullAddress,
  )}&output=embed`;

  const updateCorporateUser = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("yetkiliAdi", name);
      formDataToSend.append("yetkiliSoyadi", surName);
      formDataToSend.append("telefon", phone);
      formDataToSend.append("galeriAdi", galeriAdi);
      formDataToSend.append("hakkimizda", hakkimizda);
      formDataToSend.append("sehir", sehir);
      formDataToSend.append("ilce", ilce);
      formDataToSend.append("mahalle", mahalle);

      // Logo eklendiyse ekle
      if (logoFile) {
        formDataToSend.append("logo", logoFile);
      }

      // Cover eklendiyse ekle
      if (coverFile) {
        formDataToSend.append("cover", coverFile);
      }

      // PUT isteği
      const res = await api.put(
        `users/corporate-update/${user._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      await fetchUser();
      alert("Kurumsal bilgiler başarıyla güncellendi!");
    } catch (error) {
      console.error("Kurumsal kullanıcı güncelleme hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const pack = [
    { name: "Temel", duration: 7, price: "₺49" },
    { name: "Standart", duration: 14, price: "₺89" },
    { name: "Premium", duration: 30, price: "₺149" },
  ];

  const steps = [
    {
      id: 1,
      content: (
        <div className="flex flex-col items-center text-center space-y-6">
          {/* İkon */}
          <div className="bg-yellow-100 text-yellow-600 w-20 h-20 flex items-center justify-center rounded-full text-5xl">
            <IoIosWarning />
          </div>

          {/* Başlık */}
          <h2 className="text-2xl font-bold text-gray-800">
            Galeri Öne Çıkarma
          </h2>

          {/* Açıklama */}
          <p className="text-gray-600">
            Öne çıkarma ile galari bilgileriniz ana sayfada gösterilir. Bu
            müşteri kitlenizi geliştirir, ilan görünürlüğünüz yükselir ve
            satışlarınız artar.
          </p>

          {/* Buton */}
          <button
            className="bg-orange-400 text-white px-10 py-3 rounded-lg shadow hover:bg-orange-500 transition cursor-pointer"
            onClick={handleNext}
          >
            Paket Seç
          </button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Paketinizi Seçin</h2>
          <p className="text-gray-600 text-center">
            İlanınızı tekrar yayına almak için bir paket seçin.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            {pack.map((pkg) => (
              <div
                key={pkg.name}
                className={`flex-1 border rounded-xl p-6 flex flex-col items-center text-center cursor-pointer transform transition duration-300
                ${
                  selectedPackage?.name === pkg.name
                    ? "border-blue-600 bg-blue-50 scale-105 shadow-lg"
                    : "border-gray-300 hover:shadow-md hover:scale-105"
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <h3 className="text-xl font-semibold mb-2">{pkg.name} Paket</h3>
                <p className="text-gray-500 mb-4">{pkg.duration}-Gün</p>
                <p className="text-2xl font-bold text-gray-800">{pkg.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between w-full mt-6">
            <button
              className="px-4 py-2 rounded border hover:bg-gray-100 transition"
              onClick={handleBack}
            >
              Geri
            </button>
            <button
              className="px-10 py-2 rounded bg-orange-400 text-white hover:bg-orange-500 transition disabled:opacity-50 cursor-pointer"
              disabled={!selectedPackage}
              onClick={handleNext}
            >
              Ödeme
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="w-full">
          <ToastContainer />
          <button
            className="mt-2 px-4 py-2 rounded border hover:bg-gray-100 transition"
            onClick={handleBack}
          >
            Geri
          </button>
          <div className="w-full mx-auto grid grid-cols-1 items-start gap-x-5 mt-8">
            <div className="w-full">
              <div className="border border-gray-400 p-5 w-full rounded-2xl">
                <div className="flex items-center space-x-3">
                  <FaListAlt size={24} />
                  <p className="text-gray-600 font-semibold">
                    Galeri Bilgileri
                  </p>
                </div>
                <div className="flex items-center space-x-8 mt-6">
                  <img className="w-40" src={logo || ""} />
                  <div>
                    <p className="font-semibold text-lg">{galeriAdi || ""}</p>
                    <p className="text-gray-400 mt-1 text-sm">
                      {name || ""} {surName || ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-400 bg-green-100 p-5 w-full rounded-2xl mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaRegCreditCard size={24} />
                    <p className="text-gray-600 font-semibold">
                      Kart Bilgileri
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img className="w-12" src="/master.png" />
                    <img className="w-12" src="/visa.webp" />
                    <img className="w-12" src="/troy.png" />
                    <img className="w-20" src="/world.png" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-5 ">
                  <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                  />
                  <form className="ml-3 h-full">
                    <input
                      className="w-full py-2 border border-orange-400 px-2 rounded-xl"
                      type="number"
                      name="number"
                      placeholder="Card Number"
                      value={state.number}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                    <input
                      className="w-full mt-2 py-2 border border-orange-400 px-2 rounded-xl"
                      type="text"
                      name="name"
                      placeholder="Card Name"
                      value={state.name}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                    <div className="w-full flex items-center space-x-2">
                      <input
                        className="w-full mt-2 py-2 border border-orange-400 px-2 rounded-xl"
                        type="number"
                        name="expiry"
                        placeholder="Card expiry"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                      <input
                        className="w-full mt-2 py-2 border border-orange-400 px-2 rounded-xl"
                        type="number"
                        name="cvc"
                        placeholder="Card cvc"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="p-5 border border-gray-400 rounded-2xl mt-3">
              <div className="flex items-center space-x-3">
                <FaCartShopping size={24} />
                <p className="text-gray-600 font-semibold">Alışveriş Özeti</p>
              </div>
              <div className="w-full mt-6">
                <p className="text-orange-400 font-semibold">
                  Dostagider.com Galeri Öne Çıkarma Ücreti
                </p>
                {/* Seçilen Paket */}
                <div className="w-full border rounded-xl p-4 mt-3 bg-blue-50 flex flex-col items-center">
                  <h3 className="text-xl font-semibold">
                    {selectedPackage?.name} Paket
                  </h3>
                  <p className="text-gray-600">
                    <span> {selectedPackage?.duration}-Gün</span>
                    <span> {selectedPackage?.price}</span>
                    {/* {selectedPackage?.name === "Temel" && "7 Gün - ₺49"}
                      {selectedPackage?.name === "Standart" && "14 Gün - ₺89"}
                      {selectedPackage?.name === "Premium" && "30 Gün - ₺149"} */}
                  </p>
                </div>
                <div className="mt-3 border-t border-b py-6 border-gray-300">
                  <p className="font-semibold">Toplam Ücret</p>
                  <p className="font-semibold mt-3 text-4xl">
                    {selectedPackage?.price}
                  </p>
                </div>
                <button
                  onClick={() => createFeatured()}
                  className="w-full py-2 rounded-full mt-6 bg-orange-400 text-white font-semibold cursor-pointer hover:bg-orange-300 duration-300"
                >
                  Ödemeyi Tamamla
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
      </div>
    );

  return (
    <div className="w-full h-full py-10 px-14 font-sans overflow-y-scroll">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Profili Düzenle</h2>
        {user?.role === "kurumsal" && (
          <button
            disabled={hasFeaturedRequest}
            onClick={() => handleClickOpen()}
            className={`px-6 py-2 bg-orange-400 text-white text-sm rounded-full ${
              hasFeaturedRequest ? "cursor-none" : "cursor-pointer"
            }`}
          >
            Öne Çıkar
          </button>
        )}

        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "900px", // Set your width here
                },
              },
            }}
          >
            <ToastContainer />
            <DialogTitle id="alert-dialog-title">
              {"Galeri Öne Çıkarma İçin Adımları Takip Ediniz"}
            </DialogTitle>
            <DialogContent>
              <div className="flex justify-center items-center bg-gray-100 p-4">
                <div className="w-full bg-white p-6 rounded-lg shadow-lg relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {steps.find((s) => s.id === step).content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
        <div>
          <label className="text-sm font-semibold">İsim</label>
          <input
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Soyisim</label>
          <input
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
            value={surName ? surName : ""}
            onChange={(e) => setSurName(e.target.value)}
          />
        </div>
      </div>

      {user?.role === "kurumsal" && (
        <div className="w-full grid grid-cols-1 gap-x-10 mt-5">
          <div>
            <label className="text-sm font-semibold">Galeri Adı</label>
            <input
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
              type="text"
              value={galeriAdi ? galeriAdi : ""}
              onChange={(e) => setGaleriAdi(e.target.value)}
            />
          </div>
        </div>
      )}
      {user?.role === "kurumsal" && (
        <>
          <p className="text-sm font-semibold mt-5">Hakkımızda</p>
          <ReactQuill
            theme="snow"
            value={hakkimizda}
            // onChange={handleAciklamaChange}
            onChange={setHakkimizda}
            className=""
          />
        </>
      )}
      {user?.role === "kurumsal" && (
        <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
          <div>
            <label className="text-sm font-semibold">Logo</label>
            {/* <input
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 cursor-pointer"
              type="file"
              // value={mail}
              // onChange={(e) => setMail(e.target.value)}
            /> */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 cursor-pointer"
            />
            {logoFile && (
              <img className="mt-3" src={URL.createObjectURL(logoFile)} />
            )}

            {!logoFile && <img className="mt-3" src={logo} />}
          </div>
          <div>
            <label className="text-sm font-semibold">Kapak Fotoğrafı</label>
            {/* <input
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 cursor-pointer"
              // placeholder="05xx xxx xxxx"
              type="file"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
            /> */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 cursor-pointer"
            />
            {coverFile && (
              <div className="w-full h-44 border border-gray-400 mt-3">
                <img
                  className=" w-full h-full object-contain"
                  src={URL.createObjectURL(coverFile)}
                />
              </div>
            )}
            {!coverFile && (
              <div className="w-full h-44 border border-gray-400 mt-3">
                <img className=" w-full h-full object-contain" src={cover} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
            value={mail ? mail : ""}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Telefon</label>
          <input
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            placeholder="05xx xxx xxxx"
            type="text"
            value={phone ? phone : ""}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
        <div>
          <label className="text-sm font-semibold">Whatsapp</label>
          <input
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Website</label>
          <input
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
          />
        </div>
      </div>

      {user?.role === "kurumsal" && (
        <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
          <div>
            <label className="text-sm font-semibold">Vergi Dairesi</label>
            <input
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 bg-gray-100"
              type="text"
              readOnly
              value={vergiDairesi ? vergiDairesi : ""}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Vergi No</label>
            <input
              className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 bg-gray-100"
              type="text"
              readOnly
              value={vergiNo ? vergiNo : ""}
            />
          </div>
        </div>
      )}

      <p className="text-lg font-semibold mt-8">Adres Bilgileri</p>
      <div className="w-full grid grid-cols-3 gap-x-10 mt-5">
        <div>
          <label className="text-sm font-semibold">Şehir</label>
          <select
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
            value={sehir ? sehir : ""}
            onChange={(e) => setSehir(e.target.value)}
          >
            <option selected disabled>
              Şehir Seçiniz
            </option>
            {sehirList?.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">İlçe</label>
          <select
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
            onChange={(e) => setIlce(e.target.value)}
            value={ilce || ""}
          >
            <option selected disabled>
              Seçim Yapınız
            </option>
            {ilceList?.map((item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Mahalle</label>

          <select
            className="w-full py-4 border border-gray-300 rounded-lg outline-0 px-5"
            type="text"
            onChange={(e) => setMahalle(e.target.value)}
            value={mahalle || ""}
          >
            <option selected disabled>
              Seçim Yapınız
            </option>
            {mahalleList?.map((item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* <input
            disabled={ilceList ? false : true}
            className={`w-full py-4 border border-gray-300 rounded-lg outline-0 px-5 ${
              ilceList ? "bg-transparent" : "bg-gray-200"
            }`}
            value={mahalle ? mahalle : ""}
            type="text"
            placeholder="Mahalle Yazınız"
            onChange={(e) => setMahalle(e.target.value)}
          ></input> */}
        </div>
      </div>
      <div className="w-full mt-6">
        <iframe
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={googleMapsUrl ? googleMapsUrl : ""}
        ></iframe>
      </div>
      <div className="w-full flex justify-center items-center mt-6">
        <button
          onClick={() =>
            user.role === "bireysel" ? updateUserInfo() : updateCorporateUser()
          }
          className="w-1/2 py-2 bg-orange-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-orange-400 duration-300"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default page;
