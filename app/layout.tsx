import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - Djarna",
  description:
    "Monitor platform activity, revenue, and performance in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full bg-slate-50 flex flex-col">
        <SidebarProvider>
          <Sidebar />
          <SidebarInset>
            <Header />
            <main className="flex flex-1 flex-col p-4 sm:p-8 bg-gray-100/60">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
