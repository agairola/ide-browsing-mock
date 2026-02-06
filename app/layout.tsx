import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AI Computer Use - IDE GDPR Compliance Demo",
  description:
    "AI agent detecting GDPR violations in real-time while a user codes in a VS Code-like IDE",
};

export const viewport: Viewport = {
  themeColor: "#151921",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased overflow-hidden">{children}</body>
    </html>
  );
}
