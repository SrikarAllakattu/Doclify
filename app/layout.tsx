import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "AllMyPDFs – Free Online PDF Tools",
  description:
    "AllMyPDFs helps you merge, split, unlock, and convert PDFs securely online in your browser.",
  verification: {
    google: "elNKj4ENXnX9MloJ9sY3EZTJtZbk-XqzprfTEuLYHIs",
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
