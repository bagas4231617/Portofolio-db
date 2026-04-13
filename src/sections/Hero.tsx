import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MapPin, GraduationCap, Server, Shield, Network, Download } from 'lucide-react';
import { TypingText } from '../components/TypingText';
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
    <section id="profil" className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden bg-grid-pattern">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div>
            {/* Status Indicator */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-md mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              <span className="font-sans font-medium text-xs text-blue-300 uppercase tracking-wider">{status}</span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              className="font-mono text-base text-cyan-400 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              System Online. Halo, saya
            </motion.p>

            {/* Name */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold font-sans tracking-tight mb-4 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {name}
            </motion.h1>

            {/* Role & Tagline */}
            <motion.div
              className="text-xl md:text-2xl text-slate-300 font-sans font-medium mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-blue-400">{role}</span>
              <div className="h-6 mt-2 text-base md:text-lg text-slate-400 font-mono">
                <TypingText text={tagline} delay={40} bootSequence={false} />
              </div>
            </motion.div>

            {/* Infrastructure Insight Panel */}
            <motion.div
              className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden mb-8 max-w-lg backdrop-blur-md shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-slate-850 px-4 py-2 font-mono text-[10px] uppercase text-slate-500 border-b border-slate-800 flex justify-between items-center">
                <span>Ringkasan Infrastruktur</span>
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                </span>
              </div>
              <div className="px-5 py-5">
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{short}</p>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 font-sans text-xs text-slate-500 uppercase font-semibold tracking-wider">
                        {stat.label === 'Lokasi' && <MapPin size={12} className="text-blue-400" />}
                        {stat.label === 'Bidang' && <Network size={12} className="text-blue-400" />}
                        {stat.label === 'Fokus Utama' && <Shield size={12} className="text-blue-400" />}
                        {stat.label}
                      </span>
                      <span className="text-slate-200 text-sm font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#proyek"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-sans font-medium text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
              >
                Lihat Arsitektur
              </a>
              <a
                href="#kontak"
                className="px-6 py-2.5 bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg font-sans font-medium text-sm transition-all"
              >
                Hubungi Saya
              </a>
              <a
                href={portfolioData.personal.cvUrl}
                download
                className="px-6 py-2.5 group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-sm"
              >
                <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                <span>Unduh_Resume.pdf</span>
              </a>
            </motion.div>
          </div>

          {/* Right - Modern Network/Cloud Visual */}
          <motion.div
            className="hidden lg:flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            {/* Central Node */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite_reverse]"></div>
              
              {/* Server rack / Node graphic */}
              <div className="relative w-48 h-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col justify-between p-4 z-10 overflow-hidden group hover:border-blue-500/50 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                
                {/* Simulated Server LEDs */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <Server size={16} className="text-slate-500" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-blue-500/50 w-2/3 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-cyan-400/50 w-4/5 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                    <div className="h-full bg-blue-500/50 w-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end pb-1">
                  <span className="text-[10px] font-mono text-slate-500">SYS.OP: STABLE</span>
                  <span className="text-[10px] font-mono text-cyan-400">99.9%</span>
                </div>
              </div>
              
              {/* Connecting abstract lines (SVG) */}
              <svg className="absolute w-[150%] h-[150%] -z-10 pointer-events-none opacity-40">
                <path d="M 50 200 Q 150 50 300 200 T 550 200" fill="none" stroke="currentColor" className="text-blue-500 topology-line" strokeWidth="1" />
                <path d="M 100 100 Q 250 350 400 100 T 550 200" fill="none" stroke="currentColor" className="text-cyan-500 topology-line" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Nodes */}
                <circle cx="300" cy="200" r="4" className="fill-blue-500" />
                <circle cx="150" cy="50" r="3" className="fill-cyan-400" />
                <circle cx="250" cy="350" r="3" className="fill-slate-400" />
                <circle cx="400" cy="100" r="4" className="fill-blue-400" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-20 pt-16 border-t border-slate-800/50"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Network size={20} className="text-blue-400" />
            <h3 className="font-sans text-xl font-bold text-white tracking-tight">Keahlian Inti</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((category, catIdx) => (
              <motion.div 
                key={catIdx} 
                variants={itemVariants}
                className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 hover:bg-slate-800/40 transition-colors"
              >
                <h4 className="font-sans text-slate-200 font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/50 border border-slate-800 rounded-md text-xs font-mono text-slate-300 hover:border-blue-500/30 hover:text-blue-300 transition-all cursor-default"
                    >
                      <span>{skill.name}</span>
                      {skill.verified && (
                        <CheckCircle2 size={12} className="text-blue-400" title="Terverifikasi/Tersertifikasi" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
