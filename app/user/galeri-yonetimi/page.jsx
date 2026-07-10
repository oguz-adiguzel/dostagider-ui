"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  MdOutlineDirectionsCar,
  MdAttachMoney,
  MdTrendingUp,
} from "react-icons/md";
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  Modal,
  Box,
  Button,
  TextField,
} from "@mui/material";
import api from "@/app/lib/axios";
import AnalyticsDashboard from "@/app/component/AnalyticsDashboard";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CountUp from "react-countup";
import ProfitChart from "@/app/component/ProfitChart";
import { useUser } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function page() {
  const [dashboard, setDashboard] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [expenseModal, setExpenseModal] = useState(false);
  const [expense, setExpense] = useState({
    type: "ekspertiz",
    amount: 0,
    note: "",
  });

  // SOLD MODAL
  const [soldModal, setSoldModal] = useState(false);
  const [analyticsModal, setAnalyticsModal] = useState(false);
  const [tempVehicleId, setTempVehicleId] = useState(null);
  const [soldPrice, setSoldPrice] = useState(0);

  const statusOptions = ["stokta", "ilanda", "rezerve", "satildi"];
  const [createModal, setCreateModal] = useState(false);

  const [listings, setListings] = useState([]);
  const [listingModal, setListingModal] = useState(false);
  const [tempVehicle, setTempVehicle] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedilanNo, setSelectedilanNo] = useState(null);
  const [deleteListing, setDeleteListing] = useState(null);

  const [form, setForm] = useState({
    plate: "",
    brand: "",
    model: "",
    year: "",
    purchasePrice: "",
    purchaseDate: "",
    targetSalePrice: "",
  });

  useEffect(() => {
    fetchDashboard();
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (user?.role !== "kurumsal") {
      router.push("/user/dashboard");
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      const res = await api.get("/ilan/my-listings");
      setListings(res.data.listings);
    } catch {
      toast.error("İlanlar alınamadı");
    }
  };

  const createVehicle = async () => {
    try {
      setLoading(true);
      await api.post("/vehicle-stock", form);
      toast.success("Araç eklendi");
      setCreateModal(false);
      setForm({
        plate: "",
        brand: "",
        model: "",
        year: "",
        purchasePrice: "",
        purchaseDate: "",
        targetSalePrice: "",
      });
      fetchVehicles();
      fetchDashboard();
      setLoading(false);
    } catch {
      toast.error("Araç eklenemedi");
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/vehicle-stock/dashboard");
      setDashboard(res.data.data);
      setLoading(false);
    } catch {
      toast.error("Dashboard alınamadı");
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicle-stock");
      setVehicles(res.data.vehicles);
      setLoading(false);
    } catch {
      toast.error("Araçlar alınamadı");
    }
  };

  const getDetail = async (id) => {
    try {
      const res = await api.get(`/vehicle-stock/${id}`);
      setSelected(res.data.vehicle);
    } catch {
      toast.error("Detay alınamadı");
    }
  };

  // STATUS UPDATE (SATILDI CONTROL)
  const handleStatusChange = (id, status, currentStatus, ilanNo) => {
    if (currentStatus === "satildi") {
      toast.info("Satılmış araç değiştirilemez");
      return;
    }

    if (status === "ilanda") {
      setTempVehicle(id);
      setListingModal(true);
      fetchListings();
      return;
    }

    if (status === "satildi") {
      setTempVehicleId(id);
      setSoldModal(true);
      setDeleteListing(ilanNo);
      return;
    }

    updateStatus(id, status);
  };

  const updateStatus = async (id, status, soldPriceValue = null) => {
    try {
      await api.patch(`/vehicle-stock/${id}/status`, {
        status,
        soldPrice: soldPriceValue,
      });

      toast.success("Status güncellendi");
      fetchVehicles();
      fetchDashboard();
    } catch {
      toast.error("Status güncellenemedi");
    }
  };

  const confirmSold = async () => {
    if (!soldPrice || soldPrice <= 0) {
      return toast.error("Satış fiyatı girilmeli");
    }

    await updateStatus(tempVehicleId, "satildi", soldPrice);
    deleteMyListing(deleteListing);

    setSoldModal(false);
    setSoldPrice(0);
    setTempVehicleId(null);
  };

  const confirmListing = async () => {
    if (!selectedListing) {
      return toast.error("İlan seçmelisiniz");
    }

    try {
      await api.patch(`/vehicle-stock/${tempVehicle}/status`, {
        status: "ilanda",
        listingId: selectedListing,
        ilanNo: selectedilanNo,
      });

      toast.success("Araç ilana bağlandı");

      setListingModal(false);
      setTempVehicle(null);
      setSelectedListing(null);

      fetchVehicles();
      fetchDashboard();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

  const addExpense = async () => {
    try {
      await api.post(`/vehicle-stock/${selected._id}/expense`, expense);
      toast.success("Masraf eklendi");
      setExpenseModal(false);
      getDetail(selected._id);
      fetchVehicles();
      fetchDashboard();
    } catch {
      toast.error("Masraf eklenemedi");
    }
  };

  const groupedExpenses = selected?.expenses?.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const getRoiStyle = (roi) => {
    const value = Number(roi);

    if (value >= 20) return "bg-green-100 text-green-600";
    if (value >= 10) return "bg-yellow-100 text-yellow-600";
    if (value >= 0) return "bg-blue-100 text-blue-600";
    return "bg-red-100 text-red-600";
  };

  const getProfitStyle = (profit) => {
    if (profit > 0) return "bg-green-100 text-green-600";
    if (profit === 0) return "bg-gray-100 text-gray-600";
    return "bg-red-100 text-red-600";
  };

  const formatPrice = (num) => {
    return new Intl.NumberFormat("tr-TR").format(num);
  };

  const deleteMyListing = async (ilanNo) => {
    try {
      const res = await api.delete(`/ilan/ilan-sil?ilanNo=${ilanNo}`);
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
      setLoading(false);
      console.log("delete error", error);
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
    <>
      {loading ? (
        <>
          <ToastContainer />
          <div className="w-full grid grid-cols-3 gap-x-8 gap-y-5 justify-center items-center mt-5 overflow-y-scroll">
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
            <Skeleton width={"100%"} height={150} />
          </div>
          <Skeleton className="mt-4" width={"100%"} height={300} />
          <Skeleton className="mt-5" width={"100%"} height={300} />
        </>
      ) : (
        <div className="p-6 bg-gray-50 h-screen overflow-scroll">
          <div className="flex items-center space-x-6">
            <Button
              variant="contained"
              style={{ background: "#f97316", marginBottom: 12 }}
              onClick={() => setCreateModal(true)}
            >
              + Araç Ekle
            </Button>

            <Button
              variant="contained"
              style={{
                background: "#f97316",
                marginBottom: 12,
                marginLeft: 20,
              }}
              onClick={() => setAnalyticsModal(true)}
            >
              Analiz Ekranı
            </Button>
          </div>

          {/* DASHBOARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* TOTAL VEHICLES */}
            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:scale-[1.02] transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-80">Toplam Araç</p>
                  <h2 className="text-3xl font-bold mt-1">
                    <CountUp
                      end={dashboard?.totalVehicles || 0}
                      duration={1.5}
                    />
                  </h2>
                  <p className="text-xs opacity-70 mt-1">
                    Sistemdeki aktif stok
                  </p>
                </div>

                <div className="bg-white/20 p-3 rounded-xl backdrop-blur">
                  <MdOutlineDirectionsCar size={28} />
                </div>
              </div>
            </div>

            {/* TOTAL PROFIT */}
            <div className="relative overflow-hidden rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Toplam Kar</p>
                  <h2 className="text-3xl font-bold mt-1 text-green-600">
                    <CountUp
                      end={dashboard?.totalProfit || 0}
                      duration={1.5}
                      separator="."
                    />{" "}
                    ₺
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Tüm satışlardan net kazanç
                  </p>
                </div>

                <div className="bg-green-100 p-3 rounded-xl">
                  <MdAttachMoney size={26} className="text-green-600" />
                </div>
              </div>
            </div>

            {/* SOLD VEHICLES */}
            <div className="relative overflow-hidden rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Satılan Araç</p>
                  <h2 className="text-3xl font-bold mt-1 text-blue-600">
                    <CountUp
                      end={dashboard?.soldVehicles || 0}
                      duration={1.5}
                    />
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Başarıyla tamamlanan satışlar
                  </p>
                </div>

                <div className="bg-blue-100 p-3 rounded-xl">
                  <MdTrendingUp size={26} className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* <ProfitChart data={dashboard?.monthlyProfit} /> */}

          <div className="bg-white h-60 overflow-y-scroll p-5 rounded-2xl shadow-sm border border-gray-100 mt-6">
            <h2 className="text-orange-500 font-bold mb-4 text-lg">Uyarılar</h2>

            <div className="space-y-2">
              {dashboard?.alerts?.length === 0 && (
                <p className="text-sm text-gray-400">Her şey yolunda 🚀</p>
              )}

              {dashboard?.alerts?.map((a, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-xl flex items-center justify-between transition hover:shadow-md ${
                    a.severity === "high"
                      ? "bg-red-50 border border-red-200"
                      : a.severity === "medium"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  {/* LEFT */}
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${
                        a.severity === "high"
                          ? "text-red-600"
                          : a.severity === "medium"
                            ? "text-yellow-600"
                            : "text-gray-600"
                      }`}
                    >
                      {a.message}
                    </span>

                    <span className="text-xs text-gray-400 mt-1">
                      {a.type === "stok" && "Stok Uyarısı"}
                      {a.type === "zarar" && "Zarar Uyarısı"}
                    </span>
                  </div>

                  {/* RIGHT ACTION */}
                  {a.vehicleId && (
                    <button
                      onClick={() => getDetail(a.vehicleId)}
                      className="text-xs px-3 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                    >
                      İncele
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Araç Stok Listesi
              </h2>

              <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                {vehicles.length} araç
              </span>
            </div>

            {/* TABLE */}
            <TableContainer component={Paper} elevation={0}>
              <Table>
                {/* HEAD */}
                <TableHead>
                  <TableRow className="bg-gray-50">
                    <TableCell className="!font-semibold">Plaka</TableCell>
                    <TableCell className="!font-semibold">Araç</TableCell>
                    <TableCell className="!font-semibold">Alış</TableCell>
                    <TableCell className="!font-semibold">Durum</TableCell>
                    <TableCell className="!font-semibold">İşlem</TableCell>
                  </TableRow>
                </TableHead>

                {/* BODY */}
                <TableBody>
                  {vehicles.map((v) => (
                    <TableRow
                      key={v._id}
                      hover
                      className="hover:bg-orange-50 transition"
                      sx={{ "&:last-child td": { borderBottom: 0 } }}
                    >
                      {/* PLAKA */}
                      <TableCell>
                        <span className="font-semibold text-gray-800">
                          {v.plate}
                        </span>
                      </TableCell>

                      {/* ARAÇ */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {v.brand} {v.model}
                          </span>
                          {v.year && (
                            <span className="text-xs text-gray-400">
                              {v.year}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* ALIŞ */}
                      <TableCell className="text-gray-600 font-medium">
                        {formatPrice(v.purchasePrice)} ₺
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* BADGE */}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              v.status === "satildi"
                                ? "bg-green-100 text-green-600"
                                : v.status === "ilanda"
                                  ? "bg-blue-100 text-blue-600"
                                  : v.status === "rezerve"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {v.status}
                          </span>

                          {/* SELECT */}
                          <Select
                            size="small"
                            value={v.status}
                            disabled={v.status === "satildi"}
                            onChange={(e) =>
                              handleStatusChange(
                                v._id,
                                e.target.value,
                                v.status,
                                v.ilanNo,
                              )
                            }
                            sx={{
                              minWidth: 110,
                              height: 32,
                              fontSize: "12px",
                            }}
                          >
                            {statusOptions.map((s) => (
                              <MenuItem key={s} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </TableCell>

                      {/* ACTION */}
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => getDetail(v._id)}
                          sx={{
                            backgroundColor: "#f97316",
                            textTransform: "none",
                            borderRadius: "8px",
                            fontSize: "12px",
                            "&:hover": {
                              backgroundColor: "#ea580c",
                            },
                          }}
                        >
                          Detay
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  En Kârlı Araçlar
                </h2>

                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  Top 5
                </span>
              </div>

              {/* TABLE */}
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  {/* HEAD */}
                  <TableHead>
                    <TableRow className="bg-gray-50">
                      <TableCell className="!font-semibold">Plaka</TableCell>
                      <TableCell className="!font-semibold">Araç</TableCell>
                      <TableCell className="!font-semibold">Maliyet</TableCell>
                      <TableCell className="!font-semibold">Satış</TableCell>
                      <TableCell className="!font-semibold">Kâr</TableCell>
                      <TableCell className="!font-semibold">ROI</TableCell>
                    </TableRow>
                  </TableHead>

                  {/* BODY */}
                  <TableBody>
                    {dashboard?.topProfitableVehicles?.map((v, index) => (
                      <TableRow
                        key={v._id}
                        hover
                        sx={{
                          "&:last-child td": { borderBottom: 0 },
                          transition: "0.2s",
                        }}
                        className="hover:bg-orange-50"
                      >
                        {/* PLAKA */}
                        <TableCell>
                          <span className="font-semibold text-gray-800">
                            {v.plate}
                          </span>

                          {index === 0 && (
                            <span className="ml-2 text-[10px] bg-orange-500 text-white px-2 py-[2px] rounded">
                              🔥 En iyi
                            </span>
                          )}
                        </TableCell>

                        {/* ARAÇ */}
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {v.brand} {v.model}
                            </span>
                          </div>
                        </TableCell>

                        {/* MALİYET */}
                        <TableCell className="text-gray-600">
                          {formatPrice(v.totalCost)} ₺
                        </TableCell>

                        {/* SATIŞ */}
                        <TableCell className="text-gray-600">
                          {formatPrice(v.soldPrice)} ₺
                        </TableCell>

                        {/* KAR */}
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getProfitStyle(
                              formatPrice(v.profit),
                            )}`}
                          >
                            {formatPrice(v.profit)} ₺
                          </span>
                        </TableCell>

                        {/* ROI */}
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoiStyle(
                              v.roi,
                            )}`}
                          >
                            %{v.roi}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-6">
            <h2 className="text-lg font-bold text-red-600 mb-4">
              Zarar Eden Araçlar
            </h2>

            {dashboard?.lossVehicles?.length === 0 ? (
              <p className="text-sm text-gray-500">Zarar eden araç yok 🎉</p>
            ) : (
              <div className="space-y-3">
                {dashboard?.lossVehicles?.map((v) => (
                  <div
                    key={v._id}
                    className="flex justify-between items-center p-3 rounded-xl border bg-red-50"
                  >
                    <div>
                      <p className="font-semibold">
                        {v.plate} - {v.brand} {v.model}
                      </p>
                      <p className="text-xs text-gray-500">
                        Maliyet: {formatPrice(v.totalCost)} ₺ | Satış:{" "}
                        {formatPrice(v.soldPrice)} ₺
                      </p>
                    </div>

                    <span className="text-red-600 font-bold">
                      {formatPrice(v.loss)} ₺
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mt-6">
            <h2 className="text-lg font-bold text-orange-500 mb-4">
              Kritik Araçlar
            </h2>

            {dashboard?.criticalVehicles?.length === 0 ? (
              <p className="text-sm text-gray-500">Kritik araç yok 👍</p>
            ) : (
              <div className="space-y-3">
                {dashboard?.criticalVehicles?.map((v) => (
                  <div
                    key={v._id}
                    className="flex justify-between items-center p-3 rounded-xl border"
                  >
                    <div>
                      <p className="font-semibold">
                        {v.plate} - {v.brand} {v.model}
                      </p>

                      <p className="text-xs text-gray-500">
                        {v.daysInStock} gündür stokta
                      </p>
                      <p className="text-xs text-gray-700 font-semibold">
                        <span className="text-orange-500">
                          Dostagider.com Önerisi :
                        </span>{" "}
                        {v.suggestion}
                      </p>
                    </div>

                    {/* RISK BADGE */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        v.riskLevel === "high"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {v.riskLevel === "high" ? "Yüksek Risk" : "Orta Risk"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETAIL MODAL */}
          <Modal open={!!selected} onClose={() => setSelected(null)}>
            <Box className="bg-white w-[600px] mx-auto mt-20 p-6 rounded-xl">
              {selected && (
                <>
                  {/* HEADER */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-orange-500">
                        {selected.plate}
                      </h2>

                      <p className="text-sm text-gray-600">
                        {selected.brand} {selected.model}
                      </p>

                      {selected.year && (
                        <p className="text-xs text-gray-400">{selected.year}</p>
                      )}
                    </div>

                    {/* STATUS BADGE */}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        selected.status === "satildi"
                          ? "bg-green-100 text-green-600"
                          : selected.status === "ilanda"
                            ? "bg-blue-100 text-blue-600"
                            : selected.status === "rezerve"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {selected.status}
                    </span>
                  </div>

                  {/* STATS */}
                  <div className="mt-4 space-y-1 text-sm">
                    <p>
                      <span className="text-gray-500">Toplam Masraf:</span>{" "}
                      <span className="font-semibold">
                        {formatPrice(selected.stats?.totalExpenses)} ₺
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-500">Toplam Maliyet:</span>{" "}
                      <span className="font-semibold">
                        {formatPrice(selected.stats?.totalCost)} ₺
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-500">Kâr:</span>{" "}
                      <span className="font-semibold text-green-600">
                        {selected.stats?.profit || 0} ₺
                      </span>
                    </p>

                    <p>
                      <span className="text-gray-500">Stok Süresi:</span>{" "}
                      <span className="font-semibold">
                        {selected.stats?.daysInStock} gün
                      </span>
                    </p>
                  </div>

                  {/* LISTING INFO (🔥 YENİ EKLENDİ) */}
                  {selected.listingId && (
                    <div className="mt-4 border rounded-xl p-3 bg-gray-50">
                      <p className="text-orange-500 font-bold mb-2">
                        Bağlı İlan
                      </p>

                      <div className="flex gap-3">
                        <div className="w-24 h-20 border rounded-lg overflow-hidden">
                          <img
                            src={selected.listingId.gorseller?.[0]}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {selected.listingId.baslik}
                          </p>

                          <p className="text-xs text-gray-500">
                            İlan No: {selected.listingId.ilanNo}
                          </p>

                          <p className="text-sm text-orange-600 font-bold mt-1">
                            {formatPrice(selected.listingId.price)} ₺
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EXPENSE BREAKDOWN */}
                  {selected?.expenses?.length > 0 && (
                    <div className="mt-4 border-t pt-3">
                      <p className="text-orange-500 font-bold mb-2">
                        Masraf Detayı
                      </p>

                      <div className="space-y-3 text-sm">
                        {Object.entries(groupedExpenses || {}).map(
                          ([type, items]) => (
                            <div key={type} className="border rounded-lg p-2">
                              {/* TYPE HEADER */}
                              <div className="flex justify-between mb-2">
                                <span className="font-semibold capitalize">
                                  {type}
                                </span>

                                <span className="text-orange-600 font-bold">
                                  {items.reduce((sum, i) => sum + i.amount, 0)}{" "}
                                  ₺
                                </span>
                              </div>

                              {/* ITEMS */}
                              <div className="space-y-1">
                                {items.map((exp, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between text-xs text-gray-600"
                                  >
                                    <span>{exp.note || "Açıklama yok"}</span>
                                    <span>{formatPrice(exp.amount)} ₺</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* ACTIONS */}
                  {selected.status !== "satildi" && (
                    <div className="mt-4">
                      <Button
                        variant="contained"
                        style={{ background: "#f97316" }}
                        onClick={() => setExpenseModal(true)}
                      >
                        Masraf Ekle
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Box>
          </Modal>

          {/* EXPENSE MODAL */}
          <Modal open={expenseModal} onClose={() => setExpenseModal(false)}>
            <Box className="bg-white w-[400px] mx-auto mt-40 p-6 rounded-xl">
              <h2 className="text-lg font-bold text-orange-500">Masraf Ekle</h2>

              <Select
                fullWidth
                value={expense.type}
                onChange={(e) =>
                  setExpense({ ...expense, type: e.target.value })
                }
              >
                <MenuItem value="ekspertiz">Ekspertiz</MenuItem>
                <MenuItem value="noter">Noter</MenuItem>
                <MenuItem value="bakim">Bakım</MenuItem>
                <MenuItem value="tamir">Tamir</MenuItem>
                <MenuItem value="sigorta">Sigorta</MenuItem>
              </Select>

              <TextField
                fullWidth
                className="mt-3"
                label="Tutar"
                type="number"
                onChange={(e) =>
                  setExpense({ ...expense, amount: e.target.value })
                }
              />

              <TextField
                fullWidth
                className="mt-3"
                label="Not"
                onChange={(e) =>
                  setExpense({ ...expense, note: e.target.value })
                }
              />

              <Button
                fullWidth
                variant="contained"
                style={{ background: "#f97316", marginTop: 12 }}
                onClick={addExpense}
              >
                Kaydet
              </Button>
            </Box>
          </Modal>

          {/* SOLD MODAL */}
          <Modal open={soldModal} onClose={() => setSoldModal(false)}>
            <Box className="bg-white w-[400px] mx-auto mt-40 p-6 rounded-xl">
              <h2 className="text-lg font-bold text-orange-500">
                Satış Fiyatı
              </h2>

              <TextField
                fullWidth
                type="number"
                label="Satış Fiyatı"
                className="mt-3"
                onChange={(e) => setSoldPrice(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                style={{ background: "#f97316", marginTop: 12 }}
                onClick={confirmSold}
              >
                Onayla
              </Button>
            </Box>
          </Modal>

          {/* CREATE MODAL */}
          <Modal open={createModal} onClose={() => setCreateModal(false)}>
            <Box className="bg-white w-[500px] mx-auto mt-20 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-orange-500 mb-4">
                Yeni Araç Ekle
              </h2>

              <TextField
                fullWidth
                label="Plaka"
                className="mb-3"
                onChange={(e) => setForm({ ...form, plate: e.target.value })}
              />

              <TextField
                fullWidth
                label="Marka"
                className="mb-3"
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />

              <TextField
                fullWidth
                label="Model"
                className="mb-3"
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />

              <TextField
                fullWidth
                label="Yıl"
                type="number"
                className="mb-3"
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />

              <TextField
                fullWidth
                label="Alış Fiyatı"
                type="number"
                className="mb-3"
                onChange={(e) =>
                  setForm({ ...form, purchasePrice: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Hedef Satış Fiyatı"
                type="number"
                className="mb-3"
                onChange={(e) =>
                  setForm({ ...form, targetSalePrice: e.target.value })
                }
              />

              <TextField
                fullWidth
                type="date"
                className="mb-4"
                onChange={(e) =>
                  setForm({ ...form, purchaseDate: e.target.value })
                }
              />

              <Button
                fullWidth
                variant="contained"
                style={{ background: "#f97316" }}
                onClick={createVehicle}
              >
                Kaydet
              </Button>
            </Box>
          </Modal>

          <Modal open={listingModal} onClose={() => setListingModal(false)}>
            <Box className="bg-white w-[600px] mx-auto mt-20 p-6 rounded-xl">
              <h2 className="text-lg font-bold text-orange-500 mb-3">
                İlan Seç
              </h2>

              <div className="max-h-[400px] overflow-auto space-y-2">
                {listings.map((l) => (
                  <div
                    key={l._id}
                    onClick={() => {
                      setSelectedListing(l._id);
                      setSelectedilanNo(l.ilanNo);
                    }}
                    className={`p-3 border rounded cursor-pointer ${
                      selectedListing === l._id ? "border-orange-500" : ""
                    }`}
                  >
                    <div className="w-28 h-24 border border-gray-400 rounded-xl">
                      <img
                        className="w-full h-full object-contain"
                        src={l.gorseller[0]}
                      />
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-semibold text-orange-500">
                      <p>{l.brand}</p>
                      <p>{l.model}</p>
                      {l.variant1 && <p>{l.variant1}</p>}
                      {l.variant2 && <p>{l.variant2}</p>}
                      {l.variant3 && <p>{l.variant3}</p>}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="font-semibold">{l.baslik}</span>
                      <span className="text-orange-600">{l.price} ₺</span>
                    </div>

                    <p className="text-xs text-gray-500">İlan No: {l.ilanNo}</p>
                  </div>
                ))}
              </div>

              <Button
                fullWidth
                variant="contained"
                style={{ background: "#f97316", marginTop: 12 }}
                onClick={confirmListing}
              >
                Bağla
              </Button>
            </Box>
          </Modal>

          <Modal open={analyticsModal} onClose={() => setAnalyticsModal(false)}>
            <Box className="bg-white w-[900px] h-[900px] mx-auto mt-20 p-6 rounded-xl">
              <AnalyticsDashboard dashboard={dashboard} />
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
