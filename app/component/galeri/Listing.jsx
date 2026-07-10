"use client";
import { useRouter } from "next/navigation";
import React from "react";
import ProductPrice from "../ProductPrice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Listing = (listing) => {
  const router = useRouter();

  return (
   <div className="w-full px-3 lg:px-0 mt-5 lg:mt-0">
  {listing === undefined && <p className="text-6xl">Loading</p>}

  {/* ✅ DESKTOP TABLE */}
  <div className="hidden md:block">
    <table className="w-full table-auto border-separate border-spacing-y-4">
      <thead className="bg-gray-100 h-14">
        <tr className="text-orange-500">
          <th>İlan Görsel</th>
          <th>Marka Model</th>
          <th>İlan Başlığı</th>
          <th>Fiyat</th>
          <th>İlan Tarihi</th>
        </tr>
      </thead>

      <tbody>
        {listing?.listing?.map((item, index) => (
          <tr
            key={index}
            onClick={() => router.push(`/ilan/${item.ilanNo}`)}
            className={`h-40 ${
              item.isEV ? "outline outline-blue-400" : ""
            } hover:bg-gray-50 hover:shadow-md cursor-pointer duration-200`}
          >
            <td>
              <div className="w-52 h-36">
                <img
                  className="w-full h-full object-contain"
                  src={item.gorseller[0]}
                />
              </div>
            </td>

            <td className="text-center">
              <p className="text-sm">
                {item.brand} / {item.model} /{" "}
                {item.variant1 || ""}{" "}
                {item.variant2 && "/ " + item.variant2}{" "}
                {item.variant3 && "/ " + item.variant3}
              </p>
            </td>

            <td className="text-center font-semibold">
              {item.baslik}
            </td>

            <td className="text-center font-semibold text-red-700">
              <ProductPrice price={item.price} locale="tr-TR" />
            </td>

            <td className="text-center">
              {new Date(item.ilanTarihi).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ✅ MOBILE CARD VIEW */}
  <div className="md:hidden space-y-4">
    {listing?.listing?.map((item, index) => (
      <div
        key={index}
        onClick={() => router.push(`/ilan/${item.ilanNo}`)}
        className={`p-3 rounded-xl shadow-sm border ${
          item.isEV ? "border-blue-400" : "border-gray-200"
        } cursor-pointer`}
      >
        <div className="flex gap-3">
          <img
            src={item.gorseller[0]}
            className="w-28 h-20 object-cover rounded-md"
          />

          <div className="flex flex-col justify-between w-full">
            <p className="text-sm font-semibold line-clamp-2">
              {item.baslik}
            </p>

            <p className="text-xs text-gray-500">
              {item.brand} / {item.model}
            </p>

            <p className="text-red-600 font-semibold">
              <ProductPrice price={item.price} locale="tr-TR" />
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>
            {new Date(item.ilanTarihi).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </span>

          {item.isEV && (
            <span className="text-blue-500 font-semibold">
              EV
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Listing;
