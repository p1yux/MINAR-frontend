import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbars/navbar";
import Footer from "@/components/custom/navbars/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MINAR - The One Stop Shopping Experience",
  description: "Discover, compare and shop better with MINAR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Navbar />
        <main className="min-h-screen">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
