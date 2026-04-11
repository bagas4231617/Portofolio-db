import React, { Suspense, useEffect } from 'react';
import { Terminal, Globe, Code2, Cpu } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TerminalLoader } from './components/TerminalLoader';

// Dynamic imports for code splitting
const Timeline = React.lazy(() => import('./components/Timeline').then(m => ({ default: m.Timeline })));
const Certificates = React.lazy(() => import('./components/Certificates').then(m => ({ default: m.Certificates })));
const Projects = React.lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Contact = React.lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));

const AppContent: React.FC = () => {
  useEffect(() => {
    // Handle ESC key to close modals (delegated to child components)
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Modal closing handled in ProjectModal component
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Timeline Section */}
        <Suspense fallback={<TerminalLoader />}>
          <Timeline />
        </Suspense>

        {/* Certificates Section */}
        <Suspense fallback={<TerminalLoader />}>
          <Certificates />
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={<TerminalLoader />}>
          <Projects />
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<TerminalLoader />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-mono text-sm mb-4">
            &copy; {new Date().getFullYear()} Muhammad Bagas Malik Albani. Built with React & Terminal Aesthetics.
          </p>
          <div className="flex justify-center gap-6 text-slate-600">
            <Terminal size={18} />
            <Globe size={18} />
            <Code2 size={18} />
            <Cpu size={18} />
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
