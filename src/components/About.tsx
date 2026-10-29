'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

export function About() {
  return (
    <section id="about" data-canvas="light" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#F4F4F4] text-[#0A0A0A] overflow-hidden border-b border-[#E2E2E2]">
      {/* Decorative Edge Radial Ticks (Left & Right) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 opacity-30 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-3 h-px bg-[#0A0A0A]" />
        ))}
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 opacity-30 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-3 h-px bg-[#0A0A0A]" />
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Section Index Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#5E625F]">
            02 / ABOUT/
          </span>
        </motion.div>

        {/* Centered Editorial Manifesto Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.15] text-[#0A0A0A] max-w-4xl"
        >
          HI! I&apos;M {portfolioData.personal.name.toUpperCase()}, A {portfolioData.personal.role.toUpperCase()} FOCUSED ON BUILDING FULL-STACK WEB APPS AND AI-POWERED TOOLS. I SHIP PRODUCTION SYSTEMS THAT THINK.
        </motion.h2>

        {/* Paired Pill + Circle-Arrow Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex items-center gap-3"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 pl-6 pr-2 py-2 bg-[#E2E2E2] hover:bg-[#D4D4D4] text-[#0A0A0A] rounded-full text-xs font-mono uppercase tracking-widest transition-colors shadow-sm"
          >
            <span>MORE ABOUT ME / RESUME</span>
            <span className="w-10 h-10 rounded-full bg-[#0A0A0A] group-hover:bg-[#9C502F] text-white flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
