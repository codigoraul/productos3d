/**
 * SEO desde Yoast (WordPress headless).
 *
 * Yoast expone `yoast_head_json` en la REST API pública de WordPress:
 *   GET {WP_URL}/wp-json/wp/v2/product/{id}?_fields=yoast_head_json
 *   GET {WP_URL}/wp-json/wp/v2/product_cat/{id}?_fields=yoast_head_json
 * Se usa solo el título, la meta descripción y la imagen OG que el usuario define
 * en el panel de Yoast; canónicas y URLs siempre son las del sitio Astro.
 * Si WP no está configurado o la petición falla, se devuelve null y las páginas
 * usan sus valores por defecto.
 */
import { WP_URL, wcEnabled, BUILD_ID, NO_CACHE_HEADERS } from '@/lib/wc';

export interface YoastSeo {
  title?: string;
  description?: string;
  ogImage?: string;
  /** Yoast marca noindex → la página no debería indexarse. */
  noindex?: boolean;
}

interface YoastHead {
  title?: string;
  description?: string;
  og_image?: { url: string }[];
  robots?: { index?: string };
}

const cache = new Map<string, Promise<YoastSeo | null>>();

async function fetchYoast(path: string): Promise<YoastSeo | null> {
  if (!wcEnabled) return null;
  const url = `${WP_URL}/wp-json/wp/v2/${path}?_fields=yoast_head_json&_b=${BUILD_ID}`;
  try {
    const res = await fetch(url, { headers: NO_CACHE_HEADERS, cache: 'no-store' });
    if (!res.ok) return null;
    const json = (await res.json()) as { yoast_head_json?: YoastHead };
    const y = json.yoast_head_json;
    if (!y) return null;
    // Título por defecto de Yoast para archivos ("Llaveros archivos - Productos 3D"):
    // no es un título editado por el usuario → se ignora y la página usa el suyo.
    const rawTitle = y.title?.trim();
    const isDefaultArchive = !!rawTitle && /\sarchivos\s[-|–]\s/i.test(rawTitle);
    return {
      title: isDefaultArchive ? undefined : rawTitle || undefined,
      description: y.description?.trim() || undefined,
      ogImage: y.og_image?.[0]?.url,
      noindex: y.robots?.index === 'noindex',
    };
  } catch (e) {
    console.warn(`[seo] no se pudo leer Yoast en ${url}:`, (e as Error).message);
    return null;
  }
}

function cached(path: string): Promise<YoastSeo | null> {
  if (!cache.has(path)) cache.set(path, fetchYoast(path));
  return cache.get(path)!;
}

/** SEO de Yoast para un producto de WooCommerce (por ID). */
export function getProductSeo(productId: number): Promise<YoastSeo | null> {
  return cached(`product/${productId}`);
}

/** SEO de Yoast para una categoría de producto (por ID de término). */
export function getCategorySeo(categoryId: number): Promise<YoastSeo | null> {
  return cached(`product_cat/${categoryId}`);
}
