'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight, Code } from 'lucide-react';

export function Projects() {
  return (
    <section id="projects" data-canvas="dark" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] text-[#ECECEC] overflow-hidden border-b border-[var(--border)]">
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
                className={`group relative bg-[#141414] border border-[var(--border)] p-8 md:p-10 flex flex-col justify-between overflow-hidden ${
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

                {/* Middle Content: Title, Subtitle, Description */}
                <div className="relative z-10 space-y-4 my-4">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#ECECEC] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-[#9C502F] uppercase tracking-wider mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-[#808185] group-hover:text-[#ECECEC] transition-colors leading-relaxed max-w-3xl">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: Tech Tags & Links */}
                <div className="relative z-10 pt-6 mt-6 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-6">
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
                  <div className="flex items-center gap-4">
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
