import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  delay?: number;
  bootSequence?: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({ text, delay = 100, bootSequence = false }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(bootSequence);
  const [currentBootIndex, setCurrentBootIndex] = useState(0);

  const serverBootSequence = [
    '[ OK ] Starting Network Manager...',
    '[ OK ] Establishing secure connection...',
    '[ OK ] Loading kernel modules...',
    '[ OK ] Mounting file systems...',
    '[ OK ] Starting system services...',
    '[ OK ] Fetching profile data...'
  ];

  useEffect(() => {
    if (bootSequence && isBooting) {
      if (currentBootIndex < serverBootSequence.length) {
        const timeout = setTimeout(() => {
          setBootMessages(prev => [...prev, serverBootSequence[currentBootIndex]]);
          setCurrentBootIndex(prev => prev + 1);
        }, 400);
        return () => clearTimeout(timeout);
      } else {
        // Boot sequence complete, start typing main text
        setIsBooting(false);
      }
    }
  }, [bootSequence, isBooting, currentBootIndex]);

  useEffect(() => {
    if (!isBooting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, isBooting]);

  if (bootSequence && isBooting) {
    return (
      <div className="font-mono text-sm">
        {bootMessages.map((message, idx) => (
          <div key={idx} className="text-green-400 mb-1">
            {message}
          </div>
        ))}
        {currentBootIndex < serverBootSequence.length && (
          <span className="animate-pulse text-green-400">_</span>
        )}
      </div>
    );
  }

  return (
    <span className="inline-block">
      {bootSequence && bootMessages.length > 0 && (
        <div className="mb-2">
          {bootMessages.map((message, idx) => (
            <div key={idx} className="text-green-400 text-xs mb-1 opacity-60">
              {message}
            </div>
          ))}
        </div>
      )}
      {currentText}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </span>
  );
};
