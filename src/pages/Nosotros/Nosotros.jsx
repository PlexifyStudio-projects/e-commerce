import { useRef, useState, useEffect, useCallback, Fragment } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Heart, Award, Zap, Globe,
  Truck, Headphones, Star, ArrowRight, ArrowDown,
  Sparkles, Target, TrendingUp, Quote, CheckCircle2,
  Package, CreditCard, RotateCcw, Linkedin,
  Rocket, Eye, ChevronRight, ChevronLeft, Play,
} from 'lucide-react';
import styles from './Nosotros.module.scss';

const BASE = import.meta.env.BASE_URL;
const img = (p) => `${BASE}${p.replace(/^\//, '')}`;

/* ─── Animation Wrappers ─── */
const Reveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

const StaggerWrap = ({ children, className, gap = 0.1 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial="hidden" animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
      {children}
    </motion.div>
  );
};

const StaggerChild = ({ children, className, style }) => (
  <motion.div className={className} style={style}
    variants={{
      hidden: { opacity: 0, y: 40 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    }}>
    {children}
  </motion.div>
);

const NumCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
    let cur = 0;
    const step = num / 50;
    const id = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 30);
    return () => clearInterval(id);
  }, [inView, value]);
  const display = value.toString().includes('.') ? count.toFixed(1) : count.toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
};

/* ─── Data ─── */
const STATS = [
  { val: '50', suf: 'K+', label: 'Clientes Felices' },
  { val: '10', suf: 'K+', label: 'Productos' },
  { val: '99.8', suf: '%', label: 'Satisfaccion' },
  { val: '24', suf: '/7', label: 'Soporte Activo' },
];

const TEAM = [
  { name: 'Carlos Martinez', role: 'CEO & Fundador', image: '/images/nosotros/team-1.jpg', quote: 'La tecnologia debe ser accesible para todos, sin excepciones.', linkedin: '#' },
  { name: 'Sofia Rodriguez', role: 'Dir. Producto', image: '/images/nosotros/team-2.jpg', quote: 'Cada detalle cuenta en la experiencia del usuario.', linkedin: '#' },
  { name: 'Diego Fernandez', role: 'CTO', image: '/images/nosotros/team-3.jpg', quote: 'Innovamos hoy para construir el futuro digital.', linkedin: '#' },
  { name: 'Valentina Lopez', role: 'Dir. Marketing', image: '/images/nosotros/team-4.jpg', quote: 'Las grandes marcas se construyen con autenticidad.', linkedin: '#' },
  { name: 'Andres Morales', role: 'Head Logistica', image: '/images/nosotros/team-5.jpg', quote: 'La velocidad de entrega es nuestro diferencial.', linkedin: '#' },
  { name: 'Isabella Torres', role: 'Dir. UX', image: '/images/nosotros/team-6.jpg', quote: 'Diseñamos experiencias que conectan emocionalmente.', linkedin: '#' },
];

const GALLERY = [
  { src: '/images/nosotros/gallery-headphones.jpg', label: 'Audio Premium' },
  { src: '/images/categories/smartwatches.jpg', label: 'Smartwatches' },
  { src: '/images/categories/audio.jpg', label: 'Earbuds Pro' },
  { src: '/images/nosotros/gallery-phone.jpg', label: 'Smartphones' },
  { src: '/images/nosotros/gallery-laptop.jpg', label: 'Laptops Pro' },
  { src: '/images/nosotros/gallery-workspace.jpg', label: 'Workspace' },
];

const VALUES = [
  { icon: Shield, title: 'Confianza', desc: 'Cada producto pasa por riguroso control de calidad. Autenticidad garantizada al 100%.', accent: '#4A7BF7' },
  { icon: Zap, title: 'Innovacion', desc: 'Los primeros en traerte la ultima tecnologia. Siempre a la vanguardia.', accent: '#F59E0B' },
  { icon: Heart, title: 'Pasion', desc: 'Amamos la tecnologia tanto como tu. Recomendaciones de expertos reales.', accent: '#EF4444' },
  { icon: Globe, title: 'Accesibilidad', desc: 'Tecnologia premium al alcance de todos. Precios justos y financiacion.', accent: '#10B981' },
  { icon: Truck, title: 'Velocidad', desc: 'Envios express en 24-48 horas. Tu tiempo vale tanto como tu compra.', accent: '#8B5CF6' },
  { icon: Award, title: 'Excelencia', desc: 'Mejor e-commerce tech 3 años consecutivos. Tu satisfaccion es la meta.', accent: '#E8703A' },
];

