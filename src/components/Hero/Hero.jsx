import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import {
  Star, ShoppingCart, Heart,
  Truck, ShieldCheck, RotateCcw,
  Sparkles, Check,
} from 'lucide-react';
import { HERO_TABS } from '@data/navigation';
import { useStore } from '@context/StoreContext';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { hexAlpha } from '@utils/color';
import { calculateDiscount } from '@utils/pricing';
import { contentVariants, childVariants } from '@utils/animations';
import Button from '@components/ui/Button';
import Badge from '@components/ui/Badge';
import ProductModal from '@components/ProductModal';
import styles from './Hero.module.scss';

const AUTO_ROTATE_INTERVAL = 6000;
const BASE = import.meta.env.BASE_URL;

const TRUST_ITEMS = [
  { icon: Truck, label: 'Envio Gratis' },
  { icon: ShieldCheck, label: 'Garantia 2 Años' },
  { icon: RotateCcw, label: '30 Dias Devolucion' },
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const heroRef = useRef(null);
  const visualRef = useRef(null);

  // Scroll-based fade out
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7], [1, 1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.7], [1, 1, 0.92]);
  const scrollY = useTransform(scrollYProgress, [0, 0.2, 0.7], [0, 0, -100]);
  const scrollFilter = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, 0, 6, 14]);
  const scrollFilterStr = useTransform(scrollFilter, (v) => `blur(${v}px)`);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 80, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 80, damping: 30 });

  const currentSlide = HERO_TABS[activeTab];

  const goToTab = useCallback((index) => {
    setActiveTab(index);
    setProgress(0);
    setSelectedColor(0);
    setSelectedVariant(0);
    setAddedToCart(false);
  }, []);

  const goNext = useCallback(() => {
    goToTab((activeTab + 1) % HERO_TABS.length);
  }, [activeTab, goToTab]);

  useEffect(() => {
    if (isPaused || modalProduct) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { goNext(); return 0; }
        return prev + (100 / (AUTO_ROTATE_INTERVAL / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, modalProduct, goNext]);

  const handleMouseMove = (e) => {
    if (isMobile || !visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const themeVars = {
    '--theme': currentSlide.accentColor,
    '--theme-5': hexAlpha(currentSlide.accentColor, 0.05),
    '--theme-8': hexAlpha(currentSlide.accentColor, 0.08),
    '--theme-10': hexAlpha(currentSlide.accentColor, 0.1),
    '--theme-15': hexAlpha(currentSlide.accentColor, 0.15),
    '--theme-20': hexAlpha(currentSlide.accentColor, 0.2),
    '--theme-25': hexAlpha(currentSlide.accentColor, 0.25),
    '--theme-30': hexAlpha(currentSlide.accentColor, 0.3),
    '--theme-50': hexAlpha(currentSlide.accentColor, 0.5),
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="home"
      style={themeVars}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); handleMouseLeave(); }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className={styles.hero__container}
        style={{ opacity: scrollOpacity, scale: scrollScale, y: scrollY, filter: scrollFilterStr }}
      >
        {/* Tabs */}
        <div className={styles.hero__tabs}>
          {HERO_TABS.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === activeTab;
            return (
              <button
                key={tab.id}
                className={`${styles.hero__tab} ${isActive ? styles['hero__tab--active'] : ''}`}
                onClick={() => goToTab(index)}
                style={isActive ? { '--tab-accent': tab.accentColor } : undefined}
              >
                <Icon size={16} strokeWidth={isActive ? 2 : 1.5} className={styles.hero__tabIcon} />
                <span className={styles.hero__tabLabel}>{tab.label}</span>
                {isActive && (
                  <motion.div
                    className={styles.hero__tabProgress}
                    style={{ width: `${progress}%` }}
                    layoutId="tabProgress"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={styles.hero__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              className={styles.hero__main}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Text + Purchase Flow */}
              <div className={styles.hero__text}>
                <motion.div variants={childVariants} className={styles.hero__header}>
                  <Badge variant={currentSlide.badge === 'Oferta' ? 'hot' : 'default'} pulse>
                    {currentSlide.badge}
                  </Badge>
                  <div className={styles.hero__rating}>
                    <div className={styles.hero__stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < Math.floor(currentSlide.rating) ? 'currentColor' : 'none'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span className={styles.hero__ratingValue}>{currentSlide.rating}</span>
                    <span className={styles.hero__ratingCount}>
                      ({currentSlide.reviews.toLocaleString()})
                    </span>
                  </div>
                </motion.div>

                <motion.p variants={childVariants} className={styles.hero__tagline}>
                  {currentSlide.tagline}
                </motion.p>

                <motion.h1 variants={childVariants} className={styles.hero__title}>
                  {currentSlide.title}
                </motion.h1>

                <motion.p variants={childVariants} className={styles.hero__subtitle}>
                  {currentSlide.subtitle}
                </motion.p>

                {/* Color Selector */}
                {currentSlide.colors && (
                  <motion.div variants={childVariants} className={styles.hero__colors}>
                    <span className={styles.hero__colorsLabel}>
                      Color: <strong>{currentSlide.colors[selectedColor].name}</strong>
                    </span>
                    <div className={styles.hero__colorSwatches}>
                      {currentSlide.colors.map((color, i) => (
                        <button
                          key={color.name}
                          className={`${styles.hero__colorSwatch} ${i === selectedColor ? styles['hero__colorSwatch--active'] : ''}`}
                          style={{ '--swatch': color.hex }}
                          onClick={() => setSelectedColor(i)}
                          aria-label={color.name}
                        >
                          {i === selectedColor && <Check size={12} strokeWidth={3} />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Variant Selector */}
                {currentSlide.variants && (
                  <motion.div variants={childVariants} className={styles.hero__variants}>
                    <span className={styles.hero__variantsLabel}>{currentSlide.variantLabel}:</span>
                    <div className={styles.hero__variantOptions}>
                      {currentSlide.variants.map((v, i) => (
                        <button
                          key={v.label}
                          className={`${styles.hero__variant} ${i === selectedVariant ? styles['hero__variant--active'] : ''}`}
                          onClick={() => setSelectedVariant(i)}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Pricing */}
                <motion.div variants={childVariants} className={styles.hero__pricing}>
                  <span className={styles.hero__price}>
                    {currentSlide.variants?.[selectedVariant]?.price || currentSlide.price}
                  </span>
                  <span className={styles.hero__originalPrice}>
                    {currentSlide.variants?.[selectedVariant]?.originalPrice || currentSlide.originalPrice}
                  </span>
                  <Badge variant="accent">-{calculateDiscount(currentSlide, selectedVariant)}%</Badge>
                  <span className={styles.hero__stock}>
                    <Check size={14} />
                    En stock
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={childVariants} className={styles.hero__ctas}>
                  <Button
                    variant={addedToCart ? 'primary' : 'accent'}
                    size="lg"
                    icon={addedToCart ? Check : ShoppingCart}
                    iconPosition="left"
                    onClick={() => {
                      if (addedToCart) return;
                      const colorName = currentSlide.colors?.[selectedColor]?.name;
                      const variant = currentSlide.variants?.[selectedVariant];
                      addToCart(currentSlide, colorName, variant?.label);
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2500);
                    }}
                  >
                    {addedToCart ? 'Agregado!' : 'Agregar al Carrito'}
                  </Button>
                  <button
                    className={`${styles.hero__wishlist} ${isWishlisted(currentSlide.id) ? styles['hero__wishlist--active'] : ''}`}
                    aria-label="Agregar a favoritos"
                    onClick={() => toggleWishlist(currentSlide.id)}
                  >
                    <Heart size={20} fill={isWishlisted(currentSlide.id) ? 'currentColor' : 'none'} />
                  </button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div variants={childVariants} className={styles.hero__trust}>
                  {TRUST_ITEMS.map((item) => (
                    <div key={item.label} className={styles.hero__trustItem}>
                      <item.icon size={15} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Product Showcase */}
              <motion.div
                ref={visualRef}
                className={styles.hero__visual}
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={styles.hero__productGlow} />
                <div className={styles.hero__productRing} />

                <div
                  className={styles.hero__productClickable}
                  onClick={() => setModalProduct(currentSlide)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver detalles de ${currentSlide.title}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModalProduct(currentSlide); }}
                >
                  {currentSlide.image ? (
                    <motion.img
                      src={`${BASE}${currentSlide.image.replace(/^\//, '')}`}
                      alt={currentSlide.title}
                      className={styles.hero__productImage}
                      fetchpriority="high"
                      animate={isMobile ? undefined : { y: [0, -14, 0] }}
                      transition={isMobile ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ) : (
                    <div className={styles.hero__productIcon}>
                      {(() => { const P = currentSlide.icon; return <P size={120} strokeWidth={0.8} />; })()}
                    </div>
                  )}
                </div>

                <div className={styles.hero__features}>
                  {currentSlide.features?.map((feat, i) => (
                    <motion.div
                      key={feat}
                      className={styles.hero__feature}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      <Sparkles size={10} />
                      <span>{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Reflection removed for performance */}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </section>
  );
};

export default Hero;
