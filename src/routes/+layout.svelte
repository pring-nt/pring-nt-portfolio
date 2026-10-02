<script lang="ts">
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

<div class="mx-auto flex min-h-dvh max-w-2xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
	<SiteHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>
