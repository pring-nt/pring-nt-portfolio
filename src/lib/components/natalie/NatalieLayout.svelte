<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { dev } from '$app/env';
	import ExternalLink from '#lib/components/shared/ExternalLink.svelte';
	import { art, likes, natalieFootnote, profile, visibleProjects } from '#lib/content/index.ts';
	import ArtGallery from './ArtGallery.svelte';
	import NatalieHeading from './NatalieHeading.svelte';
	import ScrapCard from './ScrapCard.svelte';

	const tilts = [-1, 0.75, -0.5, 1];
	const tapes = ['center', 'left', 'right', 'center'] as const;
</script>

<div class="space-y-14">
	<section aria-label="About">
		<ScrapCard tilt={-0.5}>
			<p class="text-lg leading-relaxed">{profile.natalie.intro}</p>
		</ScrapCard>
	</section>

	{#if art.length > 0 || dev}
		<section aria-labelledby="natalie-art" class="space-y-5">
			<NatalieHeading id="natalie-art" text="stuff i drew" />
			<ArtGallery {art} />
		</section>
	{/if}

	<section aria-labelledby="natalie-likes" class="space-y-6">
		<NatalieHeading id="natalie-likes" text="things i'm obsessed with" footnoteMark />
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each likes as like, i (like.title)}
				<li>
					<ScrapCard tilt={tilts[(i + 1) % tilts.length]} tape={tapes[(i + 1) % tapes.length]}>
						<h3 class="font-display text-lg">{like.title}</h3>
						{#if like.natalie}
							<p class="mt-1.5 leading-relaxed">{like.natalie}</p>
						{/if}
					</ScrapCard>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="natalie-projects" class="space-y-6">
		<NatalieHeading id="natalie-projects" text="things i made (or broke)" />
		<ul class="grid gap-7 sm:grid-cols-2">
			{#each visibleProjects as project, i (project.slug)}
				<li>
					<ScrapCard tilt={tilts[i % tilts.length]} tape={tapes[i % tapes.length]} class="h-full">
						<h3 class="font-display text-lg">
							{project.name}
							{#if project.role === 'qa'}
								<span class="ml-1 rounded-full bg-bg px-2 py-0.5 align-middle font-sans text-xs"
									>QA</span
								>
							{/if}
						</h3>
						<p class="mt-1.5 leading-relaxed">{project.natalie ?? project.summary}</p>
						<p class="mt-3 flex gap-4 text-sm">
							{#if project.site}
								<ExternalLink
									class="inline-flex items-center text-link underline"
									href={project.site}
								>
									go see it<ArrowUpRight class="size-3.5" aria-hidden="true" />
								</ExternalLink>
							{/if}
							{#if project.repo}
								<ExternalLink
									class="inline-flex items-center text-link underline"
									href={project.repo}
								>
									peek at the code<ArrowUpRight class="size-3.5" aria-hidden="true" />
								</ExternalLink>
							{/if}
						</p>
					</ScrapCard>
				</li>
			{/each}
		</ul>
	</section>

	<p class="text-sm text-muted">
		<span aria-hidden="true">* </span><ExternalLink
			class="text-link underline"
			href={natalieFootnote.href}>{natalieFootnote.text}</ExternalLink
		>
	</p>
</div>
