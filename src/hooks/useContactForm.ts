import { useState, useCallback } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseContactFormReturn {
  formStatus: FormStatus;
  isSubmitting: boolean;
  submitForm: (formData: FormData, endpoint: string) => Promise<{ success: boolean; error?: string }>;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const submitForm = useCallback(async (
    formData: FormData, 
    endpoint: string // Now expecting the local backend URL ideally, but we will ignore Formspree URL and use localhost
  ): Promise<{ success: boolean; error?: string }> => {
    setFormStatus('submitting');
    
    // Create AbortController for timeout handling (10 second timeout)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const dataObj = Object.fromEntries(formData.entries());

    try {
      // Menggunakan relative URL yang akan di-proxy oleh Vite di local development
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const apiUrl = `${API_BASE}/api/messages`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Pastikan response adalah JSON sebelum di-parse
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error('Format respons tidak valid:', await response.text());
        throw new Error('Server mengirimkan format yang salah (bukan JSON). Pastikan backend API aktif menyala.');
      }

      const data = await response.json();

      if (!response.ok) {
        let userFriendlyError = data.error || 'Terjadi kesalahan pada server';
        
        switch (response.status) {
          case 400:
          case 422:
            userFriendlyError = data.error || 'Data yang dikirim tidak valid. Mohon periksa kembali input Anda.';
            break;
          case 429:
            userFriendlyError = 'Terlalu banyak request. Silakan tunggu beberapa saat lagi.';
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            userFriendlyError = 'Kesalahan server. Silakan coba lagi nanti.';
            break;
        }
        
        setFormStatus('error');
        return { success: false, error: userFriendlyError };
      }

      if (data.success) {
        setFormStatus('success');
        // Auto-reset after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
        return { success: true };
      } else {
        setFormStatus('error');
        return { success: false, error: data.error || 'Gagal mengirim pesan. Silakan coba lagi.' };
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      let errorMessage: string;
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Waktu permintaan habis (timeout). Periksa koneksi Anda dan coba lagi.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Kesalahan jaringan atau backend tidak berjalan. Pastikan API server aktif.';
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = 'Terjadi kesalahan tidak terduga.';
      }
      
      setFormStatus('error');
      return { success: false, error: errorMessage };
    }
  }, []);

  const resetForm = useCallback((): void => {
    setFormStatus('idle');
  }, []);

  return {
    formStatus,
    isSubmitting: formStatus === 'submitting',
    submitForm,
    resetForm,
  };
};
