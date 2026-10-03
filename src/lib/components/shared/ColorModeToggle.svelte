<script lang="ts">
	import { Monitor, Moon, Sun } from '@lucide/svelte';
	import { themeState, type ColorMode } from '#lib/state/theme.svelte.ts';

	let { class: className = '' }: { class?: string } = $props();

	const next: Record<ColorMode, ColorMode> = { system: 'light', light: 'dark', dark: 'system' };
	const icons = { system: Monitor, light: Sun, dark: Moon };

	const Icon = $derived(icons[themeState.mode]);
	const label = $derived(`Color mode: ${themeState.mode}. Switch to ${next[themeState.mode]}.`);
</script>

<button
	type="button"
	class="inline-flex size-9 items-center justify-center rounded-md text-muted transition-[color,rotate] duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent natalie:motion-safe:hover:-rotate-12 {className}"
	aria-label={label}
	title={label}
	onclick={() => themeState.setMode(next[themeState.mode])}
>
	<Icon class="size-5" aria-hidden="true" />
</button>
