// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import UserFooter from "../component/user/UserFooter";
// import UserHeader from "../component/user/UserHeader";
// import UserSideBar from "../component/user/UserSideBar";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useUser } from "../contexts/UserContext";
// import { useEffect } from "react";

// export default function RootLayout({ children }) {
//   const path = usePathname();
//   const { user, fetchUser } = useUser();
//   const router = useRouter();

//   console.log('user', user);
  

//   useEffect(() => {
//     if (user?.role === "kurumsal") {
//       if (user?.isPayment === false) {
//         router.push("/user/abonelik");
//       }
//     }
//   }, [user]);

//   return (
//     <html lang="en">
//       <body className="bg-gray-100 text-gray-900">
//         <div className="w-full">
//           {path !== "/user/abonelik" && <UserHeader />}

//           {path !== "/user/abonelik" && (
//             <div className="w-full grid grid-cols-12">
//               <div className="col-span-2 h-screen bg-[#050B20] overflow-y-scroll">
//                 <UserSideBar />
//               </div>
//               <div className="col-span-10 h-screen">{children}</div>
//             </div>
//           )}

//           {path === "/user/abonelik" && (
//             <div className="col-span-10 h-screen">{children}</div>
//           )}

//           <UserFooter />
//         </div>
//       </body>
//     </html>
//   );
// }

"use client";
import { usePathname, useRouter } from "next/navigation";
import UserFooter from "../component/user/UserFooter";
import UserHeader from "../component/user/UserHeader";
import UserSideBar from "../component/user/UserSideBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const path = usePathname();
  const { user, fetchUser } = useUser();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log('user', user);

  useEffect(() => {
    if (user?.role === "kurumsal") {
      if (user?.isPayment === false) {
        router.push("/user/abonelik");
      }
    }
  }, [user]);

  // Sayfa değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [path]);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 overflow-x-hidden">
        <div className="w-full min-h-screen flex flex-col justify-between">
          
          {path !== "/user/abonelik" && (
            <UserHeader 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
            />
          )}

          {path !== "/user/abonelik" && (
            <div className="w-full grid grid-cols-12 relative flex-grow">
              
              {/* Mobil Arka Plan Karartması (Sidebar açıkken arkaya tıklanınca kapansın diye) */}
              {isSidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}

              {/* Sidebar: PC'de normal col-span-2, Mobilde soldan açılır çekmece */}
              <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#050B20] overflow-y-auto transition-transform duration-300 transform
                lg:relative lg:translate-x-0 lg:w-auto lg:h-screen lg:col-span-2 lg:z-auto
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              `}>
                <UserSideBar />
              </div>

              {/* İçerik Alanı: PC'de col-span-10, Mobilde tam genişlik */}
              <div className="col-span-12 lg:col-span-10 h-screen overflow-y-auto">
                {children}
              </div>
            </div>
          )}

          {path === "/user/abonelik" && (
            <div className="w-full flex-grow h-screen overflow-y-auto">{children}</div>
          )}

          <UserFooter />
        </div>
      </body>
    </html>
  );
}