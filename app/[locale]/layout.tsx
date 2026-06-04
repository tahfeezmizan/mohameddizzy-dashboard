import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "@/Providers/ReduxProivder";
import { Toaster } from "@/components/ui/sonner";

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
        <ReduxProviders>
          {children}
          <Toaster position="top-right" />
        </ReduxProviders>
      </body>
    </html>
  );
}
