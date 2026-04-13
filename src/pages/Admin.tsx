import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Inbox, AlertCircle, CheckCircle2, Search, X, Loader2, ArrowLeft, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const Admin: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { theme } = useTheme();

  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

  // Basic auth submit
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetchMessages(token);
    setLoading(false);
  };

  const fetchMessages = async (authToken: string) => {
    try {
      setError('');
      const res = await fetch(`${API_BASE}/api/messages`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Sistem gagal memuat data. Mohon pastikan Backend API berjalan!');
      }

      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', authToken);
      } else {
        setError(data.error || 'Token tidak valid');
        setIsAuthenticated(false);
        localStorage.removeItem('adminToken');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal menghubungi server. Pastikan backend berjalan.');
      setIsAuthenticated(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/messages/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) return;

      const data = await res.json();
      if (data.success) {
        setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      }
    } catch (error) {
      console.error('Gagal menandai pesan telah dibaca', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus pesan ini permanen?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) return;

      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter(m => m.id !== id));
        setSelectedMessage(null);
      } else {
        alert(data.error || 'Gagal menghapus pesan');
      }
    } catch (error) {
      console.error('Gagal menghapus pesan', error);
      alert('Terjadi kesalahan koneksi.');
    }
  };

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markAsRead(msg.id);
    }
  };

  useEffect(() => {
    if (token && !isAuthenticated) {
      fetchMessages(token);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative">
        <Link to="/" className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 font-sans text-sm transition-colors">
          <ArrowLeft size={16} /> Kembali ke Portofolio
        </Link>
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
              <Lock size={28} className="text-blue-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold font-sans text-white text-center mb-2">Login Admin</h1>
          <p className="text-slate-400 text-sm text-center mb-8">Masukan token otentikasi untuk mengakses panel pesan.</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Token Akses</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Masukkan token..."
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:outline-none text-white transition-all shadow-inner"
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Akses Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans font-sans">
      {/* Header Admin */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors" title="Kembali ke web utama">
              <ArrowLeft size={20} />
            </Link>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Inbox size={20} className="text-blue-500" />
              <span>Inbox Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full font-mono text-xs font-semibold uppercase">
              {unreadCount} Pesan Baru
            </div>
            <button 
              onClick={() => { localStorage.removeItem('adminToken'); window.location.reload(); }}
              className="text-slate-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-wider"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="p-4 w-12 text-center">Status</th>
                  <th className="p-4">Pengirim</th>
                  <th className="p-4">Email</th>
                  <th className="p-4 w-1/3">Pratinjau Pesan</th>
                  <th className="p-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">Belum ada pesan masuk.</td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr 
                      key={msg.id} 
                      onClick={() => handleOpenMessage(msg)}
                      className={`cursor-pointer hover:bg-slate-800/40 transition-colors ${!msg.isRead ? 'bg-blue-900/5' : ''}`}
                    >
                      <td className="p-4 text-center">
                        {!msg.isRead ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] mx-auto animate-pulse"></div>
                        ) : (
                          <CheckCircle2 size={16} className="text-slate-500 mx-auto" />
                        )}
                      </td>
                      <td className={`p-4 font-medium ${!msg.isRead ? 'text-white' : 'text-slate-300'}`}>{msg.name}</td>
                      <td className="p-4 text-slate-400 text-sm">{msg.email}</td>
                      <td className="p-4 text-slate-400 text-sm truncate max-w-[200px]">{msg.message}</td>
                      <td className="p-4 text-slate-500 text-xs font-mono">
                        {new Date(msg.createdAt).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white">Detail Pesan</h3>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                aria-label="Tutup Detail"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6 pb-6 border-b border-slate-800/60">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Dari</p>
                  <p className="text-white font-medium text-lg">{selectedMessage.name}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-400 text-sm hover:underline">{selectedMessage.email}</a>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Waktu Diterima</p>
                  <p className="font-mono text-sm text-slate-400">{new Date(selectedMessage.createdAt).toLocaleString('id-ID')}</p>
                  <p className="text-xs text-slate-600 mt-1">ID: {selectedMessage.id.split('-')[0]}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Isi Pesan</p>
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-5">
                  <p className="whitespace-pre-wrap text-slate-300 leading-relaxed text-sm">{selectedMessage.message}</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex justify-between">
              <button 
                onClick={() => deleteMessage(selectedMessage.id)}
                className="px-4 py-2.5 flex items-center justify-center gap-2 text-red-500 hover:text-white hover:bg-red-600/90 text-sm font-semibold rounded-lg transition-all"
              >
                <Trash2 size={16} /> Hapus Pesan
              </button>
              <a 
                href={`mailto:${selectedMessage.email}?subject=Balasan dari Portofolio`}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2"
              >
                Balas via Email
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
