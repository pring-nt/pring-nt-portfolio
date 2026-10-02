<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import favicon from '#lib/assets/favicon.svg';
	import { themeState } from '#lib/state/theme.svelte.ts';

	let { children } = $props();

	onMount(() => themeState.start());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
