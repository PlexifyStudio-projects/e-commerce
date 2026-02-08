/** Shared Framer Motion variants used across multiple components. */

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const staggerContainer = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

export const contentVariants = {
  enter: { opacity: 0, y: 40, filter: 'blur(10px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: 'blur(6px)',
    transition: { duration: 0.35 },
  },
};

export const childVariants = {
  enter: { opacity: 0, y: 25 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15 },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25 },
  },
};
