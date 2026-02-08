import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Star, Check, Heart, ShoppingCart,
  CircleCheck, Sparkles,
} from 'lucide-react';
import { useStore } from '@context/StoreContext';
import { hexAlpha } from '@utils/color';
import { calculateDiscount } from '@utils/pricing';
import { overlayVariants, modalVariants, staggerContainer, fadeUp } from '@utils/animations';
import Badge from '@components/ui/Badge';
import Button from '@components/ui/Button';
import styles from './ProductModal.module.scss';

const BASE = import.meta.env.BASE_URL;

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  // Reset selections when product changes
  useEffect(() => {
    setSelectedColor(0);
    setSelectedVariant(0);
    setAddedToCart(false);
  }, [product?.id]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleAddToCart = useCallback(() => {
    if (addedToCart || !product) return;
    const colorName = product.colors?.[selectedColor]?.name;
    const variant = product.variants?.[selectedVariant];
    addToCart(product, colorName, variant?.label);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }, [addedToCart, product, selectedColor, selectedVariant, addToCart]);

  if (!product) return null;

  const { details } = product;
  const activeVariant = product.variants?.[selectedVariant];
  const activePrice = activeVariant?.price || product.price;
  const activeOriginalPrice = activeVariant?.originalPrice || product.originalPrice;
  const discountPct = calculateDiscount(product, selectedVariant);
  const activeColor = product.colors?.[selectedColor];
  const activeColorHex = activeColor?.hex || product.accentColor;
  const activeImage = product.image;

  const themeVars = {
    '--modal-accent': product.accentColor,
    '--modal-accent-8': hexAlpha(product.accentColor, 0.08),
    '--modal-accent-10': hexAlpha(product.accentColor, 0.1),
    '--modal-accent-15': hexAlpha(product.accentColor, 0.15),
    '--modal-accent-20': hexAlpha(product.accentColor, 0.2),
    '--modal-accent-30': hexAlpha(product.accentColor, 0.3),
    '--color-glow': activeColorHex,
    '--color-glow-15': hexAlpha(activeColorHex, 0.15),
    '--color-glow-20': hexAlpha(activeColorHex, 0.2),
    '--color-glow-30': hexAlpha(activeColorHex, 0.3),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          style={themeVars}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close */}
            <button className={styles.close} onClick={onClose} aria-label="Cerrar">
              <X size={20} />
            </button>

            <div className={styles.body}>
              <div className={styles.layout}>
                {/* Left — Showcase */}
                <div className={styles.showcase}>
                  <motion.div
                    className={styles.showcaseGlow}
                    animate={{ background: `radial-gradient(circle, ${activeColorHex} 0%, transparent 70%)` }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className={styles.showcaseRing}
                    animate={{ borderColor: hexAlpha(activeColorHex, 0.18) }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className={styles.showcaseBadge}>
                    <Badge variant={product.badge === 'Oferta' ? 'hot' : 'default'} pulse>
                      {product.badge}
                    </Badge>
                  </div>

                  <motion.img
                    key={selectedColor}
                    src={activeImage?.startsWith('http') ? activeImage : `${BASE}${activeImage?.replace(/^\//, '') || ''}`}
                    alt={`${product.title} — ${activeColor?.name || ''}`}
                    className={styles.showcaseImage}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Color Selector in Showcase */}
                  {product.colors && (
                    <div className={styles.showcaseColorsWrap}>
                      {activeColor && (
                        <motion.span
                          key={activeColor.name}
                          className={styles.colorLabel}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {activeColor.name}
                        </motion.span>
                      )}
                      <div className={styles.showcaseColors}>
                        {product.colors.map((color, i) => (
                          <button
                            key={color.name}
                            className={`${styles.colorDot} ${i === selectedColor ? styles['colorDot--active'] : ''}`}
                            style={{ '--dot-color': color.hex }}
                            onClick={() => setSelectedColor(i)}
                            aria-label={color.name}
                          >
                            {i === selectedColor && <Check size={10} strokeWidth={3} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right — Details */}
                <motion.div
                  className={styles.details}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Header */}
                  <motion.div variants={fadeUp} className={styles.detailsHeader}>
                    <span className={styles.tagline}>{product.tagline}</span>
                    <h2 className={styles.title}>{product.title}</h2>
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <span className={styles.ratingValue}>{product.rating}</span>
                      <span className={styles.ratingCount}>
                        ({product.reviews.toLocaleString()} resenas)
                      </span>
                    </div>
                  </motion.div>

                  {/* Pricing */}
                  <motion.div variants={fadeUp} className={styles.pricing}>
                    <span className={styles.price}>{activePrice}</span>
                    <span className={styles.originalPrice}>{activeOriginalPrice}</span>
                    <span className={styles.discount}>-{discountPct}%</span>
                  </motion.div>

                  {/* Description */}
                  {details?.description && (
                    <motion.p variants={fadeUp} className={styles.description}>
                      {details.description}
                    </motion.p>
                  )}

                  {/* Variant Selector */}
                  {product.variants && (
                    <motion.div variants={fadeUp} className={styles.variants}>
                      <span className={styles.variantsLabel}>{product.variantLabel}</span>
                      <div className={styles.variantOptions}>
                        {product.variants.map((v, i) => (
                          <button
                            key={v.label}
                            className={`${styles.variant} ${i === selectedVariant ? styles['variant--active'] : ''}`}
                            onClick={() => setSelectedVariant(i)}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className={styles.divider} />

                  {/* Highlights */}
                  {details?.highlights && (
                    <motion.div variants={fadeUp}>
                      <p className={styles.highlightsTitle}>Caracteristicas destacadas</p>
                      <div className={styles.highlights}>
                        {details.highlights.map((h, i) => (
                          <div key={i} className={styles.highlight}>
                            <span className={styles.highlightIcon}>
                              <CircleCheck size={12} />
                            </span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Specs */}
                  {details?.specs && (
                    <motion.div variants={fadeUp}>
                      <p className={styles.specsTitle}>Especificaciones</p>
                      <div className={styles.specs}>
                        {details.specs.map((s) => (
                          <div key={s.label} className={styles.spec}>
                            <span className={styles.specLabel}>{s.label}</span>
                            <span className={styles.specValue}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className={styles.footer}>
              <div className={styles.footerPrice}>
                <span className={styles.footerPriceLabel}>Precio total</span>
                <span className={styles.footerPriceValue}>{activePrice}</span>
              </div>

              <button
                className={`${styles.wishBtn} ${isWishlisted(product.id) ? styles['wishBtn--active'] : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Agregar a favoritos"
              >
                <Heart size={20} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>

              <Button
                variant={addedToCart ? 'primary' : 'accent'}
                size="lg"
                icon={addedToCart ? Check : ShoppingCart}
                iconPosition="left"
                onClick={handleAddToCart}
              >
                {addedToCart ? 'Agregado!' : 'Agregar al Carrito'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
