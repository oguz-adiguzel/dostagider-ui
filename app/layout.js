"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import MobileHeader from "./component/MobileHeader";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { UserProvider } from "./contexts/UserContext";
import { MessageProvider } from "./contexts/MessageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Dostagider.com | Türkiye'nin 0 Km ve İkinci El Araç Platformu",
//   description: "Dostagider.com sıfır ve ikinci el araç ilan platformu",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isUserPage = pathname.includes("/user");
  return (
    <html lang="en">
      <title>Dostagider.com | Türkiye'nin 0 Km ve İkinci El Araç Platformu</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <UserProvider>
        {isUserPage === false && (
          <div className="hidden lg:block">
            <Header />
          </div>
        )}

        {isUserPage === false && (
          <div className="block lg:hidden">
            <MobileHeader />
          </div>
        )}
         <MessageProvider>

        {children}
        </MessageProvider>

        {isUserPage === false && <Footer />}
        </UserProvider>
       
      </body>
    </html>
  );
}
