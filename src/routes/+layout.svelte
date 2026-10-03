<script lang="ts">
	import '@fontsource/ibm-plex-sans/latin-400.css';
	import '@fontsource/ibm-plex-sans/latin-600.css';
	import '@fontsource/ibm-plex-mono/latin-400.css';
	import '@fontsource-variable/nunito/wght.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import appleTouchIcon from '#lib/assets/apple-touch-icon.png';
	import favicon from '#lib/assets/favicon.png';
	import SiteFooter from '#lib/components/shared/SiteFooter.svelte';
	import SiteHeader from '#lib/components/shared/SiteHeader.svelte';
	import { themeState } from '#lib/state/theme.svelte.ts';

	let { children } = $props();

	onMount(() => themeState.start());

	onNavigate((navigation) => {
		if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		const root = document.documentElement;
		return new Promise((resolve) => {
			root.dataset.navTransition = '';
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			transition.finished.finally(() => delete root.dataset.navTransition);
		});
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />
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
