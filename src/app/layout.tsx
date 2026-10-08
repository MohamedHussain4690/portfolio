import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { TimelineRail } from "@/components/TimelineRail";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "MOHAMED HUSSAIN N — AI + Full Stack Developer",
  description:
    "Portfolio lab of Mohamed Hussain N. AI agents, RAG systems and full-stack products. I ship systems that think.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('mhn-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased bg-[var(--bg)] text-[var(--fg)]">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <TimelineRail />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
