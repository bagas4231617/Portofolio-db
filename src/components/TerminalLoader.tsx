import React from 'react';
import { motion } from 'motion/react';

export const TerminalLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-slate-950">
      <motion.div
        className="font-mono text-cyan-400 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span>[ Memuat modul...</span>
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          _
        </motion.span>
        <span> ]</span>
      </motion.div>
    </div>
  );
};
