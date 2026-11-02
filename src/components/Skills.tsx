'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, SkillCategory } from '@/data/portfolio';
import { LayoutGrid, Layers } from 'lucide-react';

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'focused' | 'all'>('focused');
  const [isPaused, setIsPaused] = useState(false);

  const categories = portfolioData.skills;
  const currentCategory: SkillCategory = categories[activeIndex] || categories[0];

  // Flat list of all skills for the quick-scan index tape
  const allSkills = categories.flatMap((cat) => cat.skills);

  useEffect(() => {
    if (isPaused || viewMode === 'all') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, viewMode, categories.length]);

  return (
    <section
      id="skills"
      data-canvas="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] text-[#ECECEC] overflow-hidden border-b border-[var(--border)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Mode Switcher */}
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

          {/* Quick View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="font-mono text-xs text-[#808185] uppercase tracking-wider max-w-xs hidden xl:block">
              Curated engineering stack across client core, AI orchestration, and production systems.
            </p>
            <div className="inline-flex p-1 bg-[#141414] border border-[var(--border)] font-mono text-[11px] uppercase tracking-wider">
              <button
                type="button"
                onClick={() => {
                  setViewMode('focused');
                  setIsPaused(false);
                }}
                className={`px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'focused'
                    ? 'bg-[#1F140E] border border-[#9C502F]/50 text-[#ECECEC] font-bold shadow-sm'
                    : 'text-[#808185] hover:text-[#ECECEC]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#9C502F]" />
                <span>ROTATING FOCUS</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('all');
                  setIsPaused(true);
                }}
                className={`px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-[#1F140E] border border-[#9C502F]/50 text-[#ECECEC] font-bold shadow-sm'
                    : 'text-[#808185] hover:text-[#ECECEC]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#9C502F]" />
                <span>VIEW ALL (12)</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Split Layout: Skills Grid & Category Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Skills Grid or Full 12-Skill Matrix */}
          <div className="lg:col-span-8 bg-[#141414] border border-[var(--border)] p-6 md:p-10 relative min-h-[480px] flex flex-col justify-between">
            {/* Top Counter Bar */}
            <div className="flex items-center justify-between font-mono text-xs text-[#808185] uppercase tracking-widest border-b border-[var(--border)] pb-4 mb-6">
              <span>
                {viewMode === 'all' ? 'COMPLETE MATRIX // ALL 12 COMPETENCIES' : `CATEGORY // ${currentCategory.category}`}
              </span>
              <span>
                {viewMode === 'all'
                  ? '03 / 03 DOMAINS'
                  : `${String(activeIndex + 1).padStart(2, '0')} / ${String(categories.length).padStart(2, '0')}`}
              </span>
            </div>

            {/* Content Switcher: Focused View vs Full Grid View */}
            <AnimatePresence mode="wait">
              {viewMode === 'all' ? (
                /* FULL MATRIX VIEW: All 3 domains side-by-side */
                <motion.div
                  key="all-matrix"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6 my-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((cat, cIdx) => (
                      <div
                        key={cat.category}
                        className="p-4 bg-[#111111] border border-[var(--border)] flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                          <span className="font-mono text-[10px] text-[#9C502F] uppercase tracking-wider font-bold">
                            [{String(cIdx + 1).padStart(2, '0')}] {cat.category.split('_')[0]}
                          </span>
                          <span className="font-mono text-[9px] text-[#808185]">
                            {cat.skills.length} TOOLS
                          </span>
                        </div>
                        <div className="space-y-2">
                          {cat.skills.map((s) => (
                            <div
                              key={s.name}
                              className="p-2.5 bg-[#181818] border border-[var(--border)]/60 hover:border-[#9C502F] transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] font-bold text-[#ECECEC]">
                                  {s.name}
                                </span>
                                <span className="font-mono text-[8px] px-1 py-0.5 bg-[#0A0A0A] text-[#9C502F] uppercase">
                                  {s.level}
                                </span>
                              </div>
                              <div className="font-mono text-[9px] text-[#808185] mt-1">
                                TAG // {s.tag}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* FOCUSED ROTATING APPARATUS VIEW */
                <motion.div
                  key={`focused-${activeIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto"
                >
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

                  {/* Active Domain Skills Grid (8 cols) */}
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Indicator */}
            <div className="pt-4 mt-6 border-t border-[var(--border)] flex items-center justify-between font-mono text-[10px] text-[#808185] uppercase tracking-widest">
              <span>
                {viewMode === 'all'
                  ? 'FULL STACK COVERAGE · 100% VISIBLE'
                  : isPaused
                  ? 'ROTATION PAUSED (HOVERING)'
                  : 'ROTATING ENGINE ACTIVE (4S)'}
              </span>
              <span>
                {viewMode === 'all' ? 'CLICK A DOMAIN ON RIGHT TO FOCUS' : 'SELECT DOMAIN OR SWITCH TO GRID VIEW'}
              </span>
            </div>
          </div>

          {/* Right Column: Category Selection Stack (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <div className="font-mono text-xs text-[#808185] uppercase tracking-widest pb-2 border-b border-[var(--border)] flex items-center justify-between">
              <span>SELECT DOMAIN</span>
              <span className="text-[#9C502F] font-bold">
                {viewMode === 'all' ? 'ALL' : `D-0${activeIndex + 1}`}
              </span>
            </div>

            {/* Quick Option: Show All */}
            <button
              type="button"
              onClick={() => {
                setViewMode('all');
                setIsPaused(true);
              }}
              className={`w-full text-left px-5 py-3.5 font-mono text-xs uppercase tracking-wider border transition-all flex items-center justify-between cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-[#18120D] border-[#9C502F] text-[#ECECEC] font-bold shadow-lg'
                  : 'bg-[#0A0A0A] border-[var(--border)] text-[#808185] hover:border-[#ECECEC]/40 hover:text-[#ECECEC]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-[#9C502F]">[00]</span> ALL_DOMAINS (12 SKILLS)
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  viewMode === 'all' ? 'bg-[#9C502F]' : 'bg-transparent border border-[#808185]'
                }`}
              />
            </button>

            {/* Domain buttons */}
            {categories.map((cat, idx) => {
              const isActive = viewMode === 'focused' && idx === activeIndex;
              return (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => {
                    setViewMode('focused');
                    setActiveIndex(idx);
                    setIsPaused(true);
                  }}
                  className={`w-full text-left p-4 font-mono text-xs uppercase tracking-wider border transition-all flex flex-col gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#18120D] border-[#9C502F] text-[#ECECEC] font-bold shadow-lg ring-1 ring-[#9C502F]/30'
                      : 'bg-[#0A0A0A] border-[var(--border)] text-[#808185] hover:border-[#ECECEC]/40 hover:text-[#ECECEC]'
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className={isActive ? 'text-[#9C502F]' : 'text-[#808185]'}>[{String(idx + 1).padStart(2, '0')}]</span>
                      <span>{cat.category}</span>
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-[#9C502F]' : 'bg-transparent border border-[#808185]'
                      }`}
                    />
                  </div>
                  {/* Micro list of tools for 2-second recruiter scanning */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className={`text-[9px] px-2 py-0.5 border ${
                          isActive
                            ? 'bg-[#22160F] border-[#9C502F]/40 text-[#E09A7A]'
                            : 'bg-[#141414] border-[var(--border)] text-[#808185]'
                        }`}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick-Scan All-Skills Tape (Instant 2-Second Recruiter Read) */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[11px] text-[#808185] uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#9C502F] font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#9C502F] animate-pulse" />
            <span>FULL TECH MATRIX AT A GLANCE:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[#ECECEC]">
            {allSkills.map((s) => (
              <span
                key={s.name}
                className="px-2.5 py-1 bg-[#141414] border border-[var(--border)] hover:border-[#9C502F] transition-colors select-none text-[10px]"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