const MILESTONES = [
  { year: '2019', title: 'El Genesis', desc: 'NexTura nace con la vision de democratizar la tecnologia premium.', image: '/images/nosotros/timeline-1.jpg' },
  { year: '2020', title: 'Expansion Digital', desc: 'Plataforma online. 5,000 clientes en 6 meses.', image: '/images/nosotros/timeline-2.jpg' },
  { year: '2022', title: 'Lider Regional', desc: '#1 en e-commerce tech con 30K+ clientes activos.', image: '/images/nosotros/timeline-3.jpg' },
  { year: '2024', title: 'IA & Personalizacion', desc: 'Recomendaciones con IA y servicio premium 24/7.', image: '/images/nosotros/timeline-4.jpg' },
  { year: '2025', title: 'Vision Global', desc: '50K+ clientes y expansion internacional en marcha.', image: '/images/nosotros/timeline-5.jpg' },
];

const TESTIMONIALS = [
  { name: 'Andrea Garcia', role: 'Diseñadora UX · Google', avatar: '/images/nosotros/avatar-1.jpg', text: 'La mejor tienda de tecnologia que he encontrado. Envio rapido, productos 100% originales y atencion excepcional.' },
  { name: 'Roberto Mendez', role: 'Ing. Software · Meta', avatar: '/images/nosotros/avatar-2.jpg', text: 'Increible atencion al cliente. Tuve un problema y lo resolvieron en menos de 2 horas. Profesionalismo a otro nivel.' },
  { name: 'Laura Perez', role: 'Emprendedora Digital', avatar: '/images/nosotros/avatar-3.jpg', text: 'Precios inmejorables y ofertas imperdibles. 3 años como cliente frecuente y cada vez me sorprenden mas.' },
];

const GUARANTEES = [
  { icon: Shield, label: '100% Original' },
  { icon: RotateCcw, label: '30 Dias Devolucion' },
  { icon: CreditCard, label: 'Pago Seguro' },
  { icon: Truck, label: 'Envio Gratis' },
];

