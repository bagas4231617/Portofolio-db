import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Profil', href: '#profil' },
    { label: 'Pengalaman', href: '#riwayat' },
    { label: 'Sertifikasi', href: '#sertifikat' },
    { label: 'Proyek', href: '#proyek' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="fixed top-0 w-full bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-xl z-[1000] border-b border-slate-800 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="font-sans font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <Activity size={24} className="text-blue-500" />
              <span>MBMA_</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-blue-900/20 border border-blue-500/20 rounded-full cursor-default">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              <span className="font-mono text-xs text-blue-300 font-medium">SYS.ONLINE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-blue-400 transition-colors font-sans font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            {/* Keeping theme toggle but it might need refactoring in the future if light mode is problematic */}
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-blue-400 transition-colors p-1"
              aria-label="Ubah tema"
              title={`Beralih ke tema ${theme === 'dark' ? 'terang' : 'gelap'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="Ubah tema"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-slate-400 hover:text-blue-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu penjelajahan"
              title={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
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
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              <div className="font-sans font-semibold text-xs text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Navigasi Utama</div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg px-3 transition-colors font-sans font-medium text-sm py-3"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
