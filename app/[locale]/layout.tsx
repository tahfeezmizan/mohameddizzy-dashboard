import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "@/Providers/ReduxProivder";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
    description: "Monitor platform activity, revenue, and performance in real-time",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${geistMono.variable} h-full antialiased font-sans`}>
            <body className="min-h-full bg-slate-50 flex flex-col">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ReduxProviders>
                        {children}
                        <Toaster position="top-right" />
                    </ReduxProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
