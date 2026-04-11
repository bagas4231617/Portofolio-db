import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';
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
    <section id="sertifikat" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold font-mono mb-16 flex items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Award size={32} className="text-green-400" />
          <span>Sertifikat & Pelatihan</span>
        </motion.h2>

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
              className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-green-400/30 transition-colors"
              variants={itemVariants}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                  <div className="text-xs font-mono text-green-400">{cert.meta}</div>
                </div>
                <ExternalLink size={18} className="text-slate-500 flex-shrink-0 mt-1" />
              </div>
              <p className="text-slate-300 text-sm mb-3">{cert.desc}</p>
              {cert.tasks && (
                <ul className="text-sm text-slate-400 space-y-2 ml-4">
                  {cert.tasks.map((task, i) => (
                    <li key={i} className="list-disc">
                      {task}
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
