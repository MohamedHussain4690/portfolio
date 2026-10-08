'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { LineReveal } from './TextReveal';

export function Philosophy() {
  const { scrollYProgress } = useScroll();
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const floatX = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section className="relative py-8 md:py-12 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Background video/particles */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <PhilosophyParticles />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-lime)]/5 to-transparent" />
        </div>

        {/* Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] block mb-8">
            005 / PHILOSOPHY
          </span>
          
          <motion.blockquote
            className="relative"
            style={{ y: floatY, x: floatX, opacity }}
          >
            <LineReveal
              as="p"
              stagger={0.06}
              delay={0.1}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight leading-[1.05] text-[var(--fg)]"
            >
              CODE IS CRAFT.
              <br />
              <span className="text-[var(--accent-lime)]">PRODUCTS ARE</span>
              <br />
              <span className="text-[var(--accent-ice)]">ART.</span>
            </LineReveal>
          </motion.blockquote>

          {/* Divider */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--accent-lime)] to-transparent" />
            <div className="w-3 h-3 rounded-full bg-[var(--accent-lime)]" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent via-[var(--accent-ice)] to-transparent" />
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="mt-8 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Writing code is more than logic—it&apos;s an art form. Every function, every interface is a
            <span className="text-[var(--fg)]"> brushstroke</span>.
            I craft products that feel intuitive, work flawlessly, and leave lasting impressions.
          </motion.p>

          {/* Principles */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {principles.map((principle, i) => (
              <PrincipleCard key={i} principle={principle} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const principles = [
  {
    number: '01',
    title: 'ATTENTION TO DETAIL',
    desc: 'Every pixel, every interaction, every error message matters. Craft is in the details.',
  },
  {
    number: '02',
    title: 'USER EMPATHY',
    desc: 'Technology serves humans. Build for delight, accessibility, and intuitive experiences.',
  },
  {
    number: '03',
    title: 'CONTINUOUS REFINEMENT',
    desc: 'Great products are never finished. Always iterating, always improving, always learning.',
  },
];

function PrincipleCard({ principle }: { principle: typeof principles[0] }) {
  return (
    <motion.div
      className="relative p-6 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent-lime)]/30 transition-colors duration-300 group"
      whileHover={{ y: -4 }}
    >
      <span className="font-mono text-[var(--accent-lime)] text-2xl font-bold">{principle.number}</span>
      <h4 className="mt-2 text-lg font-bold uppercase tracking-tight">{principle.title}</h4>
      <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">{principle.desc}</p>
      
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[var(--accent-lime)] to-[var(--accent-ice)]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}

function PhilosophyParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    color: i % 2 === 0 ? 'var(--accent-lime)' : 'var(--accent-ice)',
  }));

  return (
    <div className="absolute inset-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.4,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Connection lines */}
      <svg className="absolute inset-0" style={{ opacity: 0.03 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9FF00" />
            <stop offset="100%" stopColor="#E8F0FE" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={Math.random() * 100 + '%'}
            y1={Math.random() * 100 + '%'}
            x2={Math.random() * 100 + '%'}
            y2={Math.random() * 100 + '%'}
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}