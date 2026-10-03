<script lang="ts">
	import ExternalLink from '#lib/components/shared/ExternalLink.svelte';
	import type { ScrapImage } from '#lib/content/index.ts';

	let {
		photo,
		tilt = 3,
		sizes,
		class: className = ''
	}: { photo: ScrapImage; tilt?: number; sizes: string; class?: string } = $props();
</script>

<figure
	class="relative rounded-sm bg-bg p-1.5 pb-1 shadow-[0_1px_0_var(--line)] ring-1 ring-line {className}"
	style:rotate="{tilt}deg"
>
	<span
		data-intro="tape"
		class="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-3 rounded-[2px] bg-accent-soft/75"
		aria-hidden="true"
	></span>
	<enhanced:img
		src={photo.image}
		alt={photo.alt}
		{sizes}
		draggable="false"
		class="w-full rounded-[2px]"
	/>
	<figcaption class="pt-1 text-center text-[0.65rem] leading-tight text-muted">
		<ExternalLink
			href={photo.credit.href}
			title="{photo.credit.source} © {photo.credit.owner}"
			class="hover:text-ink"
		>
			art: {photo.credit.source}
		</ExternalLink>
	</figcaption>
</figure>
