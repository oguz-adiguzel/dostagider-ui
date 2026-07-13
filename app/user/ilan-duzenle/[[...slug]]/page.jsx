"use client";
import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useParams } from "next/navigation";
import api from "@/app/lib/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useUser } from "@/app/contexts/UserContext";
import { FaCheck, FaUser } from "react-icons/fa";

import dynamic from 'next/dynamic';

// Sunucu tarafında render edilmelerini (SSR) kapatıyoruz:
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const page = () => {
  const params = useParams();
  const { user } = useUser();

  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  const [baslik, setBaslik] = useState();
  const [price, setPrice] = useState();
  const [aciklama, setAciklama] = useState();
  const [memberTeam, setMemberTeam] = useState();
  const [km, setKm] = useState();

  const [priceDisplay, setPriceDisplay] = useState("");
  const [teamList, setTeamList] = useState();
  const [selectTeam, setSelectTeam] = useState();

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      type: "new",
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemove = async (index, url) => {
    // console.log("url", url);
    await deleteImage(url);

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const formatPrice = (value) => {
    if (!value) return "";

    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    // Kullanıcının yazdığı her şeyden SADECE rakamları al
    const rawValue = e.target.value.replace(/\D/g, "");

    // Backend için RAW değer
    setPrice(rawValue);

    // Ekranda görünen formatlı değer
    setPriceDisplay(formatPrice(rawValue));
  };

  const getUpdateData = async () => {
    try {
      const response = await api.get(`/ilan/${params.slug[0]}/edit`);
      setBaslik(response.data.ilan.baslik);
      setAciklama(response.data.ilan.aciklama);
      setKm(response.data.ilan.km);
      setPrice(response.data.ilan.price);
      setMemberTeam(response.data.ilan.memberTeam);
      // setImages(response.data.ilan.gorseller)
      setImages(
        response.data.ilan.gorseller.map((url) => ({
          type: "existing",
          url: url,
        })),
      );
      setLoading(false);
       toast.info(response.data.message, {
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
      // console.log("res", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTeamList = async () => {
    try {
      const response = await api.get(`/corporate/${user.slug}/ekip`);
      setTeamList(response.data.ekip);
      console.log("team res", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const reorderImages = async () => {
    try {
      setLoading(true);
      let url = [];
      images.forEach((item) => {
        url.push(item.url);
      });
      const response = await api.put("/ilan/ilan-gorsel-sirala", {
        ilanNo: params.slug[0],
        yeniSiralama: url,
      });
      getUpdateData();
      setLoading(false);
      toast.info(response.data.message, {
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
      console.log("error", error);
    }
  };

  const addImage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("ilanNo", params.slug[0]);

      images
        .filter((img) => img.type === "new")
        .forEach((img) => {
          formData.append("yeniGorseller", img.file);
        });

      const response = await api.put("/ilan/ilan-gorsel-ekle", formData);
      toast.info(response.data.message);
      getUpdateData();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteImage = async (url) => {
    try {
      setLoading(true);
      const response = await api.put("/ilan/ilan-gorsel-sil", {
        ilanNo: params.slug[0],
        gorselUrl: url,
      });
      toast.info(response.data.message);
      getUpdateData();
      console.log("res", response);
      loading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateListing = async () => {
    try {
      setLoading(true);
      const response = await api.put("/ilan/ilan-guncelle", {
        ilanNo: params.slug[0],
        baslik,
        price,
        km,
        aciklama,
        memberTeam,
      });
      toast.info(response.data.message);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUpdateData();
  }, []);

  useEffect(() => {
    getTeamList();
  }, [user]);

  if (loading)
    return (
      <>
      <ToastContainer />
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
        </div>
      </>
    );

  function SortableImage({ image, index, handleRemove }) {
    const { setNodeRef, attributes, listeners, transform, transition } =
      useSortable({ id: index });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="relative w-full h-28 sm:h-32 md:h-36 group"
      >
        <ToastContainer />
        {/* DELETE BUTTON */}
        <div className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 duration-200 z-20 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(index, image.url);
            }}
            className="bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xs pointer-events-auto"
          >
            ✕
          </button>
        </div>

        {/* DRAG HANDLE */}
        <img
          {...listeners}
          src={image.url}
          alt="preview"
          className="w-full h-full object-contain rounded-lg shadow bg-white cursor-grab active:cursor-grabbing"
        />

        {index === 0 && (
          <span className="absolute bottom-1 left-1 text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded z-30">
            Kapak
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full py-5 px-14 font-sans overflow-y-scroll relative">
      <ToastContainer />
      <h2 className="text-2xl font-semibold">İlan Düzenle</h2>
      <div className="w-full py-5 border border-gray-300 mt-10 rounded-2xl px-6 font-sans">
        <p className="font-semibold">İlan Genel Bakış</p>
        <div className="w-full grid grid-cols-4 gap-5 mt-5 text-sm">
          <div>
            <p className="font-semibold">İlan Başlığı</p>
            <input
              className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
              type="text"
              name="baslik"
              onChange={(e) => setBaslik(e.target.value)}
              value={baslik}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-5">
            <div>
              <p className="font-semibold">Araç KM</p>
              <input
                className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
                name="km"
                type="text"
                onChange={(e) => setKm(e.target.value)}
                value={km}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5">
            <div>
              <p className="font-semibold">Ağır Hasar Kayıtlı</p>
              <select
                // onChange={handleChangeForm}
                name="agirHasarKaydi"
                className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
              >
                <option>Seçim Yapın</option>
                <option value={true}>Evet</option>
                <option value={false}>Hayır</option>
              </select>
            </div>
            <div>
              <p className="font-semibold">Takas</p>
              <select
                // onChange={handleChangeForm}
                name="takas"
                className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
              >
                <option>Seçim Yapın</option>
                <option value={true}>Evet</option>
                <option value={false}>Hayır</option>
              </select>
            </div>
          </div>
          <div>
            <p className="font-semibold">Fiyat</p>

            <input
              className="w-full border border-gray-400 outline-0 py-2 mt-1 px-2 rounded-2xl"
              type="text"
              value={priceDisplay}
              onChange={handlePriceChange}
              inputMode="numeric"
              placeholder="Örn: 1.200.000"
            />
          </div>
        </div>
      </div>
      <div className="w-full py-5 border border-gray-300 mt-10 rounded-2xl px-6 font-sans">
        <p className="font-semibold">Açıklama</p>
        <ReactQuill
          theme="snow"
          value={aciklama}
          // onChange={handleAciklamaChange}
          className="mt-2"
        />
      </div>

      <div className="w-full py-5 border border-gray-300 mt-10 rounded-2xl px-6 font-sans">
        <div className="flex items-center space-x-2">
          <p className="font-semibold">Medya</p>
          <p className="text-xs text-gray-500">
            Sürükleyerek sıralama yapabilirsiniz. Gönderilen sıra ile
            yayınlanacaktır
          </p>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            setImages((prev) => arrayMove(prev, active.id, over.id));
          }}
        >
          <SortableContext
            items={images?.map((_, index) => index)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
              {images.map((image, index) => (
                <SortableImage
                  key={index}
                  image={image}
                  index={index}
                  handleRemove={handleRemove}
                />
              ))}

              {/* Ekleme */}
              <label className="w-full h-28 sm:h-32 md:h-36 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <span className="text-gray-500 text-sm">Ekle</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </SortableContext>
        </DndContext>
        <div className="w-full mt-5 grid grid-cols-2 gap-x-10">
          <button
            onClick={() => addImage()}
            className="w-full py-2 bg-blue-400 text-white rounded-full text-sm cursor-pointer hover:bg-blue-500 duration-300"
          >
            Ekle
          </button>
          <button
            onClick={() => reorderImages()}
            className="w-full py-2 bg-orange-400 text-white rounded-full text-sm cursor-pointer hover:bg-orange-500 duration-300"
          >
            Sırala
          </button>
        </div>
      </div>

      {user?.role === "kurumsal" && (
        <div className="w-full py-5 border border-gray-300 mt-10 rounded-2xl px-6 font-sans">
          <p className="font-semibold">Ekip Üyesi Seçimi</p>
          <p className="text-sm text-gray-400">
            Seçilen üyenin iletişim bilgileri ilanda belirtilir
          </p>
          <div className="grid grid-cols-3 gap-8 mt-3">
            {teamList?.map((item, index) => (
              <div key={index} className="px-5 py-2 border border-gray-400 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-24 h-24 bg-gray-100 flex justify-center items-center">
                      {item.fotoUrl ? (
                        <img
                          className="w-full h-full object-contain"
                          src={item.fotoUrl}
                        />
                      ) : (
                        <FaUser size={40} color="gray" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {item.ad} {item.soyad}
                      </p>
                      <p className="text-sm text-gray-500">{item.gorev}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mt-3">
                    <div
                      onClick={() => setMemberTeam(item._id)}
                      className={`w-11 h-11 ${
                        memberTeam === item._id ? "bg-green-200" : "bg-blue-100"
                      } rounded-full flex items-center justify-center cursor-pointer hover:shadow-2xl duration-300`}
                    >
                      <FaCheck size={22} color="blue" />
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 mt-2 py-3">
                  <p className="text-center text-orange-400 font-semibold">
                    {item.telefon}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className=" w-1/2 mx-auto mt-10">
        <button
          onClick={() => updateListing()}
          className="w-full py-2 rounded-full text-white bg-orange-400 cursor-pointer"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default page;
