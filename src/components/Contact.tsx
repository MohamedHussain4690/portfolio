'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to dispatch transmission.');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" data-canvas="dark" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] text-[#ECECEC] overflow-hidden border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#808185]">
            09 / CONTACT/
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#ECECEC]">
            LET&apos;S BUILD <span className="text-[#9C502F]">TOGETHER</span>
          </h2>
        </motion.div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column — Direct Communication Channels (Col span 5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-[#ECECEC] leading-[0.95] mb-6">
                READY TO <br />
                <span className="text-[#9C502F]">DISPATCH.</span>
              </h3>
              <p className="text-sm md:text-base text-[#B6B6B6] font-mono leading-relaxed">
                Whether you are hiring full-time engineering talent, looking for an AI application builder, or initiating a complex MERN architecture project, my inbox is open.
              </p>
            </div>

            {/* Channel Directory */}
            <div className="space-y-4 pt-6 border-t border-[var(--border)] font-mono text-xs md:text-sm">
              <div className="p-4 bg-[#141414] border border-[var(--border)] flex items-center justify-between group hover:border-[#9C502F] transition-colors">
                <span className="text-[#808185] uppercase">EMAIL/</span>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="text-[#ECECEC] group-hover:text-[#9C502F] font-bold underline transition-colors"
                >
                  {portfolioData.personal.email}
                </a>
              </div>

              <div className="p-4 bg-[#141414] border border-[var(--border)] flex items-center justify-between group hover:border-[#9C502F] transition-colors">
                <span className="text-[#808185] uppercase">GITHUB/</span>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ECECEC] group-hover:text-[#9C502F] font-bold underline flex items-center gap-1 transition-colors"
                >
                  MohamedHussain4690 ↗
                </a>
              </div>

              <div className="p-4 bg-[#141414] border border-[var(--border)] flex items-center justify-between group hover:border-[#9C502F] transition-colors">
                <span className="text-[#808185] uppercase">LINKEDIN/</span>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ECECEC] group-hover:text-[#9C502F] font-bold underline flex items-center gap-1 transition-colors"
                >
                  mohamed-hussain-n- ↗
                </a>
              </div>

              <div className="p-4 bg-[#141414] border border-[var(--border)] flex items-center justify-between group hover:border-[#9C502F] transition-colors">
                <span className="text-[#808185] uppercase">LOCATION/</span>
                <span className="text-[#ECECEC] font-bold">
                  {portfolioData.personal.location} - GLOBAL REMOTE
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Brutalist Form Architecture (Col span 7) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#141414] border border-[var(--border)] p-8 md:p-10 relative shadow-2xl"
          >
            <div className="flex items-center justify-between font-mono text-xs text-[#808185] uppercase tracking-widest mb-8 border-b border-[var(--border)] pb-4">
              <span>TRANSMISSION PORTAL</span>
              <span className="text-[#ECECEC]">SECURE HTTPS</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#808185] mb-2">
                  01 // SENDER_NAME
                </label>
                <input
                  type="text"
                  required
                  disabled={status === 'submitting'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="YOUR NAME / COMPANY"
                  className="w-full bg-[#1A1A1A] border border-[#5E625F]/30 focus:border-[#ECECEC] outline-none text-[#ECECEC] font-mono text-sm px-4 py-3.5 rounded-none transition-colors disabled:opacity-50"
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#808185] mb-2">
                  02 // EMAIL_COORDINATE
                </label>
                <input
                  type="email"
                  required
                  disabled={status === 'submitting'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="YOUR EMAIL ADDRESS"
                  className="w-full bg-[#1A1A1A] border border-[#5E625F]/30 focus:border-[#ECECEC] outline-none text-[#ECECEC] font-mono text-sm px-4 py-3.5 rounded-none transition-colors disabled:opacity-50"
                />
              </div>

              {/* Field 3: Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#808185] mb-2">
                  03 // DISPATCH_BRIEF
                </label>
                <textarea
                  required
                  rows={4}
                  disabled={status === 'submitting'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="DESCRIBE THE PROJECT, ROLE, OR TIMELINE"
                  className="w-full bg-[#1A1A1A] border border-[#5E625F]/30 focus:border-[#ECECEC] outline-none text-[#ECECEC] font-mono text-sm px-4 py-3.5 rounded-none transition-colors resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full flex items-center justify-between px-6 py-4 bg-[#ECECEC] hover:bg-white text-[#0A0A0A] font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50 shadow-lg"
                >
                  <span className="font-bold">
                    {status === 'submitting' ? 'TRANSMITTING BRIEF...' : 'DISPATCH MESSAGE /'}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#0A0A0A] group-hover:bg-[#9C502F] text-white flex items-center justify-center transition-colors">
                    {status === 'submitting' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </span>
                </button>
              </div>

              {/* Success / Feedback State */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-[#141414] border border-[#9C502F] text-xs text-[#ECECEC] flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#9C502F] shrink-0" />
                    <div>
                      <span className="font-bold text-[#9C502F] block">MESSAGE TRANSMITTED.</span>
                      <span className="text-[#808185]">I WILL RESPOND WITHIN 24 HOURS.</span>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-[#141414] border border-red-500/50 text-xs text-[#ECECEC] flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <div>
                        <span className="font-bold text-red-400 block">TRANSMISSION ATTEMPT FAILED.</span>
                        <span className="text-[#808185]">Server credentials may be unconfigured. Dispatch directly via email:</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="px-4 py-2 bg-red-950/40 border border-red-500/40 hover:bg-red-900/40 text-red-200 text-[11px] uppercase tracking-wider font-mono self-start cursor-pointer transition-colors"
                    >
                      OPEN DEFAULT EMAIL CLIENT ↗
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
