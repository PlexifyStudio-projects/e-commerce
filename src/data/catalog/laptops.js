const LAPTOPS_CATALOG = {
  id: 'laptops',
  brands: [
    {
      id: 'apple',
      name: 'Apple',
      products: [
        { id: 'macbook-pro-m4-16', name: 'MacBook Pro M4 Pro 16"', price: '$2,499', originalPrice: '$2,699', image: '/images/products/laptops/apple/macbook-pro-m4-16.jpg', rating: 4.9, reviews: 5420, badge: 'Nuevo', features: ['Chip M4 Pro', '18GB RAM', 'Retina XDR'], colors: [{ name: 'Plata', hex: '#C0C0C5' }, { name: 'Negro Espacial', hex: '#2D2D2D' }] },
        { id: 'macbook-pro-m4-14', name: 'MacBook Pro M4 14"', price: '$1,599', originalPrice: '$1,799', image: '/images/products/laptops/apple/macbook-pro-m4-14.jpg', rating: 4.8, reviews: 4800, badge: 'Popular', features: ['Chip M4', '16GB RAM', '22h bateria'], colors: [{ name: 'Plata', hex: '#C0C0C5' }, { name: 'Negro Espacial', hex: '#2D2D2D' }] },
        { id: 'macbook-air-m3', name: 'MacBook Air M3 15"', price: '$1,299', originalPrice: '$1,299', image: '/images/products/laptops/apple/macbook-air-m3-15.jpg', rating: 4.7, reviews: 6100, badge: 'Popular', features: ['Chip M3', '8GB RAM', 'Fanless'], colors: [{ name: 'Medianoche', hex: '#1C1C1E' }, { name: 'Luz Estelar', hex: '#F5F5F0' }] },
      ],
    },
    {
      id: 'asus',
      name: 'ASUS',
      products: [
        { id: 'rog-strix-g16', name: 'ROG Strix G16', price: '$1,799', originalPrice: '$1,999', image: '/images/products/laptops/asus/rog-strix-g16.jpg', rating: 4.7, reviews: 3800, badge: 'Oferta', features: ['RTX 4070', 'i9-13980HX', '240Hz'], colors: [{ name: 'Eclipse Negro', hex: '#0A0A0A' }] },
        { id: 'rog-zephyrus-g14', name: 'ROG Zephyrus G14', price: '$1,499', originalPrice: '$1,699', image: '/images/products/laptops/asus/rog-zephyrus-g14.jpg', rating: 4.8, reviews: 4200, badge: 'Oferta', features: ['RTX 4060', 'Ryzen 9', 'OLED 120Hz'], colors: [{ name: 'Moonlight White', hex: '#E8E8E8' }, { name: 'Eclipse Gray', hex: '#3A3A3A' }] },
        { id: 'zenbook-14-oled', name: 'Zenbook 14 OLED', price: '$999', originalPrice: '$1,099', image: '/images/products/laptops/asus/zenbook-14-oled.jpg', rating: 4.6, reviews: 3200, badge: 'Oferta', features: ['Intel Core Ultra', 'OLED 2.8K', '1.2kg'], colors: [{ name: 'Ponder Blue', hex: '#3A506B' }] },
      ],
    },
    {
      id: 'lenovo',
      name: 'Lenovo',
      products: [
        { id: 'thinkpad-x1-carbon', name: 'ThinkPad X1 Carbon Gen 12', price: '$1,649', originalPrice: '$1,849', image: '/images/products/laptops/lenovo/thinkpad-x1-carbon.jpg', rating: 4.8, reviews: 5100, badge: 'Oferta', features: ['Intel Core Ultra', '2.8K OLED', '1.08kg'], colors: [{ name: 'Deep Black', hex: '#1A1A1A' }] },
        { id: 'legion-pro-5', name: 'Legion Pro 5 16"', price: '$1,599', originalPrice: '$1,799', image: '/images/products/laptops/lenovo/legion-pro-5.jpg', rating: 4.7, reviews: 3600, badge: 'Oferta', features: ['RTX 4070', 'Ryzen 9', '240Hz'], colors: [{ name: 'Onyx Grey', hex: '#2D2D2D' }] },
      ],
    },
  ],
};

export default LAPTOPS_CATALOG;
