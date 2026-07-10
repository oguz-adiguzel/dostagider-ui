import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const UserFooter = () => {
  return (
    <div className="w-full h-28 bg-[#050B20] flex items-center justify-between text-white px-16">
      <div className="text-sm">
        <p>© 2025 Dostagider.com Her hakkı saklıdır.</p>
        <p>© 2025 Oğuz Adıgüzel Her hakkı saklıdır.</p>
      </div>
      <div className="flex items-center space-x-3 text-white text-2xl">
        <FaLinkedin />
        <MdMail />
      </div>
    </div>
  );
};

export default UserFooter;
