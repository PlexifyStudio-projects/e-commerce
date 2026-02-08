const ACCESSORIES_CATALOG = {
  id: 'accesorios',
  brands: [
    {
      id: 'anker',
      name: 'Anker',
      products: [
        { id: 'anker-737-powerbank', name: 'Anker 737 PowerCore 24K', price: '$109', originalPrice: '$129', image: '/images/products/accessories/anker/737-powerbank.jpg', rating: 4.7, reviews: 6800, badge: 'Oferta', features: ['24,000 mAh', '140W USB-C', 'Smart Display'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
    {
      id: 'apple-acc',
      name: 'Apple',
      products: [
        { id: 'apple-pencil-pro', name: 'Apple Pencil Pro', price: '$129', originalPrice: '$129', image: '/images/products/accessories/apple/pencil-pro.jpg', rating: 4.8, reviews: 5200, badge: 'Nuevo', features: ['Barrel Roll', 'Haptic', 'Find My'], colors: [{ name: 'Blanco', hex: '#F5F5F0' }] },
      ],
    },
    {
      id: 'samsung-acc',
      name: 'Samsung',
      products: [
        { id: 'samsung-buds3-pro', name: 'Galaxy Buds3 Pro', price: '$249', originalPrice: '$249', image: '/images/products/accessories/samsung/buds3-pro.jpg', rating: 4.6, reviews: 4100, badge: 'Nuevo', features: ['ANC', 'Hi-Fi 24-bit', 'IP57'], colors: [{ name: 'Plata', hex: '#C0C0C0' }, { name: 'Blanco', hex: '#F5F5F0' }] },
      ],
    },
  ],
};

export default ACCESSORIES_CATALOG;
