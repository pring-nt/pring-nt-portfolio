<script lang="ts">
	import { Heart } from '@lucide/svelte';
	import { page } from '$app/state';
	import cursor from '#lib/assets/pring/cursor.webp';
	import curvedArrow from '#lib/assets/pring/curved_arrow.webp';
	import Doodle from '#lib/components/pring/Doodle.svelte';
	import { profile } from '#lib/content/index.ts';
	import { themeState } from '#lib/state/theme.svelte.ts';
	import ColorModeToggle from './ColorModeToggle.svelte';

	const nav = [
		{ href: '/', label: 'home' },
		{ href: '/experience', label: 'experience' }
	];
</script>

<header class="sticky top-0 z-10 border-b border-line bg-bg">
	<div class="mx-auto flex h-16 max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
		<button
			type="button"
			class="relative rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
			onclick={(event) => themeState.togglePersona(event.currentTarget)}
		>
			<span class="flex items-baseline gap-2 natalie:hidden">
				<span class="sr-only">Switch to {profile.natalie.name}. Currently </span>
				<span class="text-xl font-semibold tracking-tight">{profile.pring.name}</span>
				<span class="font-mono text-xs text-muted">pring-nt</span>
				<Doodle
					src={curvedArrow}
					class="absolute top-1/2 right-full mr-3 hidden h-9 w-18 -translate-y-1/2 text-muted lg:block"
				/>
				<Doodle src={cursor} class="absolute top-5 -right-6 size-5 rotate-[-6deg] text-muted" />
			</span>
			<span class="hidden items-center gap-1.5 natalie:flex">
				<span class="sr-only">Switch to {profile.pring.name}. Currently </span>
				<span class="font-display text-2xl">{profile.natalie.name}</span>
				<Heart class="size-3.5 fill-pop text-pop" aria-hidden="true" />
			</span>
		</button>
		<div class="flex items-center gap-1 sm:gap-3">
			<nav aria-label="Main">
				<ul class="flex gap-3 text-sm sm:gap-4">
					{#each nav as item (item.href)}
						<li>
							<a
								href={item.href}
								aria-current={page.url.pathname === item.href ? 'page' : undefined}
								class="text-muted hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:underline-offset-4 pring:font-mono"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<ColorModeToggle />
		</div>
	</div>
</header>
