import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Star, ShoppingCart, Heart, Check, Eye, Flame,
} from 'lucide-react';
import { NEW_ARRIVALS } from '@data/navigation';
import { useStore } from '@context/StoreContext';
import Badge from '@components/ui/Badge';
import ProductModal from '@components/ProductModal';
import styles from './FeaturedProducts.module.scss';

const BASE = import.meta.env.BASE_URL;

const hexAlpha = (hex, alpha) =>
  `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;

const FeaturedProducts = () => {
  const [modalProduct, setModalProduct] = useState(null);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Scroll-based reveal: fades in smoothly as it enters viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.3'],
  });
  const revealOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 1]);
  const revealY = useTransform(scrollYProgress, [0, 0.3, 1], [80, 80, 0]);

  return (
    <section className={styles.section} id="products" ref={sectionRef}>
      <motion.div
        className={styles.container}
        style={{ opacity: revealOpacity, y: revealY }}
      >
        {/* Section Header */}
        <div className={styles.header} ref={headerRef}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Flame size={14} />
            Recien Llegados
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Novedades
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Lo ultimo en tecnologia ya esta aqui. Se el primero en descubrir los lanzamientos mas esperados del momento.
          </motion.p>
        </div>

        {/* Product Grid */}
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {NEW_ARRIVALS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              isInView={isInView}
              onViewDetails={() => setModalProduct(product)}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted}
            />
          ))}
        </motion.div>
      </motion.div>

      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </section>
  );
};

/* ---- Product Card ---- */
const ProductCard = ({
  product, index, isInView,
  onViewDetails, addToCart, toggleWishlist, isWishlisted,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    if (addedToCart) return;
    const colorName = product.colors?.[0]?.name;
    const variant = product.variants?.[0]?.label;
    addToCart(product, colorName, variant);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }, [addedToCart, product, addToCart]);

  const handleWishlist = useCallback((e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  }, [product.id, toggleWishlist]);

  const discountPct = calculateDiscount(product);
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.article
      className={styles.card}
      style={{
        '--card-accent': product.accentColor,
        '--card-accent-10': hexAlpha(product.accentColor, 0.1),
        '--card-accent-15': hexAlpha(product.accentColor, 0.15),
        '--card-accent-20': hexAlpha(product.accentColor, 0.2),
        '--card-accent-30': hexAlpha(product.accentColor, 0.3),
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.3 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image Area */}
      <div className={styles.cardImageArea} onClick={onViewDetails}>
        <div className={styles.cardGlow} />
        <div className={styles.cardRing} />

        <motion.img
          src={product.image?.startsWith('http') ? product.image : `${BASE}${product.image.replace(/^\//, '')}`}
          alt={product.title}
          className={styles.cardImage}
          whileHover={{ scale: 1.06, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Badge */}
        <div className={styles.cardBadge}>
          <Badge variant={product.badge === 'Oferta' ? 'hot' : 'default'}>
            {product.badge}
          </Badge>
        </div>

        {/* Wishlist */}
        <button
          className={`${styles.cardWishlist} ${wishlisted ? styles['cardWishlist--active'] : ''}`}
          onClick={handleWishlist}
          aria-label="Agregar a favoritos"
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Hover Overlay */}
        <div className={styles.cardOverlay}>
          <span className={styles.cardViewBtn}>
            <Eye size={15} />
            Ver Detalles
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className={styles.cardInfo}>
        {/* Rating */}
        <div className={styles.cardRating}>
          <div className={styles.cardStars}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className={styles.cardRatingValue}>{product.rating}</span>
          <span className={styles.cardRatingCount}>
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Title */}
        <h3 className={styles.cardTitle}>{product.title}</h3>

        {/* Feature Pills */}
        <div className={styles.cardFeatures}>
          {product.features?.slice(0, 3).map((feat) => (
            <span key={feat} className={styles.cardFeature}>{feat}</span>
          ))}
        </div>

        {/* Color Dots */}
        {product.colors && (
          <div className={styles.cardColors}>
            {product.colors.map((color) => (
              <span
                key={color.name}
                className={styles.cardColorDot}
                style={{ background: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className={styles.cardPricing}>
          <span className={styles.cardPrice}>{product.price}</span>
          <span className={styles.cardOriginalPrice}>{product.originalPrice}</span>
          <span className={styles.cardDiscount}>-{discountPct}%</span>
        </div>

        {/* Add to Cart */}
        <button
          className={`${styles.cardCartBtn} ${addedToCart ? styles['cardCartBtn--added'] : ''}`}
          onClick={handleAddToCart}
        >
          {addedToCart ? <Check size={16} /> : <ShoppingCart size={16} />}
          <span>{addedToCart ? 'Agregado!' : 'Agregar al Carrito'}</span>
        </button>
      </div>
    </motion.article>
  );
};

function calculateDiscount(product) {
  const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
  const original = parseFloat(product.originalPrice.replace(/[^0-9.]/g, ''));
  return Math.round(((original - price) / original) * 100);
}

export default FeaturedProducts;
