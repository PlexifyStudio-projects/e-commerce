import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ShoppingCart, Heart, Check, Eye, Search,
  SlidersHorizontal, ChevronDown, X, ArrowLeft,
  Sparkles, Flame, Tag, DollarSign,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import CATEGORIES from '@data/categories';
import CATALOG, { getProductsByCategory } from '@data/catalog';
import { useStore } from '@context/StoreContext';
import { parsePrice, calculateDiscount as calcDiscount } from '@utils/pricing';
import Badge from '@components/ui/Badge';
import ProductImage from '@components/ui/ProductImage';
import ProductModal from '@components/ProductModal';
import styles from './Products.module.scss';

const BASE = import.meta.env.BASE_URL;

const SORT_OPTIONS = [
  { id: 'featured', label: 'Destacados' },
  { id: 'price-asc', label: 'Precio: Menor a Mayor' },
  { id: 'price-desc', label: 'Precio: Mayor a Menor' },
  { id: 'rating', label: 'Mejor Valorados' },
  { id: 'newest', label: 'Mas Recientes' },
];

const PRICE_RANGES = [
  { id: 'all', label: 'Todos los precios', min: 0, max: Infinity },
  { id: 'under-300', label: 'Menos de $300', min: 0, max: 299 },
  { id: '300-500', label: '$300 - $500', min: 300, max: 500 },
  { id: '500-700', label: '$500 - $700', min: 500, max: 700 },
  { id: 'over-700', label: 'Mas de $700', min: 700, max: Infinity },
];

const BADGE_FILTERS = [
  { id: 'all', label: 'Todos', icon: null },
  { id: 'Nuevo', label: 'Novedades', icon: Sparkles },
  { id: 'Popular', label: 'Populares', icon: Flame },
  { id: 'Oferta', label: 'Ofertas', icon: Tag },
];

