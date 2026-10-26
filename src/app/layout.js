import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarPage from "./Navbar/navbar";
import ToastViewport from "./components/ToastViewport";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর",
  description: "বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen bg-[#F0F5F0] text-gray-900 antialiased">
        
<NavbarPage></NavbarPage>
      <ToastViewport />
      <main>
          {children}
      </main>
        
        </body>
    </html>
  );
}
