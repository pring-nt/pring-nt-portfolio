<script lang="ts">
	import { profile } from '#lib/content/index.ts';
	import { themeState } from '#lib/state/theme.svelte.ts';
	import ColorModeToggle from './ColorModeToggle.svelte';
</script>

<header class="flex items-center justify-between gap-4">
	<button
		type="button"
		class="rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
		onclick={() => themeState.togglePersona()}
	>
		<span class="natalie:hidden">
			<span class="sr-only">Switch to {profile.natalie.name}. Currently </span>
			<span class="block text-3xl font-semibold tracking-tight">{profile.pring.name}</span>
			<span class="block font-mono text-xs text-muted">pring-nt</span>
		</span>
		<span class="hidden natalie:block">
			<span class="sr-only">Switch to {profile.pring.name}. Currently </span>
			<span class="block font-display text-3xl">{profile.natalie.name}</span>
		</span>
	</button>
	<ColorModeToggle />
</header>
