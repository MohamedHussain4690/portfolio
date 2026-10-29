'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Award } from 'lucide-react';

export function Certifications() {
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const certs = portfolioData.certifications;
  const activeCert = certs[activeCertIndex] || certs[0];

  return (
    <section id="certifications" data-canvas="light" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#F4F4F4] text-[#0A0A0A] overflow-hidden border-b border-[#E2E2E2]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#5E625F]">
            07 / CERTIFICATIONS/
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
            ACCREDITATIONS & <span className="text-[#9C502F]">SPECIALIZATIONS</span>
          </h2>
        </motion.div>

        {/* 3-Column Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Index & Label (Col span 3) */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs text-[#5E625F] uppercase tracking-widest">
            <div className="border-b border-[#0A0A0A]/10 pb-4">
              <span>VERIFIED CREDENTIALS</span>
            </div>
            <p className="text-sm text-[#0A0A0A] font-bold">
              HOVER OR CLICK TO INSPECT CERTIFICATE METRICS
            </p>
            <div className="pt-8 font-mono text-xs">
              INDEX // {String(activeCertIndex + 1).padStart(2, '0')} OF {String(certs.length).padStart(2, '0')}
            </div>
          </div>

          {/* Center Column: Vertical Stack of Titles (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
            {certs.map((cert, idx) => {
              const isActive = idx === activeCertIndex;
              return (
                <div
                  key={cert.id}
                  onMouseEnter={() => setActiveCertIndex(idx)}
                  onClick={() => setActiveCertIndex(idx)}
                  className="py-6 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={`text-lg md:text-xl font-extrabold uppercase tracking-tight transition-colors ${
                        isActive ? 'text-[#0A0A0A]' : 'text-[#808185] group-hover:text-[#0A0A0A]'
                      }`}
                    >
                      {cert.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#E2E2E2] text-[#0A0A0A] shrink-0">
                      {cert.year}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-sm text-[#5E625F] leading-relaxed font-mono"
                    >
                      <p>{cert.description}</p>
                      <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase">
                        <span className="text-[#9C502F]">ISSUER: {cert.organization}</span>
                        {cert.verifyUrl ? (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A0A0A] hover:text-[#9C502F] flex items-center gap-1 font-bold underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            VERIFY CREDENTIAL ↗
                          </a>
                        ) : (
                          <span className="text-[#808185] font-mono text-[11px] uppercase tracking-wider">
                            COMPETITIVE RECOGNITION // VERIFIED
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Image Crossfade Preview Container (Col span 4) */}
          <div className="lg:col-span-4 bg-white border border-[#0A0A0A]/10 p-8 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between font-mono text-xs text-[#5E625F] uppercase tracking-widest border-b border-[#0A0A0A]/10 pb-4">
              <span>{/* // PREVIEW_METADATA */} PREVIEW_METADATA</span>
              <span className="text-[#9C502F] font-bold">{activeCert.badge}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-4 my-auto py-6"
              >
                {/* Fallback Credential Frame Graphic */}
                <div className="w-full aspect-[16/10] bg-[#1A1A1A] text-white border border-[#0A0A0A]/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C502F]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                    <span>MHN // CREDENTIAL</span>
                    <Award className="w-4 h-4 text-[#9C502F]" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#9C502F] uppercase">
                      {activeCert.organization}
                    </div>
                    <div className="text-base font-bold uppercase tracking-tight text-white mt-1">
                      {activeCert.title.replace('/', '')}
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 pt-2 border-t border-white/10">
                    <span>ID: MHN-{activeCert.id.toUpperCase()}-2026</span>
                    <span>YEAR: {activeCert.year}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold uppercase tracking-tight text-[#0A0A0A]">
                    {activeCert.title.replace('/', '')}
                  </h4>
                  <p className="text-xs text-[#5E625F] leading-relaxed mt-1">
                    {activeCert.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 border-t border-[#0A0A0A]/10 flex items-center justify-between font-mono text-[10px] text-[#5E625F] uppercase tracking-widest">
              <span>STATUS: AUTHENTICATED</span>
              {activeCert.verifyUrl ? (
                <a
                  href={activeCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A0A0A] hover:text-[#9C502F] font-bold flex items-center gap-0.5 underline border border-[#0A0A0A]/20 hover:border-[#0A0A0A] px-3 py-1 transition-colors"
                >
                  VERIFY CREDENTIAL ↗
                </a>
              ) : (
                <span className="text-[#808185] font-mono text-[10px] uppercase tracking-wider">
                  COMPETITIVE RECOGNITION // VERIFIED
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
