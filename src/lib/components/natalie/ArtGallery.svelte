<script lang="ts">
	import { dev } from '$app/env';
	import type { Artwork } from '#lib/content/index.ts';

	let { art }: { art: Artwork[] } = $props();

	const tilts = [-1.5, 1, -0.5, 1.5, -1, 0.5];
	const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
</script>

{#if art.length > 0}
	<ul class="grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each art as piece, i (piece.href)}
			<li style:rotate="{tilts[i % tilts.length]}deg">
				<a
					href={piece.href}
					class="block rounded-sm bg-bg p-2 pb-1 shadow-[0_1px_0_var(--line)] ring-1 ring-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
				>
					<enhanced:img
						src={piece.image}
						alt={piece.alt}
						sizes="(min-width: 640px) 220px, 45vw"
						class="aspect-[4/5] w-full rounded-[2px] object-cover"
					/>
					<span class="block py-1.5 text-center text-xs text-muted">
						{piece.date ? dateFormat.format(new Date(piece.date)) : 'on instagram'}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{:else if dev}
	<ul class="grid grid-cols-2 gap-5 sm:grid-cols-3" aria-label="Art placeholders (dev only)">
		{#each tilts.slice(0, 3) as tilt, i (i)}
			<li
				class="rounded-sm bg-bg p-2 pb-1 shadow-[0_1px_0_var(--line)] ring-1 ring-line"
				style:rotate="{tilt}deg"
			>
				<span
					class="grid aspect-[4/5] place-items-center rounded-[2px] border border-dashed border-accent text-xs text-muted"
				>
					drawing {i + 1}
				</span>
				<span class="block py-1.5 text-center text-xs text-muted">dev placeholder</span>
			</li>
		{/each}
	</ul>
{/if}
