'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

export function OpenToWork() {
  const offerings = [
    '// FULL-STACK ARCHITECTURE (REACT, NEXT.JS 14, NODE.JS, FASTAPI)',
    '// AGENTIC AI & RAG PIPELINES (HUGGING FACE, GEMINI API)',
    '// PRODUCTION DATA STORES (MONGODB, POSTGRESQL, SCRYPT AUTH)',
    '// PERFORMANCE & MICRO-INTERACTIONS (TAILWIND, FRAMER MOTION, LENIS)',
  ];

  return (
    <section id="open-to-work" data-canvas="light" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#F4F4F4] text-[#0A0A0A] overflow-hidden border-b border-[#E2E2E2]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#5E625F]">
            06 / WORK WITH ME/
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
            LOOKING FOR A DEVELOPER <span className="text-[#9C502F]">WHO SHIPS?</span>
          </h2>
        </motion.div>

        {/* 2-Card Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Pitch Card (Col span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-white border border-[#0A0A0A]/10 p-8 md:p-10 flex flex-col justify-between relative shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#5E625F] uppercase tracking-widest mb-6 border-b border-[#0A0A0A]/10 pb-4">
                <span>AVAILABILITY_STATUS</span>
                <span className="text-[#9C502F] font-bold">READY TO HIRE</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#0A0A0A] mb-4">
                ZERO HAND-HOLDING.
                <br />
                PRODUCTION-GRADE EXECUTION.
              </h3>

              <p className="text-sm md:text-base text-[#5E625F] leading-relaxed">
                As a final-year CSE student and practical builder, I bridge the gap between complex AI research and bulletproof full-stack execution. From automated RAG pipelines to high-performance Next.js apps, I deliver complete systems from specification to production.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0A0A0A]/10 flex items-center justify-between font-mono text-[11px] text-[#5E625F] uppercase tracking-wider">
              <span>BASE: {portfolioData.personal.location}</span>
              <span>REMOTE / ON-SITE</span>
            </div>
          </motion.div>

          {/* Right Card: Offerings Matrix & Hire Me CTA (Col span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#1A1A1A] text-[#ECECEC] border border-white/10 p-8 md:p-10 flex flex-col justify-between relative shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#808185] uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                <span>CAPABILITIES & MATRIX</span>
                <span className="flex items-center gap-2 text-[#ECECEC]">
                  <span className="w-2 h-2 rounded-full bg-[#9C502F] animate-pulse" />
                  IMMEDIATE START
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#ECECEC] mb-6">
                FULL-STACK &middot; AI READY
              </h3>

              {/* Offerings Bullet Matrix */}
              <div className="space-y-3.5 mb-8">
                {offerings.map((item, idx) => {
                  const parts = item.split('//');
                  const prefix = '//';
                  const text = parts[1] ? parts[1].trim() : item;
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-[#141414] border border-white/10 font-sans text-xs md:text-sm text-[#ECECEC] font-bold tracking-tight uppercase flex items-center gap-3"
                    >
                      <span className="font-mono text-[#9C502F] font-normal">{prefix}</span>
                      <span>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row: Status Badge & Paired CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="font-mono text-[11px] text-[#808185] uppercase tracking-widest">
                STATUS: AVAILABLE FROM OCTOBER 2026
              </div>

              <a
                href="#contact"
                className="group flex items-center gap-3 pl-6 pr-2 py-2 bg-[#ECECEC] hover:bg-white text-[#0A0A0A] rounded-full text-xs font-mono uppercase tracking-widest transition-colors shadow-md self-start sm:self-auto"
              >
                <span>HIRE ME / LET&apos;S TALK</span>
                <span className="w-10 h-10 rounded-full bg-[#0A0A0A] group-hover:bg-[#9C502F] text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
