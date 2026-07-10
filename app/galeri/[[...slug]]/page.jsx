"use client";
import About from "@/app/component/galeri/About";
import Listing from "@/app/component/galeri/Listing";
import Team from "@/app/component/galeri/Team";
import api from "@/app/lib/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = () => {
  const [component, setComponent] = useState("listing");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [data, setData] = useState();
  const [selectFilter, setSelectFilter] = useState("all");
  const [filteredListing, setFilteredListing] = useState();
  const [categoryList, setCategoryList] = useState([]);

  const getData = async () => {
    try {
      const res = await api.get(`/corporate/${params.slug[0]}`);
      setData(res.data.user);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);

  const filterData = () => {
    const filter = data?.ilanlar.filter(
      (item) => item.category === selectFilter,
    );
    setFilteredListing(filter);
  };

  const categoryListAdd = () => {
    if (data) {
      const uniqueCategories = [
        ...new Set(data.ilanlar.map((item) => item.category)),
      ];

      setCategoryList(uniqueCategories);
    }
  };

  const formatDateDiff = (dateStr) => {
    const now = new Date();
    const target = new Date(dateStr);

    let years = now.getFullYear() - target.getFullYear();
    let months = now.getMonth() - target.getMonth();

    if (now.getDate() < target.getDate()) {
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // 🎯 formatlama
    if (years === 0) {
      return `${months} ay`;
    }

    if (months === 0) {
      return `${years} yıl`;
    }

    return `${years} yıl ${months} ay`;
  };

  useEffect(() => {
    categoryListAdd();
  }, [data]);

  useEffect(() => {
    filterData();
  }, [data, selectFilter]);

  return (
    <div className="container mx-auto pb-32">
      {loading && (
        <div className="w-full grid grid-cols-1">
          <Skeleton width={"100%"} height={400} />
        </div>
      )}
      {!loading && (
        <div
          className={`w-full h-60 lg:h-80 bg-cover bg-no-repeat bg-center relative flex items-end shadow-2xl`}
          style={{ backgroundImage: `url(${data?.coverPhotoUrl})` }}
        >
          <div className="w-full h-52 lg:h-40 flex flex-col lg:flex-row items-start lg:items-end absolute -bottom-28 lg:-bottom-20 px-5 lg:px-10">
            <div className="w-36 h-36 bg-gray-200 flex items-center shadow-2xl shadow-white">
              <img className="w-full object-contain" src={data?.logoUrl} />
            </div>
            <div className=" lg:ml-6 flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
              <div className="mt-2 lg:mt-0">
                <p className="text-2xl font-semibold">{data?.galeriAdi}</p>
                <p className="text-sm text-gray-500">
                  <span>{data?.sehir} /</span>
                  <span className="ml-1">{data?.ilce} /</span>
                  <span className="ml-1">{data?.mahalle}</span>
                </p>
              </div>

              <button className="px-4 lg:px-8 py-2 mt-2 lg:mt-0 lg:py-3 bg-orange-400 text-white font-semibold cursor-pointer rounded-full shadow-2xl text-xs lg:text-sm">
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="w-full grid grid-cols-1 mt-12">
          <Skeleton width={"100%"} height={50} />
        </div>
      )}
      {!loading && (
        <div className="w-full mt-32 bg-gray-100 p-3 flex flex-col lg:flex-row justify-between items-center">
          <ul className="flex space-x-6 items-center text-orange-400">
            <li
              onClick={() => setComponent("listing")}
              className="cursor-pointer hover:text-orange-300"
            >
              İlanlarımız
            </li>
            <li
              onClick={() => setComponent("team")}
              className="cursor-pointer hover:text-orange-300"
            >
              Ekibimiz
            </li>
            <li
              onClick={() => setComponent("about")}
              className="cursor-pointer hover:text-orange-300"
            >
              Hakkımızda
            </li>
          </ul>
          <div className="flex items-center space-x-7 text-orange-500">
            <p className="text-sm font-semibold">
              {formatDateDiff(data?.createdAt)}lık üye
            </p>
            <p className="text-sm font-semibold">
              {data?.ilanlar.length} Yayında Olan İlan
            </p>
          </div>
        </div>
      )}
      {component === "listing" && (
        <div className="w-full h-8 mt-3 flex items-center justify-center lg:justify-start space-x-3">
          <button
            onClick={() => setSelectFilter("all")}
            className={`${selectFilter === "all" ? "bg-orange-600" : "bg-orange-400"} text-xs font-semibold  h-full px-8 rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl hover:bg-orange-500 duration-200 capitalize`}
          >
            <p>Tümü</p>
          </button>
          {categoryList?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectFilter(item)}
              className={`${selectFilter === item ? "bg-orange-600" : "bg-orange-400"} text-xs font-semibold  h-full px-8 rounded-full flex items-center justify-center text-white cursor-pointer shadow-2xl hover:bg-orange-500 duration-200 capitalize`}
            >
              <p>{item}</p>
            </button>
          ))}
        </div>
      )}
      <div className="w-full mt-2">
        {component === "about" && <About about={data?.hakkimizda} />}
        {component === "team" && <Team team={data?.ekip} />}
        {component === "listing" && (
          <Listing
            listing={selectFilter === "all" ? data?.ilanlar : filteredListing}
          />
        )}
        {loading && (
          <div className="w-full grid grid-cols-1 gap-y-5 justify-center items-center mt-5">
            <Skeleton width={"100%"} height={200} />
            <Skeleton width={"100%"} height={200} />
            <Skeleton width={"100%"} height={200} />
            <Skeleton width={"100%"} height={200} />
            <Skeleton width={"100%"} height={200} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
