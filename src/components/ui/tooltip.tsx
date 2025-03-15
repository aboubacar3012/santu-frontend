import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 0.2,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const positionStyles = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      mb: '8px',
      initial: { opacity: 0, y: 5 },
      animate: { opacity: 1, y: 0 },
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      mt: '8px',
      initial: { opacity: 0, y: -5 },
      animate: { opacity: 1, y: 0 },
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      mr: '8px',
      initial: { opacity: 0, x: 5 },
      animate: { opacity: 1, x: 0 },
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      ml: '8px',
      initial: { opacity: 0, x: -5 },
      animate: { opacity: 1, x: 0 },
    },
  };

  const currentPosition = positionStyles[position];

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={currentPosition.initial}
            animate={currentPosition.animate}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              [currentPosition.bottom]: '0',
              [currentPosition.top]: '0',
              [currentPosition.left]: '0',
              [currentPosition.right]: '0',
              transform: currentPosition.transform,
              marginBottom: position === 'top' ? '8px' : undefined,
              marginTop: position === 'bottom' ? '8px' : undefined,
              marginLeft: position === 'right' ? '8px' : undefined,
              marginRight: position === 'left' ? '8px' : undefined,
              zIndex: 50,
            }}
            className="whitespace-nowrap bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none shadow-md"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
