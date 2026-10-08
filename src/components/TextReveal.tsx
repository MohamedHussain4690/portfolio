'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function TextReveal({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  as: Component = 'div'
}: TextRevealProps) {
  const words = React.Children.toArray(children)
    .flatMap((child) => {
      if (typeof child === 'string') return child.split(' ');
      return [child];
    });

  return (
    <Component className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay: delay + i * stagger,
          }}
        >
          {word}
          {typeof word === 'string' && i < words.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </Component>
  );
}

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

// Splits children on <br/> into lines, preserves inline spans per line
export function LineReveal({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  as: Component = 'div'
}: LineRevealProps) {
  const lines: React.ReactNode[][] = [[]];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'br') {
      lines.push([]);
    } else if (typeof child === 'string') {
      // split embedded newlines too
      const parts = child.split('\n');
      parts.forEach((part, idx) => {
        if (idx > 0) lines.push([]);
        if (part) lines[lines.length - 1].push(part);
      });
    } else {
      lines[lines.length - 1].push(child);
    }
  });

  const filtered = lines.filter(
    (l) => l.length > 0 && !(l.length === 1 && typeof l[0] === 'string' && !l[0].trim())
  );

  return (
    <Component className={cn('flex flex-col', className)}>
      {filtered.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: '110%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 16,
              delay: delay + i * stagger,
            }}
          >
            {line.map((node, j) => (
              <React.Fragment key={j}>{node}</React.Fragment>
            ))}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
