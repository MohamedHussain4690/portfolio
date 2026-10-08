'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineReveal } from './TextReveal';

export function About() {
  const specs = [
    { label: 'LOCATION', value: 'Chennai, IN' },
    { label: 'FOCUS', value: 'AI Agents / RAG / Full Stack' },
    { label: 'STATUS', value: 'Building in public' },
    { label: 'CURRENTLY', value: 'Final Year CSE' },
    { label: 'ARCHITECTURE', value: 'Next.js 14 / Python / TypeScript' },
    { label: 'RUNTIME', value: 'Vercel / AWS / Docker' },
  ];

  return (
    <section className="relative py-8 md:py-12 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            002 / SYSTEM.SPECS
          </span>
          <LineReveal
            as="h2"
            delay={0.1}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight"
          >
            SYSTEM
            <br />
            SPECIFICATIONS
          </LineReveal>
        </motion.div>

        {/* Terminal Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          <TerminalSpecs specs={specs} />
        </motion.div>
      </div>
    </section>
  );
}

function TerminalSpecs({ specs }: { specs: Array<{ label: string; value: string }> }) {
  const [visibleLines, setVisibleLines] = useState<Set<number>>(new Set());
  const count = specs.length;

  // Color gradients for each card
  const cardColors = [
    'from-[var(--accent-lime)]/20 to-[var(--accent-lime)]/5',
    'from-[var(--accent-cyan)]/20 to-[var(--accent-cyan)]/5',
    'from-[var(--accent-ice)]/20 to-[var(--accent-ice)]/5',
    'from-[var(--accent-pink)]/20 to-[var(--accent-pink)]/5',
    'from-[var(--accent-orange)]/20 to-[var(--accent-orange)]/5',
    'from-[var(--accent-ice)]/20 to-[var(--accent-ice)]/5',
  ];

  const borderColors = [
    'hover:border-[var(--accent-lime)]',
    'hover:border-[var(--accent-cyan)]',
    'hover:border-[var(--accent-ice)]',
    'hover:border-[var(--accent-pink)]',
    'hover:border-[var(--accent-orange)]',
    'hover:border-[var(--accent-ice)]',
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
      setTimeout(() => {
        setVisibleLines((prev) => {
          const next = new Set(prev);
          next.add(i);
          return next;
        });
      }, 300 + i * 120)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [count]);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] overflow-hidden relative">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-4 font-mono text-xs text-[var(--muted)] px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded">
          SYSTEM_SPECS.TXT
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--accent-lime)]">●</span>
          <span className="font-mono text-xs text-[var(--muted)]">RUNNING</span>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-6 md:p-8 font-mono text-sm leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: visibleLines.has(index) ? 1 : 0, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`group relative p-4 bg-gradient-to-br ${cardColors[index % cardColors.length]} border border-[var(--border)] ${borderColors[index % borderColors.length]} transition-colors duration-300 cursor-pointer`}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[var(--accent-lime)] font-bold">$</span>
                <span className="text-[var(--muted)] uppercase tracking-wider text-xs">{spec.label}</span>
                <span className="text-[var(--accent-lime)]/50">:</span>
              </div>
              <motion.div
                className="ml-7 mt-1 text-[var(--fg)] font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: visibleLines.has(index) ? 1 : 0, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {spec.value}
              </motion.div>

              {/* Glow line on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-[var(--accent-lime)] via-[var(--accent-cyan)] to-[var(--accent-ice)]" />
            </motion.div>
          ))}
        </div>

        {/* Bottom prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 flex items-baseline gap-2 text-[var(--muted)]"
        >
          <span className="text-[var(--accent-lime)]">$</span>
          <span className="font-mono text-sm">_</span>
          <motion.span
            className="ml-1 text-[var(--accent-lime)]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            CURSOR
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}