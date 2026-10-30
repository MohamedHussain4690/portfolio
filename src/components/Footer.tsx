'use client';

import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react';

export function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(portfolioData.personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = portfolioData.personal.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };
  return (
    <footer data-canvas="dark" className="bg-[var(--bg)] border-t border-[var(--border)] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Links & Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-[var(--border)]">
          {/* Col 1: Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-widest">NAVIGATION</h4>
            <ul className="space-y-2.5">
              {portfolioData.nav.map((item) => {
                const href = `#${item.replace('/', '').toLowerCase()}`;
                return (
                  <li key={item}>
                    <a
                      href={href}
                      className="font-mono text-xs text-[var(--fg)] hover:text-[var(--accent)] transition-colors uppercase"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 2: Projects */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-widest">PROJECTS</h4>
            <ul className="space-y-2.5">
              {portfolioData.projects.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.github || '#work'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[var(--fg)] hover:text-[var(--accent)] transition-colors uppercase flex items-center gap-1"
                  >
                    {proj.title} <ArrowUpRight className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-widest">RESOURCES</h4>
            <ul className="space-y-2.5">
              <li>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="font-mono text-xs text-[var(--fg)] hover:text-[var(--accent)] transition-colors uppercase"
                  >
                    DIRECT EMAIL
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border transition-all flex items-center gap-1 active:scale-95 cursor-pointer select-none ${
                      copiedEmail
                        ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--fg)]'
                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]'
                    }`}
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-[var(--accent)]" />
                        <span>COPIED ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5 opacity-60" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </li>
              <li>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--fg)] hover:text-[var(--accent)] transition-colors uppercase"
                >
                  GITHUB PROFILE
                </a>
              </li>
              <li>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--fg)] hover:text-[var(--accent)] transition-colors uppercase"
                >
                  LINKEDIN PROFILE
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Back to top trigger */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <h4 className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-widest">POSITION</h4>
            <a
              href="#"
              className="mt-6 md:mt-0 flex items-center gap-3 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--fg)] text-[var(--fg)] font-mono text-xs uppercase tracking-widest transition-all group cursor-pointer active:scale-95 shadow-sm"
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <span className="p-1 bg-[var(--card)] group-hover:bg-[var(--accent)] transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-[var(--fg)] group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </a>
          </div>
        </div>

        {/* Giant Brand Wordmark */}
        <div className="py-16 text-center select-none overflow-hidden">
          <h2 className="text-[12vw] sm:text-[13vw] font-extrabold uppercase tracking-tighter text-[var(--surface)] hover:text-[var(--border)] transition-colors leading-none">
            MOHAMED<span className="text-[var(--accent)]">/</span>HUSSAIN
          </h2>
        </div>

        {/* Bottom Metadata Row */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider">
          <div>DESIGNED & BUILT BY {portfolioData.personal.name.toUpperCase()}</div>
          <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </footer>
  );
}
