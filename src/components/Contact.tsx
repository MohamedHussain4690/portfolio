'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineReveal } from './TextReveal';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        alert(data.error || 'Failed to send message. Please try again.');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again later.');
      setStatus('idle');
    }
  };

  return (
    <section className="relative py-8 md:py-12 px-8 md:px-16 lg:px-24 overflow-hidden border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left: Giant Heading & Direct Contact */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] block mb-6">
              006 / CONTACT
            </span>
            
            <LineReveal
              as="h2"
              stagger={0.08}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.95]"
            >
              LET&apos;S
              <br />
              <span className="text-[var(--accent-lime)]">BUILD.</span>
            </LineReveal>

            <motion.p
              className="mt-8 text-lg text-[var(--muted)] leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Have a project in mind, an AI system to scale, or want to collaborate? 
              Reach out directly or drop a transmission through the terminal.
            </motion.p>

            <motion.div
              className="mt-8 space-y-4 font-mono text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-lime)]">&gt;</span>
                <span className="text-[var(--muted)]">EMAIL:</span>
                <a href="mailto:mhhussain4690@gmail.com" className="text-[var(--fg)] hover:text-[var(--accent-lime)] transition-colors underline decoration-[var(--accent-lime)]/50 underline-offset-4">
                  mhhussain4690@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-lime)]">&gt;</span>
                <span className="text-[var(--muted)]">GITHUB:</span>
                <a href="https://github.com/MohamedHussain4690" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] hover:text-[var(--accent-lime)] transition-colors underline decoration-[var(--accent-lime)]/50 underline-offset-4">
                  github.com/MohamedHussain4690
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent-lime)]">&gt;</span>
                <span className="text-[var(--muted)]">LINKEDIN:</span>
                <a href="https://www.linkedin.com/in/mohamed-hussain-n-" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] hover:text-[var(--accent-ice)] transition-colors underline decoration-[var(--accent-ice)]/50 underline-offset-4">
                  linkedin.com/in/mohamed-hussain-n-
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--card)] border border-[var(--border)] relative"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 font-mono text-xs text-[var(--muted)] px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded">
                transmission.sh
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 font-mono">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                  <span className="text-[var(--accent-lime)] mr-2">&gt;</span>ENTER_NAME
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-[var(--fg)] rounded-none focus:outline-none focus:border-[var(--accent-lime)] transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                  <span className="text-[var(--accent-lime)] mr-2">&gt;</span>ENTER_EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-[var(--fg)] rounded-none focus:outline-none focus:border-[var(--accent-lime)] transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                  <span className="text-[var(--accent-lime)] mr-2">&gt;</span>ENTER_TRANSMISSION_MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-[var(--fg)] rounded-none focus:outline-none focus:border-[var(--accent-lime)] transition-colors text-sm resize-none"
                  placeholder="Let's discuss an AI project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="w-full bg-[var(--accent-lime)] text-[var(--bg)] font-bold uppercase tracking-wider py-4 rounded-none hover:bg-[#B8DB00] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {status === 'submitting' && 'TRANSMITTING...'}
                {status === 'success' && 'TRANSMISSION RECEIVED ✓'}
                {status === 'idle' && 'EXECUTE TRANSMISSION →'}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[var(--accent-lime)]/10 border border-[var(--accent-lime)] text-[var(--accent-lime)] text-xs text-center"
                >
                  SUCCESS: Message dispatched to Mohamed Hussain N. Expect response shortly.
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}