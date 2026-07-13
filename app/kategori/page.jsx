"use client";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import ListingCard from "@/app/component/ListingCard";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/app/lib/axios";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const dynamic = 'force-dynamic';

const ITEM_HEIGHT = 86;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const page = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const [carCategories, setCarCategories] = useState();
  const [carBrandList, setCarBrandList] = useState();
  const [carModelList, setCarModelList] = useState();
  const [carVariantList, setCarVariantList] = useState();
  const [carVariantList2, setCarVariantList2] = useState();
  const [carVariantList3, setCarVariantList3] = useState();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    model: searchParams.get("model") || "",
    variant1: searchParams.get("variant1") || "",
    variant2: searchParams.get("variant2") || "",
    variant3: searchParams.get("variant3") || "",
    aracYiliMin: searchParams.get("aracYiliMin") || "",
    aracYiliMax: searchParams.get("fiyatMax") || "",
    fiyatMin: searchParams.get("fiyatMin") || "",
    fiyatMax: searchParams.get("aracYiliMax") || "",
    kmMin: searchParams.get("kmMin") || "",
    kmMax: searchParams.get("kmMax") || "",
    yakit: searchParams.getAll("yakit") || [],
    vites: searchParams.getAll("vites") || [],
    kasaTipi: searchParams.get("kasaTipi") || "",
    page: searchParams.get("page") || 1,
  });

  const [sehirList, setSehirList] = useState();
  const [ilceList, setİlceList] = useState({});
  const [sehir, setSehir] = useState([]);
  const [ilce, setIlce] = useState([]);
  const [sort, setSort] = useState("advanced");
  const [isShowCase, setIsShowCase] = useState(false);

  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", value);
    router.push(`/kategori?${params.toString()}`);
  };

  const getSehirList = async () => {
    try {
      const response = await axios.get(
        `https://api.turkiyeapi.dev/v1/provinces`,
      );
      setSehirList(response.data.data);
    } catch (error) {
      console.log("error city", error);
    }
  };

  // const getİlceList = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.turkiyeapi.dev/v1/districts?province=${sehir}`,
  //     );

  //     setİlceList(response.data.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  //   const getİlceList = async () => {
  //   try {
  //     if (!sehir?.length) {
  //       setİlceList([]);
  //       return;
  //     }

  //     const requests = sehir.map((city) =>
  //       axios.get(
  //         `https://api.turkiyeapi.dev/v1/districts?province=${city}`
  //       )
  //     );

  //     const responses = await Promise.all(requests);

  //     const allDistricts = responses.flatMap(
  //       (response) => response.data.data
  //     );

  //     setİlceList(allDistricts);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const getİlceList = async () => {
    try {
      if (!sehir?.length) {
        setİlceList({});
        return;
      }

      const responses = await Promise.all(
        sehir.map((city) =>
          axios.get(`https://api.turkiyeapi.dev/v1/districts?province=${city}`),
        ),
      );

      const groupedDistricts = {};

      responses.forEach((response, index) => {
        const city = sehir[index];

        groupedDistricts[city] = response.data.data;
      });

      setİlceList(groupedDistricts);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      for (const [key, value] of searchParams.entries()) {
        if (value) {
          params.append(key, value);
        }
      }

      const res = await api.get(`/ilan/filtrele?${params.toString()}`);

      setLoading(false);
      setData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSehir(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleChangeIlce = (event) => {
    const {
      target: { value },
    } = event;
    setIlce(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  // Çoklu seçim için checkbox handler
  const handleMultiSelectChange = (param, value) => {
    setFilters((prev) => {
      const current = prev[param] || [];
      let updated;
      if (current.includes(value)) {
        updated = current.filter((v) => v !== value);
      } else {
        updated = [...current, value];
      }
      return { ...prev, [param]: updated };
    });
  };

  const handleSingleSelectChange = (param, value) => {
    // Mevcut URL parametrelerini al
    const params = new URLSearchParams(window.location.search);

    // Seçilen parametreyi ekle / güncelle
    params.set(param, value);

    params.set("page", 1);
    // URL'i güncelle
    router.push(`/kategori?${params.toString()}`);
  };

  const IMMUTABLE_PARAMS = [
    "category",
    "brand",
    "model",
    "variant1",
    "variant2",
    "variant3",
  ];

  const applyFilters = () => {
    const params = new URLSearchParams(window.location.search);

    params.delete("sehir");
    params.delete("ilce");

    if (sehir?.length) {
      sehir.forEach((city) => {
        params.append("sehir", city);
      });

      if (ilce?.length) {
        ilce.forEach((district) => {
          params.append("ilce", district);
        });
      }
    }

    // if (sehir?.length) {
    //   sehir.forEach((city) => {
    //     params.append("sehir", city);
    //   });
    // } else {
    //   params.delete("sehir");
    //   params.delete("ilce");
    // }

    //   params.delete("ilce");

    //  if (ilce?.length) {
    //   ilce.forEach((city) => {
    //     params.append("ilce", city);
    //   });
    // } else {
    //   params.delete("ilce");
    // }

    Object.entries(filters).forEach(([key, value]) => {
      if (IMMUTABLE_PARAMS.includes(key)) return;
      if (key === "page") return;

      if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
        return;
      }

      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", 1);

    router.push(`/kategori?${params.toString()}`);
  };

  const getCarCategories = async () => {
    try {
      const res = await axios.get(
        " https://dostagider-api.vercel.app/car-options/categories",
      );
      setCarCategories(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("get categories error", error);
    }
  };

  const getCarOptionsList = async () => {
    try {
      if (searchParams.get("category") && !searchParams.get("brand")) {
        const res = await axios.get(
          ` https://dostagider-api.vercel.app/car-options/listing-page-filter?category=${searchParams.get(
            "category",
          )}`,
        );
        setCarBrandList(res.data.data[0]);
      }
      if (
        searchParams.get("category") &&
        searchParams.get("brand") &&
        !searchParams.get("model")
      ) {
        const res = await axios.get(
          ` https://dostagider-api.vercel.app/car-options/listing-page-filter?category=${searchParams.get(
            "category",
          )}&brand=${searchParams.get("brand")}`,
        );
        setCarModelList(res.data.data[0].brands[0].models);
        variantList();
      }
      if (
        searchParams.get("category") &&
        searchParams.get("brand") &&
        searchParams.get("model")
      ) {
        const res = await axios.get(
          ` https://dostagider-api.vercel.app/car-options/listing-page-filter?category=${searchParams.get(
            "category",
          )}&brand=${searchParams.get("brand")}`,
        );
        setCarModelList(res.data.data[0].brands[0].models);
      }
    } catch (error) {
      console.log("option error", error);
    }
  };

  const variantList = () => {
    if (searchParams.get("model") && carModelList?.length > 0) {
      const filter = carModelList.filter(
        (item) => item.name === searchParams.get("model"),
      );
      if (filter.length > 0) {
        setCarVariantList(filter[0].variants || []);
      } else {
        setCarVariantList([]); // model bulunamadıysa temizle
      }
    } else {
      setCarVariantList([]);
    }
  };

  const variantList2 = () => {
    if (searchParams.get("variant1") && carVariantList?.length > 0) {
      const filter = carVariantList.filter(
        (item) => item.variant1 === searchParams.get("variant1"),
      );
      if (filter.length > 0) {
        setCarVariantList2(filter[0].children || []);
      } else {
        setCarVariantList2([]);
      }
    } else {
      setCarVariantList2([]);
    }
  };

  const variantList3 = () => {
    if (searchParams.get("variant2") && carVariantList?.length > 0) {
      let found = null;
      carVariantList.forEach((element) => {
        const filter = element.children?.filter(
          (item) => item.variant2 === searchParams.get("variant2"),
        );
        if (filter && filter.length > 0) {
          found = filter[0].children || [];
        }
      });
      setCarVariantList3(found || []);
    } else {
      setCarVariantList3([]);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams.toString()]);

  useEffect(() => {
    if (!filters.category !== "") {
      getCarCategories();
    }
  }, [data]);

  useEffect(() => {
    if (searchParams.get("category")) getCarOptionsList();
  }, [searchParams.toString()]);

  useEffect(() => {
    if (searchParams.get("model")) variantList();
  }, [searchParams.toString()]);

  useEffect(() => {
    if (searchParams.get("variant1")) variantList2();
  }, [carVariantList]);

  useEffect(() => {
    if (searchParams.get("variant2")) variantList3();
  }, [carVariantList2]);

  useEffect(() => {
    if (sehir) getİlceList();
  }, [sehir]);

  useEffect(() => {
    getSehirList();
    if (searchParams.get("vitrin")) {
      setIsShowCase(Boolean(searchParams.get("vitrin")));
    }
  }, []);

  useEffect(() => {
    // sehirNameChange();
    setSort(searchParams.get("sort"));
  }, [sehir]);

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);
    params.set("page", 1); // 🔥
    setSort(value);

    router.push(`/kategori?${params.toString()}`);
  };

  const handleRemoveParam = (param) => {
    const params = new URLSearchParams(searchParams.toString());

    if (param === "category") {
      [
        "category",
        "brand",
        "model",
        "variant1",
        "variant2",
        "variant3",
      ].forEach((p) => params.delete(p));
    }

    if (param === "brand") {
      ["brand", "model", "variant1", "variant2", "variant3"].forEach((p) =>
        params.delete(p),
      );
    }

    if (param === "model") {
      ["model", "variant1", "variant2", "variant3"].forEach((p) =>
        params.delete(p),
      );
    }

    params.set("page", 1);
    router.push(`/kategori?${params.toString()}`);
  };

  // useEffect(() => {
  //   if (!sehir || !sehirList?.length) return;

  //   const city = sehirList.find((item) => item.id == sehir);
  //   if (city) {
  //     setSehirName(city.name);
  //   }
  // }, [sehir, sehirList]);

  console.log('====================================');
  console.log('ilce', ilce);
  console.log('====================================');

  return (
    <div className="w-full lg:w-[90%] mx-auto pb-10 grid grid-cols-1 lg:grid-cols-12 gap-x-7 items-start px-2 lg:px-0">
      <div className="w-full lg:col-span-2 border border-gray-300 rounded-xl py-2 px-3">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold font-sans">Filtreler</p>
          <button className="text-sm text-blue-400 cursor-pointer">
            Temizle
          </button>
        </div>
        {/* <div className="w-full h-64 border border-gray-300 mt-6 flex flex-col items-start px-3 py-2 text-sm text-orange-500 overflow-y-scroll">
          <div className="flex flex-wrap gap-2 mb-3">
            {searchParams.get("category") && (
              <button
                onClick={() => handleRemoveParam("category")}
                className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs"
              >
                {searchParams.get("category")} ✕
              </button>
            )}

            {searchParams.get("brand") && (
              <button
                onClick={() => handleRemoveParam("brand")}
                className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs"
              >
                {searchParams.get("brand")} ✕
              </button>
            )}

            {searchParams.get("model") && (
              <button
                onClick={() => handleRemoveParam("model")}
                className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs"
              >
                {searchParams.get("model")} ✕
              </button>
            )}
          </div>

          {!searchParams.get("category") &&
            carCategories?.map((item, index) => (
              <button
                onClick={() => handleSingleSelectChange("category", item)}
                key={index}
                className="cursor-pointer capitalize"
              >
                {item}
              </button>
            ))}

          {!searchParams.get("brand") &&
            searchParams.get("category") &&
            carBrandList?.brands.map((item, index) => (
              <button
                onClick={() => handleSingleSelectChange("brand", item.brand)}
                key={index}
                className="cursor-pointer capitalize"
              >
                {item.brand}
              </button>
            ))}
          {!searchParams.get("model") && (
            <p className="font-semibold text-base">
              {searchParams.get("brand")}
            </p>
          )}
          {!searchParams.get("model") &&
            searchParams.get("brand") &&
            carModelList?.map((item, index) => (
              <button
                onClick={() => handleSingleSelectChange("model", item.name)}
                key={index}
                className="cursor-pointer capitalize ml-3 py-0.5 hover:text-orange-800"
              >
                {item.name}
              </button>
            ))}
          {!searchParams.get("variant1") && (
            <p className="font-semibold text-base">
              {searchParams.get("model")}
            </p>
          )}
          {!searchParams.get("variant1") &&
            searchParams.get("model") &&
            carVariantList?.map((item, index) => (
              <button
                onClick={() =>
                  handleSingleSelectChange("variant1", item.variant1)
                }
                key={index}
                className="cursor-pointer capitalize ml-3 py-0.5 hover:text-orange-800"
              >
                {item.variant1}
              </button>
            ))}
          {!searchParams.get("variant2") && (
            <p className="font-semibold text-base">
              {searchParams.get("variant1")}
            </p>
          )}
          {!searchParams.get("variant2") &&
            searchParams.get("variant1") &&
            carVariantList2?.map((item, index) => (
              <button
                onClick={() =>
                  handleSingleSelectChange("variant2", item.variant2)
                }
                key={index}
                className="cursor-pointer capitalize ml-3 py-0.5 hover:text-orange-800"
              >
                {item.variant2}
              </button>
            ))}
          {!searchParams.get("variant3") && (
            <p className="font-semibold text-base">
              {searchParams.get("variant2")}
            </p>
          )}
          {!searchParams.get("variant3") &&
            searchParams.get("variant2") &&
            carVariantList3?.map((item, index) => (
              <button
                onClick={() =>
                  handleSingleSelectChange("variant3", item.variant3)
                }
                key={index}
                className="cursor-pointer capitalize ml-3 py-0.5 hover:text-orange-800"
              >
                {item.variant3}
              </button>
            ))}
          {searchParams.get("variant1") &&
            searchParams.get("variant2") &&
            searchParams.get("variant3") && (
              <p>{searchParams.get("variant3")}</p>
            )}
        </div> */}

        <div className="w-full h-72 mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {(searchParams.get("category") ||
            searchParams.get("brand") ||
            searchParams.get("model") ||
            searchParams.get("variant1") ||
            searchParams.get("variant2") ||
            searchParams.get("variant3")) && (
            <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {searchParams.get("category") && (
                  <button
                    onClick={() => handleRemoveParam("category")}
                    className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium whitespace-nowrap hover:bg-orange-200 transition"
                  >
                    {searchParams.get("category")} ✕
                  </button>
                )}

                {searchParams.get("brand") && (
                  <>
                    <span className="text-gray-400">›</span>
                    <button
                      onClick={() => handleRemoveParam("brand")}
                      className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium whitespace-nowrap hover:bg-orange-200 transition"
                    >
                      {searchParams.get("brand")} ✕
                    </button>
                  </>
                )}

                {searchParams.get("model") && (
                  <>
                    <span className="text-gray-400">›</span>
                    <button
                      onClick={() => handleRemoveParam("model")}
                      className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium whitespace-nowrap hover:bg-orange-200 transition"
                    >
                      {searchParams.get("model")} ✕
                    </button>
                  </>
                )}

                {searchParams.get("variant1") && (
                  <>
                    <span className="text-gray-400">›</span>
                    <div className="px-3 py-1.5 bg-white border border-orange-200 rounded-lg text-xs font-medium text-orange-600 whitespace-nowrap">
                      {searchParams.get("variant1")}
                    </div>
                  </>
                )}

                {searchParams.get("variant2") && (
                  <>
                    <span className="text-gray-400">›</span>
                    <div className="px-3 py-1.5 bg-white border border-orange-200 rounded-lg text-xs font-medium text-orange-600 whitespace-nowrap">
                      {searchParams.get("variant2")}
                    </div>
                  </>
                )}

                {searchParams.get("variant3") && (
                  <>
                    <span className="text-gray-400">›</span>
                    <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-xs font-semibold text-green-700 whitespace-nowrap">
                      {searchParams.get("variant3")}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="h-[calc(100%-48px)] overflow-y-auto p-2">
            {!searchParams.get("category") &&
              carCategories?.map((item, index) => (
                <button
                  onClick={() => handleSingleSelectChange("category", item)}
                  key={index}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 capitalize hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {item}
                </button>
              ))}

            {!searchParams.get("brand") &&
              searchParams.get("category") &&
              carBrandList?.brands.map((item, index) => (
                <button
                  onClick={() => handleSingleSelectChange("brand", item.brand)}
                  key={index}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 capitalize hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {item.brand}
                </button>
              ))}

            {!searchParams.get("model") &&
              searchParams.get("brand") &&
              carModelList?.map((item, index) => (
                <button
                  onClick={() => handleSingleSelectChange("model", item.name)}
                  key={index}
                  className="w-full text-left px-5 py-2.5 rounded-lg text-sm text-gray-600 capitalize hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {item.name}
                </button>
              ))}

            {!searchParams.get("variant1") &&
              searchParams.get("model") &&
              carVariantList?.map((item, index) => (
                <button
                  onClick={() =>
                    handleSingleSelectChange("variant1", item.variant1)
                  }
                  key={index}
                  className="w-full text-left px-5 py-2.5 rounded-lg text-sm text-gray-600 capitalize hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {item.variant1}
                </button>
              ))}

            {!searchParams.get("variant2") &&
              searchParams.get("variant1") &&
              carVariantList2?.map((item, index) => (
                <button
                  onClick={() =>
                    handleSingleSelectChange("variant2", item.variant2)
                  }
                  key={index}
                  className="w-full text-left px-5 py-2.5 rounded-lg text-sm text-gray-600 capitalize hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {item.variant2}
                </button>
              ))}

            {!searchParams.get("variant3") &&
              searchParams.get("variant2") &&
              carVariantList3?.map((item, index) => (
                <button
                  onClick={() =>
                    handleSingleSelectChange("variant3", item.variant3)
                  }
                  key={index}
                  className="w-full text-left px-5 py-2.5 rounded-lg text-sm text-gray-600 capitalize hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  {item.variant3}
                </button>
              ))}

            {searchParams.get("variant1") &&
              searchParams.get("variant2") &&
              searchParams.get("variant3") && (
                <div className="m-2 p-4 rounded-xl border border-green-200 bg-green-50">
                  <p className="text-xs text-green-600 font-medium mb-1">
                    Seçilen Paket
                  </p>

                  <p className="text-sm font-semibold text-green-700 capitalize">
                    {searchParams.get("variant3")}
                  </p>
                </div>
              )}
          </div>
        </div>

        {isShowCase && (
          <div className="mt-4 w-full">
            <a
              href="/kategori"
              className="text-orange-500 border px-8 py-1.5 mt-4 rounded-full cursor-pointer hover:bg-orange-500 hover:text-white duration-200"
            >
              Tüm İlanları Görüntüle
            </a>
          </div>
        )}

        <div className="w-full p-3 border bg-gray-100 border-gray-300 mt-4">
          <p className="font-sans font-semibold">Adres</p>
          <FormControl sx={{ marginTop: 2 }} fullWidth size="small">
            <InputLabel id="demo-multiple-name-label">Şehir</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={sehir}
              label="Şehir"
              onChange={handleChange}
              input={<OutlinedInput label="Sehir" />}
              MenuProps={MenuProps}
            >
              <MenuItem value="">Tümü</MenuItem>
              {sehirList?.map((item) => (
                <MenuItem
                  style={getStyles(item.name, sehir, theme)}
                  key={item.id}
                  value={item.name}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginTop: 1 }} fullWidth size="small">
            <InputLabel id="demo-multiple-name-label">İlçe</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={ilce}
              label="İlçe"
              onChange={handleChangeIlce}
              input={<OutlinedInput label="Sehir" />}
              MenuProps={MenuProps}
              // onChange={(e) => setIlce(e.target.value)}
            >
              <MenuItem value="">Tümü</MenuItem>
              {/* {ilceList?.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))} */}

              {Object.entries(ilceList).flatMap(([city, districts]) => [
                <div
                  className="w-full h-10 bg-gray-200 flex items-center font-semibold pl-6"
                  key={`header-${city}`}
                >
                  <p>{city}</p>
                </div>,

                ...districts.map((district) => (
                  // <MenuItem
                  //   key={`${city}-${district.id}`}
                  //   style={getStyles(district.name, ilce, theme)}
                  //   value={district.name}
                  // >
                  //   {district.name}
                  // </MenuItem>

                  <MenuItem
                    key={`${city}-${district.id}`}
                    value={`${city}:${district.name}`}
                    style={getStyles(district.name, ilce, theme)}
                  >
                    {district.name}
                  </MenuItem>
                )),
              ])}
            </Select>
          </FormControl>
        </div>
        <div className="w-full p-3 border bg-gray-100 border-gray-300 mt-1">
          <p className="font-sans font-semibold">Fiyat</p>
          <div className="w-full grid grid-cols-2 gap-x-3 mt-2">
            <TextField
              value={filters.fiyatMin || ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, fiyatMin: e.target.value }))
              }
              id="outlined-basic"
              label="min TL"
              variant="outlined"
              size="small"
            />

            <TextField
              value={filters.fiyatMax || ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, fiyatMax: e.target.value }))
              }
              id="outlined-basic"
              label="max TL"
              variant="outlined"
              size="small"
            />
          </div>
        </div>
        <div className="w-full p-3 border bg-gray-100 border-gray-300 mt-1">
          <p className="font-sans font-semibold">Yıl</p>
          <div className="w-full grid grid-cols-2 gap-x-3 mt-2">
            <TextField
              value={filters.aracYiliMin || ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, aracYiliMin: e.target.value }))
              }
              id="outlined-basic"
              label="min"
              variant="outlined"
              size="small"
            />

            <TextField
              value={filters.aracYiliMax || ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, aracYiliMax: e.target.value }))
              }
              id="outlined-basic"
              label="max"
              variant="outlined"
              size="small"
            />
          </div>
        </div>
        <div className="w-full p-3 border bg-gray-100 border-gray-300 mt-1">
          <p className="font-sans font-semibold">Yakıt Tipi</p>
          <div className="flex items-center space-x-2 text-orange-500 text-sm mt-2">
            <input
              type="checkbox"
              id="benzin"
              name="benzin"
              value="Benzin"
              checked={filters.yakit.includes("Benzin")}
              onChange={() => handleMultiSelectChange("yakit", "Benzin")}
            />
            <label className="cursor-pointer" htmlFor="benzin">
              Benzin
            </label>
          </div>
          <div className="flex items-center space-x-2 text-orange-500 text-sm">
            <input
              type="checkbox"
              id="benzin/LPG"
              name="benzin/LPG"
              value="benzin/LPG"
            />
            <label className="cursor-pointer" htmlFor="benzin/LPG">
              Benzin & LPG
            </label>
          </div>
          <div className="flex items-center space-x-2 text-orange-500 text-sm">
            <input
              type="checkbox"
              id="dizel"
              name="dizel"
              value="Dizel"
              checked={filters.yakit.includes("Dizel")}
              onChange={() => handleMultiSelectChange("yakit", "Dizel")}
            />
            <label className="cursor-pointer" htmlFor="dizel">
              Dizel
            </label>
          </div>
          <div className="flex items-center space-x-2 text-orange-500 text-sm">
            <input type="checkbox" id="hibrit" name="hibrit" value="hibrit" />
            <label className="cursor-pointer" htmlFor="hibrit">
              Hibrit
            </label>
          </div>
          <div className="flex items-center space-x-2 text-orange-500 text-sm">
            <input
              type="checkbox"
              id="elektrik"
              name="elektrik"
              value="elektrik"
            />
            <label className="cursor-pointer" htmlFor="elektrik">
              Elektrik
            </label>
          </div>
        </div>
        <div className="w-full border bg-gray-100 border-gray-300 mt-1">
          <Accordion
            style={{ backgroundColor: "transparent" }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<MdOutlineKeyboardArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="font-semibold">Vites</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input
                  type="checkbox"
                  id="manuel"
                  name="manuel"
                  value="Manuel"
                  checked={filters.vites.includes("Manuel")}
                  onChange={() => handleMultiSelectChange("vites", "Manuel")}
                />
                <label className="cursor-pointer" htmlFor="manuel">
                  Manuel
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input
                  type="checkbox"
                  id="otomatik"
                  name="otomatik"
                  value="Otomatik"
                  checked={filters.vites.includes("Otomatik")}
                  onChange={() => handleMultiSelectChange("vites", "Otomatik")}
                />
                <label className="cursor-pointer" htmlFor="otomatik">
                  Otomatik
                </label>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-full border bg-gray-100 border-gray-300 mt-1">
          <Accordion
            style={{ backgroundColor: "transparent" }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<MdOutlineKeyboardArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="font-semibold">KM</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full grid grid-cols-2 gap-x-3 mt-2">
                <TextField
                  value={filters.kmMin || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, kmMin: e.target.value }))
                  }
                  id="outlined-basic"
                  label="min"
                  variant="outlined"
                  size="small"
                />

                <TextField
                  value={filters.kmMax || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, kmMax: e.target.value }))
                  }
                  id="outlined-basic"
                  label="max"
                  variant="outlined"
                  size="small"
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-full border bg-gray-100 border-gray-300 mt-1">
          <Accordion
            style={{ backgroundColor: "transparent" }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<MdOutlineKeyboardArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="font-semibold">Kasa Tipi</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="sedan" name="sedan" value="sedan" />
                <label className="cursor-pointer" htmlFor="sedan">
                  Sedan
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="coupe" name="coupe" value="coupe" />
                <label className="cursor-pointer" htmlFor="coupe">
                  Coupe
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="suv" name="suv" value="suv" />
                <label className="cursor-pointer" htmlFor="suv">
                  SUV
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input
                  type="checkbox"
                  id="pickup"
                  name="pickup"
                  value="pickup"
                />
                <label className="cursor-pointer" htmlFor="pickup">
                  Pickup
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input
                  type="checkbox"
                  id="hatchback"
                  name="hatchback"
                  value="hatchback"
                />
                <label className="cursor-pointer" htmlFor="hatchback">
                  Hatchback
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="mpv" name="mpv" value="mpv" />
                <label className="cursor-pointer" htmlFor="mpv">
                  MPV
                </label>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-full border bg-gray-100 border-gray-300 mt-1">
          <Accordion
            style={{ backgroundColor: "transparent" }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<MdOutlineKeyboardArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="font-semibold">Renk</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="siyah" name="siyah" value="siyah" />
                <label className="cursor-pointer" htmlFor="siyah">
                  Siyah
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="beyaz" name="beyaz" value="beyaz" />
                <label className="cursor-pointer" htmlFor="beyaz">
                  Beyaz
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input
                  type="checkbox"
                  id="kirmizi"
                  name="kirmizi"
                  value="kirmizi"
                />
                <label className="cursor-pointer" htmlFor="kirmizi">
                  Kırmızı
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="gri" name="gri" value="gri" />
                <label className="cursor-pointer" htmlFor="gri">
                  Gri
                </label>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-full border bg-gray-100 border-gray-300 mt-1">
          <Accordion
            style={{ backgroundColor: "transparent" }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<MdOutlineKeyboardArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="font-semibold">Ağır Hasar Kayıtlı</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="evet" name="evet" value="evet" />
                <label className="cursor-pointer" htmlFor="evet">
                  Evet
                </label>
              </div>
              <div className="flex items-center space-x-2 text-orange-500 text-sm">
                <input type="checkbox" id="hayir" name="hayir" value="hayir" />
                <label className="cursor-pointer" htmlFor="hayir">
                  Hayır
                </label>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="w-full border bg-gray-100 border-gray-300 mt-1">
          <Accordion
            style={{ backgroundColor: "transparent" }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<MdOutlineKeyboardArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className="font-semibold">Kimden</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex items-center space-x-1">
                <input
                  type="radio"
                  id="sahibinden"
                  name="fav_language"
                  value="sahibinden"
                />
                <label
                  className="text-orange-500 text-sm cursor-pointer"
                  htmlFor="sahibinden"
                >
                  Sahibinden
                </label>
              </div>

              <div className="flex items-center space-x-1">
                <input
                  type="radio"
                  id="galeri"
                  name="fav_language"
                  value="galeri"
                />
                <label
                  className="text-orange-500 text-sm cursor-pointer"
                  htmlFor="galeri"
                >
                  Galeriden
                </label>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <button
          onClick={applyFilters}
          className="w-full h-12 bg-orange-500 text-white font-semibold mt-5 cursor-pointer hover:bg-orange-600 duration-200 shadow-md"
        >
          Ara
        </button>
      </div>
      <div className="w-full lg:col-span-10 border rounded-xl px-6 py-2 border-gray-300 mt-6 lg:mt-0">
        {isShowCase && (
          <div className="w-full py-3 px-3 mb-2 bg-orange-100">
            <p className="text-lg font-semibold font-sans capitalize">
              {searchParams.get("category")
                ? `Tüm ${searchParams.get("category")} Vitrin İlanları Görüntüleniyor`
                : "Tüm Vitrin İlanları Görüntüleniyor"}
            </p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div>
            {!isShowCase && (
              <p className="text-lg font-semibold font-sans capitalize rounded-full">
                {searchParams.get("category")
                  ? `Tüm ${searchParams.get("category")} İlanları Görüntüleniyor`
                  : "Tüm İlanlar Görüntüleniyor"}
              </p>
            )}
            <p className="text-lg">
              <span className="font-semibold">{data?.totalListings}</span> Araç
              Bulundu
            </p>
          </div>
          <div>
            <Box sx={{ minWidth: 190 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Sıralama</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sıralama"
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <MenuItem selected value="advanced">
                    Gelişmiş Sıralama
                  </MenuItem>
                  <MenuItem value="price_asc">En Düşük Fiyat</MenuItem>
                  <MenuItem value="price_desc">En Yüksek Fiyat</MenuItem>
                  <MenuItem value="date_desc">En Yeni İlanlar</MenuItem>
                  <MenuItem value="km_desc">Km'ye Göre En Yüksek</MenuItem>
                  <MenuItem value="km_asc">Km'ye Göre En Düşük</MenuItem>
                  <MenuItem value="model_asc">
                    Araç Yılına Göre En Düşük
                  </MenuItem>
                  <MenuItem value="model_desc">
                    Araç Yılına Göre En Yüksek
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        {loading && (
          <div className="w-full grid grid-cols-4 gap-x-8 gap-y-5 justify-center items-center mt-5">
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
            <Skeleton width={"100%"} height={380} />
          </div>
        )}
        <div className="w-full py-5 grid grid-cols-1 lg:grid-cols-4 gap-7">
          {data?.listings.map((item, index) => (
            <ListingCard key={index} data={item} />
          ))}
        </div>
        {data?.totalPages > 1 && (
          <div className="w-full flex justify-center mt-10">
            <Stack spacing={2}>
              <Pagination
                count={data.totalPages}
                page={Number(searchParams.get("page")) || 1}
                onChange={handlePageChange}
                color="primary"
                // shape="rounded"
                // size="large"
                sx={{
                  "& .Mui-selected": {
                    bgcolor: "#FF914D !Important",
                    color: "white",
                  },
                }}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
