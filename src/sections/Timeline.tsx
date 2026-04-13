import React from 'react';
import { motion } from 'motion/react';
import { Route } from 'lucide-react';
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
    <section id="riwayat" className="py-20 bg-slate-900/30 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Route size={24} className="text-blue-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white">Riwayat Pengalaman</h2>
        </div>

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
              className="flex gap-4 sm:gap-6 group"
              variants={itemVariants}
            >
              {/* Timeline Dot & Line - Fixed width container for alignment */}
              <div className="flex flex-col items-center flex-shrink-0 w-6 sm:w-8">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] mt-2 group-hover:scale-125 transition-transform duration-300"></div>
                {idx < portfolioData.experiences.length - 1 && (
                  <div className="w-0.5 flex-grow min-h-[80px] bg-gradient-to-b from-blue-500/50 to-slate-800 mt-3 group-hover:from-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"></div>
                )}
              </div>

              {/* Content - Flex-1 with proper text wrapping */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="inline-flex px-2 py-0.5 rounded text-xs sm:text-sm font-mono text-cyan-400 bg-cyan-900/20 border border-cyan-800/50 mb-3">{exp.year}</div>
                <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight mb-1 text-slate-100 leading-snug group-hover:text-blue-300 transition-colors">{exp.title}</h3>
                <h4 className="text-sm font-sans font-medium text-slate-400 mb-4">{exp.institution}</h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed break-words bg-slate-900/40 p-4 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