const Products = ({ initialBadgeFilter = 'all', pageHeading } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get('categoria') || 'all';
  const activeBrand = searchParams.get('marca') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [modalProduct, setModalProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [badgeFilter, setBadgeFilter] = useState(initialBadgeFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  // Get brands for selected category
  const brands = useMemo(() => {
    if (activeCategory === 'all') return [];
    const cat = CATALOG[activeCategory];
    return cat ? cat.brands.map((b) => ({ id: b.id, name: b.name })) : [];
  }, [activeCategory]);

  // Get all products for counting
  const allCategoryProducts = useMemo(() => {
    let items = [];
    if (activeCategory === 'all') {
      Object.keys(CATALOG).forEach((catId) => {
        items.push(...getProductsByCategory(catId));
      });
    } else {
      items = getProductsByCategory(activeCategory);
    }
    return items;
  }, [activeCategory]);

  // Count products by badge
  const badgeCounts = useMemo(() => {
    const counts = { all: allCategoryProducts.length, Nuevo: 0, Popular: 0, Oferta: 0 };
    allCategoryProducts.forEach((p) => {
      if (p.badge && counts[p.badge] !== undefined) {
        counts[p.badge]++;
      }
    });
    return counts;
  }, [allCategoryProducts]);

  // Count products by price range
  const priceCounts = useMemo(() => {
    const counts = {};
    PRICE_RANGES.forEach((range) => {
      counts[range.id] = allCategoryProducts.filter((p) => {
        const price = parsePrice(p.price);
        return price >= range.min && price <= range.max;
      }).length;
    });
    return counts;
  }, [allCategoryProducts]);

  // Get filtered products
  const products = useMemo(() => {
    let items = [...allCategoryProducts];

    // Filter by brand
    if (activeBrand !== 'all') {
      items = items.filter((p) => p.brandId === activeBrand);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === priceRange);
      if (range) {
        items = items.filter((p) => {
          const price = parsePrice(p.price);
          return price >= range.min && price <= range.max;
        });
      }
    }

    // Filter by badge
    if (badgeFilter !== 'all') {
      items = items.filter((p) => p.badge === badgeFilter);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brandName?.toLowerCase().includes(q) ||
          p.features?.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price-desc':
        items.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        items.sort((a, b) => (b.badge === 'Nuevo' ? 1 : 0) - (a.badge === 'Nuevo' ? 1 : 0));
        break;
      default:
        break;
    }

    return items;
  }, [allCategoryProducts, activeBrand, priceRange, badgeFilter, searchQuery, sortBy]);

  // Reset page when filters change
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategory = useCallback(
    (catId) => {
      const params = new URLSearchParams();
      if (catId !== 'all') params.set('categoria', catId);
      setSearchParams(params);
      setCurrentPage(1);
    },
    [setSearchParams]
  );

  const setBrand = useCallback(
    (brandId) => {
      const params = new URLSearchParams(searchParams);
      if (brandId === 'all') {
        params.delete('marca');
      } else {
        params.set('marca', brandId);
      }
      setSearchParams(params);
      setCurrentPage(1);
    },
    [searchParams, setSearchParams]
  );

  const activeCategoryData = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className={styles.page}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            <span>Inicio</span>
          </button>
          <h1 className={styles.pageTitle}>
            {pageHeading || (activeCategoryData ? activeCategoryData.name : 'Todos los Productos')}
          </h1>
          <span className={styles.productCount}>
            {products.length.toLocaleString()} productos
          </span>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={`${styles.sidebar} ${showFilters ? styles['sidebar--open'] : ''}`}>
          <div className={styles.sidebarHeader}>
            <SlidersHorizontal size={16} />
            <span>Filtros</span>
            <button className={styles.sidebarClose} onClick={() => setShowFilters(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Categoria</h3>
            <button
              className={`${styles.filterOption} ${activeCategory === 'all' ? styles['filterOption--active'] : ''}`}
              onClick={() => setCategory('all')}
            >
              Todas las Categorias
            </button>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`${styles.filterOption} ${activeCategory === cat.id ? styles['filterOption--active'] : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  <Icon size={14} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Marca</h3>
              <button
                className={`${styles.filterOption} ${activeBrand === 'all' ? styles['filterOption--active'] : ''}`}
                onClick={() => setBrand('all')}
              >
                Todas las Marcas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  className={`${styles.filterOption} ${activeBrand === brand.id ? styles['filterOption--active'] : ''}`}
                  onClick={() => setBrand(brand.id)}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          )}

          {/* Price Range Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>
              <DollarSign size={12} /> Precio
            </h3>
            {PRICE_RANGES.map((range) => (
              <button
                key={range.id}
                className={`${styles.filterOption} ${priceRange === range.id ? styles['filterOption--active'] : ''}`}
                onClick={() => setPriceRange(range.id)}
              >
                <span>{range.label}</span>
                <span className={styles.filterCount}>{priceCounts[range.id]}</span>
              </button>
            ))}
          </div>

          {/* Badge Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Tipo</h3>
            {BADGE_FILTERS.map((badge) => {
              const Icon = badge.icon;
              return (
                <button
                  key={badge.id}
                  className={`${styles.filterOption} ${badgeFilter === badge.id ? styles['filterOption--active'] : ''}`}
                  onClick={() => setBadgeFilter(badge.id)}
                >
                  {Icon && <Icon size={14} />}
                  <span>{badge.label}</span>
                  <span className={styles.filterCount}>{badgeCounts[badge.id]}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Search + Sort Bar */}
          <div className={styles.toolbar}>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters((p) => !p)}
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>

            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className={styles.sortBox}>
              <ChevronDown size={14} />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Tags */}
          {(activeCategory !== 'all' || activeBrand !== 'all' || priceRange !== 'all' || badgeFilter !== 'all') && (
            <div className={styles.activeTags}>
              {activeCategory !== 'all' && (
                <span className={styles.tag}>
                  {activeCategoryData?.name}
                  <button onClick={() => setCategory('all')}><X size={12} /></button>
                </span>
              )}
              {activeBrand !== 'all' && (
                <span className={styles.tag}>
                  {brands.find((b) => b.id === activeBrand)?.name}
                  <button onClick={() => setBrand('all')}><X size={12} /></button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span className={styles.tag}>
                  {PRICE_RANGES.find((r) => r.id === priceRange)?.label}
                  <button onClick={() => setPriceRange('all')}><X size={12} /></button>
                </span>
              )}
              {badgeFilter !== 'all' && (
                <span className={styles.tag}>
                  {BADGE_FILTERS.find((b) => b.id === badgeFilter)?.label}
                  <button onClick={() => setBadgeFilter('all')}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onViewDetails={() => setModalProduct(product)}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={isWishlisted}
                />
              ))}
            </AnimatePresence>
          </div>

          {products.length === 0 && (
            <div className={styles.empty}>
              <Search size={48} strokeWidth={1} />
              <h3>No se encontraron productos</h3>
              <p>Intenta con otra busqueda o ajusta los filtros.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pagination__btn}
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              <div className={styles.pagination__pages}>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .reduce((acc, page, idx, arr) => {
                    if (idx > 0 && page - arr[idx - 1] > 1) {
                      acc.push('...');
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((page, idx) =>
                    page === '...' ? (
                      <span key={`dots-${idx}`} className={styles.pagination__dots}>...</span>
                    ) : (
                      <button
                        key={page}
                        className={`${styles.pagination__page} ${currentPage === page ? styles['pagination__page--active'] : ''}`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
              </div>

              <button
                className={styles.pagination__btn}
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <span>Siguiente</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {products.length > 0 && (
            <p className={styles.showingNote}>
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, products.length)} de {products.length.toLocaleString()} productos
            </p>
          )}
        </main>
      </div>

      <ProductModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
};

/* ---- Product Card ---- */
const ProductCard = ({ product, index, onViewDetails, addToCart, toggleWishlist, isWishlisted }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation();
      if (addedToCart) return;
      addToCart(product, product.colors?.[0]?.name);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
    },
    [addedToCart, product, addToCart]
  );

  const handleWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      toggleWishlist(product.id);
    },
    [product.id, toggleWishlist]
  );

  const wishlisted = isWishlisted(product.id);
  const discount = calcDiscount(product, 0);

  return (
    <motion.article
      className={styles.card}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
    >
      <div className={styles.cardImageArea} onClick={onViewDetails}>
        <ProductImage
          src={product.image}
          alt={product.name}
          className={styles.cardImage}
          accentColor={product.colors?.[0]?.hex}
        />
        {product.badge && (
          <div className={styles.cardBadge}>
            <Badge variant={product.badge === 'Oferta' ? 'hot' : 'default'}>
              {product.badge}
            </Badge>
          </div>
        )}
        <button
          className={`${styles.cardWishlist} ${wishlisted ? styles['cardWishlist--active'] : ''}`}
          onClick={handleWishlist}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className={styles.cardOverlay}>
          <span className={styles.cardViewBtn}>
            <Eye size={14} /> Ver Detalles
          </span>
        </div>
      </div>

      <div className={styles.cardInfo}>
        {product.brandName && (
          <span className={styles.cardBrand}>{product.brandName}</span>
        )}
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <div className={styles.cardRating}>
          <Star size={11} fill="currentColor" className={styles.cardStar} />
          <span>{product.rating}</span>
          <span className={styles.cardReviews}>({product.reviews?.toLocaleString()})</span>
        </div>
        <div className={styles.cardPricing}>
          <span className={styles.cardPrice}>{product.price}</span>
          {product.originalPrice && (
            <span className={styles.cardOriginal}>{product.originalPrice}</span>
          )}
          {discount > 0 && <span className={styles.cardDiscount}>-{discount}%</span>}
        </div>
        <button
          className={`${styles.cardCartBtn} ${addedToCart ? styles['cardCartBtn--added'] : ''}`}
          onClick={handleAddToCart}
        >
          {addedToCart ? <Check size={14} /> : <ShoppingCart size={14} />}
          <span>{addedToCart ? 'Agregado!' : 'Agregar'}</span>
        </button>
      </div>
    </motion.article>
  );
};

export default Products;
