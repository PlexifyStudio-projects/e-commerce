const TABLETS_CATALOG = {
  id: 'tablets',
  brands: [
    {
      id: 'apple',
      name: 'Apple',
      products: [
        { id: 'ipad-pro-m4', name: 'iPad Pro M4 13"', price: '$1,299', originalPrice: '$1,299', image: '/images/products/tablets/apple/ipad-pro-m4-13.jpg', rating: 4.9, reviews: 5200, badge: 'Nuevo', features: ['Chip M4', 'OLED Tandem', 'Apple Pencil Pro'], colors: [{ name: 'Plata', hex: '#C0C0C5' }, { name: 'Negro Espacial', hex: '#2D2D2D' }] },
        { id: 'ipad-air-m2', name: 'iPad Air M2 11"', price: '$599', originalPrice: '$599', image: '/images/products/tablets/apple/ipad-air-m2.jpg', rating: 4.7, reviews: 4800, badge: 'Popular', features: ['Chip M2', 'Liquid Retina', '10h bateria'], colors: [{ name: 'Azul', hex: '#5B7FA5' }, { name: 'Purpura', hex: '#8A6AAC' }] },
        { id: 'ipad-10', name: 'iPad 10th Gen', price: '$349', originalPrice: '$449', image: '/images/products/tablets/apple/ipad-10.jpg', rating: 4.5, reviews: 7200, badge: 'Oferta', features: ['Chip A14', 'Pantalla 10.9"', 'USB-C'], colors: [{ name: 'Azul', hex: '#5B7FA5' }, { name: 'Rosa', hex: '#F2C4CE' }] },
      ],
    },
    {
      id: 'samsung',
      name: 'Samsung',
      products: [
        { id: 'galaxy-tab-s10-ultra', name: 'Galaxy Tab S10 Ultra', price: '$1,199', originalPrice: '$1,199', image: '/images/products/tablets/samsung/tab-s10-ultra.jpg', rating: 4.8, reviews: 3400, badge: 'Nuevo', features: ['Snapdragon 8 Gen 3', 'AMOLED 14.6"', 'S Pen'], colors: [{ name: 'Grafito', hex: '#3C3C3C' }, { name: 'Plata', hex: '#C0C0C0' }] },
        { id: 'galaxy-tab-s9-fe', name: 'Galaxy Tab S9 FE', price: '$449', originalPrice: '$529', image: '/images/products/tablets/samsung/tab-s9-fe.jpg', rating: 4.6, reviews: 5100, badge: 'Oferta', features: ['Exynos 1380', 'LCD 10.9"', 'IP68'], colors: [{ name: 'Grafito', hex: '#3C3C3C' }, { name: 'Menta', hex: '#B2DFDB' }] },
      ],
    },
  ],
};

export default TABLETS_CATALOG;
