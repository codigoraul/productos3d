/**
 * Landings SEO por franquicia (/figuras-dragon-ball, /figuras-pokemon, /figuras-funko-pop).
 * Cada landing toma sus productos de WooCommerce por categoría (y, opcionalmente, por nombre)
 * y la página de categoría equivalente apunta su canónica a la landing para no competir.
 */

export interface FandomFaq {
  q: string;
  a: string;
}

export interface FandomTheme {
  /** Fondo del hero (CSS). Con tema el hero va oscuro y texto blanco. */
  heroBg: string;
  /** Color del brillo y anillos del escenario. */
  glow: string;
  /** Foto del producto sin fondo (PNG/WebP transparente en public/). */
  cutout?: { src: string; alt: string; width: number; height: number };
  /** Figuras secundarias alrededor de la principal (left/height en % del escenario). */
  extras?: { src: string; alt: string; width: number; height: number; left: number; size: number; z?: number }[];
  /** Tipo (color + etiqueta) por personaje, para los chips. */
  types?: Record<string, { label: string; color: string }>;
}

export interface Fandom {
  /** Ruta de la landing, sin barra final. */
  path: string;
  /** Slugs de categoría de WooCommerce cuyos productos se muestran. */
  categories: string[];
  /** Además, productos cuyo nombre coincida (ej. "estilo Funko" sin categoría propia). */
  nameMatch?: RegExp;
  /** Nombre corto (migas de pan). */
  short: string;
  /** Complemento para "Figuras ..." (ej. "de Dragon Ball", "estilo Funko Pop"). */
  of: string;
  accent: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** Título de la sección de catálogo (con sinónimos de búsqueda). */
  catalogTitle: string;
  /** Bloque de texto SEO (párrafos). */
  intro: { title: string; paragraphs: string[] };
  /** Personajes para pedir por WhatsApp (long tail). */
  characters: { title: string; text: string; items: string[] };
  /** Ideas de uso / para quién. */
  uses: { icon: string; title: string; text: string }[];
  faqs: FandomFaq[];
  ctaTitle: string;
  ctaText: string;
  /** Texto inicial del mensaje de WhatsApp. */
  waBase: string;
  /** Diseño propio de la landing (opcional). */
  theme?: FandomTheme;
  /** Bloque destacado (ej. producto personalizado) bajo el catálogo. */
  promo?: {
    eyebrow: string;
    title: string;
    text: string;
    bullets: string[];
    images: { src: string; alt: string }[];
    href: string;
    cta: string;
    price?: string;
  };
}

const plazo = 'Cada figura se imprime a pedido: el plazo es de 4 a 10 días hábiles desde que confirmas tu pedido, más el tiempo de despacho a tu ciudad.';
const despacho = 'Sí. Imprimimos en Temuco y despachamos a todo Chile. El costo y el tiempo del envío dependen de tu ciudad; te los confirmamos por WhatsApp antes de cerrar el pedido.';
const colores = 'Trabajamos con filamento PLA en naranjo, blanco, azul, negro y morado. Las figuras multicolor se imprimen por piezas de cada color, sin pintura, así que el color no se descascara.';

