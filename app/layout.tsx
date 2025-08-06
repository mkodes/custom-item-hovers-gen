import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Item Hovers Gen",
  description: "Created by MKodes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <header className="bg-zinc-200 h-fit flex flex-col text-gray-800 p-2">
          <h1 className="text-2xl text-center">Custom Items Hovers Generator</h1>
        </header>
        <main className="bg-zinc-400 flex flex-col grow text-gray-800 p-2">
          {children}
        </main>
        <footer className="bg-zinc-600 h-fit flex flex-col text-gray-800 p-2">
          <p className="text-right">&#169; MKodes</p>
        </footer>
      </body>
    </html>
  );
}
