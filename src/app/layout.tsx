import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Yaman RedTeam | Offensive Security & Ethical Hacking",
  description:
    "Yaman RedTeam — Offensive Security Specialist, Ethical Hacker, Penetration Tester & Cybersecurity Content Creator. Explore certifications, projects, videos and skills.",
  keywords: [
    "Yaman RedTeam",
    "Ethical Hacker",
    "Penetration Tester",
    "Red Team",
    "Cybersecurity Portfolio",
    "Bug Bounty",
  ],
  openGraph: {
    title: "Yaman RedTeam | Offensive Security & Ethical Hacking",
    description:
      "Offensive Security Specialist, Ethical Hacker, Penetration Tester & Cybersecurity Content Creator.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
