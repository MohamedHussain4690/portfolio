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
  metadataBase: new URL("https://mohamedhussain.dev"),
  openGraph: {
    title: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
    description:
      "AI agents, RAG systems and full-stack products. I ship systems that think.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
    description:
      "AI agents, RAG systems and full-stack products. I ship systems that think.",
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
