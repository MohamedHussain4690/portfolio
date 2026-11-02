'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { portfolioData, ProjectItem } from '@/data/portfolio';
import { ArrowUpRight, Code, Lock, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';

function getHostname(url?: string): string {
  if (!url) return 'system.engine';
  return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
}

function ProjectBrowserSlider({ project }: { project: ProjectItem }) {
  const imageList = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [{ src: project.image, caption: '01/01 // PRODUCTION INTERFACE' }]
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (imageList.length === 0) return null;

  const currentImage = imageList[currentIndex];
  const hasMultiple = imageList.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group/mockup block bg-[#101010] border border-[var(--border)] hover:border-[#9C502F]/60 transition-all duration-300 overflow-hidden shadow-2xl relative select-none">
      {/* Browser Window Header */}
      <div className="bg-[#181818] px-3.5 py-2.5 border-b border-[var(--border)] flex items-center justify-between text-[#808185]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>

        {/* Domain & Slide Indicator Pill */}
        <div className="px-3 py-0.5 bg-[#0D0D0D] border border-white/10 rounded-full font-mono text-[10px] text-[#808185] flex items-center gap-1.5 max-w-[220px] sm:max-w-xs truncate">
          <Lock className="w-2.5 h-2.5 text-[#27C93F] shrink-0" />
          <span className="truncate">{getHostname(project.live || project.github)}</span>
          {hasMultiple && (
            <span className="text-[#9C502F] font-bold shrink-0 ml-1">
              [{currentIndex + 1}/{imageList.length}]
            </span>
          )}
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">200 OK</span>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage.src}
              alt={`${project.title} - ${currentImage.caption || 'Preview'}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top filter brightness-[96%] contrast-[104%]"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption Tape / Subtitle at Top-Left */}
        {currentImage.caption && (
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#ECECEC] bg-black/85 backdrop-blur-md px-2.5 py-1 border border-white/10 shadow-lg">
              {currentImage.caption}
            </span>
          </div>
        )}

        {/* Sliding Navigation Buttons (Swipe / Click between screenshots) */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-[#9C502F] text-white border border-white/15 hover:border-[#9C502F] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-[#9C502F] text-white border border-white/15 hover:border-[#9C502F] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Bottom Interactive Bar: Dots Indicator & Live Link */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-2.5 sm:p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between pointer-events-auto">
          {/* Slide Indicator Dots */}
          {hasMultiple ? (
            <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1.5 border border-white/10 rounded-full">
              {imageList.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-5 h-1.5 bg-[#9C502F]'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          ) : (
            <span className="font-mono text-[9px] text-[#808185] uppercase">
              VERIFIED PRODUCTION DEPLOY
            </span>
          )}

          {/* Direct Launch Link */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white bg-black/80 hover:bg-[#9C502F] hover:text-white backdrop-blur-md px-2.5 py-1 border border-white/15 transition-colors shadow-md cursor-pointer"
            >
              <span>LIVE DEMO</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
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
                  /* Large Featured Layout: 2-Column Split with Live Browser Mockup Slider */
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

                    {/* Right Column: Visual Proof / Browser Window Mockup Slider */}
                    <div className="lg:col-span-6">
                      <ProjectBrowserSlider project={project} />
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
