"use client";
import ListingCard from "@/app/component/ListingCard";
import ProductPrice from "@/app/component/ProductPrice";
import api from "@/app/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiBackwardTime } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(true);

  const [favList, setFavList] = useState();

  const router = useRouter();

  const getMyListing = async () => {
    try {
      const res = await api.get("/ilan/favorites");
      setFavList(res.data);
      setLoading(false);
    } catch (error) {
      console.log("user error", error);
    }
  };

  const removeFav = async (id) => {
    try {
      const res = await api.post("/users/remove-favorite", {
        listingId: id,
      });
      getMyListing();
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
      console.log("user error", error);
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

  const formattedDate = (listingDate) => {
    const date = new Date(listingDate);
    const format = date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return format;
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      getMyListing();
    }
  }, [router]);

  const getFavoritePriceDrop = (favorite) => {
    const favoriteDate = new Date(favorite.addedAt);

    const history = [...(favorite.ilan.priceHistory || [])].sort(
      (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    );

    if (!history.length) {
      return null;
    }

    // Favoriye eklendiği andaki fiyatı bul
    let favoritePrice = null;

    for (const item of history) {
      if (new Date(item.updatedAt) <= favoriteDate) {
        favoritePrice = Number(item.price);
      } else {
        break;
      }
    }

    // History'de bulunamazsa mevcut fiyatı kullan
    if (!favoritePrice) {
      favoritePrice = Number(history[0].price);
    }

    const currentPrice = Number(favorite.ilan.price);

    const difference = favoritePrice - currentPrice;

    return {
      favoritePrice,
      currentPrice,
      difference,
      hasDrop: difference > 0,
    };
  };

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
      </div>
    );

  console.log("====================================");
  console.log("fav list", favList);
  console.log("====================================");

  return (
    <div className="w-full h-full py-10 px-14 font-sans overflow-y-scroll">
      <ToastContainer />
      <h2 className="text-3xl font-semibold">Favori İlanlarım</h2>
      <p className="mb-5 text-base text-orange-400">
        <span className="font-bold text-orange-500">{favList?.count}</span> İlan
        Listeleniyor
      </p>
      <div className="w-full mt-10 border border-gray-300 rounded-2xl py-10 grid grid-cols-1 gap-5 px-56">
        {favList?.favoriler.map((item, index) => {
          const priceInfo = getFavoritePriceDrop(item);

          console.log("price info", priceInfo);

          return (
            <div className="border border-gray-300 rounded-2xl hover:shadow-2xl duration-200 px-5 pt-8 pb-4 grid grid-cols-5 gap-x-6 pr-20 relative group">
              <div onClick={()=>removeFav(item.ilan._id)} className="text-sm absolute top-2 right-2 flex items-center cursor-pointer space-x-1 opacity-0 group-hover:opacity-100 duration-200">
                <MdFavorite color="red" />
                <p className="text-gray-400">Favorilerimden Çıkar</p>
              </div>

              <div className="w-full h-28 flex items-center justify-center object-contain border border-gray-300">
                <img
                  className="w-40 h-28 object-contain cursor-pointer"
                  src={item.ilan.gorseller[0]}
                />
              </div>
              <div className="py-4 col-span-2">
                <p className="text-orange-500 text-base font-semibold cursor-pointer">
                  {item.ilan.baslik}
                </p>
                <p className="capitalize text-sm mt-4 text-gray-500">
                  {item.ilan.category} / {item.ilan.brand} / {item.ilan.model}
                </p>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center text-xs text-gray-600">
                <p>Favoriye Ekleme Tarihi</p>
                <p>{formattedDate(item.addedAt)}</p>
              </div>
              <div className=" col-span-1 flex flex-col items-center justify-center text-lg font-semibold">
                {/* <div className="flex items-center space-x-0.5">
                  <GiBackwardTime size={20} />
                  <p className="text-red-500 text-sm">
                    <ProductPrice price={priceInfo.favoritePrice} locale="tr" />
                  </p>
                </div> */}
                {priceInfo && priceInfo.hasDrop && (
                  <div className="flex items-center space-x-1">
                    <GiBackwardTime size={20} />

                    <p className="text-red-500 text-sm">
                      <ProductPrice
                        price={priceInfo.favoritePrice}
                        locale="tr"
                      />
                    </p>
                  </div>
                )}

                <p>
                  <ProductPrice price={item.ilan.price} locale={"tr"} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
