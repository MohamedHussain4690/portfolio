'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StackItem {
  name: string;
  category: string;
  level: number;
  liquid: string; // css color for liquid
}

const stacks: StackItem[] = [
  { name: 'React', category: 'Frontend', level: 95, liquid: '#22d3ee' },
  { name: 'Next.js 14', category: 'Frontend', level: 90, liquid: '#e4e4e7' },
  { name: 'TypeScript', category: 'Language', level: 92, liquid: '#38bdf8' },
  { name: 'Python', category: 'Language', level: 94, liquid: '#facc15' },
  { name: 'FastAPI', category: 'Backend', level: 88, liquid: '#2dd4bf' },
  { name: 'PyTorch', category: 'AI/ML', level: 85, liquid: '#fb7185' },
  { name: 'LangChain', category: 'AI/ML', level: 87, liquid: '#D9FF00' },
  { name: 'PostgreSQL', category: 'Database', level: 82, liquid: '#818cf8' },
  { name: 'Docker', category: 'DevOps', level: 80, liquid: '#38bdf8' },
  { name: 'AWS', category: 'Cloud', level: 75, liquid: '#fb923c' },
];

const shelfOrder = ['Frontend', 'Language', 'Backend', 'AI/ML', 'Database', 'DevOps', 'Cloud'];

export function Stack() {
  return (
    <section className="relative py-8 md:py-12 px-8 md:px-16 lg:pl-24 lg:pr-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            004 / STACK.LAB
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight">
            TECH
            <br />
            <span className="text-[var(--accent-lime)]">STACK</span>
          </h2>
        </motion.div>

        <Marquee items={stacks.map((s) => s.name)} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 relative"
        >
          <LabShelves stacks={stacks} />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden my-6 relative border-y border-[var(--border)] py-4">
      <motion.div
        className="flex whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="font-mono text-lg md:text-xl uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent-lime)] px-6 transition-colors"
          >
            [{item}]
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function LabShelves({ stacks }: { stacks: StackItem[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const groups = shelfOrder
    .map((cat) => ({ name: cat, items: stacks.filter((s) => s.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="relative space-y-10">
      {groups.map((group, gi) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: gi * 0.06, duration: 0.5 }}
        >
          <div className="mb-3 flex items-center gap-4">
            <div className="w-12 h-px bg-[var(--accent-lime)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              SHELF_{String(gi + 1).padStart(2, '0')} {'//'} {group.name}
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <div className="relative pt-2 pb-0">
            <div className="flex items-end justify-start gap-4 md:gap-6 overflow-x-auto pb-6 px-2">
              {group.items.map((stack, index) => (
                <Bottle
                  key={stack.name}
                  stack={stack}
                  index={index}
                  isHovered={hovered === stack.name}
                  onHover={setHovered}
                />
              ))}
            </div>
            {/* shelf plank */}
            <div className="h-3 bg-[var(--card)] border-t border-[var(--border)]" />
            <div className="h-px bg-gradient-to-r from-[var(--accent-lime)]/40 to-[var(--accent-ice)]/40" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Bottle({
  stack,
  index,
  isHovered,
  onHover,
}: {
  stack: StackItem;
  index: number;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 20 });
  const sy = useSpring(my, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - (rect.left + rect.width / 2)) / 8);
        my.set((e.clientY - (rect.top + rect.height / 2)) / 8);
      }}
      onMouseEnter={() => onHover(stack.name)}
      onMouseLeave={() => {
        onHover(null);
        mx.set(0);
        my.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={cn('relative cursor-pointer flex flex-col items-center shrink-0', isHovered && 'z-20')}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative w-14 h-32 md:w-16 md:h-36">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-[var(--card)] border border-[var(--border)] border-b-0 rounded-t-md" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-t-sm" />
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-28 md:h-32 bg-[var(--bg)] border rounded-b-xl overflow-hidden transition-colors',
            isHovered ? 'border-[var(--accent-lime)]' : 'border-[var(--border)]'
          )}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{ background: `linear-gradient(180deg, ${stack.liquid}cc, ${stack.liquid}55)` }}
            initial={{ height: 0 }}
            whileInView={{ height: `${stack.level}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.05, duration: 0.8 }}
          />
          {isHovered && (
            <div
              className="absolute inset-0"
              style={{ boxShadow: `inset 0 0 30px ${stack.liquid}66` }}
            />
          )}
          {/* bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-white/40"
                style={{ left: `${30 + i * 20}%` }}
                animate={{ y: [0, -40], opacity: [0, 0.7, 0] }}
                transition={{ duration: 2 + i * 0.5, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-center w-24">
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--fg)] block truncate">
          {stack.name}
        </span>
        <div className="mt-1.5 h-1 bg-[var(--border)] overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: stack.liquid }}
            initial={{ width: 0 }}
            whileInView={{ width: `${stack.level}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
        </div>
        <span className="font-mono text-[10px] text-[var(--muted)] mt-1 block">LVL {stack.level}%</span>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] text-center whitespace-nowrap"
        >
          <p className="font-mono text-[10px] text-[var(--muted)]">{stack.category}</p>
          <p className="text-xs font-medium">Proficiency {stack.level}%</p>
        </motion.div>
      )}
    </motion.div>
  );
}
