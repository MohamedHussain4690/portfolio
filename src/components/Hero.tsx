'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const codeLines = [
  'const developer = {',
  "  name: 'MOHAMED',",
  "  role: 'AI + FULL STACK',",
  "  building: 'AI Products',",
  "  stack: ['Next.js', 'Python', 'LangChain'],",
  "  status: 'Shipping systems that think',",
  '};',
  '',
  'await deploy(developer);',
];

export function Hero() {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 800], [0, -150]);
  const opacityTransform = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:pl-24 lg:pr-16 pt-28 md:pt-24 pb-8 overflow-hidden">
      {/* Left Side - Kinetic Typography (60%) */}
      <div className="relative w-full md:w-[60%] flex flex-col justify-center z-10">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            001 / HERO — PORTFOLIO &copy;2026
          </span>
        </div>

        <motion.div style={{ y: yTransform }} className="relative group">
          {/* Status badges */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 16,
              delay: 0.1,
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-[var(--accent-lime)]/40 text-[var(--accent-lime)] bg-[var(--accent-lime)]/5">
              AVAILABLE FOR HIRE
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-[var(--border)] text-[var(--muted)]">
              CHENNAI, IN
            </span>
          </motion.div>

          <motion.h1
            className="text-[13vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.95] font-extrabold uppercase tracking-tight text-[var(--fg)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 16,
              delay: 0.2,
            }}
          >
            MOHAMED
            <br />
            HUSSAIN N
          </motion.h1>

          {/* Role subtitle - eye-catching */}
          <motion.p
            className="mt-8 text-2xl md:text-3xl font-bold uppercase tracking-wider text-[var(--accent-lime)] relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 16,
              delay: 0.4,
            }}
          >
            <span className="relative z-10">AI + FULL STACK DEVELOPER</span>
            {/* Glow effect */}
            <motion.span
              className="absolute inset-0 blur-xl bg-[var(--accent-lime)] opacity-20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.p>

          {/* hover distortion wash */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--accent-lime)]/5 via-transparent to-[var(--accent-ice)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: opacityTransform }}
          className="mt-12 flex items-center gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            SCROLL TO EXPLORE LAB
          </span>
          <div className="relative w-12 h-4 flex items-center overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-[var(--border)]" />
            <motion.div
              className="w-2 h-2 rounded-full bg-[var(--accent-lime)]"
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="font-mono text-xs text-[var(--accent-lime)]">(001)</span>
        </motion.div>
      </div>

      {/* Right Side - Profile Image + Code Window (40%) */}
      <div className="w-full md:w-[38%] flex flex-col items-center justify-center z-10 mt-12 md:mt-0 gap-8">
        {/* Circular Profile Image with decorative rings */}
        <motion.div
          className="relative w-80 h-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 90,
            damping: 16,
            delay: 0.4,
          }}
        >
          {/* Animated decorative rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[var(--accent-lime)]/20"
            animate={{
              scale: [1, 1.05, 1],
              borderColor: ['rgba(217, 255, 0, 0.2)', 'rgba(232, 240, 254, 0.3)', 'rgba(217, 255, 0, 0.2)']
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-[var(--accent-ice)]/10"
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[-16px] rounded-full border border-[var(--accent-lime)]/5"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, -90, -180]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Main profile image circle */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[var(--accent-lime)]/40 shadow-2xl">
            <Image
              src="/profile.png"
              alt="Mohamed Hussain N"
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-lime)]/20 via-transparent to-[var(--accent-ice)]/20 blur-2xl -z-10" />
        </motion.div>

        {/* Compact Code Window */}
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="bg-[var(--card)] border border-[var(--border)] overflow-hidden relative shadow-2xl rounded-xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[#0a0a0b]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 font-mono text-xs text-[var(--muted)] px-3 py-1 bg-[var(--bg)] border border-[var(--border)]">
                developer.ts — live
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-lime)] animate-pulse" />
                <span className="font-mono text-[10px] text-[var(--muted)]">TYPING</span>
              </div>
            </div>

            <div className="p-5 font-mono text-[12px] leading-relaxed overflow-x-auto min-h-[220px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <CodeTypingAnimation lines={codeLines} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CodeTypingAnimation({ lines }: { lines: string[] }) {
  return (
    <div className="min-h-[200px]">
      {lines.map((line, lineIndex) => (
        <TypingLine key={lineIndex} line={line} lineIndex={lineIndex} delay={0.4 + lineIndex * 0.35} />
      ))}
    </div>
  );
}

function TypingLine({ line, lineIndex, delay }: { line: string; lineIndex: number; delay: number }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (line.length === 0) {
      setDone(true);
      return;
    }
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setDisplayText(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(typeInterval);
        setDone(true);
      }
    }, 24);
    return () => clearInterval(typeInterval);
  }, [started, line]);

  const indent = line.match(/^\s*/)?.[0].length || 0;

  return (
    <div className="flex items-baseline gap-2" style={{ paddingLeft: `${indent * 8}px` }}>
      <span className="text-[#3f3f46] text-[11px] shrink-0 w-6 text-right select-none">
        {String(lineIndex + 1).padStart(2, '0')}
      </span>
      <span className="whitespace-pre text-[var(--fg)]">
        <ColoredCode text={displayText} started={started} />
        {started && !done && (
          <motion.span
            className="ml-0.5 text-[var(--accent-lime)]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ▍
          </motion.span>
        )}
      </span>
    </div>
  );
}

function ColoredCode({ text, started }: { text: string; started: boolean }) {
  if (!started) return null;
  // minimal syntax tint: keywords lime, strings ice
  if (text.includes("'")) {
    const parts = text.split("'");
    return (
      <>
        <span className="text-zinc-400">{parts[0]}</span>
        <span className="text-[var(--accent-ice)]">
          &apos;{parts.slice(1).join('&apos;')}
        </span>
      </>
    );
  }
  if (text.includes('const') || text.includes('await') || text.includes('deploy')) {
    return <span className="text-[var(--accent-lime)]">{text}</span>;
  }
  return <span className="text-zinc-300">{text}</span>;
}
