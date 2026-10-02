<script lang="ts">
	import '@fontsource/ibm-plex-sans/latin-400.css';
	import '@fontsource/ibm-plex-sans/latin-600.css';
	import '@fontsource/ibm-plex-mono/latin-400.css';
	import '@fontsource-variable/nunito/wght.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import favicon from '#lib/assets/favicon.svg';
	import SiteFooter from '#lib/components/shared/SiteFooter.svelte';
	import SiteHeader from '#lib/components/shared/SiteHeader.svelte';
	import { themeState } from '#lib/state/theme.svelte.ts';

	let { children } = $props();

	onMount(() => themeState.start());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<SiteHeader />
	<div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-14 px-4 py-10 sm:px-6 sm:py-12">
		<main class="flex-1">
			{@render children()}
		</main>
		<SiteFooter />
	</div>
</div>
