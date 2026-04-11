import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Profil', href: '#profil' },
    { label: 'Riwayat', href: '#riwayat' },
    { label: 'Sertifikat', href: '#sertifikat' },
    { label: 'Proyek', href: '#proyek' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="fixed top-0 w-full bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-xl z-1000 border-b border-slate-800 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="font-mono font-bold text-lg text-green-400">MBMA_ROOT</div>
            <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-xs text-green-400">Uplink: Online</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-green-400 transition-colors font-mono text-sm"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-green-400 transition-colors"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-green-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-slate-400 hover:text-green-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-900 border-t border-slate-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-3">
              <div className="font-mono text-xs text-slate-500 mb-3">root@mbma-mobile:~# ls -l ./navigasi</div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-green-400 transition-colors font-mono text-sm py-2"
                >
                  <span className="text-green-400 mr-2">{'>'}</span>
                  {link.label}.sh
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
