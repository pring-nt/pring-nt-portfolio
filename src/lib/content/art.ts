import type { Artwork } from './types.ts';

/**
 * Add drawings to src/lib/assets/art/ and import them with `?enhanced`:
 *
 *   import sketch from '#lib/assets/art/sketch.webp?enhanced';
 *   { image: sketch, alt: '...', href: 'https://www.instagram.com/p/...', date: '2026-04-12' }
 */
export const art: Artwork[] = [];
