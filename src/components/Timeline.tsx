import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const Timeline: React.FC = () => {
  return (
    <section id="riwayat" className="py-20 bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold font-mono mb-16 flex items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Calendar size={32} className="text-green-400" />
          <span>Riwayat & Pengalaman</span>
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {portfolioData.experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="flex gap-6"
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-green-400 shadow-lg shadow-green-400/50 mt-2"></div>
                {idx < portfolioData.experiences.length - 1 && (
                  <div className="w-1 h-24 bg-gradient-to-b from-green-400/50 to-slate-700"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="text-sm font-mono text-green-400 mb-1">{exp.year}</div>
                <h3 className="text-xl font-bold font-mono mb-1 text-white">{exp.title}</h3>
                <h4 className="text-sm text-slate-400 font-mono mb-3">{exp.institution}</h4>
                <p className="text-slate-300 leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
