'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export function Hero() {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 800], [0, -120]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" data-canvas="dark" className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 overflow-hidden bg-[var(--bg)] border-b border-[var(--border)]">
      {/* Corner Markers */}
      <div className="absolute bottom-6 left-6 font-mono text-[11px] text-[var(--muted)] select-none">
        13.0827° N, 80.2707° E
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[11px] text-[var(--muted)] select-none">
        MHN_2026
      </div>

      {/* Main Kinetic Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative z-10">

        {/* Left Column: Massive Kinetic Typography & Role */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#9C502F] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#9C502F] animate-pulse" />
              <span>FINAL-YEAR CSE &middot; AI + FULL-STACK BUILDER</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-[var(--foreground)] leading-[0.95]">
              MOHAMED <br />
              <span className="text-[#9C502F]">HUSSAIN</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[var(--muted)] font-mono max-w-2xl leading-relaxed">
              Architecting production-grade MERN web applications, transit ticketing engines, and transformer-based NLP and multimodal RAG pipelines with uncompromising Swiss editorial precision.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-3 pl-6 pr-2 py-3 bg-[var(--foreground)] text-[var(--bg)] hover:bg-[#9C502F] hover:text-white rounded-full text-xs font-mono uppercase tracking-widest transition-colors shadow-lg"
            >
              <span>EXPLORE WORKS</span>
              <span className="w-8 h-8 rounded-full bg-[var(--bg)] text-[var(--foreground)] group-hover:bg-white group-hover:text-[#9C502F] flex items-center justify-center transition-colors">
                <ArrowDownRight className="w-4 h-4" />
              </span>
            </a>

            <a
              href="#contact"
              className="px-6 py-3 border border-[var(--border)] hover:border-[#9C502F] text-[var(--foreground)] rounded-full text-xs font-mono uppercase tracking-widest transition-colors"
            >
              CONTACT ME/
            </a>
          </motion.div>
        </div>

        {/* Right Column: Rotating Dotted Tick-Mark Ring & Portrait / Emblem Apparatus */}
        <div className="lg:col-span-4 flex items-center justify-center relative py-12 z-10">
          {/* Rotating Dotted Ring */}
          <div className="absolute w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-[#5E625F]/40 animate-[spin_40s_linear_infinite] pointer-events-none z-0" />
          <div className="absolute w-72 h-72 sm:w-84 sm:h-84 lg:w-[360px] lg:h-[360px] rounded-full border border-[var(--border)] pointer-events-none z-0" />

          {/* Center Portrait / Graphic Frame */}
          <motion.div
            style={{ y: yTransform }}
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] rounded-full bg-[#1A1A1A] border-2 border-[var(--border)] p-2.5 shadow-2xl relative overflow-hidden flex items-center justify-center group z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9C502F]/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

            <div className="w-full h-full rounded-full overflow-hidden relative border border-white/10 flex items-center justify-center bg-[#111] z-10">
              <Image
                src={portfolioData.personal.avatar || "/profile.png"}
                alt="Mohamed Hussain N"
                fill
                sizes="(max-width: 768px) 320px, 360px"
                className="object-cover object-top grayscale-[20%] contrast-[105%] brightness-[95%] group-hover:grayscale-0 transition-all duration-700 scale-105"
                priority
                loading="eager"
              />
              <div className="absolute inset-0 bg-[#9C502F]/10 mix-blend-overlay pointer-events-none z-20" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 px-3.5 py-1.5 bg-black/85 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-[#ECECEC] uppercase tracking-wider z-30 shadow-lg">
              ONLINE // 2026
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Ticker / Stats Bar */}
      <motion.div
        style={{ opacity: opacityTransform }}
        className="max-w-7xl mx-auto w-full pt-8 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs text-[var(--muted)] uppercase tracking-wider"
      >
        <div>
          <span className="text-[var(--foreground)] font-bold block text-sm">04+</span>
          PRODUCTION PROJECTS
        </div>
        <div>
          <span className="text-[var(--foreground)] font-bold block text-sm">MERN + AI</span>
          FULL-STACK ARCHITECTURE
        </div>
        <div>
          <span className="text-[var(--foreground)] font-bold block text-sm">CHENNAI</span>
          AVAILABLE FOR HIRE
        </div>
        <div>
          <span className="text-[var(--foreground)] font-bold block text-sm">SWISS EDITORIAL</span>
          DESIGN SYSTEM
        </div>
      </motion.div>
    </section>
  );
}
