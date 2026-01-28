import SMARTPHONES_CATALOG from './smartphones';
import TVS_CATALOG from './tvs';
import TABLETS_CATALOG from './tablets';
import DESKTOPS_CATALOG from './desktops';
import LAPTOPS_CATALOG from './laptops';
import ACCESSORIES_CATALOG from './accessories';
import KEYBOARDS_CATALOG from './keyboards';
import MICE_CATALOG from './mice';
import CONSOLAS_CATALOG from './consoles';
import AUDIO_CATALOG from './audio';
import SMARTWATCHES_CATALOG from './smartwatches';
import MONITORS_CATALOG from './monitors';
import CAMERAS_CATALOG from './cameras';

const CATALOG = {
  smartphones: SMARTPHONES_CATALOG,
  tvs: TVS_CATALOG,
  tablets: TABLETS_CATALOG,
  desktops: DESKTOPS_CATALOG,
  laptops: LAPTOPS_CATALOG,
  accessories: ACCESSORIES_CATALOG,
  keyboards: KEYBOARDS_CATALOG,
  mice: MICE_CATALOG,
  consoles: CONSOLAS_CATALOG,
  audio: AUDIO_CATALOG,
  smartwatches: SMARTWATCHES_CATALOG,
  monitors: MONITORS_CATALOG,
  cameras: CAMERAS_CATALOG,
};

export default CATALOG;

// Helper: get all products for a category (flat array)
export const getProductsByCategory = (categoryId) => {
  const cat = CATALOG[categoryId];
  if (!cat) return [];
  return cat.brands.flatMap((brand) =>
    brand.products.map((p) => ({ ...p, brandName: brand.name, brandId: brand.id }))
  );
};

// Helper: get all products for a brand in a category
export const getProductsByBrand = (categoryId, brandId) => {
  const cat = CATALOG[categoryId];
  if (!cat) return [];
  const brand = cat.brands.find((b) => b.id === brandId);
  return brand ? brand.products : [];
};

// Helper: get total product count
export const getTotalProductCount = () =>
  Object.values(CATALOG).reduce(
    (total, cat) => total + cat.brands.reduce((bt, b) => bt + b.products.length, 0),
    0
  );

// Helper: search products across all categories
export const searchProducts = (query) => {
  const q = query.toLowerCase();
  const results = [];
  Object.values(CATALOG).forEach((cat) => {
    cat.brands.forEach((brand) => {
      brand.products.forEach((product) => {
        if (
          product.name.toLowerCase().includes(q) ||
          brand.name.toLowerCase().includes(q) ||
          product.features?.some((f) => f.toLowerCase().includes(q))
        ) {
          results.push({ ...product, brandName: brand.name, brandId: brand.id, categoryId: cat.id });
        }
      });
    });
  });
  return results;
};
