/**
 * Cliente de la Store API de WooCommerce (pública, sin claves):
 *   GET {WP_URL}/wp-json/wc/store/v1/products
 *   GET {WP_URL}/wp-json/wc/store/v1/products/categories
 * Se ejecuta en build (SSG). Mapea al tipo Product/Category de src/lib/types.ts.
 * Los colores e iconos de categoría no existen en WooCommerce: se toman de
 * src/data/categories.ts por slug (y hay un fallback por defecto).
 */
import type { Category, Product, ProductImage } from '@/lib/types';
import { categories as designCategories } from '@/data/categories';

export const WP_URL = (import.meta.env.WP_URL ?? '').replace(/\/+$/, '');
export const wcEnabled = WP_URL.length > 0;

const BASE = `${WP_URL}/wp-json/wc/store/v1`;
const PER_PAGE = 100;

interface WcImage {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
}
interface WcTerm {
  id: number;
  name: string;
  slug: string;
}
interface WcProduct {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_minor_unit: number;
  };
  images: WcImage[];
  categories: WcTerm[];
  tags: WcTerm[];
  attributes: { id: number; name: string; terms: WcTerm[] }[];
  is_in_stock: boolean;
}
interface WcCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: { src: string; alt: string } | null;
}

async function getJson<T>(url: string): Promise<{ data: T; total: number }> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`WooCommerce ${res.status} en ${url}`);
  const total = Number(res.headers.get('x-wp-total') ?? 0);
  return { data: (await res.json()) as T, total };
}

/** Descarga todas las páginas de un endpoint. */
async function getAll<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
  const out: T[] = [];
  for (let page = 1; page < 50; page++) {
    const qs = new URLSearchParams({ per_page: String(PER_PAGE), page: String(page), ...params });
    const { data } = await getJson<T[]>(`${BASE}${path}?${qs}`);
    out.push(...data);
    if (data.length < PER_PAGE) break;
  }
  return out;
}

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();

const toNumber = (v: string, minor: number) => Number(v) / 10 ** minor;

function mapImage(i: WcImage, name: string): ProductImage {
  return { src: i.src, alt: i.alt || name };
}

export function mapProduct(p: WcProduct, featuredIds: Set<number>): Product {
  const minor = p.prices.currency_minor_unit ?? 0;
  const price = toNumber(p.prices.price, minor);
  const regular = toNumber(p.prices.regular_price, minor);
  const categories = p.categories.map((c) => c.slug);
  const tags = p.tags.map((t) => t.name.toLowerCase());
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: stripHtml(p.short_description),
    description: p.description,
    price,
    regularPrice: p.on_sale && regular > price ? regular : undefined,
    categories,
    tags,
    images: p.images.map((i) => mapImage(i, p.name)),
    inStock: p.is_in_stock,
    featured: featuredIds.has(p.id),
    attributes: p.attributes.map((a) => ({ name: a.name, options: a.terms.map((t) => t.name) })),
    customizable: categories.includes('personalizados') || tags.some((t) => /personaliz/.test(t)),
  };
}

export function mapCategory(c: WcCategory): Category {
  const design = designCategories.find((d) => d.slug === c.slug);
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: stripHtml(c.description) || design?.description || '',
    accent: design?.accent ?? '#1565D8',
    icon: design?.icon ?? 'cube',
    image: c.image?.src,
  };
}

/* ---------- Caché por build: una sola descarga aunque muchas páginas pidan datos ---------- */
let productsCache: Promise<Product[]> | undefined;
let categoriesCache: Promise<Category[]> | undefined;
let countsCache: Record<string, number> | undefined;

export function fetchProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = (async () => {
      const [all, featured] = await Promise.all([
        getAll<WcProduct>('/products'),
        getAll<WcProduct>('/products', { featured: 'true' }),
      ]);
      const featuredIds = new Set(featured.map((p) => p.id));
      const products = all.map((p) => mapProduct(p, featuredIds));
      console.log(`[wc] ${products.length} productos desde ${WP_URL}`);
      return products;
    })();
  }
  return productsCache;
}

export function fetchCategories(): Promise<Category[]> {
  if (!categoriesCache) {
    categoriesCache = (async () => {
      const raw = await getAll<WcCategory>('/products/categories');
      countsCache = Object.fromEntries(raw.map((c) => [c.slug, c.count]));
      // Solo categorías con productos y sin la genérica "sin-categorizar";
      // se ordenan según el orden de diseño de src/data/categories.ts.
      const order = designCategories.map((d) => d.slug);
      return raw
        .filter((c) => c.slug !== 'sin-categorizar' && c.slug !== 'uncategorized')
        .map(mapCategory)
        .sort((a, b) => {
          const ia = order.indexOf(a.slug);
          const ib = order.indexOf(b.slug);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
    })();
  }
  return categoriesCache;
}

export async function fetchCategoryCounts(): Promise<Record<string, number>> {
  await fetchCategories();
  return countsCache ?? {};
}
