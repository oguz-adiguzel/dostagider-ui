"use client";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const page = () => {
  const validationSchema = Yup.object({
    yetkiliAdi: Yup.string().required("Yetkili Adı Zorunludur"),
    yetkiliSoyadi: Yup.string().required("Yetkili Soyadı Zorunludur"),
    email: Yup.string().email("Geçerli email").required("Email Zorunludur"),
    sifre: Yup.string().required("Şifre Zorunludur"),
    telefon: Yup.string()
      .matches(/^\d{4}\s\d{3}\s\d{2}\s\d{2}$/, "Format: XXXX XXX XX XX")
      .required("Telefon Zorunludur"),
    galeriAdi: Yup.string().required("Galeri Adı Zorunludur"),
    sehir: Yup.string().required("Şehir Bilgisi Zorunludur"),
    ilce: Yup.string().required("İlçe Bilgisi Zorunludur"),
    mahalle: Yup.string().required("Mahalle Bilgisi Zorunludur"),
    vergiDairesi: Yup.string().required("Vergi Dairesi Bilgisi Zorunludur"),
    vergiNo: Yup.string()
      .matches(/^\d+$/, "Sadece rakam")
      .length(10, "10 haneli olmalı")
      .required("Vergi No Zorunludur"),
    sozlesme: Yup.boolean().oneOf([true], "Lütfen Kabul Ediniz"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      sifre: "",
      galeriAdi: "",
      telefon: "",
      yetkiliAdi: "",
      yetkiliSoyadi: "",
      vergiDairesi: "",
      vergiNo: "",
      sehir: "",
      ilce: "",
      mahalle: "",
      sozlesme: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          " https://dostagider-api.onrender.com/users/register-corporate",
          {
            ...values,
            telefon: values.telefon.replace(/\s/g, ""),
          }
        );

        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });

        if (res.data.previewUrl) {
          window.open(res.data.previewUrl, "_blank");
        }
      } catch (error) {
        toast.warn(error.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    },
  });

  return (
    <div className="w-full lg:w-2/3 bg-gray-50 shadow-2xl border border-gray-200 mx-auto pt-5 lg:pt-10 pb-20 my-5 lg:my-20 px-5">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row items-start space-y-3 lg:space-y-0 lg:items-center justify-between px-3 lg:px-10">
        <h1 className="text-gray-600 font-semibold text-xl">
          DOSTAGİDER.COM Kurumsal Üyelik Oluştur
        </h1>
        <p className="text-sm cursor-pointer text-orange-400">
          Detaylı Bilgi İçin Tıklayınız
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 mt-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
                <p className="text-sm text-gray-600">Yetkili İsim</p>
                <input
                  className="w-full outline-0 h-9"
                  name="yetkiliAdi"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.yetkiliAdi && formik.errors.yetkiliAdi && (
                  <p className="text-red-500 text-xs">{formik.errors.yetkiliAdi}</p>
                )}
              </div>

              <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
                <p className="text-sm text-gray-600">Yetkili Soyisim</p>
                <input
                  className="w-full outline-0 h-9"
                  name="yetkiliSoyadi"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.yetkiliSoyadi && formik.errors.yetkiliSoyadi && (
                  <p className="text-red-500 text-xs">{formik.errors.yetkiliSoyadi}</p>
                )}
              </div>
            </div>

            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Email</p>
              <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>

            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Şifre</p>
              <input name="sifre" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.sifre && formik.errors.sifre && (
                <p className="text-red-500 text-xs">{formik.errors.sifre}</p>
              )}
            </div>

            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Telefon</p>
              <input name="telefon" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.telefon && formik.errors.telefon && (
                <p className="text-red-500 text-xs">{formik.errors.telefon}</p>
              )}
            </div>

            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Galeri İsim</p>
              <input name="galeriAdi" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.galeriAdi && formik.errors.galeriAdi && (
                <p className="text-red-500 text-xs">{formik.errors.galeriAdi}</p>
              )}
            </div>
          </div>

          <div className="space-y-6 mt-6 lg:mt-0">
            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Şehir</p>
              <input name="sehir" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.sehir && formik.errors.sehir && (
                <p className="text-red-500 text-xs">{formik.errors.sehir}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
                <p className="text-sm text-gray-600">İlçe</p>
                <input name="ilce" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
                {formik.touched.ilce && formik.errors.ilce && (
                  <p className="text-red-500 text-xs">{formik.errors.ilce}</p>
                )}
              </div>

              <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
                <p className="text-sm text-gray-600">Mahalle</p>
                <input name="mahalle" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
                {formik.touched.mahalle && formik.errors.mahalle && (
                  <p className="text-red-500 text-xs">{formik.errors.mahalle}</p>
                )}
              </div>
            </div>

            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Vergi Dairesi</p>
              <input name="vergiDairesi" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.vergiDairesi && formik.errors.vergiDairesi && (
                <p className="text-red-500 text-xs">{formik.errors.vergiDairesi}</p>
              )}
            </div>

            <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
              <p className="text-sm text-gray-600">Vergi No</p>
              <input name="vergiNo" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full outline-0 h-9" />
              {formik.touched.vergiNo && formik.errors.vergiNo && (
                <p className="text-red-500 text-xs">{formik.errors.vergiNo}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-5">
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="sozlesme"
                  onChange={formik.handleChange}
                />
                <p className="text-xs">
                  Kurumsal Üyelik sözleşmesini okudum ve kabul ediyorum
                </p>
              </div>

              <button
                type="submit"
                className="w-full h-10 text-white font-semibold rounded-full text-sm cursor-pointer hover:bg-orange-500 duration-300 bg-orange-400"
              >
                Hesap Oluştur
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;