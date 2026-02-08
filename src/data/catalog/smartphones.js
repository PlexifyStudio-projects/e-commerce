const SMARTPHONES_CATALOG = {
  id: 'smartphones',
  brands: [
    {
      id: 'apple',
      name: 'Apple',
      products: [
        { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', price: '$1,199', originalPrice: '$1,199', image: '/images/products/smartphones/apple/iphone-16-pro-max.jpg', rating: 4.9, reviews: 7850, badge: 'Nuevo', features: ['Chip A18 Pro', 'Pantalla 6.9" OLED', 'Camara 48MP'], colors: [{ name: 'Titanio Natural', hex: '#8F8A81' }, { name: 'Titanio Negro', hex: '#3C3C3C' }] },
        { id: 'iphone-16-pro', name: 'iPhone 16 Pro', price: '$999', originalPrice: '$999', image: '/images/products/smartphones/apple/iphone-16-pro.jpg', rating: 4.8, reviews: 7200, badge: 'Nuevo', features: ['Chip A18 Pro', 'Pantalla 6.3" OLED', 'Camara 48MP'], colors: [{ name: 'Titanio Natural', hex: '#8F8A81' }, { name: 'Titanio Negro', hex: '#3C3C3C' }] },
        { id: 'iphone-15', name: 'iPhone 15', price: '$699', originalPrice: '$799', image: '/images/products/smartphones/apple/iphone-15.jpg', rating: 4.7, reviews: 6500, badge: 'Popular', features: ['Chip A16', 'Pantalla 6.1" OLED', 'Dynamic Island'], colors: [{ name: 'Negro', hex: '#1C1C1E' }, { name: 'Azul', hex: '#7BA4CC' }] },
      ],
    },
    {
      id: 'samsung',
      name: 'Samsung',
      products: [
        { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', price: '$1,299', originalPrice: '$1,299', image: '/images/products/smartphones/samsung/galaxy-s25-ultra.jpg', rating: 4.9, reviews: 7400, badge: 'Nuevo', features: ['Snapdragon 8 Elite', 'Pantalla 6.9" AMOLED', 'S Pen'], colors: [{ name: 'Titanio Negro', hex: '#2C2C2C' }, { name: 'Titanio Gris', hex: '#8A8A8A' }] },
        { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', price: '$1,099', originalPrice: '$1,299', image: '/images/products/smartphones/samsung/galaxy-s24-ultra.jpg', rating: 4.9, reviews: 7800, badge: 'Oferta', features: ['Snapdragon 8 Gen 3', 'Camara 200MP', 'S Pen'], colors: [{ name: 'Titanio Negro', hex: '#2C2C2C' }, { name: 'Titanio Violeta', hex: '#8A7090' }] },
        { id: 'galaxy-z-fold-6', name: 'Galaxy Z Fold 6', price: '$1,899', originalPrice: '$1,899', image: '/images/products/smartphones/samsung/galaxy-z-fold-6.jpg', rating: 4.7, reviews: 3200, badge: 'Nuevo', features: ['Snapdragon 8 Gen 3', 'Plegable 7.6"', 'Galaxy AI'], colors: [{ name: 'Azul Marino', hex: '#1B2838' }, { name: 'Rosa', hex: '#E8C0C8' }] },
      ],
    },
    {
      id: 'xiaomi',
      name: 'Xiaomi',
      products: [
        { id: 'xiaomi-15-ultra', name: 'Xiaomi 15 Ultra', price: '$999', originalPrice: '$999', image: '/images/products/smartphones/xiaomi/15-ultra.jpg', rating: 4.8, reviews: 4200, badge: 'Nuevo', features: ['Snapdragon 8 Elite', 'Leica 50MP', 'Carga 90W'], colors: [{ name: 'Negro', hex: '#1C1C1E' }, { name: 'Blanco', hex: '#F5F5F0' }] },
        { id: 'xiaomi-14-ultra', name: 'Xiaomi 14 Ultra', price: '$899', originalPrice: '$999', image: '/images/products/smartphones/xiaomi/14-ultra.jpg', rating: 4.8, reviews: 4600, badge: 'Oferta', features: ['Snapdragon 8 Gen 3', 'Leica Summilux', 'Carga 90W'], colors: [{ name: 'Negro', hex: '#1C1C1E' }, { name: 'Blanco', hex: '#F5F5F0' }] },
      ],
    },
  ],
};

export default SMARTPHONES_CATALOG;
