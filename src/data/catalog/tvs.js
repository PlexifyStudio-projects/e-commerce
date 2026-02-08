const TVS_CATALOG = {
  id: 'televisores',
  brands: [
    {
      id: 'samsung',
      name: 'Samsung',
      products: [
        { id: 'samsung-s95d-65', name: 'Samsung S95D OLED 65"', price: '$2,599', originalPrice: '$2,999', image: '/images/products/tvs/samsung/s95d-65.jpg', rating: 4.9, reviews: 4200, badge: 'Oferta', features: ['4K OLED', '144Hz', 'HDR10+'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'samsung-frame-55', name: 'Samsung The Frame 55"', price: '$1,299', originalPrice: '$1,499', image: '/images/products/tvs/samsung/frame-55.jpg', rating: 4.7, reviews: 6800, badge: 'Oferta', features: ['4K QLED', 'Art Mode', 'Anti-reflejo'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'samsung-qn90d-55', name: 'Samsung QN90D Neo QLED 55"', price: '$1,599', originalPrice: '$1,799', image: '/images/products/tvs/samsung/qn90d-55.jpg', rating: 4.8, reviews: 3600, badge: 'Oferta', features: ['4K Neo QLED', '144Hz', 'Neural Quantum'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
    {
      id: 'lg',
      name: 'LG',
      products: [
        { id: 'lg-c4-65', name: 'LG C4 OLED evo 65"', price: '$1,799', originalPrice: '$2,099', image: '/images/products/tvs/lg/c4-65.jpg', rating: 4.9, reviews: 5600, badge: 'Oferta', features: ['4K OLED evo', '120Hz', 'a9 Gen7 AI'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'lg-g4-65', name: 'LG G4 OLED evo 65"', price: '$2,999', originalPrice: '$3,299', image: '/images/products/tvs/lg/g4-65.jpg', rating: 4.9, reviews: 3200, badge: 'Nuevo', features: ['4K OLED evo', 'MLA', 'Brightness Booster'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
  ],
};

export default TVS_CATALOG;
