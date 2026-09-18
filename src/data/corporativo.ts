/**
 * Líneas de merchandising corporativo (landing /merchandising-corporativo).
 *
 * No viven en WooCommerce a propósito: un cliente corporativo no compra con
 * carrito, pide cotización por cantidad, colores y logo. Los precios son
 * referenciales "desde" y se ajustan según volumen y complejidad del logo.
 */

export interface CorpLine {
  slug: string;
  icon: string;
  name: string;
  /** Una línea: qué es y para quién. */
  text: string;
  /** Precio unitario referencial en CLP, a partir del mínimo indicado. */
  from: number;
  /** Unidad del precio: 'unidad' | 'set' | 'kit' | 'pieza' */
  unit: string;
  /** Cantidad mínima de producción. */
  min: number;
  /** Detalles que ayudan a decidir. */
  bullets: string[];
  /** Destacar en la grilla. */
  featured?: boolean;
  /** Foto en public/empresa/<slug>.webp (1200×900). */
  image?: string;
}

/** Ruta de la foto de una línea (convención: public/empresa/<slug>.webp). */
export const lineImage = (l: CorpLine) => l.image ?? `/empresa/${l.slug}.webp`;

export const corpLines: CorpLine[] = [
  {
    slug: 'displays-qr',
    icon: 'qr',
    name: 'Displays QR de sobremesa',
    text: 'Cartelitos para mesón o mesa con el QR de pago, Wi-Fi, carta digital o redes sociales.',
    from: 4900,
    unit: 'unidad',
    min: 5,
    bullets: [
      'QR impreso en relieve bicolor: lo lee cualquier cámara, no se despega ni se raya',
      'Para Mercado Pago, Transbank, menú digital, reseñas de Google o Instagram',
      'Ideal para restaurantes, cafés, almacenes, clínicas y ferias',
    ],
    featured: true,
  },
  {
    slug: 'soportes-celular',
    icon: 'phone',
    name: 'Soportes de celular con logo',
    text: 'La pieza que queda todo el año sobre el escritorio de tu cliente, con tu marca a la vista.',
    from: 2900,
    unit: 'unidad',
    min: 10,
    bullets: [
      'Logo en relieve o bajo relieve en la base',
      'Compatible con cualquier teléfono, con o sin carcasa',
      'Ranura libre para el cable de carga',
    ],
    featured: true,
  },
  {
    slug: 'llaveros',
    icon: 'key',
    name: 'Llaveros corporativos',
    text: 'Entrega masiva en ferias, aniversarios y eventos, con algo que la gente realmente usa.',
    from: 1490,
    unit: 'unidad',
    min: 25,
    bullets: [
      'Con ficha para carro de supermercado o destapador metálico insertado',
      'Versiones articuladas o antiestrés para que se note distinto',
      'Nombre individual de cada persona sin costo extra',
    ],
    featured: true,
  },
  {
    slug: 'posavasos',
    icon: 'layers',
    name: 'Posavasos con logo',
    text: 'Set de 4 posavasos con su propio soporte, en los colores de la marca.',
    from: 12900,
    unit: 'set de 4',
    min: 5,
    bullets: [
      'Base antideslizante y soporte apilable impreso a juego',
      'Logo o patrón geométrico de la marca en la cara superior',
      'Se empaca fácil y tiene terminación premium',
    ],
  },
  {
    slug: 'portatarjetas',
    icon: 'card',
    name: 'Portatarjetas de sobremesa',
    text: 'Tarjetero minimalista para mesón de atención, recepción o escritorio de ventas.',
    from: 3900,
    unit: 'unidad',
    min: 10,
    bullets: [
      'Capacidad para 30 a 40 tarjetas',
      'Nombre o logo integrado en el frente',
      'También en versión doble: tarjetas y clips',
    ],
  },
  {
    slug: 'organizadores-cables',
    icon: 'zap',
    name: 'Organizadores de cables',
    text: 'El detalle económico para entregar por cientos en congresos y activaciones.',
    from: 990,
    unit: 'unidad',
    min: 25,
    bullets: [
      'Se engancha al borde del escritorio y sujeta USB-C, Lightning y HDMI',
      'Logo en microrelieve en la cara visible',
      'El costo por unidad más bajo de toda la línea',
    ],
  },
  {
    slug: 'logos-3d',
    icon: 'sparkles',
    name: 'Logotipos 3D para recepción',
    text: 'El logo de la empresa en tres dimensiones, para recepción, vitrina o sala de reuniones.',
    from: 49000,
    unit: 'pieza',
    min: 1,
    bullets: [
      'De sobremesa con base propia o para montar en pared',
      'Hasta 60 cm de ancho en piezas ensambladas',
      'Alto impacto de marca en recepción, o entrega institucional a socios y directorio',
    ],
  },
  {
    slug: 'trofeos',
    icon: 'trophy',
    name: 'Trofeos y galardones',
    text: 'Premiaciones internas, metas de venta, aniversarios de servicio y fin de año.',
    from: 14900,
    unit: 'unidad',
    min: 3,
    bullets: [
      'Nombre y cargo de cada premiado sin costo adicional',
      'Geometrías imposibles de lograr con trofeos de catálogo',
      'Desde 3 unidades, sin costo de matricería',
    ],
  },
  {
    slug: 'welcome-packs',
    icon: 'box',
    name: 'Welcome packs',
    text: 'Kit de bienvenida para nuevos empleados o clientes clave, en caja presentada.',
    from: 12900,
    unit: 'kit',
    min: 5,
    bullets: [
      'Soporte de celular, llavero, posavaso y organizador de cables',
      'Todo en la paleta de colores corporativos',
      'Caja kraft con ventana, viruta de papel y sello de la marca',
    ],
  },
];

/** Tramos de descuento por volumen (referenciales). */
export const volumeTiers = [
  { range: '5 – 9', discount: 'Precio base', note: 'Para probar con tu logo o equipar un local' },
  { range: '10 – 24', discount: '−5 %', note: 'Equipos pequeños y pymes' },
  { range: '25 – 49', discount: '−10 %', note: 'El tramo más pedido para cierres de año y campañas' },
  { range: '50 o más', discount: '−15 %', note: 'Producción programada por lotes; te confirmamos el plazo' },
];

/** Sectores donde estos productos funcionan mejor en Chile. */
export const sectors = [
  { icon: 'home', name: 'Restaurantes y cafés', text: 'Displays QR de carta y pago, posavasos con la marca, señalética de mesa.' },
  { icon: 'shield', name: 'Clínicas y consultas', text: 'Portatarjetas, displays QR de reserva de hora y logos 3D de recepción.' },
  { icon: 'users', name: 'Inmobiliarias y corredoras', text: 'Llaveros para entrega de propiedades, tarjeteros y maquetas de proyectos.' },
  { icon: 'truck', name: 'Empresas de servicios', text: 'Kits de bienvenida, soportes de escritorio y premiaciones internas.' },
  { icon: 'star', name: 'Ferias y congresos', text: 'Merchandising masivo de bajo costo: llaveros, organizadores y cubre cámaras.' },
  { icon: 'printer', name: 'Retail y tiendas', text: 'Exhibidores de producto, señalética de precios y displays QR de reseñas.' },
];
