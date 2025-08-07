import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes'
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Custom Item Hovers Gen</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <header className="h-fit p-2 flex flex-col">
            <h1 className="text-2xl text-center">Custom Items Hovers Generator</h1>
          </header>
          <div className="flex flex-col grow p-2">
            {children}
          </div>
          <footer className="h-fit p-2 flex flex-col">
            <p className="text-right">&#169; MKodes</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
