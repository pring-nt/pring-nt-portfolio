<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import { profile } from '#lib/content/index.ts';
	import { themeState } from '#lib/state/theme.svelte.ts';
	import ColorModeToggle from './ColorModeToggle.svelte';
</script>

<header class="sticky top-0 z-10 border-b border-line bg-bg">
	<div class="mx-auto flex h-16 max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
		<button
			type="button"
			class="rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
			onclick={() => themeState.togglePersona()}
		>
			<span class="flex items-baseline gap-2 natalie:hidden">
				<span class="sr-only">Switch to {profile.natalie.name}. Currently </span>
				<span class="text-xl font-semibold tracking-tight">{profile.pring.name}</span>
				<span class="font-mono text-xs text-muted">pring-nt</span>
			</span>
			<span class="hidden items-center gap-1.5 natalie:flex">
				<span class="sr-only">Switch to {profile.pring.name}. Currently </span>
				<span class="font-display text-2xl">{profile.natalie.name}</span>
				<Heart class="size-3.5 fill-pop text-pop" aria-hidden="true" />
			</span>
		</button>
		<ColorModeToggle />
	</div>
</header>
