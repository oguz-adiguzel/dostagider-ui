"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/lib/axios";
import { FaCartShopping } from "react-icons/fa6";
import { FaListAlt, FaRegCreditCard } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import axios from "axios";

import Cards from "react-credit-cards-2";

// import 'react-credit-cards/es/styles-compiled.css';
import "react-credit-cards-2/dist/es/styles-compiled.css";

const page = () => {
  const [loading, setLoading] = useState();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const params = useParams();
  const [listingData, setListingData] = useState();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const [pack, setPack] = useState();

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: bağlantı, 2: onay

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

  const getPackage = async () => {
    try {
      const res = await api.get("/package/packages?type=listing");
      setPack(res.data.data);
    } catch (error) {
      console.log("package get error");
    }
  };

  const getListingData = async () => {
    try {
      const response = await api.get(`ilan/detay?ilanNo=${params.slug[0]}`);
      setListingData(response.data.ilan);
      setLoading(false);
      if (response.data.ilan.isActive) {
        router.push("/user/my-listing");
      }
    } catch (error) {
      console.log("error", error);
      router.push("/user/dashboard");
    }
  };

  const handlePayment = () => {
    if (!state.name || !state.number || !state.cvc || !state.expiry) {
      return toast.warn("Lütfen kart bilgilerini doldurun.");
    }

    setShowPaymentPopup(true);
    setPaymentStep(1);

    // 1. Adım: banka bağlantısı simülasyonu
    setTimeout(() => {
      setPaymentStep(2); // Ödeme onayı
    }, 4000);

    // 2. Adım: popup kapanıp API çağrısı
    setTimeout(() => {
      setShowPaymentPopup(false);
      renewListing(); // API çağrısı
    }, 5000);
  };

  const renewListing = async () => {
    try {
      if (!state.number || !state.name || !state.expiry || !state.cvc) {
        return toast.warn("Lütfen kart bilgilerini doldurun.", {
          position: "top-right",
        });
      }
      setLoading(true);
      const response = await api.put(`ilan/renew/${listingData._id}`, {
        days: selectedPackage.duration,
      });
      setLoading(false);
      toast.info(response.data.message, {
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
      setSuccess(true);
      setTimeout(() => {
        router.push("/user/my-listing");
      }, 3500);
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

  useEffect(() => {
    getListingData();
    getPackage();
  }, []);

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
            İlanınızın Süresi Dolmuş
          </h2>

          {/* Açıklama */}
          <p className="text-gray-600">
            Seçtiğiniz ilan artık yayında değil. İlanınızı tekrar aktif hâle
            getirmek ve daha fazla alıcıya ulaşmak için bir paket
            seçebilirsiniz. Dostagider.com ile ilanlarınızı hızlıca yayına alın!
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
            {pack?.map((pkg) => (
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
                <p className="text-2xl font-bold text-gray-800">
                  ₺{pkg.price}{" "}
                </p>
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
          <div className="w-full mx-auto grid grid-cols-3 items-start gap-x-5 mt-8">
            <div className="col-span-2">
              <div className="border border-gray-400 p-5 w-full rounded-2xl">
                <div className="flex items-center space-x-3">
                  <FaListAlt size={24} />
                  <p className="text-gray-600 font-semibold">İlan Bilgileri</p>
                </div>
                <div className="flex space-x-8 mt-6">
                  <img className="w-60" src={listingData?.gorseller[0]} />
                  <div>
                    <p className="font-semibold">{listingData?.baslik}</p>
                    <p className="mt-2">
                      İlan No:{" "}
                      <span className="ml-1 font-semibold">
                        {listingData?.ilanNo}
                      </span>
                    </p>
                    <div className="flex items-center space-x-2 mt-2 font-semibold">
                      <p>{listingData?.brand}</p>
                      <p>{listingData?.model}</p>
                      <p>{listingData?.variant1 || ""}</p>
                      <p>{listingData?.variant2 || ""}</p>
                      <p>{listingData?.variant3 || ""}</p>
                    </div>
                  </div>
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
            <div className="p-5 border border-gray-400 col-span-1 rounded-2xl">
              <div className="flex items-center space-x-3">
                <FaCartShopping size={24} />
                <p className="text-gray-600 font-semibold">Alışveriş Özeti</p>
              </div>
              <div className="w-full mt-6">
                <p className="text-orange-400 font-semibold">
                  Dostagider.com İlan Yayın Ücreti
                </p>
                {/* Seçilen Paket */}
                <div className="w-full border rounded-xl p-4 mt-3 bg-blue-50 flex flex-col items-center">
                  <h3 className="text-xl font-semibold">
                    {selectedPackage?.name} Paket
                  </h3>
                  <p className="text-gray-600">
                    <span> {selectedPackage?.duration}-Gün</span>
                    <span> ₺{selectedPackage?.price}</span>
                    {/* {selectedPackage?.name === "Temel" && "7 Gün - ₺49"}
                    {selectedPackage?.name === "Standart" && "14 Gün - ₺89"}
                    {selectedPackage?.name === "Premium" && "30 Gün - ₺149"} */}
                  </p>
                </div>
                <div className="mt-3 border-t border-b py-6 border-gray-300">
                  <p className="font-semibold">Toplam Ücret</p>
                  <p className="font-semibold mt-3 text-4xl">
                    ₺{selectedPackage?.price}
                  </p>
                </div>
                <button
                  onClick={() => handlePayment()}
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
    <>
      <ToastContainer />
      {success && <Confetti numberOfPieces={300} recycle={false} />}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg relative">
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
        <AnimatePresence>
          {showPaymentPopup && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-xl text-center w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                {paymentStep === 1 && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></div>
                    <p className="font-semibold text-gray-700">
                      Banka ile bağlantı kuruluyor...
                    </p>
                  </div>
                )}
                {paymentStep === 2 && (
                  <div className="flex flex-col items-center space-y-4">
                    <p className="text-green-500 text-3xl font-bold">
                      ✅ Ödeme Onaylandı
                    </p>
                    <p>İlanınız yeniden yayına alınacak.</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default page;
