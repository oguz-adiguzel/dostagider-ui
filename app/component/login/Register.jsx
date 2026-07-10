"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask-next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Height } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Register = () => {
  const [openUyelik, setOpenUyelik] = useState(false);
  const handleOpenUyelik = () => setOpenUyelik(true);
  const handleCloseUyelik = () => setOpenUyelik(false);

  const [openGizlilik, setOpenGizlilik] = useState(false);
  const handleOpenGizlilik = () => setOpenGizlilik(true);
  const handleCloseGizlilik = () => setOpenGizlilik(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("İsim zorunludur"),
    surName: Yup.string().required("Soyisim zorunludur"),
    phone: Yup.string()
      .matches(
        /^\d{4}\s\d{3}\s\d{2}\s\d{2}$/,
        "Telefon formatı: XXXX XXX XX XX",
      )
      .required("Telefon zorunludur"),
    email: Yup.string()
      .email("Geçerli email giriniz")
      .required("Email zorunludur"),
    password: Yup.string()
      .min(4, "Şifre en az 4 karakter")
      .required("Şifre zorunludur"),

    rizaMetni: Yup.boolean().oneOf([true], "Kişisel veriler onayı zorunlu"),
    uyelik: Yup.boolean().oneOf(
      [true],
      "Üyelik sözleşmesini kabul etmelisiniz",
    ),
    kampanya: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surName: "",
      phone: "",
      email: "",
      password: "",
      rizaMetni: false,
      uyelik: false,
      kampanya: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(" https://dostagider-api.onrender.com/users/register", {
          email: values.email,
          sifre: values.password,
          isim: values.name,
          soyisim: values.surName,
          telefon: values.phone,
          role: "bireysel",
        });

        toast.info(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });

        if (res.data.previewUrl) {
          window.open(res.data.previewUrl, "_blank");
        }
      } catch (error) {
        console.log("register error", error);

        toast.warn(error.response?.data?.message || "Kayıt başarısız", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
    },
  });

  return (
    <div className="w-full">
      <ToastContainer />

      <form onSubmit={formik.handleSubmit}>
        {/* NAME */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1">
          <p className="text-sm text-gray-400">İsim</p>
          <input
            name="name"
            className="w-full outline-0 h-9"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
        )}

        {/* SURNAME */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1 mt-5">
          <p className="text-sm text-gray-400">Soyisim</p>
          <input
            name="surName"
            className="w-full outline-0 h-9"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surName}
          />
        </div>
        {formik.touched.surName && formik.errors.surName && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.surName}</p>
        )}

        {/* PHONE */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1 mt-5">
          <p className="text-sm text-gray-400">Cep Telefonu (XXXX XXX XX XX)</p>

          <input
            name="phone"
            className="w-full outline-0 h-9"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
        )}

        {/* EMAIL */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1 mt-5">
          <p className="text-sm text-gray-400">Email</p>
          <input
            name="email"
            className="w-full outline-0 h-9"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
        )}

        {/* PASSWORD */}
        <div className="w-full h-16 border border-[#E9E9E9] rounded-2xl px-2 py-1 mt-5">
          <p className="text-sm text-gray-400">Parola</p>
          <input
            type="password"
            name="password"
            className="w-full outline-0 h-9"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
        )}

        {/* CHECKBOXES */}
        <div className="mt-5">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="rizaMetni"
              onChange={formik.handleChange}
            />
            <span className="text-sm">
              Kişisel verilerimin elde edilmesine, saklanmasına ve aydınlatma
              metninde belirtildiği şekilde işlenmesine aydınlatılmış açık rızam
              ile onay veriyorum.
            </span>
          </label>
          {formik.errors.rizaMetni && (
            <p className="text-red-500 text-xs">{formik.errors.rizaMetni}</p>
          )}
        </div>

        <div className="mt-3">
          {/* <label className="flex items-center space-x-2"> */}
          <input
            className="mr-2"
            type="checkbox"
            name="uyelik"
            onChange={formik.handleChange}
          />
          <span className="text-sm">
            dostagider.com
            <span
              onClick={handleOpenUyelik}
              className="text-orange-500 font-semibold cursor-pointer ml-1"
            >
              Üyelik Sözleşmesini
            </span>{" "}
            ve
            <span
              onClick={handleOpenGizlilik}
              className="text-orange-500 font-semibold cursor-pointer mx-1"
            >
              Gizlilik Politikasını
            </span>
            okudum, kabul ediyorum
          </span>
          {/* </label> */}
          {formik.errors.uyelik && (
            <p className="text-red-500 text-xs">{formik.errors.uyelik}</p>
          )}
        </div>

        <div className="mt-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="kampanya"
              onChange={formik.handleChange}
            />
            <span className="text-sm">
              Kampanyalardan haberdar olmak istiyorum
            </span>
          </label>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full h-16 mt-7 bg-orange-400 rounded-2xl text-white cursor-pointer"
        >
          Kayıt Ol
        </button>
      </form>

      {/* SOCIAL */}
      <div className="w-full h-0.5 mt-12 border-[#E9E9E9]"></div>

      <div className="w-full mt-12 grid grid-cols-2 gap-x-12">
        <div className="py-5 border border-blue-500 rounded-2xl flex items-center justify-center space-x-1">
          <FaFacebookF size={20} color="blue" />
          <p className="text-sm text-blue-500">Facebook İle Kayıt</p>
        </div>

        <div className="py-5 border border-red-500 rounded-2xl flex items-center justify-center space-x-1">
          <FaGoogle size={20} color="red" />
          <p className="text-sm text-red-500">Google İle Kayıt</p>
        </div>
      </div>

      <Modal
        open={openUyelik}
        onClose={handleCloseUyelik}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="overflow-scroll" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            DOSTAGİDER.COM KULLANICI (ÜYELİK) SÖZLEŞMESİ
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">1. Taraflar ve Tanımlar</p>
            <p className="mt-1 text-sm">
              İşbu sözleşme, dostagider.com (“Platform”) ile Platform’a üye olan
              internet kullanıcısı (“Kullanıcı”) arasında akdedilmiştir.
            </p>
            <p className="text-sm">
              Platform, ikinci el araç alım-satımına yönelik ilanların
              yayınlandığı çevrimiçi bir pazar yeridir.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">2. Sözleşmenin Konusu</p>
            <p className="mt-1 text-sm">
              Bu sözleşme, Kullanıcı’nın Platform’dan faydalanma şartlarını,
              tarafların hak ve yükümlülüklerini düzenler.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">3. Üyelik ve Hesap Oluşturma</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>
                Kullanıcı, kayıt sırasında verdiği tüm bilgilerin doğru, güncel
                ve kendisine ait olduğunu kabul eder.
              </li>
              <li>Kullanıcı hesabı kişiye özeldir, devredilemez.</li>
              <li>
                Platform, gerekli gördüğü durumlarda kimlik doğrulama talep
                edebilir.
              </li>
              <li>Aynı kişinin birden fazla hesap açması yasaktır.</li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">4. Hizmetin Niteliği</p>
            <p className="mt-1 text-sm">
              Platform, kullanıcıların araç ilanı oluşturmasına ve diğer
              kullanıcılarla iletişim kurmasına imkan sağlar.
            </p>
            <p className="text-sm">
              Platform, hiçbir şekilde araç satışı gerçekleştirmez ve taraflar
              arasındaki işlemlere taraf değildir.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">5. Kullanım Kuralları</p>
            <p className="text-sm">
              Kullanıcı aşağıdaki kurallara uymayı kabul eder:
            </p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Hukuka aykırı içerik paylaşmamak</li>
              <li>
                Dolandırıcılık, sahtecilik, spam faaliyetlerinde bulunmamak
              </li>
              <li>Başkalarının haklarını ihlal etmemek</li>
              <li>
                Sistemin güvenliğini tehdit edecek girişimlerde bulunmamak
              </li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">6. İlan Yayınlama Kuralları</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>İlanlarda yer alan tüm bilgiler doğru olmalıdır</li>
              <li>Yanıltıcı başlık, açıklama veya görsel kullanılamaz</li>
              <li>Aynı araç için birden fazla ilan oluşturulamaz</li>
              <li>Fiyat bilgisi gerçeği yansıtmalıdır</li>
              <li>Sahte ilanlar tespit edildiğinde kaldırılır</li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">7. İçerik Sorumluluğu</p>
            <p className="mt-1 text-sm">
              Platformda yayınlanan tüm içeriklerden ilgili kullanıcı
              sorumludur.
            </p>
            <p className="text-sm">
              Platform, içerikleri denetleme hakkına sahip olmakla birlikte, tüm
              içerikleri kontrol etmekle yükümlü değildir.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">8. Sorumluluk Reddi</p>
            <p className="text-sm">Platform:</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Alıcı ve satıcı arasındaki anlaşmazlıklardan</li>
              <li>
                Araçların durumu, kilometresi, hasar kaydı gibi bilgilerden
              </li>
              <li>Ödeme ve teslim süreçlerinden</li>
            </ul>
            <p className="text-sm">hiçbir şekilde sorumlu değildir.</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">9. Hesap Askıya Alma ve Sonlandırma</p>
            <p className="text-sm">
              Platform, aşağıdaki durumlarda kullanıcı hesabını askıya alabilir
              veya silebilir:
            </p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Sözleşme ihlali</li>
              <li>Şikayetler</li>
              <li>Sahtecilik tespiti</li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">10. Fikri Mülkiyet Hakları</p>
            <p className="mt-1 text-sm">
              Platforma ait tüm yazılım, tasarım ve içerikler dostagider.com’a
              aittir.
            </p>
            <p className="text-sm">İzinsiz kullanımı yasaktır.</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">11. Hizmet Değişiklikleri</p>
            <p className="mt-1 text-sm">
              Platform, hizmetlerini dilediği zaman değiştirme veya sonlandırma
              hakkına sahiptir.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">12. Mücbir Sebepler</p>
            <p className="mt-1 text-sm">
              Doğal afetler, teknik arızalar gibi kontrol dışı durumlarda
              platform sorumlu tutulamaz.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">13. Uyuşmazlıkların Çözümü</p>
            <p className="mt-1 text-sm">
              Uyuşmazlıklarda Türkiye Cumhuriyeti hukuku uygulanır.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">14. Yürürlük</p>
            <p className="mt-1 text-sm">
              Kullanıcı, üyelik oluşturduğunda bu sözleşmeyi kabul etmiş
              sayılır.
            </p>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openGizlilik}
        onClose={handleCloseGizlilik}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="overflow-scroll" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            DOSTAGİDER.COM GİZLİLİK POLİTİKASI
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">1. Genel Bilgilendirme</p>
            <p className="mt-1 text-sm">
              dostagider.com, kullanıcılarının gizliliğini korumayı taahhüt
              eder.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">2. Toplanan Veriler</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Kimlik bilgileri (ad, soyad)</li>
              <li>İletişim bilgileri (telefon, e-posta)</li>
              <li>IP adresi ve cihaz bilgileri</li>
              <li>
                Kullanım verileri (ziyaret edilen sayfalar, işlem geçmişi)
              </li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">3. Veri İşleme Amaçları</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Kullanıcı hesabı oluşturmak ve yönetmek</li>
              <li>İlan yayınlama ve iletişim süreçlerini yürütmek</li>
              <li>Güvenlik ve dolandırıcılığı önlemek</li>
              <li>Hizmet kalitesini artırmak</li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">4. Veri Paylaşımı</p>
            <p className="text-sm">Veriler:</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Yasal zorunluluklar kapsamında</li>
              <li>Yetkili kamu kurumları ile</li>
            </ul>
            <p className="text-sm mt-1">paylaşılabilir</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">5. Veri Saklama Süresi</p>
            <p className="mt-1 text-sm">
              Veriler, işleme amacının gerektirdiği süre boyunca saklanır.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">6. Veri Güvenliği</p>
            <p className="mt-1 text-sm">
              Platform, verilerin korunması için teknik ve idari önlemler alır.
            </p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">7. Kullanıcı Hakları</p>
            <p className="text-sm">Kullanıcılar:</p>
            <ul className="mt-1 text-sm list-disc pl-6">
              <li>Verilerine erişebilir</li>
              <li>Düzeltme talep edebilir</li>
              <li>Silinmesini isteyebilir</li>
            </ul>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className="font-semibold">8. Politika Güncellemeleri</p>
            <p className="mt-1 text-sm">
              Bu politika zaman zaman güncellenebilir.
            </p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Register;
