<script lang="ts">
	import { profile } from '#lib/content/index.ts';
	import { ogImage, siteName, siteUrl } from '#lib/content/site.ts';
	import { themeState } from '#lib/state/theme.svelte.ts';

	let {
		page,
		description,
		path
	}: {
		/** Prefix before the persona name, e.g. `Experience` → "Experience · Pring". */
		page?: string;
		description: string;
		/** Route path, e.g. `/experience`. */
		path: string;
	} = $props();

	const withName = (name: string) => (page ? `${page} · ${name}` : name);
	// Crawlers only see the prerendered Pring title; the tab follows the persona once the page runs.
	const title = $derived(withName(profile[themeState.persona].name));
	const shareTitle = $derived(withName(profile.pring.name));
	const url = $derived(new URL(path, siteUrl).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={shareTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={new URL(ogImage.path, siteUrl).href} />
	<meta property="og:image:width" content={String(ogImage.width)} />
	<meta property="og:image:height" content={String(ogImage.height)} />
	<meta
		property="og:image:alt"
		content="Pring's intro on dark graph paper, next to a doodled portrait"
	/>
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
