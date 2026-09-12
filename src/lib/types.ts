/**
 * Tipos del catálogo. Están modelados sobre la forma de la API REST de WooCommerce
 * (wc/v3/products y wc/v3/products/categories) para que el cambio de datos mock a
 * WooCommerce headless sea un cambio en src/lib/catalog.ts y no en las páginas.
 */

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  /** Color de acento usado en cards y placeholders (hex). */
  accent: string;
  /** Nombre del icono en src/components/Icon.astro */
  icon: string;
  /** Imagen opcional (cuando venga de WooCommerce se usa image.src). */
  image?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  /** Texto corto (WooCommerce: short_description). */
  shortDescription: string;
  /** Descripción completa (WooCommerce: description). Puede incluir HTML simple. */
  description: string;
  /** Precio en CLP (WooCommerce: price como string; aquí number). */
  price: number;
  /** Precio antes de descuento (WooCommerce: regular_price). */
  regularPrice?: number;
  /** Slugs de categorías (WooCommerce: categories[].slug). */
  categories: string[];
  tags: string[];
  images: ProductImage[];
  inStock: boolean;
  featured: boolean;
  /** Atributos visibles en la ficha (material, tamaño, colores...). */
  attributes: { name: string; options: string[] }[];
  /** Si acepta personalización (nombre, color, logo). */
  customizable: boolean;
}
