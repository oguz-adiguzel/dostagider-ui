"use client";
import React, { useState } from "react";
import Login from "../component/login/Login";
import Register from "../component/login/Register";

const page = () => {
  const [comp, setComp] = useState("login");

  return (
    <div className="w-full lg:container mx-auto pb-28 px-5 lg:px-0">
      <div className="w-full lg:w-1/3 mx-auto mt-12">
        <div className="flex items-center text-sm font-sans font-semibold space-x-5 ">
          <button
            onClick={() => setComp("login")}
            className={`cursor-pointer border-b-2 ${comp === 'login' ? 'border-[#405FF2]' : 'border-gray-300' }  pb-3 px-3`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => setComp("register")}
            className={`cursor-pointer border-b-2 ${comp === 'register' ? 'border-[#405FF2]' : 'border-gray-300' }  pb-3 px-3`}
          >
            Kayıt Ol
          </button>
        </div>
        <div className="w-full mt-10">
          {comp === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default page;
