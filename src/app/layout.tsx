import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
  description:
    "Portfolio lab of Mohamed Hussain N. AI agents, RAG systems and full-stack products. I ship systems that think.",
  metadataBase: new URL("https://mohamed-hussain-portfolio.vercel.app"),
  icons: {
    icon: [
      { url: "/icon.png?v=2" },
      { url: "/favicon.ico?v=2" },
    ],
    shortcut: "/icon.png?v=2",
    apple: "/icon.png?v=2",
  },
  openGraph: {
    title: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
    description:
      "Portfolio lab of Mohamed Hussain N. AI agents, RAG systems and full-stack products. I ship systems that think.",
    url: "https://mohamed-hussain-portfolio.vercel.app",
    siteName: "Mohamed Hussain N Portfolio",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
    description:
      "AI agents, RAG systems and full-stack products. I ship systems that think.",
    images: ["/og-image.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[var(--bg)] text-[var(--fg)] font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-[#9C502F] focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-xl focus:outline-none"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
