import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfigProvider from "./context/ConfigContext";
import FavoritosProvider from "./context/FavoritosContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fraseando",
  description: "Gerador de frases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[url('/paisagem.jpg')] bg-cover bg-center bg-no-repeat">
      <FavoritosProvider>
      <ConfigProvider>
        <Header />
        {children}
        <Footer />
      </ConfigProvider>
      </FavoritosProvider>
      </body>
    </html>
  );
}
