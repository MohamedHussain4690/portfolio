'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight, Code, Lock, Terminal } from 'lucide-react';

function getHostname(url?: string): string {
  if (!url) return 'system.engine';
  return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
}

export function Projects() {
  return (
    <section id="projects" data-canvas="dark" className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#ECECEC] overflow-hidden border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#808185]">
              03 / PROJECTS/
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#ECECEC]">
              SHOWCASING SKILLS THROUGH <span className="text-[#9C502F]">EVERY PROJECT</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#808185] uppercase tracking-wider max-w-sm">
            Production-grade systems ranging from transit booking engines to transformer-based NLP and multimodal RAG assistants.
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative bg-[#141414] border border-[var(--border)] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden ${
                  isLarge ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9C502F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Top Row: Number & Year */}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs text-[#808185] uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-4">
                  <span>PROJECT // {project.number}</span>
                  <span className="text-[#ECECEC]">{project.year}</span>
                </div>

                {/* Main Content Area */}
                {isLarge ? (
                  /* Large Featured Layout: 2-Column Split with Live Browser Mockup */
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-2">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-6 space-y-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#ECECEC] group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-[#9C502F] uppercase tracking-wider mt-1.5 font-bold">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-[#999999] group-hover:text-[#ECECEC] transition-colors leading-relaxed">
                        {project.description}
                      </p>

                      {/* Hard Engineering Metrics */}
                      {project.metrics && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.metrics.map((metric) => (
                            <span
                              key={metric}
                              className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider bg-[#1B120C] border border-[#9C502F]/40 text-[#E09A7A] flex items-center gap-1.5 select-none"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#9C502F]" />
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Visual Proof / Browser Window Mockup */}
                    <div className="lg:col-span-6">
                      {project.image ? (
                        <a
                          href={project.live || project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/mockup block bg-[#101010] border border-[var(--border)] hover:border-[#9C502F]/60 transition-all duration-300 overflow-hidden shadow-2xl relative"
                        >
                          {/* Browser Window Header */}
                          <div className="bg-[#181818] px-3.5 py-2.5 border-b border-[var(--border)] flex items-center justify-between text-[#808185]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                            </div>
                            <div className="px-3 py-0.5 bg-[#0D0D0D] border border-white/10 rounded-full font-mono text-[10px] text-[#808185] flex items-center gap-1.5 max-w-[220px] truncate">
                              <Lock className="w-2.5 h-2.5 text-[#27C93F] shrink-0" />
                              <span className="truncate">{getHostname(project.live || project.github)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="hidden sm:inline">200 OK</span>
                            </div>
                          </div>

                          {/* Screenshot Container */}
                          <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover object-top group-hover/mockup:scale-[1.03] transition-transform duration-700 filter brightness-[95%] contrast-[105%]"
                              priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover/mockup:opacity-100 transition-opacity flex items-end justify-between p-4">
                              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white bg-black/90 backdrop-blur-md px-3 py-1.5 border border-white/20">
                                EXPLORE LIVE SYSTEM <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-mono text-[10px] text-[#808185] uppercase">
                                VERIFIED PRODUCTION DEPLOY
                              </span>
                            </div>
                          </div>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  /* Standard 1-Column Layout for AI Architectures */
                  <div className="relative z-10 space-y-4 my-2">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#ECECEC] group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-[#9C502F] uppercase tracking-wider mt-1.5 font-bold">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-[#999999] group-hover:text-[#ECECEC] transition-colors leading-relaxed">
                      {project.description}
                    </p>

                    {/* Hard Engineering Metrics */}
                    {project.metrics && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider bg-[#1B120C] border border-[#9C502F]/40 text-[#E09A7A] flex items-center gap-1.5 select-none"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C502F]" />
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Architectural Pipeline Telemetry Panel */}
                    <div className="mt-4 p-3.5 bg-[#0D0D0D] border border-[var(--border)] font-mono text-[10px] space-y-2">
                      <div className="flex items-center justify-between text-[#808185] border-b border-white/5 pb-1.5">
                        <span className="flex items-center gap-1.5 text-[#9C502F]">
                          <Terminal className="w-3 h-3" /> PIPELINE_TELEMETRY
                        </span>
                        <span className="text-[#808185] text-[9px]">ENGINEERING_SPEC</span>
                      </div>
                      {project.id === 'ai-summarizer' && (
                        <div className="space-y-1 text-[#808185]">
                          <div className="flex justify-between">
                            <span>MODEL_BACKBONE:</span>
                            <span className="text-[#ECECEC]">DistilBART-CNN-12-6</span>
                          </div>
                          <div className="flex justify-between">
                            <span>TOKEN_BUDGET:</span>
                            <span className="text-[#ECECEC]">1,024 Max / Pass</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CONCURRENCY_SAFEGUARD:</span>
                            <span className="text-[#9C502F]">Zero OOM Memory Bounds</span>
                          </div>
                        </div>
                      )}
                      {project.id === 'flashmind' && (
                        <div className="space-y-1 text-[#808185]">
                          <div className="flex justify-between">
                            <span>INFERENCE_MODEL:</span>
                            <span className="text-[#ECECEC]">Gemini 1.5 Flash</span>
                          </div>
                          <div className="flex justify-between">
                            <span>SCHEMA_DETERMINISM:</span>
                            <span className="text-[#ECECEC]">98% JSON Validation</span>
                          </div>
                          <div className="flex justify-between">
                            <span>SPACED_REPETITION:</span>
                            <span className="text-[#9C502F]">Automated Leitner Scheduling</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Row: Tech Tags & Links */}
                <div className="relative z-10 pt-6 mt-6 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider bg-[#1A1A1A] border border-[var(--border)] text-[#808185] group-hover:text-[#ECECEC] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#ECECEC] hover:text-[#9C502F] transition-colors bg-[#1A1A1A] px-4 py-2 border border-[var(--border)]"
                      >
                        <Code className="w-3.5 h-3.5" /> GITHUB/
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#ECECEC] hover:text-[#9C502F] transition-colors bg-[#1A1A1A] px-4 py-2 border border-[var(--border)]"
                      >
                        LIVE/ <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
