'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const STOPS = [
  { id: 'hero', label: '001' },
  { id: 'about', label: '002' },
  { id: 'work', label: '003' },
  { id: 'stack', label: '004' },
  { id: 'philosophy', label: '005' },
  { id: 'contact', label: '006' },
];

export function TimelineRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--muted)] [writing-mode:vertical-rl] rotate-180">
        TIMELINE
      </span>
      <div className="relative w-px h-64 bg-[var(--border)]">
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--accent-lime)] to-[var(--accent-ice)]"
          style={{ scaleY }}
        />
        <div className="absolute inset-0 flex flex-col justify-between py-0">
          {STOPS.map((s) => (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              title={s.label}
              className="w-2 h-2 -ml-[3.5px] rounded-full bg-[var(--border-hover)] hover:bg-[var(--accent-lime)] transition-colors"
            />
          ))}
        </div>
      </div>
      <span className="font-mono text-[10px] text-[var(--accent-lime)]">EXP.01</span>
    </div>
  );
}
