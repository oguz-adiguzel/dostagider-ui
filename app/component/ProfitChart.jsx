"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function ProfitChart({ data }) {
  const labels = data?.map((d) => d.month) || [];
  const profits = data?.map((d) => d.profit) || [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Aylık Kar",
        data: profits,

        // 🔥 daha güçlü görünüm
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",

        fill: true,
        tension: 0.5,

        // 🔥 noktaları küçült → daha clean görünüm
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: "#f97316",
        pointBorderWidth: 2,
        pointBorderColor: "#fff",

        // 🔥 çizgi kalınlığı (çok önemli)
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 kritik

    plugins: {
      legend: { display: false },

      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        callbacks: {
          label: (context) =>
            `${context.raw?.toLocaleString()} ₺`,
        },
      },
    },

    interaction: {
      mode: "index",
      intersect: false,
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true, // 🔥 bu fark yaratır

        grid: {
          color: "rgba(0,0,0,0.05)",
        },

        ticks: {
          callback: (value) =>
            value.toLocaleString() + " ₺",
        },
      },
    },
  };

  return (
    <div className="bg-white px-5 pt-5 pb-12 rounded-2xl shadow-sm border border-gray-100 mt-6 h-[420px]">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Kar Trend Analizi
        </h2>

        <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          Aylık
        </span>
      </div>

      {/* 🔥 IMPORTANT: height wrapper */}
      <div className="h-[340px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}