import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [activePanel, setActivePanel] = useState(null);

  const addToCart = useCallback((product, colorName, variant) => {
    const key = `${product.id}-${colorName || ''}-${variant || ''}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { key, product, color: colorName, variant, quantity: 1 }];
    });
    setActivePanel('cart');
  }, []);

  const removeFromCart = useCallback((key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateCartQuantity = useCallback((key, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.key !== key));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item)),
    );
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ''));
        return sum + price * item.quantity;
      }, 0),
    [cartItems],
  );

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((productId) => wishlist.has(productId), [wishlist]);

  const clearCart = useCallback(() => setCartItems([]), []);

  const openPanel = useCallback((panel) => setActivePanel(panel), []);
  const closePanel = useCallback(() => setActivePanel(null), []);

  const value = useMemo(
    () => ({
      cartItems, addToCart, removeFromCart, updateCartQuantity, cartCount, cartTotal, clearCart,
      wishlist, toggleWishlist, isWishlisted,
      activePanel, openPanel, closePanel,
    }),
    [cartItems, addToCart, removeFromCart, updateCartQuantity, cartCount, cartTotal, clearCart,
     wishlist, toggleWishlist, isWishlisted, activePanel, openPanel, closePanel],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
