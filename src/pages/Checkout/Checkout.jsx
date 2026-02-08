import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, MapPin, Truck,
  Package, CircleCheck, Shield, ShoppingBag,
  Check, Clock, Star, Sparkles, ChevronRight,
} from 'lucide-react';
import { useStore } from '@context/StoreContext';
import Button from '@components/ui/Button';
import s from './Checkout.module.scss';

const BASE = import.meta.env.BASE_URL;

const STEPS = [
  { id: 'cart', label: 'Carrito', icon: ShoppingBag },
  { id: 'shipping', label: 'Envio', icon: Truck },
  { id: 'payment', label: 'Pago', icon: CreditCard },
];

// ================================================================
// Step Indicator
// ================================================================
const StepIndicator = ({ currentStep = 1 }) => (
  <div className={s.steps}>
    {STEPS.map((step, i) => {
      const done = i < currentStep;
      const active = i === currentStep;
      const Icon = step.icon;
      return (
        <div key={step.id} className={s.steps__item}>
          {i > 0 && (
            <div className={`${s.steps__line} ${done ? s['steps__line--done'] : ''}`}>
              {done && <motion.div className={s.steps__lineFill} layoutId="stepLine" />}
            </div>
          )}
          <div
            className={`${s.steps__dot} ${done ? s['steps__dot--done'] : ''} ${active ? s['steps__dot--active'] : ''}`}
          >
            {done ? <Check size={14} strokeWidth={3} /> : <Icon size={14} />}
          </div>
          <span
            className={`${s.steps__label} ${done || active ? s['steps__label--active'] : ''}`}
          >
            {step.label}
          </span>
        </div>
      );
    })}
  </div>
);