export const fandoms: Fandom[] = [
  {
    path: '/figuras-dragon-ball',
    categories: ['dragon-ball'],
    short: 'Dragon Ball',
    of: 'de Dragon Ball',
    accent: '#F57C00',
    seoTitle: 'Figuras de Dragon Ball en Chile | Goku y más, impresas en 3D',
    seoDescription:
      'Figuras, muñecos y coleccionables de Dragon Ball impresos en 3D en Chile: Goku Ultra Instinto y más personajes en colores. Pídelos por WhatsApp.',
    eyebrow: 'Figuras Dragon Ball · Hechas en Chile',
    h1: 'Figuras de Dragon Ball impresas en 3D',
    lead: 'Goku y los guerreros Z para tu escritorio, tu repisa o tu colección. Figuras, muñecos y estatuas detalladas, impresas en colores en nuestro taller de Temuco y enviadas a todo Chile.',
    catalogTitle: 'Figuras y muñecos de Dragon Ball disponibles',
    intro: {
      title: 'Figuras de Dragon Ball para coleccionar y regalar',
      paragraphs: [
        'Dragon Ball es una de las series de anime con más fans en Chile, y una figura es la forma más directa de tener a tu personaje favorito a la vista. Nuestras figuras de Dragon Ball se imprimen en 3D por capas, con músculos, pliegues de la ropa y pelo en puntas bien definidos.',
        'Las figuras multicolor se imprimen por piezas de cada color: el pelo blanco, el pantalón naranjo y las botas azules salen del mismo filamento, sin pintar. Por eso el color no se descascara con el tiempo ni con el roce, algo clave si la figura está a la vista todos los días.',
        'Empezamos con Goku Ultra Instinto de 20 cm de alto y vamos sumando personajes. Si buscas a Vegeta, Gohan, Broly u otro guerrero, escríbenos por WhatsApp y te decimos si lo podemos imprimir y en qué tamaño.',
        'Ya sea que lo busques como figura de acción, muñeco de Goku para regalar a un niño, estatua para la vitrina o coleccionable de anime, la pieza es la misma: una figura de Dragon Ball firme, que se para sola y que puedes exhibir o regalar.',
      ],
    },
    characters: {
      title: '¿Buscas otro personaje de Dragon Ball?',
      text: 'Toca un personaje y consúltanos por WhatsApp si podemos imprimirlo y en qué tamaño.',
      items: ['Goku', 'Vegeta', 'Gohan', 'Broly', 'Piccolo', 'Trunks', 'Freezer', 'Majin Buu', 'Goku Ultra Instinto', 'Goku Super Saiyajin'],
    },
    uses: [
      { icon: 'star', title: 'Para tu colección', text: 'Figuras con buen nivel de detalle para sumar a la repisa o a la vitrina de anime.' },
      { icon: 'home', title: 'Para el escritorio o setup', text: 'Un Goku de 20 cm le da personalidad al escritorio, al setup gamer o a la pieza.' },
      { icon: 'heart', title: 'Para regalar', text: 'Regalo de cumpleaños, Navidad o amigo secreto para el fan de Dragon Ball de la familia.' },
      { icon: 'palette', title: 'En colores, sin pintar', text: 'Cada color es filamento propio: no se descascara ni se desgasta con el uso.' },
    ],
    faqs: [
      { q: '¿Qué tamaño tienen las figuras de Dragon Ball?', a: 'La figura de Goku Ultra Instinto mide 20 cm de alto. Para otros personajes o tamaños, consúltanos por WhatsApp y te confirmamos qué se puede imprimir.' },
      { q: '¿Tienen muñecos de Dragon Ball para niños?', a: 'Sí. Nuestras figuras sirven como muñeco de regalo para niños fans de Goku, aunque son piezas de exhibición: no son articuladas, así que recomendamos que los más chicos las usen con cuidado.' },
      { q: '¿Las figuras vienen pintadas?', a: 'No se pintan: se imprimen en colores. Cada parte (pelo, piel, ropa, botas) sale del filamento de su color, por eso el color no se descascara.' },
      { q: '¿Cuánto demora una figura de Dragon Ball?', a: plazo },
      { q: '¿Hacen despacho a todo Chile?', a: despacho },
      { q: '¿Son figuras oficiales de Dragon Ball?', a: 'No. Son figuras impresas en 3D por nosotros en Chile, hechas para fans; no son productos oficiales con licencia de la marca.' },
      { q: '¿Puedo pedir un personaje que no está en la tienda?', a: 'Sí, escríbenos por WhatsApp con el personaje y el tamaño que buscas. Te respondemos si lo podemos imprimir, el precio y el plazo.' },
    ],
    ctaTitle: '¿Qué guerrero Z quieres en tu repisa?',
    ctaText: 'Escríbenos por WhatsApp y te respondemos con precio, tamaño y plazo.',
    waBase: 'Hola, vengo de la página de figuras de Dragon Ball. ',
    theme: {
      heroBg: 'radial-gradient(circle at 78% 44%, #f97316 0%, transparent 38%), radial-gradient(circle at 80% 40%, #bae6fd66 0%, transparent 26%), radial-gradient(circle at 10% 95%, #1d4ed855 0%, transparent 35%), linear-gradient(135deg, #0b1026 0%, #1e2a5a 55%, #7c2d12 100%)',
      glow: '#93c5fd',
      cutout: { src: '/img/landings/figura-goku-recorte.webp', alt: 'Figura de Goku Ultra Instinto de 20 cm impresa en 3D en colores', width: 353, height: 866 },
      types: {
        Goku: { label: 'Saiyajin', color: '#F97316' },
        Vegeta: { label: 'Saiyajin', color: '#F97316' },
        Gohan: { label: 'Saiyajin', color: '#F97316' },
        Broly: { label: 'Saiyajin', color: '#F97316' },
        Trunks: { label: 'Saiyajin', color: '#F97316' },
        'Goku Ultra Instinto': { label: 'Saiyajin', color: '#F97316' },
        'Goku Super Saiyajin': { label: 'Saiyajin', color: '#F97316' },
        Piccolo: { label: 'Namekiano', color: '#22C55E' },
        Freezer: { label: 'Villano', color: '#7C3AED' },
        'Majin Buu': { label: 'Villano', color: '#7C3AED' },
      },
    },
  },
  {
    path: '/figuras-pokemon',
    categories: ['pokemon'],
    short: 'Pokémon',
    of: 'de Pokémon',
    accent: '#7E57C2',
    seoTitle: 'Figuras de Pokémon en Chile | Impresas en 3D, precios bajos',
    seoDescription:
      'Figuras, muñecos y coleccionables de Pokémon impresos en 3D en Chile: Mewtwo y más Pokémon a precios bajos, para coleccionar o regalar. Pídelos por WhatsApp.',
    eyebrow: 'Figuras Pokémon · Hechas en Chile',
    h1: 'Figuras de Pokémon impresas en 3D',
    lead: 'Tus Pokémon favoritos en figuras y muñecos impresos en 3D, a precios pensados para coleccionar varios. Hechos en nuestro taller de Temuco y enviados a todo Chile.',
    catalogTitle: 'Figuras y muñecos de Pokémon disponibles',
    intro: {
      title: 'Figuras de Pokémon para coleccionar sin gastar de más',
      paragraphs: [
        'Pokémon tiene fans de todas las edades, y lo entretenido es tener más de uno. Por eso nuestras figuras de Pokémon parten con precios bajos: puedes ir armando tu colección de a poco o regalar una figura sin gastar mucho.',
        'Cada figura se imprime en 3D en PLA, un material liviano y resistente para el día a día. Algunas se arman con piezas que encajan entre sí, lo que les da volumen y las hace ideales para el escritorio, la repisa o la pieza de los niños.',
        'Partimos con Mewtwo y vamos sumando Pokémon. Si quieres a Pikachu, Charizard, Gengar o tu inicial favorito, escríbenos por WhatsApp y te decimos si lo podemos imprimir.',
        'Los llames figuras, muñecos de Pokémon, coleccionables o estatuillas para la repisa, la idea es la misma: Pokémon impresos en 3D, livianos y resistentes, para juntar de a varios o regalar a un fan.',
      ],
    },
    characters: {
      title: '¿Qué Pokémon buscas?',
      text: 'Toca un Pokémon y consúltanos por WhatsApp si podemos imprimirlo.',
      items: ['Pikachu', 'Charizard', 'Mewtwo', 'Mew', 'Gengar', 'Eevee', 'Bulbasaur', 'Charmander', 'Squirtle', 'Snorlax', 'Lucario', 'Growlithe'],
    },
    uses: [
      { icon: 'star', title: 'Para coleccionar', text: 'Precios bajos para juntar varios Pokémon y armar tu propia Pokédex en la repisa.' },
      { icon: 'heart', title: 'Para regalar', text: 'Un regalo económico para cumpleaños, sorpresas de cumpleaños infantiles o amigo secreto.' },
      { icon: 'home', title: 'Para decorar', text: 'Para el escritorio, el setup o la pieza de los más chicos.' },
      { icon: 'users', title: 'Para todas las edades', text: 'Figuras livianas y resistentes, pensadas para fans grandes y chicos.' },
    ],
    faqs: [
      { q: '¿Cuánto cuesta una figura de Pokémon?', a: 'Depende del Pokémon y del tamaño; los precios de cada figura están en las fichas de esta página. Si pides varias, consúltanos por WhatsApp.' },
      { q: '¿De qué material son las figuras?', a: colores },
      { q: '¿Sirven como muñecos de Pokémon para niños?', a: 'Sí, son un regalo muy pedido para niños fans de Pokémon. Son figuras de exhibición, no juguetes articulados, así que para los más chicos recomendamos usarlas con cuidado.' },
      { q: '¿Cuánto demora una figura de Pokémon?', a: plazo },
      { q: '¿Hacen despacho a todo Chile?', a: despacho },
      { q: '¿Son figuras oficiales de Pokémon?', a: 'No. Son figuras impresas en 3D por nosotros en Chile, hechas para fans; no son productos oficiales con licencia de la marca.' },
      { q: '¿Puedo pedir un Pokémon que no está en la tienda?', a: 'Sí, escríbenos por WhatsApp con el Pokémon que buscas. Te respondemos si lo podemos imprimir, el precio y el plazo.' },
    ],
    ctaTitle: '¿Qué Pokémon te falta en la colección?',
    ctaText: 'Escríbenos por WhatsApp y te respondemos con precio y plazo.',
    waBase: 'Hola, vengo de la página de figuras de Pokémon. ',
    theme: {
      heroBg: 'radial-gradient(circle at 78% 42%, #8b5cf6 0%, transparent 42%), radial-gradient(circle at 12% 90%, #f59e0b55 0%, transparent 35%), linear-gradient(135deg, #1e1b4b 0%, #3b1d7a 55%, #5b21b6 100%)',
      glow: '#c4b5fd',
      cutout: { src: '/img/landings/figura-mewtwo-recorte.webp', alt: 'Figura de Mewtwo impresa en 3D en blanco y morado', width: 413, height: 685 },
      types: {
        Pikachu: { label: 'Eléctrico', color: '#EAB308' },
        Charizard: { label: 'Fuego', color: '#F97316' },
        Mewtwo: { label: 'Psíquico', color: '#EC4899' },
        Mew: { label: 'Psíquico', color: '#EC4899' },
        Gengar: { label: 'Fantasma', color: '#7C3AED' },
        Eevee: { label: 'Normal', color: '#A8A29E' },
        Bulbasaur: { label: 'Planta', color: '#22C55E' },
        Charmander: { label: 'Fuego', color: '#F97316' },
        Squirtle: { label: 'Agua', color: '#3B82F6' },
        Snorlax: { label: 'Normal', color: '#A8A29E' },
        Lucario: { label: 'Lucha', color: '#DC2626' },
        Growlithe: { label: 'Fuego', color: '#F97316' },
      },
    },
  },
  {
    path: '/figuras-funko-pop',
    categories: ['funko-pop'],
    nameMatch: /funko/i,
    short: 'Estilo Funko Pop',
    of: 'estilo Funko Pop',
    accent: '#1565D8',
    seoTitle: 'Figuras estilo Funko Pop en Chile | Impresas en 3D',
    seoDescription:
      'Figuras y muñecos estilo Funko Pop impresos en 3D en Chile: cabezones coleccionables de tus personajes favoritos, a precios bajos. Cotiza el tuyo por WhatsApp.',
    eyebrow: 'Estilo Funko Pop · Hechas en Chile',
    h1: 'Figuras estilo Funko Pop impresas en 3D',
    lead: 'El estilo cabezón que todos reconocen, en figuras y muñecos coleccionables impresos en 3D: de tus personajes favoritos o personalizados con tu foto y tu profesión. Hechos en Temuco y enviados a todo Chile.',
    catalogTitle: 'Figuras y muñecos estilo Funko Pop disponibles',
    intro: {
      title: 'Figuras estilo Funko Pop, más accesibles',
      paragraphs: [
        'El estilo Funko Pop se volvió un clásico: cabeza grande, cuerpo pequeño y ojos simples. Nuestras figuras toman ese estilo y lo llevan a la impresión 3D, con precios bastante más bajos que una figura importada.',
        'Se imprimen en PLA, livianas y firmes, y quedan perfectas en una repisa, en el escritorio o en el auto. Al ser impresas a pedido, podemos sumar personajes que no se encuentran fácilmente en tiendas.',
        'Partimos con el Hombre Araña con traje negro y vamos sumando personajes de superhéroes, anime y películas. Si buscas uno en particular, escríbenos por WhatsApp y te decimos si lo podemos imprimir.',
        'Muchos los buscan como muñecos cabezones, figuras de acción estilo Funko o coleccionables de vinilo. Los nuestros no son de vinilo sino impresos en 3D, pero mantienen el estilo cabezón y el tamaño ideal para la repisa o el escritorio.',
      ],
    },
    characters: {
      title: '¿Qué personaje quieres en estilo Funko?',
      text: 'Toca un personaje y consúltanos por WhatsApp si podemos imprimirlo.',
      items: ['Hombre Araña', 'Batman', 'Iron Man', 'Deadpool', 'Goku', 'Naruto', 'Pikachu', 'Harry Potter', 'Darth Vader', 'Stitch'],
    },
    uses: [
      { icon: 'star', title: 'Para coleccionar', text: 'Arma tu fila de cabezones en la repisa sin pagar precios de importación.' },
      { icon: 'heart', title: 'Para regalar', text: 'Un regalo entretenido y económico para cumpleaños, amigo secreto o Navidad.' },
      { icon: 'home', title: 'Para el escritorio', text: 'Tamaño justo para el escritorio, el setup gamer o el monitor.' },
      { icon: 'sparkles', title: 'Personajes difíciles de encontrar', text: 'Al imprimirse a pedido, podemos sumar personajes que no hay en tiendas.' },
    ],
    faqs: [
      { q: '¿Son Funko Pop originales?', a: 'No. Son figuras impresas en 3D por nosotros en Chile con un estilo similar al de Funko Pop (cabeza grande y cuerpo pequeño). No son productos de la marca Funko ni tienen licencia oficial.' },
      { q: '¿Cuánto cuesta una figura estilo Funko Pop?', a: 'Depende del personaje y del tamaño; los precios de cada figura están en las fichas de esta página. Son bastante más económicas que una figura importada.' },
      { q: '¿Cuánto demora?', a: plazo },
      { q: '¿Hacen despacho a todo Chile?', a: despacho },
      { q: '¿Puedo pedir un personaje que no está en la tienda?', a: 'Sí, escríbenos por WhatsApp con el personaje que buscas. Te respondemos si lo podemos imprimir, el precio y el plazo.' },
      { q: '¿De qué material son?', a: colores },
      { q: '¿Son muñecos de vinilo como los Funko?', a: 'No. Los Funko originales son de vinilo; los nuestros son figuras impresas en 3D en PLA, con el mismo estilo cabezón y de un tamaño similar para exhibir.' },
    ],
    ctaTitle: '¿Qué personaje quieres en estilo Funko?',
    ctaText: 'Escríbenos por WhatsApp y te respondemos con precio y plazo.',
    waBase: 'Hola, vengo de la página de figuras estilo Funko Pop. ',
    promo: {
      eyebrow: 'Funko personalizado',
      title: 'Tu propio Funko, hecho con tu foto',
      text: 'Mándanos una foto y lo convertimos en una figura estilo Funko Pop de 10 cm: tu peinado, tu barba, tu ropa y hasta tu profesión. El regalo más personal para cumpleaños, aniversarios, graduaciones o para un colega.',
      bullets: ['Con tu cara, tu ropa y tu profesión', 'Casco, delantal, estetoscopio, planos y más detalles', 'Te confirmamos el diseño antes de imprimir', '10 cm de alto, impreso en 3D en Chile'],
      images: [
        { src: 'https://productos3d.cl/admin/wp-content/uploads/2026/11/funko-personalizado-ingeniero-casco.webp', alt: 'Funko personalizado de ingeniero con casco blanco y chaleco reflectante' },
        { src: 'https://productos3d.cl/admin/wp-content/uploads/2026/11/funko-personalizado-doctora.webp', alt: 'Funko personalizado de doctora con delantal y estetoscopio' },
        { src: 'https://productos3d.cl/admin/wp-content/uploads/2026/11/funko-personalizado-hombre-barba.webp', alt: 'Funko personalizado de hombre con barba y chaqueta negra' },
      ],
      href: '/productos/funko-personalizado',
      cta: 'Ver Funko personalizado',
      price: '$14.990',
    },
    theme: {
      heroBg: 'radial-gradient(circle at 78% 44%, #facc15 0%, transparent 36%), radial-gradient(circle at 12% 92%, #f472b655 0%, transparent 35%), linear-gradient(135deg, #172554 0%, #1d4ed8 55%, #be185d 100%)',
      glow: '#fde68a',
      cutout: { src: '/img/landings/funko-personalizado-ingeniero-recorte.webp', alt: 'Funko personalizado de ingeniero con casco blanco y chaleco reflectante', width: 432, height: 700 },
      extras: [
        { src: '/img/landings/funko-personalizado-hombre-recorte.webp', alt: 'Funko personalizado de hombre con barba y chaqueta negra', width: 414, height: 700, left: 0, size: 62, z: 1 },
        { src: '/img/landings/funko-personalizado-doctora-recorte.webp', alt: 'Funko personalizado de doctora con delantal y estetoscopio', width: 450, height: 700, left: 66, size: 62, z: 1 },
      ],
      types: {
        'Hombre Araña': { label: 'Superhéroe', color: '#DC2626' },
        Batman: { label: 'Superhéroe', color: '#DC2626' },
        'Iron Man': { label: 'Superhéroe', color: '#DC2626' },
        Deadpool: { label: 'Superhéroe', color: '#DC2626' },
        Goku: { label: 'Anime', color: '#F97316' },
        Naruto: { label: 'Anime', color: '#F97316' },
        Pikachu: { label: 'Anime', color: '#F97316' },
        'Harry Potter': { label: 'Películas', color: '#7C3AED' },
        'Darth Vader': { label: 'Películas', color: '#7C3AED' },
        Stitch: { label: 'Animación', color: '#0EA5E9' },
      },
    },
  },
];

/** Landing asociada a un slug de categoría (para canónica y enlaces). */
export function fandomForCategory(slug: string): Fandom | undefined {
  return fandoms.find((f) => f.categories.includes(slug));
}

/** Landing asociada a un producto (por categoría o por nombre). */
export function fandomForProduct(p: { name: string; categories: string[] }): Fandom | undefined {
  return fandoms.find((f) => f.categories.some((c) => p.categories.includes(c)) || (f.nameMatch && f.nameMatch.test(p.name)));
}
