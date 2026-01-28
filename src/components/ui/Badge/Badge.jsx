import styles from './Badge.module.scss';

const Badge = ({ children, variant = 'default', pulse = false }) => {
  const classes = [
    styles.badge,
    styles[`badge--${variant}`],
    pulse && styles['badge--pulse'],
  ].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
};

export default Badge;
