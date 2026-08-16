import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Sora, Righteous } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ChatbotFloat } from "@/components/ui/chatbot-float";
import "@/styles/globals.css";
const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
    display: "swap",
});
const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    display: "swap",
});
const dmMono = DM_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-dm-mono",
    display: "swap",
});
const righteous = Righteous({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-righteous",
    display: "swap",
});
export const metadata: Metadata = {
    title: "Solid Wealth | Reimagine money, Simple solutions",
    description: "Next-generation wealth management with secure investing, smart analytics, instant transfers, and premium advisory services.",
};
export default function RootLayout({ children, }: Readonly<{
    children: ReactNode;
}>) {
    return (<html className={`${sora.variable} ${dmSans.variable} ${dmMono.variable} ${righteous.variable}`} lang="en">
      <body className="min-h-screen overflow-x-hidden bg-wealth-bg font-sans text-wealth-primary antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatbotFloat />
      </body>
    </html>);
}
