import { useState, useCallback } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseContactFormReturn {
  formStatus: FormStatus;
  submitForm: (formData: FormData, endpoint: string) => Promise<void>;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const submitForm = useCallback(async (formData: FormData, endpoint: string): Promise<void> => {
    setFormStatus('submitting');
    
    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.ok) {
        setFormStatus('success');
        // Auto-reset after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout. Please check your connection and try again.');
        }
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
      }
      
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }, []);

  const resetForm = useCallback((): void => {
    setFormStatus('idle');
  }, []);

  return {
    formStatus,
    submitForm,
    resetForm,
  };
};
