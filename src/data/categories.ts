import type { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 1,
    slug: 'llaveros',
    name: 'Llaveros',
    description: 'Llaveros impresos en 3D con nombres, logos, personajes y diseños únicos. Ideales para regalos y merchandising.',
    accent: '#1565D8',
    icon: 'key',
  },
  {
    id: 2,
    slug: 'soportes-celular',
    name: 'Soportes de celular',
    description: 'Soportes de escritorio, para auto y plegables. Resistentes, livianos y compatibles con todos los teléfonos.',
    accent: '#0E9F8A',
    icon: 'phone',
  },
  {
    id: 3,
    slug: 'anime',
    name: 'Figuras Anime',
    description: 'Figuras y bustos de tus personajes favoritos, impresos en alta resolución y pintados a mano.',
    accent: '#D9366B',
    icon: 'sparkles',
  },
  {
    id: 4,
    slug: 'dibujos',
    name: 'Dibujos y arte 3D',
    description: 'Cuadros en relieve, litofanías y dibujos convertidos en piezas tridimensionales.',
    accent: '#F59E0B',
    icon: 'brush',
  },
  {
    id: 5,
    slug: 'decoracion',
    name: 'Decoración y hogar',
    description: 'Maceteros, lámparas, organizadores y objetos de diseño para tu casa u oficina.',
    accent: '#7C3AED',
    icon: 'home',
  },
  {
    id: 6,
    slug: 'personalizados',
    name: 'Personalizados',
    description: 'Piezas a medida: prototipos, repuestos, regalos corporativos y cualquier idea que quieras materializar.',
    accent: '#2B2E33',
    icon: 'cube',
  },
];
