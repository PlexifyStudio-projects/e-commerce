import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimatedIcon.module.scss';

const AnimatedIcon = ({
  icon: Icon,
  size = 22,
  strokeWidth = 1,
  className = '',
  label,
  badge,
  onClick,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconElement = (
    <motion.div
      className={`${styles.wrapper} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.85 }}
    >
      {/* Icon container — animates on hover */}
      <motion.div
        className={styles.iconBox}
        animate={isHovered ? {
          scale: 1.2,
          y: -2,
        } : {
          scale: 1,
          y: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 15,
        }}
      >
        {/* Static icon (fades out) */}
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -15 }}
              transition={{ duration: 0.2 }}
              className={styles.iconInner}
            >
              <Icon
                size={size}
                strokeWidth={strokeWidth}
              />
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 18,
              }}
              className={`${styles.iconInner} ${styles['iconInner--active']}`}
            >
              <Icon
                size={size}
                strokeWidth={strokeWidth + 0.5}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Glow ring behind icon */}
      <motion.div
        className={styles.glow}
        initial={false}
        animate={isHovered ? {
          opacity: 1,
          scale: 1,
        } : {
          opacity: 0,
          scale: 0.5,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Badge */}
      {badge !== undefined && (
        <motion.span
          className={styles.badge}
          animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          {badge}
        </motion.span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} aria-label={label} className={styles.link}>
        {iconElement}
      </a>
    );
  }

  return (
    <button onClick={onClick} aria-label={label} className={styles.link}>
      {iconElement}
    </button>
  );
};

export default AnimatedIcon;
