import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useScrollPosition } from '@hooks/useScrollPosition';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { useStore } from '@context/StoreContext';
import { NAV_LINKS, PROMO_BANNER } from '@data/navigation';
import AnimatedIcon from '@components/ui/AnimatedIcon';
import styles from './Header.module.scss';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const NavLink = ({ link }) => {
  const [hovered, setHovered] = useState(false);
  const IconDefault = link.icon;
  const IconHover = link.iconHover;

  const handleClick = (e) => {
    if (!link.scrollTo) return;
    e.preventDefault();
    const isHome = window.location.hash === '#/' || window.location.hash === '';
    if (isHome) {
      scrollToSection(link.scrollTo);
    } else {
      window.location.hash = '#/';
      setTimeout(() => scrollToSection(link.scrollTo), 100);
    }
  };

  return (
    <a
      href={link.href}
      className={styles.header__link}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.header__linkIcon}>
        <AnimatePresence mode="wait" initial={false}>
          {!hovered ? (
            <motion.span
              key="default"
              className={styles.header__linkIconInner}
              initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 90, y: -4 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <IconDefault size={15} strokeWidth={1} />
            </motion.span>
          ) : (
            <motion.span
              key="hover"
              className={`${styles.header__linkIconInner} ${styles['header__linkIconInner--active']}`}
              initial={{ opacity: 0, scale: 0.3, rotate: 90, y: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotate: -90 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 20,
              }}
            >
              <IconHover size={15} strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span>{link.label}</span>
    </a>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAtTop, direction } = useScrollPosition();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { cartCount, openPanel } = useStore();

  const headerClasses = [
    styles.header,
    !isAtTop && styles['header--scrolled'],
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Banner Promo */}
      <AnimatePresence>
        {isAtTop && (
          <motion.div
            className={styles.promo}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.promo__inner}>
              <span>{PROMO_BANNER.text}</span>
              <span className={styles.promo__divider} />
              <span className={styles.promo__highlight}>
                {PROMO_BANNER.highlight}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Principal */}
      <header className={headerClasses}>
        <div className={styles.header__inner}>
          {/* Logo */}
          <a href="#/" className={styles.header__logo}>
            <span className={styles.header__logoMark}>N</span>
            <span className={styles.header__logoText}>
              Nex<span>Tura</span>
            </span>
          </a>

          {/* Navegación Desktop con iconos */}
          <nav className={styles.header__nav}>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.id} link={link} />
            ))}
          </nav>

          {/* Iconos de acción */}
          <div className={styles.header__actions}>
            <AnimatedIcon
              icon={Search}
              label="Buscar"
              size={21}
              strokeWidth={1}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <AnimatedIcon
              icon={Heart}
              label="Favoritos"
              size={21}
              strokeWidth={1}
              onClick={() => openPanel('wishlist')}
            />
            <AnimatedIcon
              icon={User}
              label="Cuenta"
              size={21}
              strokeWidth={1}
              onClick={() => openPanel('user')}
            />
            <AnimatedIcon
              icon={ShoppingBag}
              label="Carrito"
              size={21}
              strokeWidth={1}
              badge={cartCount || undefined}
              onClick={() => openPanel('cart')}
            />

            {/* Burger mobile */}
            <button
              className={styles.header__burger}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menu"
            >
              <motion.div
                animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.25 }}
              >
                {mobileMenuOpen ? (
                  <X size={22} strokeWidth={1} />
                ) : (
                  <Menu size={22} strokeWidth={1} />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Buscador */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className={styles.search}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.search__inner}>
                <Search size={20} strokeWidth={1} className={styles.search__icon} />
                <input
                  type="text"
                  placeholder="Buscar productos, marcas, categorias..."
                  className={styles.search__input}
                  autoFocus
                />
                <button
                  className={styles.search__close}
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={18} strokeWidth={1} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className={styles.mobile}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <nav className={styles.mobile__nav}>
              {NAV_LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    className={styles.mobile__link}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.scrollTo) {
                        e.preventDefault();
                        const isHome = window.location.hash === '#/' || window.location.hash === '';
                        if (isHome) {
                          scrollToSection(link.scrollTo);
                        } else {
                          window.location.hash = '#/';
                          setTimeout(() => scrollToSection(link.scrollTo), 100);
                        }
                      }
                    }}
                  >
                    <Icon size={20} strokeWidth={1} className={styles.mobile__linkIcon} />
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
