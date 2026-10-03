/**
 * Renders the link-preview image (static/og.png): Pring's dark-mode intro on graph paper, with the
 * portrait doodle. Run with `bun run og` after changing the intro, the doodle or the palette.
 */
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';

// profile.ts imports images with `?enhanced`, which only Vite understands; the intro text is all we need.
Bun.plugin({
	name: 'stub-images',
	setup(build) {
		build.onLoad({ filter: /\.(webp|png|jpe?g)$/ }, () => ({
			contents: 'export default {}',
			loader: 'js'
		}));
	}
});
const { profile } = await import('../src/lib/content/profile.ts');
const { ogImage, siteUrl } = await import('../src/lib/content/site.ts');

// pring-dark tokens from src/app.css; the grid is --line at 65% over --bg, as on the site.
const bg = '#1c1f24';
const ink = '#e4e2dc';
const muted = '#9a9da4';
const accent = '#93afd6';
const grid = '#25292f';

const font = (pkg: string, file: string) =>
	readFile(`node_modules/@fontsource/${pkg}/files/${file}`);

const portraitSize = 300;
const portrait = await sharp('src/lib/assets/pring/portrait.svg', { density: 300 })
	.resize(portraitSize, portraitSize, { fit: 'contain', background: '#0000' })
	.extractChannel('alpha')
	.toBuffer();
const tintedPortrait = await sharp({
	create: { width: portraitSize, height: portraitSize, channels: 3, background: ink }
})
	.joinChannel(portrait)
	.png()
	.toBuffer();

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
	type,
	props: { style, children }
});

const card = h(
	'div',
	{
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '72px 88px',
		backgroundColor: bg,
		backgroundImage: `linear-gradient(${grid} 2px, transparent 2px), linear-gradient(90deg, ${grid} 2px, transparent 2px)`,
		backgroundSize: '40px 40px',
		color: ink,
		fontFamily: 'IBM Plex Sans'
	},
	h(
		'div',
		{ display: 'flex', alignItems: 'baseline', gap: '18px' },
		h('span', { fontSize: 44, fontWeight: 600, letterSpacing: '-0.01em' }, profile.pring.name),
		h('span', { fontSize: 26, fontFamily: 'IBM Plex Mono', color: muted }, 'pring-nt')
	),
	h(
		'div',
		{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '56px' },
		h('p', { fontSize: 40, lineHeight: 1.5, margin: 0, maxWidth: '720px' }, profile.pring.intro),
		{
			type: 'img',
			props: {
				src: `data:image/png;base64,${tintedPortrait.toString('base64')}`,
				width: portraitSize,
				height: portraitSize
			}
		}
	),
	h(
		'span',
		{ fontSize: 24, fontFamily: 'IBM Plex Mono', color: accent },
		siteUrl.replace('https://', '')
	)
);

const svg = await satori(card as Parameters<typeof satori>[0], {
	width: ogImage.width,
	height: ogImage.height,
	fonts: [
		{
			name: 'IBM Plex Sans',
			data: await font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff'),
			weight: 400
		},
		{
			name: 'IBM Plex Sans',
			data: await font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal.woff'),
			weight: 600
		},
		{
			name: 'IBM Plex Mono',
			data: await font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'),
			weight: 400
		}
	]
});

const info = await sharp(Buffer.from(svg))
	.png({ compressionLevel: 9, palette: true })
	.toFile(`static${ogImage.path}`);
console.log(
	`static${ogImage.path}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`
);
