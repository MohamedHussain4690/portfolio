'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

export function Journey() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const marqueeText = ' / MY JOURNEY // MILESTONES // EDUCATION & EXPERIENCE //';

  return (
    <section id="journey" data-canvas="dark" className="relative py-24 md:py-32 bg-[#0A0A0A] text-[#ECECEC] overflow-hidden border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#808185]">
          05 / JOURNEY/
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#ECECEC]">
          ACADEMIC MILESTONES & <span className="text-[#9C502F]">EXPERIENCE</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden border-y border-[var(--border)] py-8 bg-[#141414] mb-16 select-none pointer-events-none">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-zinc-800/60 font-extrabold uppercase tracking-tighter text-7xl md:text-9xl px-8 select-none"
            >
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioData.journey.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.id}
                style={{ y: isEven ? y1 : y2 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`bg-[#1A1A1A] border border-[var(--border)] p-8 md:p-10 flex flex-col justify-between relative group hover:border-[#9C502F] transition-colors shadow-2xl ${
                  isEven ? 'md:-translate-y-4' : 'md:translate-y-8'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs text-[#808185] uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#9C502F] font-bold">SL</span>
                    <span className="text-[#ECECEC] font-bold">{item.category}</span>
                  </div>
                  <span>{item.period}</span>
                </div>

                <div className="space-y-3 my-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#ECECEC] group-hover:text-white">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#141414] border border-[var(--border)] text-[#808185] shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#808185] uppercase tracking-wider">
                    {item.organization}
                  </p>
                  <p className="text-sm md:text-base text-[#B6B6B6] group-hover:text-[#ECECEC] transition-colors leading-relaxed pt-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[#808185]">
                  <span>MILESTONE #{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[#9C502F]">VERIFIED RECORD</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
