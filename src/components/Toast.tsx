import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        >
          <div className="bg-slate-900 border border-green-500/20 rounded-lg px-4 py-3 font-mono text-sm text-white shadow-lg shadow-green-500/10">
            <span className="text-green-400 mr-2">_</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
