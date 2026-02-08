/**
 * Parse a price string like "$1,399" into a number (1399).
 */
export const parsePrice = (str) =>
  parseFloat((str || '0').replace(/[^0-9.]/g, '')) || 0;

/**
 * Calculate discount percentage between current and original price.
 * Supports variants (array of { price, originalPrice }).
 */
export const calculateDiscount = (product, variantIndex = 0) => {
  const variant = product.variants?.[variantIndex];
  const priceStr = variant?.price || product.price;
  const originalStr = variant?.originalPrice || product.originalPrice;
  const price = parsePrice(priceStr);
  const original = parsePrice(originalStr);
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
};
