import React from "react";
import HeroElektrik from "../component/elektrik/HeroElektrik";
import BrandElektrik from "../component/elektrik/BrandElektrik";
import ElectricSection from "../Home/ElectricSection";
import InstitutionalSection from "../Home/InstitutionalSection";
import ShowCase from "../Home/ShowCase";
import InfoColorSection from "../Home/InfoColorSection";
import BlogSection from "../Home/BlogSection";

const page = () => {
  return (
    <div className="w-full">
      <HeroElektrik />
      <BrandElektrik />
      <ElectricSection page={"electric"} />
      <InstitutionalSection page={"electric"} />
      <ShowCase page={"electric"} />
      <div className="w-full py-20 bg-[#0F1843]">
        <InfoColorSection page={'electric'} />
      </div>
      <BlogSection page={"electric"} />
    </div>
  );
};

export default page;
