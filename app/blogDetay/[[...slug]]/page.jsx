import React from "react";
import { notFound } from "next/navigation";
import api from "@/app/lib/axios";
import parse from "html-react-parser";

const page = async ({ params }) => {
  const { slug } = params;

  async function getBlog() {
    try {
      const res = await api.get(`/blogs/blog-detay/${slug}`);

      return res.data.data;
    } catch (error) {
      console.error("API Hatası:", error.message);
      throw new Error("API isteği başarısız");
    }
  }

  const blog = await getBlog();

  if (!blog) {
    notFound();
  }

  return (
    <div className="w-full px-5 lg:px-0 lg:container mx-auto py-5">
      <p className="space-x-1 text-xs lg:text-sm">
        <span className="text-orange-500">Home</span>
        <span className="text-orange-500">/</span>
        <span className="text-orange-500">Blog</span>
        <span className="text-orange-500">/</span>
        <span className="text-orange-500 capitalize">{slug[0]}</span>


      </p>
      <h1 className="font-sans text-base lg:text-3xl font-semibold">{blog.title}</h1>
      <div className="mt-10 flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full">
            <img className="w-full h-full rounded-full" src="/admin-pp.png" />
          </div>
          <p className="text-sm text-gray-600">Admin</p>
        </div>
        <p className="text-sm text-gray-600">{blog.category}</p>
        <p className="text-sm text-gray-600">{blog.createdAt}</p>
      </div>
      <div className="w-full h-72 lg:h-[550px] mt-6 ">
        <img
          className="w-full h-full object-cover rounded-2xl shadow-md"
          src={blog.imageUrl}
        />
      </div>

      <div className="w-full mx-auto mt-7 font-sans">
      <div className="w-full overflow-auto text-xs lg:text-base">
        {parse(blog.text)}

      </div>
        <div className="w-full py-3 lg:py-16 mt-10 rounded-2xl border-l-8 border-[#405FF2] bg-[#E9F2FF] text-xs lg:text-base">
          <p className="px-3 lg:px-20">
            Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
            Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.
          </p>
          <p className="font-semibold px-3 lg:px-20 mt-6">Luis Pickford</p>
        </div>
      </div>
    </div>
  );
};

export default page;
