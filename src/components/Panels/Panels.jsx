import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Minus, Plus, Trash2,
  ShoppingBag, Heart, ShoppingCart, Check,
  User, Mail, Lock, CreditCard,
} from 'lucide-react';
import { useStore } from '@context/StoreContext';
import { HERO_TABS } from '@data/navigation';
import Button from '@components/ui/Button';
import s from './Panels.module.scss';

const BASE = import.meta.env.BASE_URL;

const PANEL_TITLES = {
  cart: 'Carrito',
  wishlist: 'Favoritos',
  user: 'Mi Cuenta',
};

// ================================================================
// Cart Content
// ================================================================
const CartContent = ({ onRequestDelete }) => {
  const { cartItems, updateCartQuantity } = useStore();

  if (cartItems.length === 0) {
    return (
      <div className={s.empty}>
        <ShoppingBag size={48} strokeWidth={1} className={s.empty__icon} />
        <p className={s.empty__title}>Tu carrito esta vacio</p>
        <p className={s.empty__text}>
          Agrega productos desde el catalogo para comenzar tu compra.
        </p>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.key} className={s.cartItem}>
          {item.product.image && (
            <img
              src={item.product.image.startsWith('http') ? item.product.image : `${BASE}${item.product.image.replace(/^\//, '')}`}
              alt={item.product.title}
              className={s.cartItem__image}
            />
          )}
          <div className={s.cartItem__info}>
            <span className={s.cartItem__name}>{item.product.title}</span>
            <span className={s.cartItem__meta}>
              {[item.color, item.variant].filter(Boolean).join(' · ')}
            </span>
            <div className={s.cartItem__bottom}>
              <span className={s.cartItem__price}>{item.product.price}</span>
              <div className={s.cartItem__qty}>
                <button
                  className={s.cartItem__qtyBtn}
                  onClick={() => updateCartQuantity(item.key, item.quantity - 1)}
                >
                  <Minus size={14} />
                </button>
                <span className={s.cartItem__qtyValue}>{item.quantity}</span>
                <button
                  className={s.cartItem__qtyBtn}
                  onClick={() => updateCartQuantity(item.key, item.quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
          <button
            className={s.cartItem__remove}
            onClick={() => onRequestDelete(item.key)}
            aria-label="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

// ================================================================
// Cart Footer
// ================================================================
const CartFooter = ({ onCheckout }) => {
  const { cartTotal, cartCount } = useStore();

  return (
    <div className={s.summary}>
      <div className={s.summary__row}>
        <span>Subtotal ({cartCount} {cartCount === 1 ? 'articulo' : 'articulos'})</span>
        <span>${cartTotal.toLocaleString()}</span>
      </div>
      <div className={s.summary__row}>
        <span>Envio</span>
        <span className={s.summary__free}>Gratis</span>
      </div>
      <div className={s.summary__total}>
        <span>Total</span>
        <span>${cartTotal.toLocaleString()}</span>
      </div>
      <Button variant="accent" size="lg" icon={CreditCard} iconPosition="left" onClick={onCheckout}>
        Proceder al Pago
      </Button>
    </div>
  );
};

// ================================================================
// Delete Confirmation
// ================================================================
const ConfirmDelete = ({ itemKey, onCancel, onConfirm }) => {
  const { cartItems } = useStore();
  const item = cartItems.find((i) => i.key === itemKey);
  if (!item) return null;

  return (
    <motion.div
      className={s.confirm}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={s.confirm__card}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        <div className={s.confirm__iconWrap}>
          <Trash2 size={24} />
        </div>
        <p className={s.confirm__title}>¿Eliminar producto?</p>
        <div className={s.confirm__product}>
          {item.product.image && (
            <img
              src={item.product.image.startsWith('http') ? item.product.image : `${BASE}${item.product.image.replace(/^\//, '')}`}
              alt={item.product.title}
              className={s.confirm__productImage}
            />
          )}
          <div>
            <span className={s.confirm__productName}>{item.product.title}</span>
            <span className={s.confirm__productMeta}>
              {[item.color, item.variant].filter(Boolean).join(' · ')}
            </span>
          </div>
        </div>
        <div className={s.confirm__actions}>
          <button className={s.confirm__cancel} onClick={onCancel}>
            Cancelar
          </button>
          <button className={s.confirm__delete} onClick={onConfirm}>
            <Trash2 size={14} />
            Eliminar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ================================================================
// Wishlist Content
// ================================================================
const WishlistContent = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const items = HERO_TABS.filter((tab) => wishlist.has(tab.id));

  if (items.length === 0) {
    return (
      <div className={s.empty}>
        <Heart size={48} strokeWidth={1} className={s.empty__icon} />
        <p className={s.empty__title}>Sin favoritos aun</p>
        <p className={s.empty__text}>
          Guarda los productos que te gusten para encontrarlos facilmente.
        </p>
      </div>
    );
  }

  return (
    <div>
      {items.map((product) => (
        <div key={product.id} className={s.wishItem}>
          {product.image && (
            <img
              src={product.image.startsWith('http') ? product.image : `${BASE}${product.image.replace(/^\//, '')}`}
              alt={product.title}
              className={s.wishItem__image}
            />
          )}
          <div className={s.wishItem__info}>
            <span className={s.wishItem__name}>{product.title}</span>
            <span className={s.wishItem__price}>{product.price}</span>
          </div>
          <div className={s.wishItem__actions}>
            <button
              className={s.wishItem__cartBtn}
              onClick={() => addToCart(product, product.colors?.[0]?.name, product.variants?.[0])}
              aria-label="Agregar al carrito"
            >
              <ShoppingCart size={15} />
            </button>
            <button
              className={s.wishItem__removeBtn}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Quitar de favoritos"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ================================================================
// User Content
// ================================================================
const UserContent = () => {
  return (
    <div className={s.user}>
      <div className={s.user__avatar}>
        <User size={32} strokeWidth={1.5} />
      </div>

      <form className={s.user__form} onSubmit={(e) => e.preventDefault()}>
        <div className={s.user__field}>
          <label className={s.user__label}>Correo electronico</label>
          <div className={s.user__inputWrap}>
            <Mail size={16} className={s.user__inputIcon} />
            <input type="email" placeholder="tu@email.com" className={s.user__input} />
          </div>
        </div>
        <div className={s.user__field}>
          <label className={s.user__label}>Contraseña</label>
          <div className={s.user__inputWrap}>
            <Lock size={16} className={s.user__inputIcon} />
            <input type="password" placeholder="••••••••" className={s.user__input} />
          </div>
        </div>
        <Button variant="accent" size="lg">Iniciar Sesion</Button>
      </form>

      <div className={s.user__divider}>o continua con</div>

      <div className={s.user__social}>
        <button className={s.user__socialBtn}>Google</button>
        <button className={s.user__socialBtn}>Apple</button>
      </div>

      <p className={s.user__signup}>
        ¿No tienes cuenta? <button className={s.user__signupLink}>Crear cuenta</button>
      </p>
    </div>
  );
};

// ================================================================
// Main Panels Component
// ================================================================
const Panels = () => {
  const navigate = useNavigate();
  const { activePanel, closePanel, cartItems, removeFromCart } = useStore();
  const [confirmKey, setConfirmKey] = useState(null);

  useEffect(() => {
    if (activePanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activePanel]);

  useEffect(() => {
    if (!activePanel) {
      setConfirmKey(null);
    }
  }, [activePanel]);

  const handleCheckout = () => {
    closePanel();
    navigate('/checkout');
  };

  const handleConfirmDelete = () => {
    if (confirmKey) {
      removeFromCart(confirmKey);
      setConfirmKey(null);
    }
  };

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          <motion.div
            className={s.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePanel}
          />
          <motion.div
            className={s.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className={s.panel__header}>
              <h2 className={s.panel__title}>{PANEL_TITLES[activePanel]}</h2>
              <button className={s.panel__close} onClick={closePanel} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            <div className={s.panel__body}>
              {activePanel === 'cart' && <CartContent onRequestDelete={setConfirmKey} />}
              {activePanel === 'wishlist' && <WishlistContent />}
              {activePanel === 'user' && <UserContent />}
            </div>

            {activePanel === 'cart' && cartItems.length > 0 && (
              <div className={s.panel__footer}>
                <CartFooter onCheckout={handleCheckout} />
              </div>
            )}

            {/* Confirm Delete Overlay */}
            <AnimatePresence>
              {confirmKey && (
                <ConfirmDelete
                  itemKey={confirmKey}
                  onCancel={() => setConfirmKey(null)}
                  onConfirm={handleConfirmDelete}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Panels;
