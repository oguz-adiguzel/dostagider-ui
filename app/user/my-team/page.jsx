"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import api from "@/app/lib/axios";
import { useUser } from "@/app/contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const page = () => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [surName, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const { user, fetchUser } = useUser();
  const [teamList, setTeamList] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTeamList = async () => {
    try {
      const response = await api.get(`/corporate/${user.slug}/ekip`);
      setLoading(false)
      setTeamList(response.data.ekip);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addTeam = async () => {
    try {
      setLoading(true)
      const form = new FormData();
      form.append("ad", name);
      form.append("soyad", surName);
      form.append("gorev", title);
      form.append("telefon", phone);
      // Logo eklendiyse ekle
      if (photo) {
        form.append("foto", photo);
      }
      const response = await api.post(`/corporate/${user.slug}/ekip`, form);
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
      getTeamList();
      handleClose();
      await fetchUser()
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
    }
  };

  const deleteTeam = async (id) => {
    try {
      setLoading(true)
      const response = await api.delete(`/corporate/${user.slug}/ekip/${id}`);
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
      getTeamList()
      await fetchUser()
      setLoading(false)
    } catch (error) {
      console.log("error", error);
      setLoading(false)
      toast.error("Bir şeyler ters gitti", {
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

  useEffect(() => {
    getTeamList();
  }, [user]);
  
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img className="w-32 h-32 animate-spin" src="/rim-loading.svg" />
      </div>
    );

  return (
    <div className="w-full p-10">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold">Ekip Yönetimi</p>
          <p className="text-sm text-gray-500">
            Satış ekibinizin bilgilerini paylaşıp iletişiminizi
            arttırabilirsiniz
          </p>
          <p className="text-sm text-gray-500">
            Paylaştığınız bilgiler{" "}
            <span className="text-orange-400">dostagider.com</span> galeri
            sayfanızda paylaşılacaktır
          </p>
        </div>
        <button
          onClick={() => handleClickOpen()}
          className="text-sm px-4 py-2 bg-blue-500 text-white shadow-2xl cursor-pointer hover:bg-orange-400 duration-300"
        >
          Ekip Üyesi Ekle
        </button>
      </div>
      <div className="w-1/3 p-5 border border-gray-300 rounded-2xl shadow-sm shadow-orange-500 mt-10 ">
        <div className="flex items-start space-x-3">
          <div className="w-28 h-28 border border-gray-200 rounded-2xl">
            <img className="w-full h-full object-contain" src={user?.logoUrl} />
          </div>
          <div>
            <p className="text-lg font-semibold">{user?.galeriAdi}</p>
            <p className="font-semibold text-gray-600 mt-1 text-sm">
              Yetkili Adı
            </p>
            <p className="text-xs text-gray-400">{user?.yetkiliAdi}</p>
            <p className="font-semibold text-gray-600 mt-1 text-sm">
              Yetkili Soyadı
            </p>
            <p className="text-xs text-gray-400">{user?.yetkiliSoyadi}</p>
          </div>
        </div>
      </div>
      <p className="mt-12 text-xl font-semibold text-orange-400">
        Kayıtlı Ekip Üyeleriniz
      </p>
      <div className="grid grid-cols-3 gap-8 mt-12">
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
                <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:shadow-2xl duration-300">
                  <MdOutlineEdit size={22} color="blue" />
                </div>
                <div onClick={()=> deleteTeam(item._id)} className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center cursor-pointer hover:shadow-2xl duration-300">
                  <MdDeleteOutline size={22} color="red" />
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

      <React.Fragment>
        <Dialog
          open={open}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Yeni Ekip Üyesi Ekle"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className="w-full">
                <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
                  <div>
                    <label className="text-sm font-semibold">İsim</label>
                    <input
                      className="w-full py-2 border border-gray-300 rounded-lg outline-0 px-5"
                      type="text"
                      value={name ? name : ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Soyisim</label>
                    <input
                      className="w-full py-2 border border-gray-300 rounded-lg outline-0 px-5"
                      type="text"
                      value={surName ? surName : ""}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-10 mt-5">
                  <div>
                    <label className="text-sm font-semibold">Görev</label>
                    <select
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full py-2 border border-gray-300 rounded-lg outline-0 px-2"
                    >
                      <option>Seçim Yapınız</option>
                      <option value="Yetkili">Yetkili</option>
                      <option value="Satış Danışmanı">Satış Danışmanı</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Telefon</label>
                    <input
                      className="w-full py-2 border border-gray-300 rounded-lg outline-0 px-5"
                      type="text"
                      value={phone ? phone : ""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full mt-5">
                  <label className="text-sm font-semibold">Fotoğraf</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="w-full py-2 border border-gray-300 rounded-lg outline-0 px-5 cursor-pointer"
                  />
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>İptal</Button>
            <Button
              onClick={() => {
                addTeam();
              }}
            >
              Ekle
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default page;