/* ─── Component ─── */
const Nosotros = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero
  const heroRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(hp, [0, 1], [0, -80]);
  const heroImgScale = useTransform(hp, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(hp, [0, 1], [0, 100]);
  const heroOp = useTransform(hp, [0, 0.65], [1, 0]);

  // Testimonial carousel
  const [tIdx, setTIdx] = useState(0);
  const tNext = useCallback(() => setTIdx(p => (p + 1) % TESTIMONIALS.length), []);
  const tPrev = useCallback(() => setTIdx(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);
  useEffect(() => { const id = setInterval(tNext, 6000); return () => clearInterval(id); }, [tNext]);

  // CTA
  const ctaRef = useRef(null);
  const { scrollYProgress: cp } = useScroll({ target: ctaRef, offset: ['start end', 'end start'] });
  const ctaBgY = useTransform(cp, [0, 1], [-50, 50]);
  const ctaBgScale = useTransform(cp, [0, 0.5, 1], [1.15, 1, 1.1]);

  // Values orb
  const pillarsRef = useRef(null);
  const { scrollYProgress: vp } = useScroll({ target: pillarsRef, offset: ['start end', 'end start'] });
  const valRotate = useTransform(vp, [0, 1], [0, 360]);

  return (
    <div className={styles.page}>
      <motion.div className={styles.bar} style={{ scaleX }} />

      {/* ═══ 1. HERO — Split Layout ═══ */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.hero__ambient}>
          <div className={styles.hero__orb1} />
          <div className={styles.hero__orb2} />
          <div className={styles.hero__mesh} />
          <div className={styles.hero__grid} />
          <div className={styles.hero__noise} />
        </div>

        <div className={styles.hero__inner}>
          <motion.div className={styles.hero__left} style={{ y: heroTextY, opacity: heroOp }}>
            <motion.span className={styles.hero__badge}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}>
              <Sparkles size={14} /> Sobre NexTura
            </motion.span>

            <motion.h1 className={styles.hero__title}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
              Redefinimos la experiencia de comprar{' '}
              <span className={styles.hero__gold}>tecnologia</span>
            </motion.h1>

            <motion.p className={styles.hero__sub}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}>
              Mas de 50,000 personas confian en nosotros para acceder a la mejor
              tecnologia del mundo. Autenticidad, velocidad y servicio excepcional.
            </motion.p>

            <motion.div className={styles.hero__ctas}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}>
              <a href="#/productos" className={styles.btnGold}>
                Explorar Productos <ArrowRight size={18} />
              </a>
              <a href="#/ofertas" className={styles.btnGhost}>
                <Zap size={16} /> Ver Ofertas
              </a>
            </motion.div>

            <motion.div className={styles.hero__trust}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
              {GUARANTEES.map(g => (
                <span key={g.label} className={styles.hero__tag}>
                  <g.icon size={13} /> {g.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className={styles.hero__right}
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className={styles.hero__frame}>
              <motion.img src={img('/images/nosotros/hero-bg.jpg')} alt=""
                className={styles.hero__img} style={{ y: heroImgY, scale: heroImgScale }} />
              <div className={styles.hero__frameOverlay} />
              <div className={styles.hero__frameBorder} />
            </div>

            <motion.div className={styles.hero__float1}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <TrendingUp size={18} />
              <div><strong>+320%</strong><small>Crecimiento 2024</small></div>
            </motion.div>

            <motion.div className={styles.hero__float2}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
              <Award size={16} />
              <div><strong>#1 Tech</strong><small>E-commerce</small></div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div className={styles.hero__scroll}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ 2. METRICS STRIP ═══ */}
      <section className={styles.metrics}>
        <div className={styles.metrics__inner}>
          {STATS.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && <div className={styles.metrics__sep} />}
              <Reveal className={styles.metrics__item} delay={i * 0.1}>
                <span className={styles.metrics__num}>
                  <NumCounter value={s.val} suffix={s.suf} />
                </span>
                <span className={styles.metrics__label}>{s.label}</span>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </section>

      {/* ═══ 3. MANIFESTO ═══ */}
      <section className={styles.manifesto}>
        <div className={styles.manifesto__bg}>
          <div className={styles.manifesto__orb} />
          <div className={styles.manifesto__noise} />
        </div>
        <Reveal className={styles.manifesto__content}>
          <Quote size={48} className={styles.manifesto__icon} />
          <blockquote className={styles.manifesto__quote}>
            Creemos que la mejor tecnologia no deberia ser un lujo
            <span className={styles.manifesto__accent}> — deberia ser accesible para todos.</span>
          </blockquote>
          <div className={styles.manifesto__line} />
          <span className={styles.manifesto__sig}>NexTura · Desde 2019</span>
        </Reveal>
      </section>

      {/* ═══ 4. STORY BENTO ═══ */}
      <section className={styles.bento}>
        <div className={styles.bento__container}>
          <Reveal className={styles.bento__header}>
            <span className={styles.label}><Target size={14} /> Nuestra Historia</span>
            <h2 className={styles.heading}>De una idea audaz a liderar el mercado</h2>
          </Reveal>

          <div className={styles.bento__grid}>
            <Reveal className={styles.bento__imgMain}>
              <img src={img('/images/nosotros/story.jpg')} alt="NexTura" loading="lazy" />
              <div className={styles.bento__imgGrad} />
            </Reveal>

            <Reveal className={styles.bento__text} delay={0.1}>
              <p>NexTura nacio en 2019 con una mision clara: hacer que la mejor tecnologia
                del mundo sea accesible para todos. Lo que empezo como un pequeño proyecto
                se convirtio en el e-commerce de tecnologia mas confiable de la region.</p>
              <p>Hoy, mas de 50,000 clientes confian en nosotros. Nuestro secreto: un equipo
                apasionado, productos 100% originales y un servicio que supera cualquier expectativa.</p>
              <a href="#/productos" className={styles.bento__link}>
                Conoce nuestros productos <ChevronRight size={16} />
              </a>
            </Reveal>

            <Reveal className={styles.bento__imgSide} delay={0.15}>
              <img src={img('/images/nosotros/showcase.jpg')} alt="Showcase" loading="lazy" />
              <div className={styles.bento__imgGrad} />
              <div className={styles.bento__badge}>
                <TrendingUp size={16} />
                <span>E-commerce #1</span>
              </div>
            </Reveal>
          </div>

          <StaggerWrap className={styles.bento__checks} gap={0.08}>
            {['Productos 100% originales', 'Atencion por expertos', 'Envio gratis + devoluciones', 'Ofertas exclusivas'].map(t => (
              <StaggerChild key={t} className={styles.bento__check}>
                <CheckCircle2 size={18} /> {t}
              </StaggerChild>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ 5. SHOWCASE — Horizontal Scroll ═══ */}
      <section className={styles.showcase}>
        <div className={styles.showcase__container}>
          <Reveal className={styles.showcase__header}>
            <span className={styles.label}><Eye size={14} /> Lo Que Vendemos</span>
            <h2 className={styles.heading}>Tecnologia que inspira</h2>
          </Reveal>
        </div>

        <div className={styles.showcase__track}>
          {GALLERY.map((item, i) => (
            <Reveal key={i} className={styles.showcase__slide} delay={i * 0.06}>
              <img src={img(item.src)} alt={item.label} className={styles.showcase__img} loading="lazy" />
              <div className={styles.showcase__over}>
                <span className={styles.showcase__slideLabel}>{item.label}</span>
                <span className={styles.showcase__explore}><Play size={12} /> Ver</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.showcase__ctaRow}>
          <a href="#/productos" className={styles.showcase__ctaBtn}>
            Ver Catalogo Completo <ArrowRight size={16} />
          </a>
        </Reveal>
      </section>

      {/* ═══ 6. CREW — Team ═══ */}
      <section className={styles.crew}>
        <div className={styles.crew__container}>
          <Reveal className={styles.crew__header}>
            <span className={styles.label}><Users size={14} /> El Equipo</span>
            <h2 className={styles.heading}>Las mentes detras de NexTura</h2>
          </Reveal>

          {/* CEO Spotlight */}
          <Reveal>
            <div className={styles.crew__leader}>
              <div className={styles.crew__leaderImg}>
                <img src={img(TEAM[0].image)} alt={TEAM[0].name} loading="lazy" />
                <div className={styles.crew__leaderGrad} />
              </div>
              <div className={styles.crew__leaderContent}>
                <Quote size={32} className={styles.crew__quoteIcon} />
                <blockquote className={styles.crew__leaderQuote}>{TEAM[0].quote}</blockquote>
                <div className={styles.crew__leaderInfo}>
                  <h3>{TEAM[0].name}</h3>
                  <span>{TEAM[0].role}</span>
                </div>
                <a href={TEAM[0].linkedin} className={styles.crew__ln}>
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          {/* Members — Circular avatars */}
          <StaggerWrap className={styles.crew__members} gap={0.08}>
            {TEAM.slice(1).map(m => (
              <StaggerChild key={m.name} className={styles.crew__person}>
                <div className={styles.crew__avatar}>
                  <img src={img(m.image)} alt={m.name} loading="lazy" />
                  <div className={styles.crew__ring} />
                </div>
                <h3 className={styles.crew__name}>{m.name}</h3>
                <span className={styles.crew__role}>{m.role}</span>
                <p className={styles.crew__memberQuote}>&ldquo;{m.quote}&rdquo;</p>
              </StaggerChild>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ 7. PILLARS — Values (Dark) ═══ */}
      <section className={styles.pillars} ref={pillarsRef}>
        <div className={styles.pillars__bg}>
          <div className={styles.pillars__orb1} />
          <div className={styles.pillars__orb2} />
          <motion.div className={styles.pillars__ringDeco} style={{ rotate: valRotate }} />
          <div className={styles.pillars__noise} />
        </div>

        <div className={styles.pillars__container}>
          <Reveal className={styles.pillars__header}>
            <span className={styles.labelLight}><Heart size={14} /> Nuestros Valores</span>
            <h2 className={styles.pillars__title}>Lo que nos define como empresa</h2>
          </Reveal>

          <StaggerWrap className={styles.pillars__grid} gap={0.08}>
            {VALUES.map((v, i) => (
              <StaggerChild key={v.title} className={styles.pillar} style={{ '--p-accent': v.accent }}>
                <span className={styles.pillar__idx}>0{i + 1}</span>
                <div className={styles.pillar__iconWrap}>
                  <v.icon size={22} />
                </div>
                <h3 className={styles.pillar__title}>{v.title}</h3>
                <p className={styles.pillar__desc}>{v.desc}</p>
              </StaggerChild>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ 8. JOURNEY — Timeline ═══ */}
      <section className={styles.journey}>
        <div className={styles.journey__container}>
          <Reveal className={styles.journey__header}>
            <span className={styles.label}><Rocket size={14} /> Nuestro Camino</span>
            <h2 className={styles.heading}>De la vision a la realidad</h2>
          </Reveal>

          <div className={styles.journey__rail}>
            <div className={styles.journey__line} />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year}
                className={`${styles.journey__stop} ${i % 2 !== 0 ? styles['journey__stop--alt'] : ''}`}
                delay={i * 0.1}>
                <div className={styles.journey__dot}><span>{m.year}</span></div>
                <div className={styles.journey__card}>
                  <div className={styles.journey__cardImg}>
                    <img src={img(m.image)} alt={m.title} loading="lazy" />
                  </div>
                  <div className={styles.journey__cardBody}>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. VOICES — Testimonial Carousel ═══ */}
      <section className={styles.voices}>
        <div className={styles.voices__container}>
          <Reveal className={styles.voices__header}>
            <span className={styles.label}><Star size={14} /> Testimonios</span>
            <h2 className={styles.heading}>Lo que dicen nuestros clientes</h2>
          </Reveal>

          <div className={styles.voices__stage}>
            <AnimatePresence mode="wait">
              <motion.div key={tIdx} className={styles.voices__slide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className={styles.voices__stars}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={20} fill="currentColor" />
                  ))}
                </div>
                <Quote size={40} className={styles.voices__quoteIcon} />
                <blockquote className={styles.voices__text}>
                  &ldquo;{TESTIMONIALS[tIdx].text}&rdquo;
                </blockquote>
                <div className={styles.voices__author}>
                  <img src={img(TESTIMONIALS[tIdx].avatar)} alt={TESTIMONIALS[tIdx].name}
                    className={styles.voices__pic} />
                  <div>
                    <span className={styles.voices__name}>{TESTIMONIALS[tIdx].name}</span>
                    <span className={styles.voices__role}>{TESTIMONIALS[tIdx].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className={styles.voices__nav}>
              <button onClick={tPrev} className={styles.voices__btn} aria-label="Anterior">
                <ChevronLeft size={20} />
              </button>
              <div className={styles.voices__dots}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i}
                    className={`${styles.voices__dot} ${i === tIdx ? styles['voices__dot--on'] : ''}`}
                    onClick={() => setTIdx(i)}
                    aria-label={`Testimonio ${i + 1}`} />
                ))}
              </div>
              <button onClick={tNext} className={styles.voices__btn} aria-label="Siguiente">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 10. FINALE — CTA ═══ */}
      <section className={styles.finale} ref={ctaRef}>
        <motion.div className={styles.finale__bg} style={{ y: ctaBgY, scale: ctaBgScale }}>
          <img src={img('/images/nosotros/cta-bg.jpg')} alt="" className={styles.finale__bgImg} />
          <div className={styles.finale__overlay} />
        </motion.div>
        <div className={styles.finale__noise} />
        <div className={styles.finale__orbs}>
          <div className={styles.finale__orb1} />
          <div className={styles.finale__orb2} />
        </div>
        <Reveal className={styles.finale__content}>
          <h2 className={styles.finale__title}>
            ¿Listo para descubrir<br />lo mejor en tecnologia?
          </h2>
          <p className={styles.finale__desc}>
            Explora nuestra coleccion curada de productos premium. Envio gratis en compras +$99.
          </p>
          <div className={styles.finale__btns}>
            <a href="#/productos" className={styles.btnGold}>
              Explorar Productos <ArrowRight size={18} />
            </a>
            <a href="#/ofertas" className={styles.btnGhost}>
              <Zap size={16} /> Ver Ofertas
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Nosotros;
