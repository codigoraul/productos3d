/**
 * Configuración global del sitio.
 * Cambiar aquí el número de WhatsApp, redes y datos de contacto.
 */
export const SITE = {
  name: 'Productos 3D',
  domain: 'productos3d.cl',
  url: 'https://productos3d.cl',
  tagline: 'Impresión 3D en Chile: llaveros, soportes, figuras anime y piezas personalizadas',
  description:
    'Catálogo de productos impresos en 3D: llaveros, soportes de celular, figuras de anime, dibujos y decoración. Envíos a todo Chile. Pedidos personalizados.',
  whatsapp: '56968480167', // sin "+" ni espacios
  phone: '+56 9 6848 0167', // formato para mostrar
  phoneHref: 'tel:+56968480167',
  email: 'contacto@productos3d.cl',
  instagram: 'https://instagram.com/productos3d.cl',
  city: 'Temuco, Chile',
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
