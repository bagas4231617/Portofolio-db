import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, CheckCircle2, ExternalLink, Cpu } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (project) {
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when modal opens (basic focus management)
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [project]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && project) {
        onClose();
      }
    };

    if (project) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1100] flex items-center justify-center p-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl max-h-[min(85vh,800px)] overflow-y-auto w-full relative shadow-2xl shadow-blue-900/20"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Absolute Close Button with Focus Ref */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 rounded-full p-2 transition-all hover:scale-110 active:scale-95 z-10 shadow-lg shadow-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Tutup modal"
              title="Tutup (ESC)"
            >
              <X size={20} className="text-slate-300" />
            </button>

            {/* Content */}
            <div className="p-5 md:p-8">
              {/* Cinematic Image Header */}
              <div className="mb-8 rounded-xl overflow-hidden bg-slate-800 aspect-video relative border border-slate-700/50">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 font-sans text-slate-100 leading-tight">{project.title}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed text-sm md:text-base">{project.desc}</p>

              {/* Challenge & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 shadow-inner">
                  <div className="flex items-center gap-2.5 mb-3 text-slate-200 font-bold font-sans">
                    <ShieldAlert size={18} className="text-blue-400" />
                    Pernyataan Masalah
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{project.challenge}</p>
                </div>
                <div className="bg-blue-900/10 border border-blue-800/30 rounded-xl p-5 shadow-inner">
                  <div className="flex items-center gap-2.5 mb-3 text-slate-200 font-bold font-sans">
                    <CheckCircle2 size={18} className="text-blue-500" />
                    Arsitektur & Solusi
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="font-bold mb-4 text-slate-200 font-sans flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Cpu size={16} className="text-blue-500" />
                  Teknologi yang Digunakan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-cyan-300 rounded-md text-xs font-mono font-medium hover:border-blue-500/50 hover:bg-slate-800 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deployment / Link */}
              {project.link && (
                <div className="pt-6 border-t border-slate-800 flex justify-end">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-sans font-medium text-sm transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                  >
                    Lihat Dokumen & Repositori
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
