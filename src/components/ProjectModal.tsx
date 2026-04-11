import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, CheckCircle2, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (project) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1100] flex items-center justify-center p-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-900 backdrop-blur-2xl border border-slate-700/50 rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto w-full relative shadow-2xl shadow-slate-900/50"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Absolute Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm rounded-full p-2 transition-all hover:scale-110 active:scale-95 z-10 shadow-lg shadow-slate-900/50"
              aria-label="Close modal"
              title="Close (ESC)"
            >
              <X size={20} className="text-slate-300" />
            </button>

            {/* Content */}
            <div className="p-4 md:p-8">
              {/* Cinematic Image Header */}
              <div className="mb-6 rounded-lg overflow-hidden bg-slate-800 aspect-video relative">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold mb-4 text-white leading-tight">{project.title}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed text-base">{project.desc}</p>

              {/* Challenge & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 text-red-400 font-bold">
                    <Shield size={20} />
                    Tantangan
                  </div>
                  <p className="text-slate-300 leading-relaxed">{project.challenge}</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 text-green-400 font-bold">
                    <CheckCircle2 size={20} />
                    Solusi
                  </div>
                  <p className="text-slate-300 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="font-bold mb-4 text-white text-lg">Tech Stack:</h4>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-sm font-mono hover:bg-green-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Terminal & Link */}
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden mb-6 backdrop-blur-sm">
                <div className="flex gap-2 px-4 py-3 bg-slate-900/50 border-b border-slate-700/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="p-5 font-mono text-sm">
                  <p className="text-slate-400 mb-2">$ fetching project_data...</p>
                  <p className="text-green-400 mb-1">{'>'} status: 200 OK</p>
                  <p className="text-green-400">{'>'} connection: secured</p>
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20 rounded-lg font-mono text-sm transition-all hover:shadow-lg hover:shadow-green-400/20"
                >
                  <ExternalLink size={16} />
                  Buka Repositori / Dokumentasi
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
