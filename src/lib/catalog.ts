/**
 * Capa de acceso al catálogo. ÚNICO punto que conoce el origen de los datos.
 *
 * - Con `WP_URL` definido en .env → WooCommerce headless (Store API pública, ver src/lib/wc.ts).
 * - Sin `WP_URL` → datos mock de src/data/* (útil para diseñar sin backend).
 *
 * Las páginas y componentes no cambian entre un modo y otro.
 */
import type { Category, Product } from '@/lib/types';
import { categories as mockCategories } from '@/data/categories';
import { products as mockProducts } from '@/data/products';
import { wcEnabled, fetchCategories, fetchProducts, fetchCategoryCounts } from '@/lib/wc';

export async function getCategories(): Promise<Category[]> {
  return wcEnabled ? fetchCategories() : mockCategories;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  return wcEnabled ? fetchProducts() : mockProducts;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.categories.includes(slug));
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);
  // Si aún no hay destacados marcados en WooCommerce, mostrar los primeros.
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return (await getProducts())
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, limit);
}

/** Conteo de productos por categoría (para chips y cards). */
export async function getCategoryCounts(): Promise<Record<string, number>> {
  if (wcEnabled) return fetchCategoryCounts();
  const counts: Record<string, number> = {};
  for (const p of mockProducts) for (const c of p.categories) counts[c] = (counts[c] ?? 0) + 1;
  return counts;
}

/**
 * Índice liviano para el buscador del cliente (se inyecta en /productos).
 * Solo los campos necesarios para filtrar y pintar la card.
 */
export interface SearchItem {
  id: number;
  slug: string;
  name: string;
  short: string;
  price: number;
  regularPrice?: number;
  categories: string[];
  tags: string[];
  image?: string;
  inStock: boolean;
  featured: boolean;
  customizable: boolean;
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  return (await getProducts()).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    short: p.shortDescription,
    price: p.price,
    regularPrice: p.regularPrice,
    categories: p.categories,
    tags: p.tags,
    image: p.images[0]?.src,
    inStock: p.inStock,
    featured: p.featured,
    customizable: p.customizable,
  }));
}
