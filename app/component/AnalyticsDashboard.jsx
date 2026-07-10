"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AnalyticsDashboard({ dashboard }) {
  if (!dashboard) return null;


  console.log('====================================');
  console.log('DASHBOARD', dashboard);
  console.log('====================================');
  // -------------------------
  // 1. EXPENSE PIE CHART
  // -------------------------
  const expenseData = {
    labels: Object.keys(dashboard.expenseBreakdown || {}),
    datasets: [
      {
        data: Object.values(dashboard.expenseBreakdown || {}),
        backgroundColor: ["#f97316", "#3b82f6", "#10b981", "#ef4444"],
      },
    ],
  };

  // -------------------------
  // 2. STATUS PIE CHART
  // -------------------------
  const statusData = {
    labels: Object.keys(dashboard.statusDistribution || {}),
    datasets: [
      {
        data: Object.values(dashboard.statusDistribution || {}),
        backgroundColor: ["#f97316", "#3b82f6", "#facc15", "#22c55e"],
      },
    ],
  };

  // -------------------------
  // 3. MONTHLY PROFIT BAR
  // -------------------------
  const profitData = {
    labels: dashboard.monthlyProfit?.map((m) => m.month) || [],
    datasets: [
      {
        label: "Kâr",
        data: dashboard.monthlyProfit?.map((m) => m.profit) || [],
        backgroundColor: "#f97316",
      },
    ],
  };

    const formatPrice = (num) => {
    return new Intl.NumberFormat("tr-TR").format(num);
  };

  return (
    <div className="space-y-6 h-full overflow-scroll">

      {/* TOP METRICS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <p>Toplam Araç</p>
          <h2 className="text-xl font-bold">{dashboard.totalVehicles}</h2>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p>Satılan</p>
          <h2 className="text-xl font-bold">{dashboard.soldVehicles}</h2>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p>Toplam Kâr</p>
          <h2 className="text-xl font-bold text-green-600">
            {formatPrice(dashboard.totalProfit)} ₺
          </h2>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p>Toplam Masraf</p>
          <h2 className="text-xl font-bold text-red-500">
            {formatPrice(dashboard.totalExpenses)} ₺
          </h2>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* EXPENSE BREAKDOWN */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold text-orange-500 mb-3">
            Masraf Dağılımı
          </h2>
          <Pie data={expenseData} />
        </div>

        {/* STATUS DISTRIBUTION */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold text-orange-500 mb-3">
            Araç Durumları
          </h2>
          <Pie data={statusData} />
        </div>

      </div>

      {/* PROFIT TREND */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-orange-500 mb-3">
          Aylık Kâr Trendi
        </h2>
        <Bar data={profitData} />
      </div>

    </div>
  );
}