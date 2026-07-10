import React from "react";

const page = () => {
  return (
    <div className="w-full lg:container mx-auto py-12 px-5 lg:px-20">
      <h1 className="text-3xl font-sans font-semibold">Blog</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="relative">
          <div className="px-5 py-2 text-sm bg-white rounded-full absolute top-5 left-5 shadow-md flex justify-center items-center">
            <p>Sound</p>
          </div>
          <img className="w-full h-60 lg:h-72 rounded-2xl shadow-xl" src="blog-1.png" />
          <div className="flex items-center space-x-7 text-sm mt-3 text-gray-600 font-sans">
            <p>Admin</p>
            <p>8 Haziran 2025</p>
          </div>
          <p className=" mt-2 text-lg font-sans hover:text-blue-600 duration-300 cursor-pointer">
            2024 BMW ALPINA XB7 with exclusive details, extraordinary
          </p>
        </div>
        <div className="relative">
          <div className="px-5 py-2 text-sm bg-white rounded-full absolute top-5 left-5 shadow-md flex justify-center items-center">
            <p>Accessories</p>
          </div>
          <img className="w-full h-60 lg:h-72 rounded-2xl" src="blog-2.png" />
          <div className="flex items-center space-x-7 text-sm mt-3 text-gray-600 font-sans">
            <p>Admin</p>
            <p>8 Haziran 2025</p>
          </div>
          <p className=" mt-2 text-lg font-sans hover:text-blue-600 duration-300 cursor-pointer">
            BMW X6 M50i is designed to exceed your sportiest.
          </p>
        </div>
        <div className="relative">
          <div className="px-5 py-2 text-sm bg-white rounded-full absolute top-5 left-5 shadow-md flex justify-center items-center">
            <p>Exterior</p>
          </div>
          <img className="w-full h-60 lg:h-72 rounded-2xl" src="blog-3.png" />
          <div className="flex items-center space-x-7 text-sm mt-3 text-gray-600 font-sans">
            <p>Admin</p>
            <p>8 Haziran 2025</p>
          </div>
          <p className=" mt-2 text-lg font-sans hover:text-blue-600 duration-300 cursor-pointer">
            BMW X5 Gold 2024 Sport Review: Light on Sport
          </p>
        </div>
        <div className="relative">
          <div className="px-5 py-2 text-sm bg-white rounded-full absolute top-5 left-5 shadow-md flex justify-center items-center">
            <p>Body Kit</p>
          </div>
          <img className="w-full h-60 lg:h-72 rounded-2xl" src="blog-4.png" />
          <div className="flex items-center space-x-7 text-sm mt-3 text-gray-600 font-sans">
            <p>Admin</p>
            <p>8 Haziran 2025</p>
          </div>
          <p className=" mt-2 text-lg font-sans hover:text-blue-600 duration-300 cursor-pointer">
            2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle
          </p>
        </div>
        <div className="relative">
          <div className="px-5 py-2 text-sm bg-white rounded-full absolute top-5 left-5 shadow-md flex justify-center items-center">
            <p>Fuel Systems</p>
          </div>
          <img className="w-full h-60 lg:h-72 rounded-2xl" src="blog-5.png" />
          <div className="flex items-center space-x-7 text-sm mt-3 text-gray-600 font-sans">
            <p>Admin</p>
            <p>8 Haziran 2025</p>
          </div>
          <p className=" mt-2 text-lg font-sans hover:text-blue-600 duration-300 cursor-pointer">
            2024 Audi Hybrid gives up nothing with its optimized
          </p>
        </div>
        <div className="relative">
          <div className="px-5 py-2 text-sm bg-white rounded-full absolute top-5 left-5 shadow-md flex justify-center items-center">
            <p>Oil & Filters</p>
          </div>
          <img className="w-full h-60 lg:h-72 rounded-2xl" src="blog-6.png" />
          <div className="flex items-center space-x-7 text-sm mt-3 text-gray-600 font-sans">
            <p>Admin</p>
            <p>8 Haziran 2025</p>
          </div>
          <p className=" mt-2 text-lg font-sans hover:text-blue-600 duration-300 cursor-pointer">
            2024 BMW X3 M Sport Seats – available as a standalone option
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
