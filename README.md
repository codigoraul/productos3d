# productos3d.cl — catálogo Astro

Catálogo de productos impresos en 3D. Base en Astro con datos mock, preparada para conectarse a WooCommerce headless.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview
```

## Estructura

```
src/
  config.ts                 # nombre, WhatsApp, correo, redes
  data/categories.ts        # categorías mock
  data/products.ts          # productos mock
  lib/catalog.ts            # ÚNICO punto de acceso a datos (aquí se conecta WooCommerce)
  lib/types.ts              # tipos Product / Category (forma similar a wc/v3)
  lib/format.ts             # formatCLP, slugify
  layouts/BaseLayout.astro  # head, SEO, header, footer, WhatsApp flotante
  components/
    Header.astro            # nav + mega menú de categorías + buscador
    Footer.astro
    HeroSlider.astro        # slider principal, una slide por categoría
    CatalogGrid.astro       # grilla con buscador y filtros (cliente)
    ProductCard.astro
    ProductVisual.astro     # imagen o placeholder por categoría
    ProductGallery.astro    # galería de la ficha (principal + miniaturas, swipe, teclado)
    CategoryCard.astro
    PageHero.astro          # cabecera interior + breadcrumb
    WhatsAppFloat.astro
    Icon.astro              # iconos SVG inline
  pages/
    index.astro             # Inicio
    productos/index.astro   # Productos (buscador + filtros)
    productos/[slug].astro  # Ficha de producto
    categorias/index.astro  # Categorías
    categorias/[slug].astro # Productos de una categoría
    servicios.astro
    nosotros.astro
    404.astro
```

## Búsqueda

El header envía a `/productos?q=...`. `CatalogGrid` renderiza todos los productos en HTML (SEO) y el
JS filtra por texto (sin acentos), categoría, disponibilidad y personalizables, ordena y sincroniza la URL.
Para catálogos grandes (> ~300 productos) conviene paginar en `getProducts()` o mover el índice a un JSON.

## WooCommerce headless (conectado)

WordPress + WooCommerce viven en `https://productos3d.cl/admin` (panel: `/admin/wp-admin`).
El sitio lee la **Store API pública** de WooCommerce en build (sin claves ni secretos):

- `GET /wp-json/wc/store/v1/products` (+ `?featured=true` para destacados)
- `GET /wp-json/wc/store/v1/products/categories`

Configuración: `.env` con `WP_URL=https://productos3d.cl/admin` (ver `.env.example`).
Sin `WP_URL`, el sitio vuelve a los datos mock de `src/data/` (modo diseño).

- `src/lib/wc.ts`: cliente + mapeo Store API → `Product`/`Category`, con caché por build.
- `src/lib/catalog.ts`: elige WooCommerce o mock; las páginas no cambian.
- Color e icono de cada categoría se toman de `src/data/categories.ts` por slug
  (los slugs de WooCommerce deben coincidir: `llaveros`, `soportes-celular`, `anime`, `dibujos`, `decoracion`, `personalizados`).
- "Personalizable" = producto en la categoría `personalizados` o con una etiqueta que contenga "personaliz".
- Destacados = marcados con la estrella "Destacado" en WooCommerce. Si no hay ninguno, se muestran los primeros.
- Cada deploy regenera el sitio: tras cargar productos hay que volver a hacer `npm run build`.

### Cargar productos en WooCommerce

Productos → Añadir nuevo: nombre, descripción, descripción corta, precio (y precio rebajado si hay oferta),
categoría, **imagen del producto** (destacada) y **galería del producto** (todas las fotos adicionales).
La ficha `/productos/[slug]` muestra la galería completa con miniaturas (`ProductGallery.astro`).

## Imágenes

Con `images: []` las cards muestran un placeholder con el color de la categoría. Para fotos reales:
`images: [{ src: '/img/products/nombre.jpg', alt: '...' }]` (poner los archivos en `public/img/products/`).

## Logo

`public/logo.png` (640 px) se usa en header, footer y OG. `public/logo-original.png` es el archivo fuente.
