import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Zap, ShoppingCart, ArrowRight, Flame, Star, TrendingUp } from 'lucide-react';
import { useStore } from '@context/StoreContext';
import styles from './Deals.module.scss';

const BASE = import.meta.env.BASE_URL;

const DEALS = [
  {
    id: 'deal-1',
    title: 'Sony WH-1000XM5',
    subtitle: 'Audifonos Premium',
    price: '$279',
    originalPrice: '$399',
    discount: 30,
    image: '/images/products/headphones.png',
    sold: 847,
    totalStock: 1000,
    rating: 4.8,
    reviews: 2341,
    accentColor: '#C4724E',
  },
  {
    id: 'deal-2',
    title: 'iPad Pro M4',
    subtitle: 'Tablet Profesional',
    price: '$899',
    originalPrice: '$1,099',
    discount: 18,
    image: '/images/products/macbook.png',
    sold: 1203,
    totalStock: 1300,
    rating: 4.9,
    reviews: 5672,
    accentColor: '#8B8D97',
  },
  {
    id: 'deal-3',
    title: 'Galaxy Watch 6',
    subtitle: 'Smartwatch Premium',
    price: '$249',
    originalPrice: '$349',
    discount: 29,
    image: '/images/products/watch.png',
    sold: 634,
    totalStock: 800,
    rating: 4.7,
    reviews: 1890,
    accentColor: '#E8703A',
  },
  {
    id: 'deal-4',
    title: 'AirPods Pro 2',
    subtitle: 'Audio Espacial',
    price: '$199',
    originalPrice: '$279',
    discount: 29,
    image: '/images/products/headphones.png',
    sold: 1567,
    totalStock: 2000,
    rating: 4.9,
    reviews: 8920,
    accentColor: '#4A7BF7',
  },
];

// Countdown timer - ends at midnight
const getTimeRemaining = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight - now;

  return {
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.countdown}>
      <div className={styles.countdown__header}>
        <Clock size={16} className={styles.countdown__icon} />
        <span className={styles.countdown__label}>Termina en</span>
      </div>
      <div className={styles.countdown__time}>
        <span className={styles.countdown__block}>
          <span className={styles.countdown__number}>{String(time.hours).padStart(2, '0')}</span>
          <small>hrs</small>
        </span>
        <span className={styles.countdown__separator}>:</span>
        <span className={styles.countdown__block}>
          <span className={styles.countdown__number}>{String(time.minutes).padStart(2, '0')}</span>
          <small>min</small>
        </span>
        <span className={styles.countdown__separator}>:</span>
        <span className={styles.countdown__block}>
          <span className={styles.countdown__number}>{String(time.seconds).padStart(2, '0')}</span>
          <small>seg</small>
        </span>
      </div>
    </div>
  );
};

const StarRating = ({ rating, reviews }) => (
  <div className={styles.rating}>
    <div className={styles.rating__stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.floor(rating) ? styles.rating__starFilled : styles.rating__starEmpty}
          fill={star <= Math.floor(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </div>
    <span className={styles.rating__score}>{rating}</span>
    <span className={styles.rating__count}>({reviews.toLocaleString()})</span>
  </div>
);

const DealCard = ({ deal, index, isInView }) => {
  const { addToCart } = useStore();
  const soldPercent = Math.round((deal.sold / deal.totalStock) * 100);

  const handleAddToCart = () => {
    addToCart({ ...deal, id: deal.id }, null, null);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ '--accent': deal.accentColor }}
    >
      <div className={styles.card__shine} />

      <div className={styles.card__badge}>
        <Flame size={12} />
        <span>-{deal.discount}%</span>
      </div>

      <div className={styles.card__imageWrap}>
        <div className={styles.card__glow} />
        <img
          src={deal.image?.startsWith('http') ? deal.image : `${BASE}${deal.image?.replace(/^\//, '')}`}
          alt={deal.title}
          className={styles.card__image}
          loading="lazy"
        />
      </div>

      <div className={styles.card__info}>
        <span className={styles.card__subtitle}>{deal.subtitle}</span>
        <h3 className={styles.card__title}>{deal.title}</h3>

        <StarRating rating={deal.rating} reviews={deal.reviews} />

        <div className={styles.card__pricing}>
          <span className={styles.card__price}>{deal.price}</span>
          <span className={styles.card__original}>{deal.originalPrice}</span>
          <span className={styles.card__save}>Ahorras {deal.discount}%</span>
        </div>

        <div className={styles.card__stock}>
          <div className={styles.card__stockBar}>
            <div
              className={styles.card__stockFill}
              style={{ width: `${soldPercent}%` }}
            />
          </div>
          <div className={styles.card__stockMeta}>
            <span className={styles.card__stockText}>
              <TrendingUp size={12} />
              {deal.sold.toLocaleString()} vendidos
            </span>
            {soldPercent >= 80 && (
              <span className={styles.card__stockUrgent}>Quedan pocos</span>
            )}
          </div>
        </div>

        <button className={styles.card__btn} onClick={handleAddToCart}>
          <ShoppingCart size={16} />
          Agregar al carrito
        </button>
      </div>
    </motion.div>
  );
};

const Deals = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header__left}>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Zap size={14} />
              Flash Sale
            </motion.span>
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ofertas del Dia
            </motion.h2>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Precios exclusivos por tiempo limitado. No te los pierdas.
            </motion.p>
          </div>

          <motion.div
            className={styles.header__right}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CountdownTimer />
          </motion.div>
        </div>

        <div className={styles.grid}>
          {DEALS.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#/ofertas" className={styles.ctaButton}>
            <span className={styles.ctaButton__text}>
              Ver todas las ofertas
            </span>
            <ArrowRight size={20} className={styles.ctaButton__icon} />
            <div className={styles.ctaButton__shine} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Deals;
