import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased bg-[var(--bg)] text-[var(--fg)]">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
