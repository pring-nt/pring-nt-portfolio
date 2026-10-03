<script lang="ts">
	import { dev } from '$app/env';
	import ExternalLink from '#lib/components/shared/ExternalLink.svelte';
	import type { Artwork } from '#lib/content/index.ts';

	let { art }: { art: Artwork[] } = $props();

	const tilts = [-1.5, 1, -0.5, 1.5, -1, 0.5];
	const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
</script>

{#if art.length > 0}
	<ul class="grid grid-cols-2 gap-5 sm:grid-cols-3">
		{#each art as piece, i (piece.href)}
			<li data-intro="card">
				<ExternalLink
					href={piece.href}
					class="block rotate-(--tilt) rounded-sm bg-bg p-2 pb-5 shadow-[0_1px_0_var(--line)] ring-1 ring-line transition-[translate,rotate,box-shadow] duration-200 hover:shadow-[0_10px_18px_-8px_color-mix(in_srgb,var(--ink)_35%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link motion-safe:hover:-translate-y-1.5 motion-safe:hover:rotate-0"
					style="--tilt: {tilts[i % tilts.length]}deg"
				>
					<enhanced:img
						src={piece.image}
						alt={piece.alt}
						sizes="(min-width: 640px) 220px, 45vw"
						class="aspect-[4/5] w-full rounded-[2px] object-cover"
					/>
					{#if piece.date}
						<span class="-mb-3 block pt-1.5 text-center text-xs text-muted">
							{dateFormat.format(new Date(piece.date))}
						</span>
					{/if}
				</ExternalLink>
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