// ================================================================
// Loading Transition
// ================================================================
const LoadingTransition = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    const start = Date.now();
    const duration = 1200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <motion.div
      className={s.loader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Background accents */}
      <div className={s.loader__bg}>
        <div className={s.loader__orb1} />
        <div className={s.loader__orb2} />
      </div>

      <motion.div
        className={s.loader__content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={s.loader__ring}>
          <svg viewBox="0 0 100 100" className={s.loader__svg}>
            <circle cx="50" cy="50" r="44" className={s.loader__track} />
            <motion.circle
              cx="50" cy="50" r="44"
              className={s.loader__progress}
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progress) / 100}
            />
          </svg>
          <div className={s.loader__icon}>
            <Package size={28} />
          </div>
        </div>

        <div className={s.loader__text}>
          <h2 className={s.loader__title}>Preparando tu pedido</h2>
          <p className={s.loader__sub}>Verificando disponibilidad y precios...</p>
        </div>

        <div className={s.loader__bar}>
          <motion.div
            className={s.loader__barFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// ================================================================
// Confetti Particle
// ================================================================
const Confetti = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
      color: ['#B8944F', '#D4B06A', '#10B981', '#3A506B', '#96783E', '#5C7A99'][
        Math.floor(Math.random() * 6)
      ],
    })),
    [],
  );

  return (
    <div className={s.confetti}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={s.confetti__particle}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * (0.6 + Math.random() * 0.8),
            background: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: ['-5vh', '105vh'],
            opacity: [1, 1, 0],
            rotate: p.rotation + 720,
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

// ================================================================
// Checkout Success
// ================================================================
const CheckoutSuccess = ({ orderNumber, cartItems: items, cartTotal: total, onDone }) => {
  const TIMELINE = [
    { icon: Check, label: 'Pedido confirmado', sub: 'Justo ahora', done: true },
    { icon: Package, label: 'Procesando envio', sub: 'Estimado: 1-2 dias', done: false },
    { icon: Truck, label: 'En camino', sub: 'Estimado: 3-5 dias', done: false },
    { icon: Star, label: 'Entregado', sub: 'Recibiras tu pedido', done: false },
  ];

  return (
    <div className={s.successPage}>
      <Confetti />

      {/* Glow bg */}
      <div className={s.successPage__glow} />

      <motion.div
        className={s.successPage__card}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Animated check */}
        <div className={s.successPage__checkWrap}>
          <motion.div
            className={s.successPage__checkRing}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <motion.div
              className={s.successPage__checkInner}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
            >
              <CircleCheck size={40} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
          <div className={s.successPage__checkPulse} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={s.successPage__title}>¡Pago Exitoso!</h2>
          <p className={s.successPage__subtitle}>Tu compra ha sido procesada correctamente</p>
        </motion.div>

        <motion.div
          className={s.successPage__orderBadge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          <Sparkles size={14} />
          <span>Orden {orderNumber}</span>
        </motion.div>

        {/* Order summary mini */}
        <motion.div
          className={s.successPage__summary}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className={s.successPage__summaryHeader}>
            <span>Resumen</span>
            <span className={s.successPage__summaryTotal}>${total.toLocaleString()}</span>
          </div>
          <div className={s.successPage__summaryItems}>
            {items.map((item) => (
              <div key={item.key} className={s.successPage__summaryItem}>
                {item.product.image && (
                  <img
                    src={item.product.image.startsWith('http') ? item.product.image : `${BASE}${item.product.image.replace(/^\//, '')}`}
                    alt={item.product.title}
                    className={s.successPage__summaryImg}
                  />
                )}
                <span className={s.successPage__summaryName}>{item.product.title}</span>
                <span className={s.successPage__summaryQty}>x{item.quantity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className={s.successPage__timeline}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          {TIMELINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`${s.successPage__timeStep} ${step.done ? s['successPage__timeStep--done'] : ''}`}
              >
                <div className={s.successPage__timeDot}>
                  <Icon size={12} />
                </div>
                {i < TIMELINE.length - 1 && <div className={s.successPage__timeLine} />}
                <div className={s.successPage__timeInfo}>
                  <span className={s.successPage__timeLabel}>{step.label}</span>
                  <span className={s.successPage__timeSub}>{step.sub}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.p
          className={s.successPage__note}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Recibiras un correo de confirmacion con los detalles de tu compra y numero de seguimiento.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Button variant="accent" size="lg" icon={ShoppingBag} iconPosition="left" onClick={onDone}>
            Seguir Comprando
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ================================================================
// Checkout Page
// ================================================================
const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartCount, clearCart } = useStore();
  const [payMethod, setPayMethod] = useState('card');
  const [checkoutStep, setCheckoutStep] = useState('loading');
  const [orderNumber, setOrderNumber] = useState('');
  const [savedItems] = useState(() => [...cartItems]);
  const [savedTotal] = useState(() => cartTotal);

  useEffect(() => {
    if (cartItems.length === 0 && checkoutStep !== 'success' && checkoutStep !== 'loading') {
      navigate('/', { replace: true });
    }
  }, [cartItems.length, checkoutStep, navigate]);

  const handleLoadingComplete = useMemo(
    () => () => setCheckoutStep('form'),
    [],
  );

  const handlePay = () => {
    setOrderNumber(`#NXT-${Math.floor(10000 + Math.random() * 90000)}`);
    setCheckoutStep('success');
  };

  const handleDone = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className={s.page}>
      {/* Step bar */}
      {checkoutStep !== 'success' && (
        <div className={s.stepBar}>
          <div className={s.stepBar__inner}>
            <div className={s.breadcrumb}>
              <button className={s.breadcrumb__link} onClick={() => navigate('/')}>Inicio</button>
              <ChevronRight size={14} />
              <button className={s.breadcrumb__link} onClick={() => { navigate('/'); setTimeout(() => { const store = document.querySelector('[data-panel="cart"]'); if (store) store.click(); }, 100); }}>Carrito</button>
              <ChevronRight size={14} />
              <span className={s.breadcrumb__current}>Checkout</span>
            </div>
            <StepIndicator currentStep={checkoutStep === 'loading' ? 0 : 1} />
          </div>
        </div>
      )}

      {/* Body */}
      <AnimatePresence mode="wait">
        {checkoutStep === 'loading' && (
          <LoadingTransition key="loader" onComplete={handleLoadingComplete} />
        )}

        {checkoutStep === 'form' && (
          <motion.div
            key="form"
            className={s.body}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={s.content}>
              {/* Left Column — Form */}
              <div className={s.form}>
                {/* Shipping */}
                <section className={s.card}>
                  <div className={s.card__header}>
                    <div className={s.card__iconWrap}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h2 className={s.card__title}>Informacion de Envio</h2>
                      <p className={s.card__sub}>Ingresa la direccion de entrega</p>
                    </div>
                  </div>
                  <div className={s.grid}>
                    <div className={s.field}>
                      <label className={s.label}>Nombre completo</label>
                      <input placeholder="Juan Perez" className={s.input} />
                    </div>
                    <div className={s.field}>
                      <label className={s.label}>Correo electronico</label>
                      <input type="email" placeholder="juan@email.com" className={s.input} />
                    </div>
                    <div className={`${s.field} ${s['field--half']}`}>
                      <label className={s.label}>Telefono</label>
                      <input type="tel" placeholder="+57 300 123 4567" className={s.input} />
                    </div>
                    <div className={`${s.field} ${s['field--half']}`}>
                      <label className={s.label}>Codigo postal</label>
                      <input placeholder="110111" className={s.input} />
                    </div>
                    <div className={s.field}>
                      <label className={s.label}>Direccion completa</label>
                      <input placeholder="Calle 123 #45-67, Apto 890" className={s.input} />
                    </div>
                    <div className={`${s.field} ${s['field--half']}`}>
                      <label className={s.label}>Ciudad</label>
                      <input placeholder="Bogota" className={s.input} />
                    </div>
                    <div className={`${s.field} ${s['field--half']}`}>
                      <label className={s.label}>Pais</label>
                      <input placeholder="Colombia" className={s.input} />
                    </div>
                  </div>
                </section>

                {/* Payment */}
                <section className={s.card}>
                  <div className={s.card__header}>
                    <div className={s.card__iconWrap}>
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h2 className={s.card__title}>Metodo de Pago</h2>
                      <p className={s.card__sub}>Selecciona como deseas pagar</p>
                    </div>
                  </div>

                  <div className={s.payMethods}>
                    <button
                      className={`${s.payMethod} ${payMethod === 'card' ? s['payMethod--active'] : ''}`}
                      onClick={() => setPayMethod('card')}
                    >
                      <CreditCard size={18} />
                      <span>Tarjeta</span>
                      {payMethod === 'card' && (
                        <motion.div className={s.payMethod__check} layoutId="payCheck">
                          <Check size={12} strokeWidth={3} />
                        </motion.div>
                      )}
                    </button>
                    <button
                      className={`${s.payMethod} ${payMethod === 'paypal' ? s['payMethod--active'] : ''}`}
                      onClick={() => setPayMethod('paypal')}
                    >
                      <span className={s.paypalLogo}>Pay<strong>Pal</strong></span>
                      {payMethod === 'paypal' && (
                        <motion.div className={s.payMethod__check} layoutId="payCheck">
                          <Check size={12} strokeWidth={3} />
                        </motion.div>
                      )}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {payMethod === 'card' && (
                      <motion.div
                        key="card"
                        className={s.grid}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className={s.field}>
                          <label className={s.label}>Numero de tarjeta</label>
                          <input placeholder="1234 5678 9012 3456" className={s.input} maxLength={19} />
                        </div>
                        <div className={`${s.field} ${s['field--half']}`}>
                          <label className={s.label}>Fecha</label>
                          <input placeholder="MM / AA" className={s.input} maxLength={7} />
                        </div>
                        <div className={`${s.field} ${s['field--half']}`}>
                          <label className={s.label}>CVV</label>
                          <input placeholder="•••" className={s.input} maxLength={4} type="password" />
                        </div>
                        <div className={s.field}>
                          <label className={s.label}>Nombre en la tarjeta</label>
                          <input placeholder="JUAN PEREZ" className={s.input} />
                        </div>
                      </motion.div>
                    )}

                    {payMethod === 'paypal' && (
                      <motion.div
                        key="paypal"
                        className={s.paypalMsg}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>Seras redirigido a PayPal para completar el pago de forma segura.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* Pay button — mobile */}
                <div className={s.payBtnMobile}>
                  <Button variant="accent" size="lg" onClick={handlePay}>
                    {payMethod === 'paypal' ? 'Pagar con PayPal' : `Pagar $${cartTotal.toLocaleString()}`}
                  </Button>
                  <div className={s.secure}>
                    <Shield size={13} />
                    <span>Datos protegidos con encriptacion SSL de 256 bits</span>
                  </div>
                </div>
              </div>

              {/* Right Column — Order Summary */}
              <aside className={s.aside}>
                <div className={s.summaryCard}>
                  <div className={s.summaryCard__header}>
                    <Package size={18} />
                    <h2>Resumen del Pedido</h2>
                  </div>

                  <div className={s.items}>
                    {cartItems.map((item) => (
                      <div key={item.key} className={s.item}>
                        {item.product.image && (
                          <div className={s.item__imgWrap}>
                            <img
                              src={item.product.image.startsWith('http') ? item.product.image : `${BASE}${item.product.image.replace(/^\//, '')}`}
                              alt={item.product.title}
                              className={s.item__image}
                            />
                          </div>
                        )}
                        <div className={s.item__info}>
                          <span className={s.item__name}>{item.product.title}</span>
                          <span className={s.item__meta}>
                            {[item.color, item.variant].filter(Boolean).join(' · ')}
                          </span>
                          <span className={s.item__qty}>Cant: {item.quantity}</span>
                        </div>
                        <span className={s.item__price}>{item.product.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className={s.divider} />

                  <div className={s.totals}>
                    <div className={s.totals__row}>
                      <span>Subtotal ({cartCount} {cartCount === 1 ? 'art.' : 'arts.'})</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className={s.totals__row}>
                      <span>Envio</span>
                      <span className={s.totals__free}>Gratis</span>
                    </div>
                  </div>

                  <div className={s.divider} />

                  <div className={s.totalFinal}>
                    <span>Total a pagar</span>
                    <span className={s.totalFinal__price}>${cartTotal.toLocaleString()}</span>
                  </div>

                  {/* Pay button — desktop */}
                  <div className={s.payBtnDesktop}>
                    <Button variant="accent" size="lg" onClick={handlePay}>
                      {payMethod === 'paypal' ? 'Pagar con PayPal' : `Pagar $${cartTotal.toLocaleString()}`}
                    </Button>
                  </div>

                  <div className={s.secure}>
                    <Shield size={13} />
                    <span>Datos protegidos con encriptacion SSL de 256 bits</span>
                  </div>

                  <div className={s.badges}>
                    <div className={s.badge}>
                      <Truck size={14} />
                      <span>Envio gratis</span>
                    </div>
                    <div className={s.badge}>
                      <Clock size={14} />
                      <span>3-5 dias</span>
                    </div>
                    <div className={s.badge}>
                      <Shield size={14} />
                      <span>Garantia</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        )}

        {checkoutStep === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckoutSuccess
              orderNumber={orderNumber}
              cartItems={savedItems}
              cartTotal={savedTotal}
              onDone={handleDone}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
