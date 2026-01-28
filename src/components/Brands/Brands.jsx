import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Brands.module.scss';

const BRANDS = [
  { id: 'apple', name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { id: 'samsung', name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { id: 'sony', name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
  { id: 'microsoft', name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { id: 'asus', name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Asus_logo.svg' },
  { id: 'lg', name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' },
  { id: 'nvidia', name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg' },
  { id: 'intel', name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg' },
  { id: 'amd', name: 'AMD', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg' },
  { id: 'logitech', name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logitech_logo.svg' },
  { id: 'razer', name: 'Razer', logo: 'https://upload.wikimedia.org/wikipedia/en/4/40/Razer_snake_logo.svg' },
  { id: 'lenovo', name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
];

const Brands = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <motion.p
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Marcas de confianza mundial
        </motion.p>

        <div className={styles.marquee}>
          <div className={styles.marquee__track}>
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <motion.div
                key={`${brand.id}-${i}`}
                className={styles.brand}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: (i % BRANDS.length) * 0.05 }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={styles.brand__logo}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
