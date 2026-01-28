import { motion } from 'framer-motion';
import styles from './HeroBackground.module.scss';

// ---- Geometric shapes ----
const SHAPES = [
  { id: 1, type: 'ring', size: 140, x: '12%', y: '18%', delay: 0, dur: 22 },
  { id: 2, type: 'ring', size: 90, x: '80%', y: '12%', delay: 2, dur: 28 },
  { id: 3, type: 'ring', size: 65, x: '92%', y: '58%', delay: 4, dur: 20 },
  { id: 4, type: 'hex', size: 100, x: '6%', y: '70%', delay: 1, dur: 24 },
  { id: 5, type: 'hex', size: 50, x: '65%', y: '85%', delay: 3, dur: 21 },
  { id: 6, type: 'diamond', size: 50, x: '40%', y: '6%', delay: 5, dur: 26 },
  { id: 7, type: 'diamond', size: 35, x: '94%', y: '36%', delay: 0.5, dur: 23 },
  { id: 8, type: 'cross', size: 38, x: '20%', y: '48%', delay: 2.5, dur: 19 },
  { id: 9, type: 'tri', size: 55, x: '72%', y: '30%', delay: 1.5, dur: 25 },
  { id: 10, type: 'tri', size: 40, x: '35%', y: '78%', delay: 0, dur: 27 },
  { id: 11, type: 'ring', size: 45, x: '55%', y: '5%', delay: 3.5, dur: 18 },
  { id: 12, type: 'hex', size: 70, x: '48%', y: '92%', delay: 2, dur: 30 },
];

// ---- Frosted glass panels ----
const GLASS_PANELS = [
  { id: 'g1', w: 140, h: 90, x: '4%', y: '15%', rz: -12, delay: 0, dur: 18 },
  { id: 'g2', w: 110, h: 70, x: '82%', y: '22%', rz: 15, delay: 2, dur: 22 },
  { id: 'g3', w: 100, h: 65, x: '2%', y: '75%', rz: 8, delay: 1, dur: 20 },
  { id: 'g4', w: 120, h: 80, x: '88%', y: '65%', rz: -8, delay: 3, dur: 25 },
  { id: 'g5', w: 80, h: 55, x: '45%', y: '92%', rz: 5, delay: 4, dur: 16 },
];

// ---- Particle constellation ----
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: 1.5 + Math.random() * 3,
  x: `${3 + Math.random() * 94}%`,
  y: `${3 + Math.random() * 94}%`,
  delay: Math.random() * 8,
  dur: 5 + Math.random() * 12,
  peak: 0.15 + Math.random() * 0.35,
}));

const ShapeSVG = ({ type, size }) => {
  const s = size;
  const h = s / 2;

  switch (type) {
    case 'ring':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <circle cx={h} cy={h} r={h - 2} stroke="currentColor" strokeWidth="1" />
          <circle cx={h} cy={h} r={h * 0.4} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
        </svg>
      );
    case 'hex': {
      const r = h - 2;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        return `${h + r * Math.cos(a)},${h + r * Math.sin(a)}`;
      }).join(' ');
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <polygon points={pts} stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    }
    case 'diamond':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <rect x={h} y="2" width={h - 2} height={h - 2} stroke="currentColor" strokeWidth="1" transform={`rotate(45 ${h} ${h})`} />
        </svg>
      );
    case 'cross':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <line x1={h} y1="4" x2={h} y2={s - 4} stroke="currentColor" strokeWidth="1" />
          <line x1="4" y1={h} x2={s - 4} y2={h} stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case 'tri': {
      const pts = `${h},4 ${s - 4},${s - 4} 4,${s - 4}`;
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <polygon points={pts} stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    }
    default:
      return null;
  }
};

const HeroBackground = ({ accentColor, gradient }) => {
  return (
    <div className={styles.bg}>
      {/* Base gradient wash */}
      <motion.div
        className={styles.bg__gradient}
        style={{ background: gradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2 }}
      />

      {/* Mesh gradient orbs — large blurred color blobs */}
      <div className={styles.bg__orbs}>
        <motion.div
          className={styles.bg__orb}
          style={{ '--orb-color': accentColor, left: '15%', top: '20%', width: 600, height: 600 }}
          animate={{ x: [0, 40, -20, 30, 0], y: [0, -30, 20, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.bg__orb}
          style={{ '--orb-color': accentColor, right: '10%', top: '50%', width: 500, height: 500 }}
          animate={{ x: [0, -30, 25, -15, 0], y: [0, 25, -20, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <motion.div
          className={`${styles.bg__orb} ${styles['bg__orb--cool']}`}
          style={{ left: '55%', top: '5%', width: 450, height: 450 }}
          animate={{ x: [0, 20, -30, 10, 0], y: [0, -20, 30, -25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Aurora blobs */}
      <motion.div
        className={styles.bg__aurora}
        style={{ '--aurora-color': accentColor }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* 3D Perspective grid */}
      <div className={styles.bg__gridWrap}>
        <div className={styles.bg__grid} />
      </div>

      {/* Orbital ellipses with glowing dots */}
      <div className={styles.bg__orbits}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={styles.bg__orbit}
            style={{ width: 350 + i * 150, height: 350 + i * 150 }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear', delay: i * 2 }}
          >
            <div className={styles.bg__orbitDot} />
          </motion.div>
        ))}
      </div>

      {/* Floating 3D geometric shapes */}
      <div className={styles.bg__shapes}>
        {SHAPES.map((shape) => (
          <motion.div
            key={shape.id}
            className={styles.bg__shape}
            style={{ left: shape.x, top: shape.y }}
            animate={{
              y: [0, -25, 12, -18, 0],
              x: [0, 12, -10, 6, 0],
              rotateX: [0, 20, -12, 8, 0],
              rotateY: [0, -25, 18, -10, 0],
              rotateZ: [0, 6, -4, 10, 0],
            }}
            transition={{ duration: shape.dur, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }}
          >
            <ShapeSVG type={shape.type} size={shape.size} />
          </motion.div>
        ))}
      </div>

      {/* Frosted glass floating panels */}
      <div className={styles.bg__panels}>
        {GLASS_PANELS.map((p) => (
          <motion.div
            key={p.id}
            className={styles.bg__panel}
            style={{ left: p.x, top: p.y, width: p.w, height: p.h, rotate: p.rz }}
            animate={{
              y: [0, -15, 8, -12, 0],
              rotateX: [0, 8, -5, 3, 0],
              rotateY: [0, -6, 10, -4, 0],
            }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* Particle constellation field */}
      <div className={styles.bg__particles}>
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className={styles.bg__particle}
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ opacity: [0, p.peak, 0], scale: [0.5, 1, 0.5], y: [0, -10, 5, -8, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* Radial spotlight from top */}
      <div className={styles.bg__spotlight} style={{ '--spot-color': accentColor }} />

      {/* Diagonal light rays */}
      <div className={styles.bg__rays}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={styles.bg__ray}
            animate={{ opacity: [0.02, 0.08, 0.02] }}
            transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          />
        ))}
      </div>

      {/* Horizontal light lines */}
      <div className={styles.bg__lines}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={styles.bg__line}
            style={{ top: `${25 + i * 25}%` }}
            animate={{ opacity: [0.08, 0.22, 0.08], scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          />
        ))}
      </div>

      {/* Noise texture */}
      <div className={styles.bg__noise} />

      {/* Vignette */}
      <div className={styles.bg__vignette} />
    </div>
  );
};

export default HeroBackground;
