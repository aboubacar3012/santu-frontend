export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      duration: 0.5,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

export const imageFloatingVariants = {
  animate: {
    y: [0, -15, 0],
    scale: [1, 1.03, 1],
    filter: ['brightness(1)', 'brightness(1.05)', 'brightness(1)'],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

export const buttonVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.6, type: 'spring', stiffness: 120 },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
};
