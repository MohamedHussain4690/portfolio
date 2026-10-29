'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, SkillCategory } from '@/data/portfolio';

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const categories = portfolioData.skills;
  const currentCategory: SkillCategory = categories[activeIndex] || categories[0];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, categories.length]);

  return (
    <section
      id="skills"
      data-canvas="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] text-[#ECECEC] overflow-hidden border-b border-[var(--border)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#808185]">
              04 / SKILLS/
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#ECECEC]">
              HERE&apos;S WHAT I BRING <span className="text-[#9C502F]">TO THE TABLE</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#808185] uppercase tracking-wider max-w-sm">
            Curated engineering stack across client core, AI orchestration, and production systems. (Hover to pause rotation).
          </p>
        </motion.div>

        {/* Main Split Layout: Skills Grid & Category Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Active Skills Grid & Rotating Central Visual Ring */}
          <div className="lg:col-span-8 bg-[#141414] border border-[var(--border)] p-8 md:p-12 relative min-h-[460px] flex flex-col justify-between">
            {/* Top Counter Bar */}
            <div className="flex items-center justify-between font-mono text-xs text-[#808185] uppercase tracking-widest border-b border-[var(--border)] pb-4 mb-8">
              <span>CATEGORY // {currentCategory.category}</span>
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
              </span>
            </div>

            {/* Middle Section with Rotating Central Ring & Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
              {/* Rotating Central Visual Apparatus (4 cols) */}
              <div className="md:col-span-4 flex items-center justify-center relative py-6">
                <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#5E625F]/40 animate-[spin_30s_linear_infinite] pointer-events-none" />
                <div className="absolute w-36 h-36 rounded-full border border-[#9C502F]/30 animate-[spin_20s_linear_infinite_reverse] pointer-events-none" />
                <div className="w-28 h-28 rounded-full bg-[#1A1A1A] border border-[var(--border)] flex flex-col items-center justify-center text-center p-3 shadow-xl relative z-10">
                  <span className="font-mono text-[10px] text-[#808185] uppercase tracking-widest">DOMAIN</span>
                  <span className="font-mono text-xs font-bold text-[#ECECEC] uppercase mt-1">
                    {currentCategory.category.split('_')[0]}
                  </span>
                </div>
              </div>

              {/* Skills Grid / Tag Matrix (8 cols) */}
              <div className="md:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {currentCategory.skills.map((skill, sIdx) => (
                      <div
                        key={skill.name}
                        className="p-4 bg-[#1A1A1A] border border-[var(--border)] hover:border-[#9C502F] transition-colors flex flex-col justify-between group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[10px] text-[#808185] uppercase tracking-widest">
                            [{String(sIdx + 1).padStart(2, '0')}]
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#0A0A0A] border border-[var(--border)] text-[#9C502F]">
                            {skill.tag}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold uppercase tracking-tight text-[#ECECEC] group-hover:text-white">
                            {skill.name}
                          </h4>
                          <p className="font-mono text-[11px] text-[#808185] mt-0.5">
                            LEVEL: <span className="text-[#ECECEC] font-bold">{skill.level}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Indicator */}
            <div className="pt-6 mt-8 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[#808185] uppercase tracking-widest">
              <span>ROTATING ENGINE ACTIVE</span>
              <span>CLICK CATEGORY ON RIGHT TO SWITCH</span>
            </div>
          </div>

          {/* Right Column: Category Selection Stack (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="font-mono text-xs text-[#808185] uppercase tracking-widest pb-2 border-b border-[var(--border)]">
              <span>SELECT DOMAIN</span>
            </div>

            {categories.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPaused(true);
                  }}
                  className={`w-full text-left px-6 py-4 font-mono text-xs uppercase tracking-wider border transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#141414] border-[#9C502F] text-[#ECECEC] font-bold shadow-lg'
                      : 'bg-[#0A0A0A] border-[var(--border)] text-[#808185] hover:border-[#ECECEC]/40 hover:text-[#ECECEC]'
                  }`}
                >
                  <span>
                    {String(idx + 1).padStart(2, '0')} - {cat.category}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#9C502F]' : 'bg-transparent border border-[#808185]'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
