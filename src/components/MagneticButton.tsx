'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({ 
  children, 
  className, 
  strength = 30,
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / strength);
    y.set((e.clientY - centerY) / strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(springY, [-1, 1], ['3deg', '-3deg']);
  const rotateY = useTransform(springX, [-1, 1], ['-3deg', '3deg']);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 500,
      }}
      className={cn(
        'relative z-10 overflow-hidden',
        'bg-transparent border border-[var(--border)] hover:border-[var(--accent-lime)]',
        'px-8 py-4 font-mono text-sm uppercase tracking-wider',
        'text-[var(--fg)] hover:text-[var(--accent-lime)]',
        'transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-lime)]',
        className
      )}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}