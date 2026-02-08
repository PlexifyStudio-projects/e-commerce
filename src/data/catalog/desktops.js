const DESKTOPS_CATALOG = {
  id: 'pcs-de-escritorio',
  brands: [
    {
      id: 'asus-rog',
      name: 'ASUS ROG',
      products: [
        { id: 'rog-strix-gt35', name: 'ROG Strix GT35', price: '$2,999', originalPrice: '$3,399', image: '/images/products/desktops/asus/rog-strix-gt35.jpg', rating: 4.9, reviews: 2800, badge: 'Oferta', features: ['RTX 5080', 'i9-14900K', '64GB DDR5'], colors: [{ name: 'Eclipse Negro', hex: '#0A0A0A' }] },
        { id: 'rog-strix-g16d', name: 'ROG Strix G16 Desktop', price: '$1,899', originalPrice: '$2,199', image: '/images/products/desktops/asus/rog-strix-g16d.jpg', rating: 4.7, reviews: 3400, badge: 'Oferta', features: ['RTX 4070 Ti', 'i7-14700K', '32GB DDR5'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'rog-nuc-970', name: 'ROG NUC 970', price: '$2,499', originalPrice: '$2,499', image: '/images/products/desktops/asus/rog-nuc-970.jpg', rating: 4.8, reviews: 1200, badge: 'Nuevo', features: ['RTX 4070', 'Core Ultra 9', 'Mini PC'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
    {
      id: 'custom',
      name: 'Custom Build',
      products: [
        { id: 'custom-rtx5090', name: 'NexTura RTX 5090 Beast', price: '$4,299', originalPrice: '$4,799', image: '/images/products/desktops/custom/rtx5090-build.jpg', rating: 4.9, reviews: 890, badge: 'Nuevo', features: ['RTX 5090', 'i9-14900KS', '128GB DDR5'], colors: [{ name: 'RGB Custom', hex: '#8B5CF6' }] },
        { id: 'custom-creator', name: 'NexTura Creator Pro', price: '$3,499', originalPrice: '$3,899', image: '/images/products/desktops/custom/creator-pro.jpg', rating: 4.8, reviews: 1450, badge: 'Oferta', features: ['RTX 4090', 'Ryzen 9 7950X', '64GB DDR5'], colors: [{ name: 'Blanco', hex: '#E8E8E8' }] },
        { id: 'custom-starter', name: 'NexTura Starter Gaming', price: '$999', originalPrice: '$1,199', image: '/images/products/desktops/custom/starter-gaming.jpg', rating: 4.5, reviews: 3200, badge: 'Oferta', features: ['RTX 4060', 'Ryzen 5 7600', '16GB DDR5'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
  ],
};

export default DESKTOPS_CATALOG;
