"use client";
import { usePathname, useRouter } from "next/navigation";
import UserFooter from "../component/user/UserFooter";
import UserHeader from "../component/user/UserHeader";
import UserSideBar from "../component/user/UserSideBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const path = usePathname();
  const { user, fetchUser } = useUser();
  const router = useRouter();

  console.log('user', user);
  

  useEffect(() => {
    if (user?.role === "kurumsal") {
      if (user?.isPayment === false) {
        router.push("/user/abonelik");
      }
    }
  }, [user]);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="w-full">
          {path !== "/user/abonelik" && <UserHeader />}

          {path !== "/user/abonelik" && (
            <div className="w-full grid grid-cols-12">
              <div className="col-span-2 h-screen bg-[#050B20] overflow-y-scroll">
                <UserSideBar />
              </div>
              <div className="col-span-10 h-screen">{children}</div>
            </div>
          )}

          {path === "/user/abonelik" && (
            <div className="col-span-10 h-screen">{children}</div>
          )}

          <UserFooter />
        </div>
      </body>
    </html>
  );
}


// export default function RootLayout({ children }) {
//   const path = usePathname();
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (user?.role === "kurumsal") {
//       if (user?.isPayment === false) {
//         router.push("/user/abonelik");
//       }
//     }
//   }, [user]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900 overflow-hidden">
        
//         {/* HEADER */}
//         {path !== "/user/abonelik" && <UserHeader />}

//         {/* CONTENT */}
//         <div className="flex flex-1 overflow-hidden">
          
//           {path !== "/user/abonelik" && (
//             <div className="w-1/6 bg-[#050B20] overflow-y-auto">
//               <UserSideBar />
//             </div>
//           )}

//           {/* 🔥 SADECE BURASI SCROLL */}
//           <div className="flex-1 overflow-y-auto">
//             {children}
//           </div>
//         </div>

//         {/* FOOTER */}
//         <UserFooter />

//       </body>
//     </html>
//   );
// }