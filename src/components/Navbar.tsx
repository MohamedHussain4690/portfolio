'use client';

import { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolio';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const [time, setTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utc + 3600000 * 5.5);
      let hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutesStr} ${ampm} IST`);
    };

    updateTime();
    const timer = setInterval(updateTime, 10000);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check sections with light background (#F4F4F4)
      const lightSections = document.querySelectorAll('#about, #work-with-me, #certifications, #faq');
      let foundLight = false;
      const scrollPos = window.scrollY + 100;

      lightSections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          foundLight = true;
        }
      });

      setIsLightSection(foundLight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isLightSection
              ? 'bg-[#F4F4F4]/90 backdrop-blur-md border-b border-black/10 py-4 shadow-sm'
              : 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark & Location */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className={`font-extrabold tracking-tighter text-lg uppercase transition-colors duration-200 ${
                isLightSection ? 'text-[#0A0A0A]' : 'text-[var(--fg)]'
              }`}
            >
              MOHAMED<span className="text-[var(--accent)]">/</span>HUSSAIN
            </a>
            <span
              className={`hidden sm:inline-block font-mono text-[11px] uppercase tracking-widest border-l pl-4 transition-colors duration-200 ${
                isLightSection ? 'text-[#5E625F] border-black/20' : 'text-[var(--muted)] border-[var(--border)]'
              }`}
            >
              {portfolioData.personal.location}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {portfolioData.nav.map((item) => {
              const id = item.replace('/', '').toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`font-mono text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                    isLightSection
                      ? 'text-[#5E625F] hover:text-[#0A0A0A]'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          {/* Right Utilities: Clock & CTA */}
          <div className="hidden md:flex items-center gap-5">
            {time && (
              <div
                className={`font-mono text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                  isLightSection ? 'text-[#5E625F]' : 'text-[var(--muted)]'
                }`}
              >
                {time}
              </div>
            )}
            <a
              href="#contact"
              className={`group px-4 py-2 border font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 active:scale-95 shadow-sm ${
                isLightSection
                  ? 'border-black/20 bg-white hover:bg-[#E2E2E2] hover:border-black text-[#0A0A0A]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--card)] hover:border-[var(--fg)] text-[var(--fg)]'
              }`}
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 border transition-colors duration-200 ${
                isLightSection ? 'text-[#0A0A0A] border-black/20 bg-white' : 'text-[var(--fg)] border-[var(--border)] bg-[var(--surface)]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg)] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden">
          <nav className="flex flex-col gap-6">
            {portfolioData.nav.map((item) => {
              const id = item.replace('/', '').toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-extrabold uppercase tracking-tight text-left text-[var(--fg)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <div className="space-y-6 pt-8 border-t border-[var(--border)]">
            {time && <div className="font-mono text-xs text-[var(--muted)]">LOCAL TIME: {time}</div>}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-[var(--accent)] text-white text-center font-mono text-xs uppercase tracking-widest block active:scale-95 transition-all shadow-md"
            >
              LET&apos;S TALK ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
