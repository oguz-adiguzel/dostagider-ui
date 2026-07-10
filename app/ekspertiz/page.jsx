import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiConfirmed, GiMechanicGarage } from "react-icons/gi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineDoNotDisturb } from "react-icons/md";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Kaporta / Boya Kontrolü",
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Motor / Mekanik Kontrolü",
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Lift Üzerinde Alt Mekanik Kontrolü",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Ön Takım, Yürür Aksam Kontrolü",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "OBD Elektronik Arıza Tespit Kontrolü",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Fren, Süspansiyon, Yanal Kayma veya Yol Testi",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Araç İç Aksam ve Fonksiyon Kontrolü",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Araç Dış Aksam ve Fonksiyon Kontrolü",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
  createData(
    "Dyno Motor Perf. Testi veya Yol Testi Kontrolü",
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <MdOutlineDoNotDisturb size={22} color="red" />
    </div>,
    <div className="flex justify-end">
      <GiConfirmed size={20} color="orange" />
    </div>
  ),
];

const page = () => {
  return (
    <div className="pb-12">
      <div className="w-full px-5 lg:px-0 h-[600px] bg-[url(/ekspertiz.jpg)] bg-cover bg-top relative">
        <div className="w-full h-full bg-black absolute opacity-20"></div>
        <div className="container mx-auto h-full flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-xs text-white mb-2 font-semibold">
            <p>Anasayfa</p>
            <p>/</p>
            <p>Ekspertiz</p>
          </div>
          <h1 className="text-4xl font-semibold text-orange-400">
            Araç Ekspertiz Hizmeti
          </h1>
          <p className="mt-3 font-semibold text-white">
            Aracınızın mekanik, elektronik ve kaporta durumunu uzman
            ekipmanlarla .
          </p>
          <p className="font-semibold text-white">
            detaylı şekilde analiz eden kapsamlı bir kontrol hizmetidir
          </p>
          <p className="font-semibold text-white">
            Satın alma veya satış sürecinde güvenilir ve
          </p>
          <p className="font-semibold text-white">
            objektif bilgi sunarak doğru karar vermenizi sağlar.
          </p>
          <div className="flex items-center space-x-8 mt-6">
            <button className="w-44 h-10 bg-orange-400 rounded-full text-white shadow-2xl shadow-white cursor-pointer">
              Paketler
            </button>
            <button className="w-44 h-10 bg-white rounded-full text-orange-400 shadow-2xl shadow-white cursor-pointer">
              Şubeler
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 bg-white shadow-2xl relative -top-14 rounded-2xl">
        <div className="flex justify-center items-center space-x-5">
          <img className="w-40 lg:w-72" src="/dostagider-logo.png" />
          <div className="w-0.5 h-10 bg-black"></div>
          <p className="text-lg lg:text-3xl text-orange-400 font-semibold font-sans">
            Oto Ekspertiz
          </p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-6 lg:gap-y-0 px-6 mt-10">
          <div className="flex flex-col items-center px-10">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center relative">
              <div className="hidden lg:block absolute -right-60 ">
                <FaLongArrowAltRight size={60} color="orange" />
              </div>
              <GiMechanicGarage size={75} />
            </div>
            <h2 className="text-lg font-semibold mt-4">
              Detaylı Mekanik ve Elektronik Kontroller
            </h2>
            <p className="text-center text-gray-600 mt-6">
              Motor, şanzıman, fren sistemi, süspansiyon, elektrik aksamı ve
              diğer kritik bileşenler profesyonel cihazlarla test edilerek
              aracın teknik durumu en ince ayrıntısına kadar analiz edilir.
            </p>
          </div>
          <div className="flex flex-col items-center px-10">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center relative">
              <div className="hidden lg:block absolute -right-60 ">
                <FaLongArrowAltRight size={60} color="orange" />
              </div>
              <GiMechanicGarage size={75} />
            </div>
            <h2 className="text-lg font-semibold mt-4">
              Kaporta ve Boya Analizi
            </h2>
            <p className="text-center text-gray-600 mt-6">
              Araç üzerinde boya değişimi, lokal işlem, değişen parça veya darbe
              izleri özel ölçüm cihazlarıyla tespit edilir. Bu sayede aracın
              geçmiş hasar durumu objektif şekilde ortaya çıkarılır.
            </p>
          </div>
          <div className="flex flex-col items-center px-10">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <GiMechanicGarage size={75} />
            </div>
            <h2 className="text-lg font-semibold mt-4">
              Sonuç Raporu ve Uzman Değerlendirmesi
            </h2>
            <p className="text-center text-gray-600 mt-6">
              Yapılan tüm kontroller ayrıntılı bir rapor hâline getirilir.
              Ekspertiz uzmanının yorumlarıyla birlikte aracın genel durumu,
              olası masrafları ve avantajları net şekilde sunulur. Bu rapor,
              doğru karar vermenize yardımcı olur.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 shadow-2xl bg-white px-10">
        <h3 className="text-center text-3xl font-semibold">
          Ekspertiz Paketleri
        </h3>
        <TableContainer component={Paper} className="mt-6">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 24 }}>Hizmet</TableCell>
                <TableCell sx={{ fontSize: 22 }} align="right">
                  <p>Standart Paket</p>
                  <p className="mt-2 text-2xl lg:text-3xl font-semibold">3.990 TL</p>
                </TableCell>
                <TableCell sx={{ fontSize: 22 }} align="right">
                  <p>Plus Paket</p>
                  <p className="mt-2 text-2xl lg:text-3xl font-semibold">4.790 TL</p>
                </TableCell>
                <TableCell sx={{ fontSize: 22 }} align="right">
                  <p>Premium Paket</p>
                  <p className="mt-2 text-2xl lg:text-3xl font-semibold">5.490 TL</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default page;
