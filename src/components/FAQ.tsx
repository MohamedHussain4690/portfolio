'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Plus, X } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = portfolioData.faq;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" data-canvas="light" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#F4F4F4] text-[#0A0A0A] overflow-hidden border-b border-[#E2E2E2]">
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
            08 / RECRUITER FAQ/
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
            FREQUENTLY ASKED <span className="text-[#9C502F]">QUESTIONS</span>
          </h2>
        </motion.div>

        {/* 3-Column Editorial Accordion Grid Container */}
        <div className="border-t border-[#0A0A0A]/10 divide-y divide-[#0A0A0A]/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                onClick={() => toggleFaq(idx)}
                className="py-8 group cursor-pointer transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Column 1 (Index): Monospace slash index */}
                  <div className="lg:col-span-2 font-mono text-sm text-[#5E625F] uppercase tracking-wider flex items-center gap-3">
                    <span className="text-[#9C502F] font-bold">SL</span>
                    <span>{faq.number}</span>
                  </div>

                  {/* Column 2 (Question): Uppercase bold question heading */}
                  <div className="lg:col-span-6 flex items-center justify-between pr-4">
                    <h3 className="text-lg md:text-xl font-semibold uppercase tracking-tight text-[#0A0A0A] group-hover:text-[#9C502F] transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Column 3 (Expand Indicator & Answer Container) */}
                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div className="flex items-center justify-end">
                      <div className="w-8 h-8 rounded-full bg-[#E2E2E2] text-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                        {isOpen ? <X className="w-4 h-4 text-[#9C502F]" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Expanded Answer Row with Framer Motion Height Animation */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-[#0A0A0A]/10 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-2 font-mono text-xs text-[#9C502F] uppercase tracking-widest">
                          ANSWER_METRIC
                        </div>
                        <div className="lg:col-span-10">
                          <p className="text-sm md:text-base text-[#2A2A2A] leading-relaxed max-w-xl font-sans uppercase font-medium tracking-tight">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
