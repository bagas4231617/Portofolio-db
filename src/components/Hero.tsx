import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MapPin, GraduationCap, Briefcase, Terminal, Download } from 'lucide-react';
import { TypingText } from './TypingText';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const Hero: React.FC = () => {
  const { name, role, tagline, status } = portfolioData.personal;
  const { short, stats } = portfolioData.about;
  const skills = portfolioData.skills;

  return (
    <section id="profil" className="min-h-screen pt-32 pb-20 flex flex-col justify-center">
      {/* Main Hero Content */}
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Left Content */}
          <div>
            {/* Status Indicator */}
            <motion.div
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="font-mono text-xs text-green-400">{status}</span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              className="font-mono text-lg text-green-400 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Halo, saya
            </motion.p>

            {/* Name */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {name}
            </motion.h1>

            {/* Tagline with Typing - PERBAIKAN: Gunakan motion.div, bukan motion.p */}
            <motion.div
              className="text-xl md:text-2xl text-slate-400 font-mono mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TypingText text={tagline} delay={50} bootSequence={true} />
            </motion.div>

            {/* Terminal About Box */}
            <motion.div
              className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-400 border-b border-slate-700">
                <span>user@portfolio:~/about$ cat profile.txt</span>
              </div>
              <div className="px-4 py-4">
                <p className="text-slate-300 text-sm mb-4">{short}</p>
                <ul className="space-y-2 border-t border-slate-700 pt-4">
                  {stats.map((stat, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-mono text-xs text-slate-400">
                      {stat.label === 'Lokasi' && <MapPin size={14} className="text-green-400" />}
                      {stat.label === 'Status' && <GraduationCap size={14} className="text-green-400" />}
                      {stat.label === 'Fokus' && <Briefcase size={14} className="text-green-400" />}
                      <span className="text-slate-300">{stat.label}:</span>
                      <span className="text-green-400">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#proyek"
                className="px-5 py-2 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20 rounded font-mono text-sm transition-all"
              >
                [ ./lihat_proyek.sh ]
              </a>
              <a
                href="#kontak"
                className="px-5 py-2 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20 rounded font-mono text-sm transition-all"
              >
                [ ./hubungi_saya.sh ]
              </a>
              <a
                href={portfolioData.personal.cvUrl}
                download
                className="px-5 py-2 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20 rounded font-mono text-sm flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-green-400/20"
              >
                <Download size={14} />
                [ $ curl -O resume.pdf ]
              </a>
            </motion.div>
          </div>

          {/* Right - Hexagon Avatar */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Animated Background Glow - Hexagon */}
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-3xl"
                style={{
                  background:
                    'linear-gradient(45deg, rgb(74, 222, 128), rgb(34, 197, 94))',
                  clipPath:
                    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  animation: 'spin 10s linear infinite',
                }}
              ></div>

              {/* Hexagon Outer Border */}
              <div
                className="relative w-72 h-72 border-2 border-green-400 bg-slate-900 flex items-center justify-center shadow-lg shadow-green-400/20"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  boxShadow: 'inset 0 0 30px rgba(74, 222, 128, 0.1), 0 0 30px rgba(74, 222, 128, 0.2)',
                }}
              >
                {/* Hexagon Inner */}
                <div
                  className="w-64 h-64 bg-slate-950 flex items-center justify-center text-4xl font-bold font-mono text-green-400"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    textShadow: '0 0 15px rgba(74, 222, 128, 0.5)',
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(74, 222, 128, 0.03) 2px, rgba(74, 222, 128, 0.03) 4px)',
                  }}
                >
                  MBMA
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-slate-800"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="font-mono text-sm text-slate-500 mb-8">
            <span className="text-slate-600">bagas@server:~$</span> cat ~/.skills
            <span className="animate-pulse text-green-400">_</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((category, catIdx) => (
              <motion.div key={catIdx} variants={itemVariants}>
                <h4 className="font-mono text-green-400 text-sm font-bold mb-4">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-xs font-mono hover:border-green-400/50 transition-colors"
                      variants={itemVariants}
                    >
                      <Terminal size={12} className="text-green-400" />
                      <span className="text-slate-300">{skill.name}</span>
                      {skill.verified && (
                        <CheckCircle2 size={12} className="text-green-400 ml-1" title="Sertifikasi/Tervalidasi" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
