import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Mail, Linkedin, Github, Smartphone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Toast } from './Toast';
import { useContactForm } from '../hooks/useContactForm';

export const Contact: React.FC = () => {
  const { formStatus, submitForm, resetForm } = useContactForm();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = (message: string): void => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!navigator.onLine) {
      showToast('$ status: OFFLINE - Please check your internet connection');
      return;
    }

    showToast('$ systemctl start sending_email...');
    
    const formData = new FormData(e.currentTarget);

    try {
      await submitForm(formData, portfolioData.personal.formspreeEndpoint);
      showToast('$ status: 200 OK - Pesan Terkirim');
      (e.currentTarget as HTMLFormElement).reset();
    } catch (error) {
      showToast(`$ status: ERROR - ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: portfolioData.social.linkedin, label: 'LinkedIn', title: 'LinkedIn' },
    { icon: Github, href: portfolioData.social.github, label: 'GitHub', title: 'GitHub' },
    { icon: Smartphone, href: portfolioData.social.whatsapp, label: 'WhatsApp', title: 'WhatsApp' },
    { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: 'Email', title: 'Email' },
  ];

  return (
    <section id="kontak" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold font-mono mb-16 flex items-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <MessageSquare size={32} className="text-green-400" />
          <span>Kontak Saya</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Mari Terhubung</h3>
              <p className="text-slate-300 mb-8">
                Saya terbuka untuk peluang kerja, kolaborasi proyek, atau sekadar berdiskusi tentang teknologi jaringan
                dan server. Silakan hubungi saya melalui formulir atau media sosial.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold mb-4 text-sm">Media Sosial:</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, title }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-400/50 transition-all"
                    title={title}
                    aria-label={title}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info Box */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-sm">
              <p className="text-slate-400 mb-2">Email:</p>
              <p className="text-green-400 font-mono mb-4">{portfolioData.personal.email}</p>
              <p className="text-slate-400 mb-2">Lokasi:</p>
              <p className="text-green-400 font-mono">{portfolioData.personal.location}</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <label htmlFor="name" className="block font-mono text-sm text-slate-400 mb-2">
                $ whoami --name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nama Lengkap"
                required
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded focus:border-green-400 focus:outline-none transition-colors text-white placeholder-slate-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-sm text-slate-400 mb-2">
                $ mail --to
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Alamat Email"
                required
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded focus:border-green-400 focus:outline-none transition-colors text-white placeholder-slate-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-sm text-slate-400 mb-2">
                $ cat --message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Pesan Anda..."
                required
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded focus:border-green-400 focus:outline-none transition-colors text-white placeholder-slate-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className={`w-full px-4 py-2 rounded font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                formStatus === 'success'
                  ? 'bg-blue-500 text-white'
                  : formStatus === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              <Send size={16} className={formStatus === 'submitting' ? 'animate-spin' : ''} />
              {formStatus === 'idle' && 'Kirim Pesan'}
              {formStatus === 'submitting' && (
                <span className="flex items-center gap-1">
                  <span>[ Executing script</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    /
                  </motion.span>
                  <span> ]</span>
                </span>
              )}
              {formStatus === 'success' && '[ Pesan Terkirim! ]'}
              {formStatus === 'error' && '[ Gagal Mengirim! ]'}
            </button>
          </motion.form>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
};
