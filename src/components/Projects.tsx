'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  glow: string;
  size: 'large' | 'tall' | 'wide' | 'small';
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Interview Assistant',
    description:
      'Real-time voice AI that conducts technical interviews, evaluates responses, and generates detailed feedback reports using LLMs.',
    tags: ['Next.js', 'LangChain', 'OpenAI'],
    glow: 'radial-gradient(circle at 30% 20%, rgba(217,255,0,0.25), transparent 60%), radial-gradient(circle at 80% 90%, rgba(34,211,238,0.18), transparent 60%)',
    size: 'large',
    github: 'https://github.com',
    live: 'https://demo.example.com',
  },
  {
    id: 2,
    title: 'RAG PDF Chat',
    description:
      'Chat with any PDF using retrieval-augmented generation. Vector embeddings, semantic search, streaming responses.',
    tags: ['Python', 'Vector DB'],
    glow: 'radial-gradient(circle at 70% 20%, rgba(167,139,250,0.22), transparent 60%), radial-gradient(circle at 20% 90%, rgba(244,114,182,0.18), transparent 60%)',
    size: 'tall',
    github: 'https://github.com',
    live: 'https://demo.example.com',
  },
  {
    id: 3,
    title: 'E-commerce AI Engine',
    description:
      'Personalization engine with real-time recommendations, dynamic pricing and inventory forecasting.',
    tags: ['PyTorch', 'Redis', 'Postgres'],
    glow: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.25), transparent 65%)',
    size: 'small',
    github: 'https://github.com',
    live: 'https://demo.example.com',
  },
  {
    id: 4,
    title: 'Realtime Collab Code Editor',
    description:
      'VS Code-like collaborative editor with operational transforms, presence and Monaco integration.',
    tags: ['Next.js', 'TypeScript', 'Yjs', 'WebRTC'],
    glow: 'radial-gradient(circle at 20% 30%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(circle at 85% 80%, rgba(217,255,0,0.18), transparent 60%)',
    size: 'wide',
    github: 'https://github.com',
    live: 'https://demo.example.com',
  },
];

// 6-col bento on md+: large 4x2, tall 2x2, small 2x1, wide 4x1
const sizeClasses: Record<Project['size'], string> = {
  large: 'col-span-1 md:col-span-4 md:row-span-2 min-h-[420px] md:min-h-[560px]',
  tall: 'col-span-1 md:col-span-2 md:row-span-2 min-h-[380px]',
  small: 'col-span-1 md:col-span-2 min-h-[280px]',
  wide: 'col-span-1 md:col-span-4 min-h-[300px]',
};

export function Projects() {
  return (
    <section className="relative py-8 md:py-12 px-8 md:px-16 lg:pl-24 lg:pr-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            003 / SELECTED_WORKS
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight">
            SELECTED
            <br />
            <span className="text-[var(--accent-lime)]">WORKS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(217,255,0,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(232,240,254,0.07) 0%, transparent 70%)' }}
        />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], ['6deg', '-6deg']);
  const rotateY = useTransform(x, [-60, 60], ['-6deg', '6deg']);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) / 12);
        y.set((e.clientY - (rect.top + rect.height / 2)) / 12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        'relative group overflow-hidden bg-[var(--card)] border border-[var(--border)]',
        'hover:border-[var(--accent-lime)]/60 hover:shadow-[0_0_50px_rgba(217,255,0,0.12)]',
        'transition-[border-color,box-shadow] duration-500',
        sizeClasses[project.size]
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
    >
      <div
        className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: project.glow }}
      />

      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col">
        <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-lime)] mb-4">
          PROJECT #{String(project.id).padStart(3, '0')}
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-tight mb-3">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-md">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] group-hover:border-[var(--accent-lime)]/40 group-hover:text-[var(--fg)] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 pt-4 border-t border-[var(--border)] md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent-lime)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent-ice)] transition-colors"
            >
              Live
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
