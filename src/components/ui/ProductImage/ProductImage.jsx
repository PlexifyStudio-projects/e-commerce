import { useState } from 'react';
import { Package } from 'lucide-react';
import styles from './ProductImage.module.scss';

const BASE = import.meta.env.BASE_URL;

const ProductImage = ({
  src,
  alt,
  className = '',
  accentColor,
  icon: Icon,
  ...props
}) => {
  const [failed, setFailed] = useState(false);

  const resolvedSrc =
    src?.startsWith('http') ? src : `${BASE}${(src || '').replace(/^\//, '')}`;

  if (failed || !src) {
    const FallbackIcon = Icon || Package;
    return (
      <div
        className={`${styles.fallback} ${className}`}
        style={accentColor ? { '--pi-accent': accentColor } : undefined}
      >
        <FallbackIcon size={32} strokeWidth={1.2} />
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt || ''}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
  );
};

export default ProductImage;
