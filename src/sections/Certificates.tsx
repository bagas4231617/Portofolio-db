import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const Certificates: React.FC = () => {
  return (
    <section id="sertifikat" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900/20 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-16">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <ShieldCheck size={24} className="text-blue-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white">Sertifikasi & Pelatihan</h2>
        </div>

        <motion.div
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {portfolioData.certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-900/60 border border-slate-700/80 rounded-xl p-6 hover:border-blue-500/40 transition-colors shadow-lg"
              variants={itemVariants}
            >
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                <div>
                  <h3 className="font-bold font-sans text-xl mb-1.5 text-slate-100">{cert.title}</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">{cert.meta}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 flex-shrink-0">
                  <ShieldCheck size={20} className="text-slate-400" />
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{cert.desc}</p>
              {cert.tasks && (
                <ul className="space-y-2 mt-4 ml-1">
                  {cert.tasks.map((task, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-slate-300">
                      <ChevronRight size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
