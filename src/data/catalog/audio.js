const AUDIO_CATALOG = {
  id: 'audio',
  brands: [
    {
      id: 'sony',
      name: 'Sony',
      products: [
        { id: 'sony-wh-1000xm5', name: 'Sony WH-1000XM5', price: '$349', originalPrice: '$399', image: '/images/products/audio/sony/wh-1000xm5.jpg', rating: 4.8, reviews: 12340, badge: 'Oferta', features: ['ANC', '30h bateria', 'LDAC Hi-Res'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Plata', hex: '#B8B8B8' }] },
        { id: 'sony-wf-1000xm5', name: 'Sony WF-1000XM5', price: '$279', originalPrice: '$299', image: '/images/products/audio/sony/wf-1000xm5.jpg', rating: 4.7, reviews: 8900, badge: 'Nuevo', features: ['ANC', 'LDAC', '24h total'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Plata', hex: '#B8B8B8' }] },
        { id: 'sony-ult-wear', name: 'Sony ULT Wear', price: '$199', originalPrice: '$199', image: '/images/products/audio/sony/ult-wear.jpg', rating: 4.5, reviews: 3200, badge: 'Nuevo', features: ['Bass profundo', 'ANC', '50h bateria'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco', hex: '#F5F5F0' }] },
      ],
    },
    {
      id: 'bose',
      name: 'Bose',
      products: [
        { id: 'bose-qc-ultra', name: 'Bose QuietComfort Ultra', price: '$429', originalPrice: '$429', image: '/images/products/audio/bose/qc-ultra.jpg', rating: 4.8, reviews: 6700, badge: 'Nuevo', features: ['Immersive Audio', 'ANC', 'CustomTune'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco Humo', hex: '#E8E8E8' }] },
        { id: 'bose-qc45', name: 'Bose QuietComfort 45', price: '$279', originalPrice: '$329', image: '/images/products/audio/bose/qc45.jpg', rating: 4.7, reviews: 9800, badge: 'Oferta', features: ['ANC', '24h bateria', 'Aware Mode'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Blanco', hex: '#F5F5F0' }] },
        { id: 'bose-soundlink-flex', name: 'Bose SoundLink Flex', price: '$149', originalPrice: '$149', image: '/images/products/audio/bose/soundlink-flex.jpg', rating: 4.6, reviews: 5400, badge: 'Popular', features: ['IP67', '12h bateria', 'PositionIQ'], colors: [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Azul', hex: '#5B7FA5' }] },
      ],
    },
    {
      id: 'steelseries',
      name: 'SteelSeries',
      products: [
        { id: 'arctis-nova-pro', name: 'Arctis Nova Pro Wireless', price: '$349', originalPrice: '$449', image: '/images/products/audio/steelseries/arctis-nova-pro.jpg', rating: 4.7, reviews: 4218, badge: 'Oferta', features: ['Hi-Fi ANC', 'GameDAC', '44h bateria'], colors: [{ name: 'Negro', hex: '#111111' }, { name: 'Blanco', hex: '#E8E8E8' }] },
        { id: 'arctis-nova-7', name: 'Arctis Nova 7', price: '$179', originalPrice: '$179', image: '/images/products/audio/steelseries/arctis-nova-7.jpg', rating: 4.5, reviews: 5600, badge: 'Popular', features: ['2.4GHz + BT', '38h bateria', 'Multi-plataforma'], colors: [{ name: 'Negro', hex: '#111111' }] },
      ],
    },
  ],
};

export default AUDIO_CATALOG;
