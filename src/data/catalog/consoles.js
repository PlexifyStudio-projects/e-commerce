const CONSOLAS_CATALOG = {
  id: 'consolas',
  brands: [
    {
      id: 'sony',
      name: 'Sony',
      products: [
        { id: 'sony-ps5-slim', name: 'PlayStation 5 Slim', price: '$449', originalPrice: '$499', image: '/images/products/consolas/sony/ps5-standard.jpg', rating: 4.8, reviews: 12540, badge: 'Popular', features: ['SSD 1TB', 'Ray Tracing', '4K 120fps'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }, { name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'sony-ps5-pro', name: 'PlayStation 5 Pro', price: '$699', originalPrice: '$699', image: '/images/products/consolas/sony/ps5-pro.jpg', rating: 4.9, reviews: 6210, badge: 'Nuevo', features: ['SSD 2TB', 'GPU mejorada', '8K'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }, { name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'sony-ps5-slim-digital', name: 'PlayStation 5 Slim Digital', price: '$349', originalPrice: '$399', image: '/images/products/consolas/sony/ps5-digital.jpg', rating: 4.7, reviews: 8930, badge: 'Oferta', features: ['SSD 1TB', 'Ray Tracing', 'Sin lector'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }] },
        { id: 'sony-ps-portal', name: 'PlayStation Portal', price: '$199', originalPrice: '$199', image: '/images/products/consolas/sony/ps-portal.jpg', rating: 4.3, reviews: 4520, badge: 'Popular', features: ['Pantalla 8"', 'Remote Play', 'DualSense'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }] },
        { id: 'sony-dualsense-edge', name: 'DualSense Edge', price: '$199', originalPrice: '$199', image: '/images/products/consolas/sony/dualsense-edge.jpg', rating: 4.7, reviews: 8760, badge: 'Popular', features: ['Pro controller', 'Customizable', 'Back buttons'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }] },
      ],
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      products: [
        { id: 'microsoft-xbox-series-x', name: 'Xbox Series X', price: '$499', originalPrice: '$499', image: '/images/products/consolas/microsoft/xbox-series-x.jpg', rating: 4.7, reviews: 11230, badge: 'Popular', features: ['SSD 1TB', '4K 120fps', 'Smart Delivery'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'microsoft-xbox-series-s', name: 'Xbox Series S', price: '$299', originalPrice: '$299', image: '/images/products/consolas/microsoft/xbox-series-s.jpg', rating: 4.5, reviews: 9870, badge: 'Popular', features: ['SSD 512GB', '1440p 120fps', 'Compacta'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }] },
        { id: 'microsoft-xbox-controller-elite', name: 'Xbox Elite Controller Series 2', price: '$179', originalPrice: '$179', image: '/images/products/consolas/microsoft/xbox-controller-elite.jpg', rating: 4.6, reviews: 8760, badge: 'Popular', features: ['Pro controller', 'Back paddles', '40hr battery'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'microsoft-xbox-game-pass', name: 'Xbox Game Pass Ultimate 12 Meses', price: '$179', originalPrice: '$179', image: '/images/products/consolas/microsoft/xbox-game-pass-card.jpg', rating: 4.9, reviews: 45670, badge: 'Popular', features: ['PC + Console', 'EA Play', 'Cloud Gaming'], colors: [{ name: 'Verde', hex: '#107C10' }] },
        { id: 'microsoft-xbox-one-x', name: 'Xbox One X', price: '$349', originalPrice: '$449', image: '/images/products/consolas/microsoft/xbox-one-x.jpg', rating: 4.5, reviews: 14560, badge: 'Oferta', features: ['HDD 1TB', '4K Gaming', 'Gran catalogo'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
      ],
    },
    {
      id: 'nintendo',
      name: 'Nintendo',
      products: [
        { id: 'nintendo-switch-oled', name: 'Nintendo Switch OLED', price: '$349', originalPrice: '$349', image: '/images/products/consolas/nintendo/switch-oled.jpg', rating: 4.8, reviews: 18920, badge: 'Popular', features: ['Pantalla OLED 7"', 'Dock incluido', '64GB'], colors: [{ name: 'Blanco', hex: '#FFFFFF' }, { name: 'Neon', hex: '#FF3C28' }] },
        { id: 'nintendo-switch-lite', name: 'Nintendo Switch Lite', price: '$199', originalPrice: '$199', image: '/images/products/consolas/nintendo/switch-lite.jpg', rating: 4.5, reviews: 21340, badge: '', features: ['Pantalla 5.5"', 'Solo portatil', '32GB'], colors: [{ name: 'Turquesa', hex: '#00C4B3' }, { name: 'Coral', hex: '#FF7F7F' }, { name: 'Amarillo', hex: '#FFF44F' }] },
        { id: 'nintendo-switch-pro-controller', name: 'Pro Controller', price: '$69', originalPrice: '$69', image: '/images/products/consolas/nintendo/switch-pro-controller.jpg', rating: 4.7, reviews: 15670, badge: 'Popular', features: ['40hr battery', 'Motion controls', 'NFC'], colors: [{ name: 'Negro', hex: '#1A1A1A' }] },
        { id: 'nintendo-switch-standard', name: 'Nintendo Switch', price: '$299', originalPrice: '$299', image: '/images/products/consolas/nintendo/switch-standard.jpg', rating: 4.6, reviews: 34560, badge: '', features: ['Pantalla LCD 6.2"', 'Dock incluido', '32GB'], colors: [{ name: 'Neon', hex: '#FF3C28' }, { name: 'Gris', hex: '#828282' }] },
        { id: 'nintendo-joycon-neon', name: 'Joy-Con Neon Red/Blue', price: '$79', originalPrice: '$79', image: '/images/products/consolas/nintendo/joycon-neon.jpg', rating: 4.5, reviews: 23450, badge: '', features: ['HD Rumble', 'Motion IR', 'Versatiles'], colors: [{ name: 'Neon Red', hex: '#FF3C28' }, { name: 'Neon Blue', hex: '#00C3E3' }] },
      ],
    },
  ],
};

export default CONSOLAS_CATALOG;
