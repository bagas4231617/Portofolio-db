import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../data/portfolioData';

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

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  const projectCategories = ['Semua', ...new Set(portfolioData.projects.map((p) => p.category))];
  const filteredProjects =
    activeFilter === 'Semua'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="proyek" className="py-20 bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold font-mono mb-12 flex items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Briefcase size={32} className="text-green-400" />
          <span>Proyek & Hasil Praktik</span>
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                activeFilter === cat
                  ? 'bg-green-500/20 border border-green-400 text-green-400'
                  : 'bg-slate-900/50 border border-slate-700 text-slate-300 hover:border-green-400/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                className="group bg-slate-900/50 border border-slate-700 rounded-lg p-6 cursor-pointer hover:border-green-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:bg-slate-900/70"
                onClick={() => setSelectedProject(project)}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">{project.title}</h3>
                <p className="text-slate-300 text-sm mb-4 line-clamp-3">{project.desc}</p>
                <button className="flex items-center gap-2 text-green-400 font-mono text-sm bg-green-500/10 border border-green-500/20 px-3 py-1 rounded hover:bg-green-500/20 transition-all group-hover:translate-x-1">
                  <span>Lihat detail</span>
                  <ChevronRight 
                    size={14} 
                    className="transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
