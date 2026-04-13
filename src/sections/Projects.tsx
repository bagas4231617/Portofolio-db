import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectModal } from '../components/ProjectModal';
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
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Server size={24} className="text-blue-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white">Arsitektur & Projek</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-sans font-medium text-sm transition-all ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-blue-500/50 hover:bg-slate-800'
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
                className="group bg-slate-900/60 border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_8_30px_rgba(37,99,235,0.12)] flex flex-col"
                onClick={() => setSelectedProject(project)}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-1">
                  <h3 className="font-bold font-sans text-xl mb-3 leading-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{project.desc}</p>
                </div>
                <button className="flex items-center w-max gap-2 text-blue-400 font-sans font-medium text-sm bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                  <span>Lihat Spesifikasi</span>
                  <ChevronRight 
                    size={16} 
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
