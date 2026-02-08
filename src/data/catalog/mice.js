const MICE_CATALOG = {
  id: 'mouse',
  brands: [
    {
      id: 'logitech',
      name: 'Logitech',
      products: [
        { id: 'logitech-g-pro-x-2', name: 'Logitech G PRO X Superlight 2', price: '$159', originalPrice: '$159', image: '/images/products/mice/logitech/g-pro-x-superlight-2.jpg', rating: 4.9, reviews: 7800, badge: 'Popular', features: ['60g', 'HERO 2', '95h bateria'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco', hex: '#E8E8E8' }] },
        { id: 'logitech-mx-master-3s', name: 'Logitech MX Master 3S', price: '$99', originalPrice: '$99', image: '/images/products/mice/logitech/mx-master-3s.jpg', rating: 4.8, reviews: 12400, badge: 'Popular', features: ['8000 DPI', 'MagSpeed', 'Multi-device'], colors: [{ name: 'Grafito', hex: '#3C3C3C' }, { name: 'Gris Palido', hex: '#C0C0C0' }] },
      ],
    },
    {
      id: 'razer',
      name: 'Razer',
      products: [
        { id: 'razer-viper-v3-pro', name: 'Razer Viper V3 Pro', price: '$159', originalPrice: '$159', image: '/images/products/mice/razer/viper-v3-pro.jpg', rating: 4.8, reviews: 4200, badge: 'Nuevo', features: ['49g', '35K DPI', '8000Hz polling'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco', hex: '#E8E8E8' }] },
      ],
    },
  ],
};

export default MICE_CATALOG;
