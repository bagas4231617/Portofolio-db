import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Mail, Linkedin, Github, Smartphone, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Toast } from '../components/Toast';
import { useContactForm } from '../hooks/useContactForm';

export const Contact: React.FC = () => {
  const { formStatus, isSubmitting, submitForm } = useContactForm();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [lastError, setLastError] = useState<string>('');

  const showToast = (message: string): void => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!navigator.onLine) {
      setLastError('Tidak ada koneksi internet');
      showToast('Status: OFFLINE - Periksa ulang koneksi internet Anda');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const result = await submitForm(formData, portfolioData.personal.formspreeEndpoint);
    
    if (result.success) {
      setLastError('');
      showToast('Status: 200 OK - Pesan Berhasil Terkirim');
      (e.currentTarget as HTMLFormElement).reset();
    } else {
      setLastError(result.error || 'Terjadi kesalahan');
      showToast(`Status: ERROR - ${result.error || 'Terjadi kesalahan tidak dikenal'}`);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: portfolioData.social.linkedin, label: 'LinkedIn', title: 'LinkedIn' },
    { icon: Github, href: portfolioData.social.github, label: 'GitHub', title: 'GitHub' },
    { icon: Smartphone, href: portfolioData.social.whatsapp, label: 'WhatsApp', title: 'WhatsApp' },
    { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: 'Email', title: 'Email' },
  ];

  return (
    <section id="kontak" className="py-20 bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-16">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <MessageSquare size={24} className="text-blue-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white">Hubungi Saya</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 font-sans text-slate-100">Mari Berkolaborasi</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
                Saya secara aktif mencari peluang kerja maupun kolaborasi proyek di bidang integrasi jaringan komputer dan infrastruktur <i>cloud</i>. Silakan hubungi saya melalui formulir ini atau kanal profesional di bawah.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold mb-4 text-sm font-sans tracking-wider text-slate-300 uppercase">Kanal Komunikasi</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, title }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-800 transition-all shadow-sm"
                    title={title}
                    aria-label={title}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-md mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Alamat Email</p>
                  <p className="text-blue-400 font-sans font-medium text-sm break-all">{portfolioData.personal.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Data Lokasi</p>
                  <p className="text-blue-400 font-sans font-medium text-sm">{portfolioData.personal.location}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Kontak Telepon Utama</p>
                  <p className="text-blue-400 font-sans font-medium text-sm">{portfolioData.personal.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="space-y-5 bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-800"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            aria-label="Formulir kontak"
          >
            {/* Honeypot field (hidden from users, traps bots) */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="company">Nama Perusahaan (Optional)</label>
              <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className="block font-sans font-medium text-sm text-slate-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-disabled={isSubmitting}
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-sans font-medium text-sm text-slate-300 mb-2">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-disabled={isSubmitting}
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-sans font-medium text-sm text-slate-300 mb-2">
                Pesan / Keterangan
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Silakan sampaikan pesan atau penawaran Anda..."
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-disabled={isSubmitting}
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all text-white placeholder-slate-600 resize-y disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            {/* Error Message Display */}
            {formStatus === 'error' && lastError && (
              <div 
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-sans flex items-center gap-2"
                role="alert"
                aria-live="assertive"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-ping"></div>
                <span><span className="font-bold">Error:</span> {lastError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`w-full px-4 py-3 rounded-lg font-sans font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                formStatus === 'success'
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]'
                  : formStatus === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} className={formStatus === 'success' ? 'hidden' : ''} />
              )}
              {formStatus === 'idle' && 'Kirim Pesan'}
              {isSubmitting && 'Mengirim Data...'}
              {formStatus === 'success' && 'Pesan Terkirim'}
              {formStatus === 'error' && 'Gagal Mengirim'}
            </button>
          </motion.form>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
};
