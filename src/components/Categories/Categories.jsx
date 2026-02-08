import { useRef, useState, useEffect } from 'react';
import { motion, useInView, LayoutGroup } from 'framer-motion';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CATEGORIES from '@data/categories';
import styles from './Categories.module.scss';

const BASE = import.meta.env.BASE_URL;

// Grid Layout (14 logical positions):
// [    0 (wide)    ] [    1 (wide)    ]   <- Row 0: 2 wide cards
// [  2  ][  3  ][  4  ][  5  ]            <- Row 1: 4 normal cards
// [  6  ][  7  ][  8  ][  9  ]            <- Row 2: 4 normal cards
// [ 10  ][ 11  ][ 12  ][ 13  ]            <- Row 3: 4 normal cards
//
// Total: 14 positions = 13 categories + 1 empty

// Adjacency map: which positions are neighbors
const ADJACENCY = {
  0: [2, 3],        // Wide left -> below cards
  1: [4, 5],        // Wide right -> below cards
  2: [0, 3, 6],     // Can go up to wide, right, down
  3: [0, 2, 4, 7],  // Can go up to wide, left, right, down
  4: [1, 3, 5, 8],  // Can go up to wide, left, right, down
  5: [1, 4, 9],     // Can go up to wide, left, down
  6: [2, 7, 10],
  7: [3, 6, 8, 11],
  8: [4, 7, 9, 12],
  9: [5, 8, 13],
  10: [6, 11],
  11: [7, 10, 12],
  12: [8, 11, 13],
  13: [9, 12],
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create initial state with RANDOM positions
const createInitialState = () => {
  // All 14 positions (0-13)
  const allPositions = Array.from({ length: 14 }, (_, i) => i);

  // Shuffle positions randomly
  const shuffledPositions = shuffleArray(allPositions);

  // Pick a random position for empty (from the shuffled array)
  const emptyPos = shuffledPositions.pop(); // Last position becomes empty

  // Assign remaining 13 positions to 13 categories
  const positions = {};
  shuffledPositions.forEach((pos, catIndex) => {
    positions[catIndex] = pos;
  });

  return {
    positions, // { categoryIndex: position }
    emptyPos,
    cooldownList: [], // Last 10 moved categories - they CANNOT move until out of this list
  };
};

// Get grid coordinates for rendering
const getGridCoords = (pos) => {
  if (pos === 0) return { row: 0, col: 0, isWide: true };
  if (pos === 1) return { row: 0, col: 2, isWide: true };

  // Normal positions (2-13) map to rows 1-3
  const normalIndex = pos - 2;
  return {
    row: Math.floor(normalIndex / 4) + 1,
    col: normalIndex % 4,
    isWide: false,
  };
};

const Categories = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  const [state, setState] = useState(createInitialState);

  // Execute random moves with 10-move cooldown per category
  useEffect(() => {
    if (!isInView) return;

    let intervalId;

    // Start after initial animations
    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        // Pause when tab is not visible
        if (document.hidden) return;

        setState(current => {
          const { positions, emptyPos, cooldownList } = current;

          // Get adjacent positions to empty
          const adjacent = ADJACENCY[emptyPos];
          if (!adjacent || adjacent.length === 0) {
            return current;
          }

          // Find all categories at adjacent positions
          const adjacentCats = [];
          Object.entries(positions).forEach(([catIndex, pos]) => {
            if (adjacent.includes(pos)) {
              adjacentCats.push({ catIndex: parseInt(catIndex), pos });
            }
          });

          if (adjacentCats.length === 0) {
            return current;
          }

          // Filter: only categories NOT in cooldown (haven't moved in last 10 moves)
          const availableCats = adjacentCats.filter(
            ({ catIndex }) => !cooldownList.includes(catIndex)
          );

          // If no available cats (all in cooldown), we must wait or pick oldest in cooldown
          let chosen;
          if (availableCats.length > 0) {
            // Pick random from available
            const randomIndex = Math.floor(Math.random() * availableCats.length);
            chosen = availableCats[randomIndex];
          } else {
            // Edge case: all adjacent are in cooldown
            // Pick the one that's been in cooldown longest (first in list that's adjacent)
            for (const catIndex of cooldownList) {
              const found = adjacentCats.find(c => c.catIndex === catIndex);
              if (found) {
                chosen = found;
                break;
              }
            }
            // Fallback if somehow none found
            if (!chosen) {
              chosen = adjacentCats[0];
            }
          }

          // Update cooldown list: add new, keep only last 10
          const newCooldownList = [...cooldownList, chosen.catIndex].slice(-10);

          // Swap: category moves to empty, empty moves to category's old spot
          return {
            positions: {
              ...positions,
              [chosen.catIndex]: emptyPos,
            },
            emptyPos: chosen.pos,
            cooldownList: newCooldownList,
          };
        });
      }, 6000); // Every 6 seconds
    }, 2000);

    return () => {
      clearTimeout(startDelay);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView]);

  return (
    <section className={styles.section} id="categories">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <LayoutGrid size={14} />
            Explora Nuestro Catalogo
          </motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Categorias
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            Encuentra exactamente lo que buscas entre miles de productos de las mejores marcas del mundo.
          </motion.p>
        </div>

        {/* Sliding Puzzle Grid */}
        <LayoutGroup>
          <div className={styles.grid}>
            {/* Render all categories */}
            {CATEGORIES.map((cat, catIndex) => {
              const pos = state.positions[catIndex];
              if (pos === undefined) return null;

              const { row, col, isWide } = getGridCoords(pos);

              return (
                <motion.div
                  key={cat.id}
                  layoutId={cat.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/productos?categoria=${cat.id}`)}
                  className={`${styles.card} ${isWide ? styles['card--wide'] : ''}`}
                  style={{
                    '--cat-accent': cat.accentColor,
                    gridColumn: isWide ? `${col + 1} / span 2` : col + 1,
                    gridRow: row + 1,
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    layout: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      mass: 1,
                    },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                >
                  <img
                    src={`${BASE}${cat.image.replace(/^\//, '')}`}
                    alt={cat.name}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardGlow} />
                  <div className={styles.cardContent}>
                    <cat.icon size={isWide ? 28 : 20} className={styles.cardIcon} />
                    <h3 className={styles.cardName}>{cat.name}</h3>
                    {isWide && <p className={styles.cardDesc}>{cat.description}</p>}
                    <div className={styles.cardFooter}>
                      <span className={styles.cardCount}>{cat.count}+ productos</span>
                      <span className={styles.cardArrow}>
                        Explorar <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Empty cell */}
            {(() => {
              const { row, col, isWide } = getGridCoords(state.emptyPos);
              return (
                <motion.div
                  layoutId="empty-cell"
                  className={`${styles.emptyCell} ${isWide ? styles['emptyCell--wide'] : ''}`}
                  style={{
                    gridColumn: isWide ? `${col + 1} / span 2` : col + 1,
                    gridRow: row + 1,
                  }}
                  transition={{
                    layout: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      mass: 1,
                    },
                  }}
                />
              );
            })()}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default Categories;
