const MONITORS_CATALOG = {
  id: 'monitores',
  brands: [
    {
      id: 'asus',
      name: 'ASUS',
      products: [
        { id: 'rog-swift-pg27aqdp', name: 'ROG Swift PG27AQDP', price: '$999', originalPrice: '$999', image: '/images/products/monitors/asus/rog-swift-pg27aqdp.jpg', rating: 4.9, reviews: 2800, badge: 'Nuevo', features: ['27" QD-OLED', '240Hz', '0.03ms'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'rog-swift-pg32ucdm', name: 'ROG Swift PG32UCDM', price: '$1,299', originalPrice: '$1,299', image: '/images/products/monitors/asus/rog-swift-pg32ucdm.jpg', rating: 4.8, reviews: 1800, badge: 'Nuevo', features: ['32" 4K OLED', '240Hz', 'G-Sync'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'proart-pa279crv', name: 'ProArt PA279CRV', price: '$549', originalPrice: '$649', image: '/images/products/monitors/asus/proart-pa279crv.jpg', rating: 4.7, reviews: 3200, badge: 'Oferta', features: ['27" 4K IPS', 'Calman Verified', 'USB-C 96W'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
    {
      id: 'lg',
      name: 'LG',
      products: [
        { id: 'lg-27gp95r', name: 'LG UltraGear 27GR95QE', price: '$799', originalPrice: '$999', image: '/images/products/monitors/lg/27gr95qe.jpg', rating: 4.8, reviews: 4200, badge: 'Oferta', features: ['27" QHD OLED', '240Hz', '0.03ms'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'lg-32un880', name: 'LG 32UN880-B Ergo', price: '$649', originalPrice: '$749', image: '/images/products/monitors/lg/32un880.jpg', rating: 4.7, reviews: 3800, badge: 'Oferta', features: ['32" 4K IPS', 'USB-C', 'Ergo Stand'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
  ],
};

export default MONITORS_CATALOG;
