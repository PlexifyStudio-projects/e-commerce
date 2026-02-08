const SMARTWATCHES_CATALOG = {
  id: 'smartwatches',
  brands: [
    {
      id: 'apple',
      name: 'Apple',
      products: [
        { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2', price: '$799', originalPrice: '$899', image: '/images/products/smartwatches/apple/watch-ultra-2.jpg', rating: 4.8, reviews: 5400, badge: 'Oferta', features: ['Titanio 49mm', 'GPS L1/L5', '100m agua'], colors: [{ name: 'Titanio Natural', hex: '#C4B5A3' }] },
        { id: 'apple-watch-s10', name: 'Apple Watch Series 10', price: '$399', originalPrice: '$399', image: '/images/products/smartwatches/apple/watch-s10.jpg', rating: 4.7, reviews: 6800, badge: 'Nuevo', features: ['Chip S10', 'Pantalla grande', 'Deteccion apnea'], colors: [{ name: 'Jet Black', hex: '#1A1A1A' }, { name: 'Rosa', hex: '#F2C4CE' }] },
        { id: 'apple-watch-se', name: 'Apple Watch SE', price: '$249', originalPrice: '$249', image: '/images/products/smartwatches/apple/watch-se.jpg', rating: 4.5, reviews: 8200, badge: 'Popular', features: ['Chip S8', 'Crash Detection', 'Fitness+'], colors: [{ name: 'Medianoche', hex: '#1C1C1E' }, { name: 'Luz Estelar', hex: '#F5F5F0' }] },
      ],
    },
    {
      id: 'samsung',
      name: 'Samsung',
      products: [
        { id: 'galaxy-watch-ultra', name: 'Galaxy Watch Ultra', price: '$649', originalPrice: '$649', image: '/images/products/smartwatches/samsung/galaxy-watch-ultra.jpg', rating: 4.7, reviews: 3200, badge: 'Nuevo', features: ['Titanio 47mm', '10ATM', 'GPS dual'], colors: [{ name: 'Titanio Gris', hex: '#8A8A8A' }, { name: 'Titanio Plata', hex: '#C0C0C0' }] },
        { id: 'galaxy-watch-7', name: 'Galaxy Watch 7', price: '$299', originalPrice: '$299', image: '/images/products/smartwatches/samsung/galaxy-watch-7.jpg', rating: 4.6, reviews: 5400, badge: 'Nuevo', features: ['Exynos W1000', 'BioActive', 'Galaxy AI'], colors: [{ name: 'Verde', hex: '#7AB77A' }, { name: 'Crema', hex: '#F5F0E0' }] },
        { id: 'galaxy-watch-6-classic', name: 'Galaxy Watch 6 Classic', price: '$349', originalPrice: '$429', image: '/images/products/smartwatches/samsung/galaxy-watch-6-classic.jpg', rating: 4.7, reviews: 4800, badge: 'Oferta', features: ['Bisel giratorio', 'Titanio', 'Wear OS'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Plata', hex: '#C0C0C0' }] },
      ],
    },
  ],
};

export default SMARTWATCHES_CATALOG;
