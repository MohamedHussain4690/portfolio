'use client';

import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { portfolioData, ProjectItem } from '@/data/portfolio';
import {
  ArrowUpRight,
  Code,
  Lock,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';

function getHostname(project: ProjectItem): string {
  if (project.live) return project.live.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (project.id === 'ai-summarizer') return '127.0.0.1:5500/ai-summarizer';
  if (project.id === 'flashmind') return 'flashmind-ai.gemini.local';
  if (project.github) return project.github.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return 'system.engine';
}

function ProjectBrowserSlider({ project }: { project: ProjectItem }) {
  const imageList = useMemo(() => {
    return project.images && project.images.length > 0
      ? project.images
      : project.image
      ? [{ src: project.image, caption: '01/01 // PRODUCTION INTERFACE' }]
      : [];
  }, [project.images, project.image]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Eagerly pre-cache all gallery images in browser memory so slide switching is instantaneous
    if (typeof window !== 'undefined') {
      imageList.forEach((img) => {
        const pre = new window.Image();
        pre.src = img.src;
      });
    }
  }, [imageList]);

  const hasMultiple = imageList.length > 1;
  const currentImage = imageList[currentIndex] || imageList[0];

  useEffect(() => {
    if (!isExpanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
      if (e.key === 'ArrowLeft' && hasMultiple) {
        setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight' && hasMultiple) {
        setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded, hasMultiple, imageList.length]);

  if (imageList.length === 0) return null;

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
    <>
      <div className="group/mockup block bg-[#101010] border border-[var(--border)] hover:border-[#9C502F]/60 transition-all duration-300 overflow-hidden shadow-2xl relative select-none">
        {/* Browser Window Header */}
        <div className="bg-[#181818] px-3.5 py-2.5 border-b border-[var(--border)] flex items-center justify-between text-[#808185]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
          </div>

          {/* Domain Pill */}
          <div className="px-3 py-0.5 bg-[#0D0D0D] border border-white/10 rounded-full font-mono text-[10px] text-[#808185] flex items-center gap-1.5 max-w-[220px] sm:max-w-xs truncate">
            <Lock className="w-2.5 h-2.5 text-[#27C93F] shrink-0" />
            <span className="truncate">{getHostname(project)}</span>
          </div>

          {/* Live Status Pill */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">200 OK</span>
          </div>
        </div>

        {/* Dedicated Sub-Bar with Module Caption (Never overlaps screenshot) */}
        <div className="bg-[#131313] px-3.5 sm:px-4 py-2 border-b border-[var(--border)] flex items-center justify-between text-[#808185] font-mono text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9C502F] shrink-0" />
            <span className="text-[#ECECEC] font-bold truncate tracking-wider">
              {currentImage.caption || 'SYSTEM INTERFACE'}
            </span>
          </div>
          {hasMultiple && (
            <span className="text-[#9C502F] font-bold text-[10px] uppercase tracking-wider shrink-0 ml-2">
              [{currentIndex + 1}/{imageList.length}]
            </span>
          )}
        </div>

        {/* Main Image Viewport: Pre-cached slides with instantaneous 0ms transition */}
        <div
          onClick={() => setIsExpanded(true)}
          className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-2 cursor-zoom-in group/canvas"
        >
          {imageList.map((img, idx) => (
            <div
              key={img.src}
              className={`absolute inset-0 p-2 flex items-center justify-center transition-opacity duration-200 ease-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <Image
                src={img.src}
                alt={`${project.title} - ${img.caption || 'Preview'}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain filter brightness-[98%] contrast-[102%]"
                priority
                unoptimized
              />
            </div>
          ))}

          {/* Hover Zoom Hint */}
          <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover/canvas:opacity-100 transition-opacity bg-black/85 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded font-mono text-[9px] text-[#ECECEC] pointer-events-none flex items-center gap-1.5 shadow-lg">
            <Maximize2 className="w-3 h-3 text-[#9C502F]" />
            <span>CLICK TO ZOOM</span>
          </div>
        </div>

        {/* Clean Bottom Control Bar */}
        <div className="bg-[#141414] px-3.5 py-2.5 border-t border-[var(--border)] flex items-center justify-between gap-2 select-none">
          {/* Left: Previous & Next Controls */}
          {hasMultiple ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous screenshot"
                className="px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#9C502F] text-[#ECECEC] hover:text-white border border-[var(--border)] hover:border-[#9C502F] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all rounded cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PREV</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next screenshot"
                className="px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#9C502F] text-[#ECECEC] hover:text-white border border-[var(--border)] hover:border-[#9C502F] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all rounded cursor-pointer active:scale-95"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="font-mono text-[9px] text-[#808185] uppercase tracking-wider">
              VERIFIED SYSTEM DEPLOY
            </span>
          )}

          {/* Center: Slide Indicator Dots */}
          {hasMultiple && (
            <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 border border-white/5 rounded-full">
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
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/70'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Right: Zoom Fullscreen & Live Demo */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="px-2.5 py-1 bg-[#1A1A1A] hover:bg-white/10 text-[#808185] hover:text-[#ECECEC] border border-[var(--border)] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all rounded cursor-pointer"
              title="Zoom into high-res view"
            >
              <Maximize2 className="w-3 h-3 text-[#9C502F]" />
              <span>ZOOM</span>
            </button>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#9C502F] hover:bg-[#B35E38] text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors rounded shadow-sm cursor-pointer"
              >
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox Modal via Portal directly to Document Body */}
      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none"
                onClick={() => setIsExpanded(false)}
              >
                {/* Lightbox Header */}
                <div
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[#ECECEC] font-bold uppercase tracking-wider truncate max-w-md sm:max-w-2xl">
                      {project.title} &middot; {currentImage.caption}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {hasMultiple && (
                      <span className="font-mono text-xs text-[#808185]">
                        {currentIndex + 1} / {imageList.length}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-[#9C502F] text-white transition-colors cursor-pointer"
                      aria-label="Close zoomed view"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lightbox Center Image View */}
                <div
                  className="relative flex-1 my-4 flex items-center justify-center overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full max-w-6xl max-h-[82vh]">
                    {imageList.map((img, idx) => (
                      <div
                        key={`modal-${img.src}`}
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                          idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={`${project.title} - ${img.caption}`}
                          fill
                          sizes="100vw"
                          className="object-contain"
                          priority
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>

                  {/* Modal Prev / Next Navigation */}
                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/80 hover:bg-[#9C502F] text-white border border-white/20 hover:border-[#9C502F] transition-all cursor-pointer shadow-2xl backdrop-blur-md"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/80 hover:bg-[#9C502F] text-white border border-white/20 hover:border-[#9C502F] transition-all cursor-pointer shadow-2xl backdrop-blur-md"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Lightbox Footer Bar */}
                <div
                  className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs text-[#808185]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="hidden sm:inline">
                    PRESS ESC OR CLICK BACKGROUND TO CLOSE &middot; USE ARROW KEYS TO SWIPE
                  </span>
                  <span className="sm:hidden">TAP BACKGROUND TO CLOSE</span>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#ECECEC] hover:text-[#9C502F] uppercase transition-colors"
                    >
                      <span>LAUNCH DEMO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
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
            const isLarge = Boolean(project.images && project.images.length > 0);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#141414] border border-[var(--border)] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden md:col-span-2"
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
                  /* Standard Balanced Layout for Projects Awaiting Screenshots */
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-2">
                    <div className="lg:col-span-7 space-y-4">
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

                    {/* Architectural Pipeline Telemetry Panel */}
                    <div className="lg:col-span-5 p-5 bg-[#0D0D0D] border border-[var(--border)] font-mono text-[11px] space-y-3 shadow-xl">
                      <div className="flex items-center justify-between text-[#808185] border-b border-white/5 pb-2">
                        <span className="flex items-center gap-1.5 text-[#9C502F] font-bold">
                          <Terminal className="w-3.5 h-3.5" /> PIPELINE_TELEMETRY
                        </span>
                        <span className="text-[#808185] text-[10px]">ENGINEERING_SPEC</span>
                      </div>
                      {project.id === 'flashmind' && (
                        <div className="space-y-2 text-[#808185]">
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
