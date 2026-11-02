import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";
import { MobileLayoutProvider } from "@/context/MobileLayoutContext";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { ToastProvider } from "@/components/Toast";
import ToastContainer from "@/components/ui/ToastContainer";
import MobileClassHandler from "@/components/layout/MobileClassHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bloxsurge - MM2 Gaming and Marketplace",
  description: "Bloxsurge is a modern MM2 gaming and marketplace platform for coinflip, jackpot, trading, and more.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="desktop-scale-wrapper">
          <SocketProvider>
            <MobileLayoutProvider>
              <MobileClassHandler />
              {children}
              <MobileBottomNav />
              <ToastProvider />
              <ToastContainer />
            </MobileLayoutProvider>
          </SocketProvider>
        </div>
      </body>
    </html>
  );
}
