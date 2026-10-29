'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });
  const lastPosRef = useRef({ x: -100, y: -100 });

  const checkCanvasTheme = useCallback((target: HTMLElement | null) => {
    if (!target || typeof target.closest !== 'function') return false;
    return Boolean(
      target.closest(
        '[data-canvas="light"], #about, #open-to-work, #certifications, #faq, .bg-\\[\\#F4F4F4\\], .bg-white'
      )
    );
  }, []);

  const checkClickable = useCallback((target: HTMLElement | null) => {
    if (!target || typeof target.closest !== 'function') return false;
    return Boolean(
      target.closest(
        'a, button, input, textarea, .cursor-pointer, [role="button"], [data-cursor="pointer"]'
      )
    );
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      x.set(clientX);
      y.set(clientY);
      lastPosRef.current = { x: clientX, y: clientY };

      const target = e.target as HTMLElement | null;
      if (target) {
        setIsLight(checkCanvasTheme(target));
        setIsHovering(checkClickable(target));
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        setIsLight(checkCanvasTheme(target));
        setIsHovering(checkClickable(target));
      }
    };

    const handleScroll = () => {
      const { x: px, y: py } = lastPosRef.current;
      if (px > 0 && py > 0) {
        const el = document.elementFromPoint(px, py) as HTMLElement | null;
        if (el) {
          setIsLight(checkCanvasTheme(el));
          setIsHovering(checkClickable(el));
        }
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [x, y, checkCanvasTheme, checkClickable]);

  // Hide on touch devices
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      document.documentElement.classList.add('no-custom-cursor');
    }
  }, []);

  return (
    <div className="hidden md:block max-md:hidden [@media(pointer:coarse)]:hidden pointer-events-none">
      <motion.div
        className={cn(
          'custom-cursor-dot pointer-events-none',
          isLight ? 'cursor-light' : 'cursor-dark'
        )}
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className={cn(
          'custom-cursor pointer-events-none',
          isLight ? 'cursor-light' : 'cursor-dark',
          isHovering && 'expanded'
        )}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
}
