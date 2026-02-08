const KEYBOARDS_CATALOG = {
  id: 'teclados',
  brands: [
    {
      id: 'logitech',
      name: 'Logitech',
      products: [
        { id: 'logitech-g915-x', name: 'Logitech G915 X TKL', price: '$229', originalPrice: '$229', image: '/images/products/keyboards/logitech/g915-x-tkl.jpg', rating: 4.7, reviews: 5600, badge: 'Nuevo', features: ['Low Profile', 'LIGHTSPEED', 'RGB'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco', hex: '#E8E8E8' }] },
        { id: 'logitech-mx-keys-s', name: 'Logitech MX Keys S', price: '$109', originalPrice: '$109', image: '/images/products/keyboards/logitech/mx-keys-s.jpg', rating: 4.8, reviews: 8200, badge: 'Popular', features: ['Smart Illumination', 'Multi-device', 'USB-C'], colors: [{ name: 'Grafito', hex: '#3C3C3C' }, { name: 'Gris Palido', hex: '#C0C0C0' }] },
      ],
    },
    {
      id: 'razer',
      name: 'Razer',
      products: [
        { id: 'razer-huntsman-v3-pro', name: 'Razer Huntsman V3 Pro', price: '$249', originalPrice: '$249', image: '/images/products/keyboards/razer/huntsman-v3-pro.jpg', rating: 4.8, reviews: 3200, badge: 'Nuevo', features: ['Analog Switches', 'Rapid Trigger', 'Polling 8000Hz'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'razer-blackwidow-v4', name: 'Razer BlackWidow V4 75%', price: '$189', originalPrice: '$189', image: '/images/products/keyboards/razer/blackwidow-v4-75.jpg', rating: 4.6, reviews: 4100, badge: 'Popular', features: ['Hot-swappable', 'Knob + Display', 'RGB Chroma'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
  ],
};

export default KEYBOARDS_CATALOG;
