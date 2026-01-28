import { motion } from 'framer-motion';
import styles from './Button.module.scss';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  href,
  className = '',
  ...props
}) => {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className={styles.btn__icon} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={styles.btn__icon} />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
