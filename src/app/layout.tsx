import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { siteIdentity } from "@/data/siteContent";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: siteIdentity.siteTitle,
  description: siteIdentity.siteDescription
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
