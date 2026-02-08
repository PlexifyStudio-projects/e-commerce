const CAMERAS_CATALOG = {
  id: 'camaras',
  brands: [
    {
      id: 'sony',
      name: 'Sony',
      products: [
        { id: 'sony-a7r-v', name: 'Sony A7R V', price: '$3,499', originalPrice: '$3,899', image: '/images/products/cameras/sony/a7r-v.jpg', rating: 4.9, reviews: 3200, badge: 'Oferta', features: ['61MP Full Frame', '8K Video', 'AI AF'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'sony-a7c-ii', name: 'Sony A7C II', price: '$2,199', originalPrice: '$2,199', image: '/images/products/cameras/sony/a7c-ii.jpg', rating: 4.8, reviews: 2800, badge: 'Nuevo', features: ['33MP Full Frame', 'Compacta', '4K 60fps'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Plata', hex: '#C0C0C0' }] },
      ],
    },
    {
      id: 'canon',
      name: 'Canon',
      products: [
        { id: 'canon-r6-iii', name: 'Canon EOS R6 Mark III', price: '$2,499', originalPrice: '$2,499', image: '/images/products/cameras/canon/eos-r6-iii.jpg', rating: 4.8, reviews: 2400, badge: 'Nuevo', features: ['24.2MP Full Frame', '40fps', '6K RAW'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'canon-r50', name: 'Canon EOS R50', price: '$679', originalPrice: '$799', image: '/images/products/cameras/canon/eos-r50.jpg', rating: 4.5, reviews: 4200, badge: 'Oferta', features: ['24.2MP APS-C', '4K Video', 'Compacta'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco', hex: '#F5F5F0' }] },
      ],
    },
  ],
};

export default CAMERAS_CATALOG;
