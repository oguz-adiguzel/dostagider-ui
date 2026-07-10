"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { gsap } from "gsap";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const HeroElektrik = () => {
  const [loading, setLoading] = useState(true);
  const [carCategories, setCarCategories] = useState();
  const [carBrandList, setCarBrandList] = useState();
  const [carModelList, setCarModelList] = useState();

  const [selectCategory, setSelectCategory] = useState();
  const [selectBrand, setSelectBrand] = useState();
  const [selectModel, setSelecModel] = useState();

  const router = useRouter();

  const imageRef = useRef(null);
  const headlightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headlightRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5,
      },
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        y: -800, // ekranın üst dışı
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      },
    );
  }, []);

  const getCarCategories = async () => {
    try {
      const res = await axios.get(
        " https://dostagider-api.onrender.com/ev-car-options/categories",
      );
      setCarCategories(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("get categories error", error);
    }
  };

  const getCarOptionsList = async () => {
    try {
      if (selectCategory && !selectBrand) {
        const res = await axios.get(
          ` https://dostagider-api.onrender.com/ev-car-options/filter?category=${selectCategory}`,
        );
        setCarBrandList(res.data.data[0]);
      }
      if (selectCategory && selectBrand && !selectModel) {
        const res = await axios.get(
          ` https://dostagider-api.onrender.com/ev-car-options/filter?category=${selectCategory}&brand=${selectBrand}`,
        );
        setCarModelList(res.data.data[0].brands[0].models);
      }
    } catch (error) {
      console.log("option error", error);
    }
  };

  const getFiltersPage = () => {
    if (selectCategory && !selectBrand && !selectModel) {
      router.push(`/kategori?category=${selectCategory}`);
    }
    if (selectCategory && selectBrand && !selectModel) {
      router.push(`/kategori?category=${selectCategory}&brand=${selectBrand}`);
    }
    if (selectCategory && selectBrand && selectModel) {
      router.push(
        `/kategori?category=${selectCategory}&brand=${selectBrand}&model=${selectModel}`,
      );
    }
  };

  useEffect(() => {
    if (selectCategory === "Araç Tipi") {
      setCarModelList(null);
    }
    if (selectBrand === "Marka") {
      setCarModelList(null);
    }
    getCarOptionsList();
  }, [selectCategory, selectBrand]);

  useEffect(() => {
    getCarCategories();
  }, []);

  return (
    <div className="w-full h-[400px] lg:h-[800px] bg-[#0F1843] flex flex-col items-center relative z-20 px-2 lg:px-0">
      <p className="text-center text-white pt-10 lg:pt-28 text-sm font-semibold">
        Yakınınızdaki elektrikli araçları bulun
      </p>
      <p className="text-center text-3xl lg:text-5xl font-sans font-light mt-4 text-white">
        Elektrikli Araç Dünyası
      </p>
      <div className="w-full lg:w-[960px] h-32 py-2 lg:py-0 lg:h-[75px] mx-auto mt-10 bg-white rounded-4xl lg:rounded-full flex flex-col justify-center lg:grid lg:grid-cols-12 px-3 shadow-2xl">
        <div className="col-span-11 h-full grid grid-cols-4 z-50">
          <div className="h-full flex items-center">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-type">Araç Tipi</InputLabel>
              <Select
                labelId="demo-simple-select-label-type"
                id="demo-simple-select"
                value={selectCategory}
                label="Araç Tipi"
                onChange={(e) => setSelectCategory(e.target.value)}
                sx={{
                  // height: 45,
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                }}
              >
                {carCategories?.map((item, index) => (
                  <MenuItem key={index} className="capitalize" value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
           <div className="h-full flex items-center">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Marka</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectBrand}
                label="Marka"
                onChange={(e) => setSelectBrand(e.target.value)}
                disabled={selectCategory ? false : true}
                // sx={{
                //   // height: 45,
                //   borderTopLeftRadius: 30,
                //   borderBottomLeftRadius: 30,
                // }}
              >
                 {carBrandList?.brands.map((item, index) => (
                <MenuItem className="capitalize" value={item.brand} key={index}>
                  {item.brand}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>

          {/* <div className="h-full flex items-center">
            <select
              onChange={(e) => setSelecModel(e.target.value)}
              className="border border-gray-200 w-full py-3 text-sm"
            >
              <option value="">Model</option>
              {carModelList?.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div> */}

           <div className="h-full flex items-center">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Model</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectModel}
                label="Model"
                
                onChange={(e) => setSelecModel(e.target.value)}
                disabled={selectBrand ? false : true}

                // sx={{
                //   // height: 45,
                //   borderTopLeftRadius: 30,
                //   borderBottomLeftRadius: 30,
                // }}
              >
               {carModelList?.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>

          <div className="h-full flex items-center">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Şehir</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={selectModel}
                label="Şehir"
                // onChange={(e) => setSelecModel(e.target.value)}
                sx={{
                  // height: 45,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
              <MenuItem>Eskişehir</MenuItem>
              <MenuItem>Ankara</MenuItem>
              <MenuItem>İstanbul</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* <div className="h-full flex items-center">
            <select className="border border-gray-200 rounded-r-full w-full py-3 text-sm">
              <option value="">Şehir</option>
              <option>Eskişehir</option>
              <option>Ankara</option>
              <option>İstanbul</option>
            </select>
          </div> */}

        </div>
        <div className="lg:col-span-1 h-full flex items-end lg:items-center justify-end z-50">
          <button
            onClick={() => getFiltersPage()}
            className=" w-full lg:w-14 h-10 lg:h-14 bg-[#405FF2] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#4093f2] duration-200 shadow-md"
          >
            <IoSearchOutline color="white" size={22} />
          </button>
        </div>
      </div>
      {/* <img
        ref={imageRef}
        alt="slider"
        className="absolute -bottom-5"
        src="slider51.png"
      /> */}

      <div className="flex justify-center">
        <img
          ref={imageRef}
          alt="slider"
          className="absolute -bottom-8 w-full lg:w-2/3"
          src="hero-togg.webp"
         
        />

        {/* FAR IŞIĞI */}
        <div
          ref={headlightRef}
          className="absolute bottom-52 left-52 w-[400px] h-[25px] rounded-full pointer-events-none z-50"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(180,220,255,0.6) 40%, rgba(255,255,255,0) 70%)",
            opacity: 0,
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
};

export default HeroElektrik;
