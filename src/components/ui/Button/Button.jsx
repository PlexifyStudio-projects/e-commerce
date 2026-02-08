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
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
