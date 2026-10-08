'use client';

import { motion } from 'framer-motion';

import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-6 flex items-center justify-between backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--border)]">
      {/* Monogram Logo with Pulsing Dot */}
      <a href="#" className="flex items-center gap-2 group">
        <span className="font-mono text-xl font-extrabold tracking-tight text-[var(--fg)] group-hover:text-[var(--accent-lime)] transition-colors">
          MHN.
        </span>
        <motion.span
          className="w-2 h-2 rounded-full bg-[var(--accent-lime)]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          title="AI Thinking..."
        />
      </a>

      {/* Nav items / Status */}
      <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AVAILABLE FOR HIRE
        </span>
        <span>CHENNAI, IN</span>
      </div>

      {/* Quick CTA + Theme Toggle */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <motion.a
          href="#contact"
          className="relative font-mono text-xs uppercase tracking-wider px-4 py-2 bg-gradient-to-r from-[var(--accent-lime)] to-[var(--accent-cyan)] text-[var(--bg)] font-bold overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">LET&apos;S TALK</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[var(--accent-ice)] to-[var(--accent-lime)] opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </div>
    </header>
  );
}