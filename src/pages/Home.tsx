import React, { Suspense } from 'react';
import { Network, Globe, Server, Shield } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { TerminalLoader } from '../components/TerminalLoader';
import { portfolioData } from '../data/portfolioData';

// Dynamic imports for code splitting
const Timeline = React.lazy(() => import('../sections/Timeline').then(m => ({ default: m.Timeline })));
const Certificates = React.lazy(() => import('../sections/Certificates').then(m => ({ default: m.Certificates })));
const Projects = React.lazy(() => import('../sections/Projects').then(m => ({ default: m.Projects })));
const Contact = React.lazy(() => import('../sections/Contact').then(m => ({ default: m.Contact })));

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Suspense fallback={<TerminalLoader />}>
          <Timeline />
        </Suspense>
        <Suspense fallback={<TerminalLoader />}>
          <Certificates />
        </Suspense>
        <Suspense fallback={<TerminalLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<TerminalLoader />}>
          <Contact />
        </Suspense>
      </main>

      <footer className="border-t border-slate-800 py-8 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-sans font-medium text-sm mb-4">
            &copy; {new Date().getFullYear()} Muhammad Bagas Malik Albani. {portfolioData.footer}
          </p>
          <div className="flex justify-center gap-6 text-slate-600">
            <Network size={18} />
            <Server size={18} />
            <Shield size={18} />
            <Globe size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
};
