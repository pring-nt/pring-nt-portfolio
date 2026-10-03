<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { dev } from '$app/env';
	import bow from '#lib/assets/natalie/scrapbook/bow.webp';
	import cornerFlowers from '#lib/assets/natalie/scrapbook/corner-flowers.webp';
	import heartSticker from '#lib/assets/natalie/scrapbook/heart-sticker.webp';
	import kaomoji from '#lib/assets/natalie/scrapbook/kaomoji.webp';
	import ExternalLink from '#lib/components/shared/ExternalLink.svelte';
	import {
		art,
		likes,
		natalieFootnote,
		profile,
		stickerCredits,
		visibleProjects
	} from '#lib/content/index.ts';
	import ArtGallery from './ArtGallery.svelte';
	import NatalieHeading from './NatalieHeading.svelte';
	import ScrapCard from './ScrapCard.svelte';
	import ScrapPhoto from './ScrapPhoto.svelte';

	const avatar = profile.natalie.avatar;

	const tilts = [-1, 0.75, -0.5, 1];
	const tapes = ['center', 'left', 'right', 'center'] as const;
</script>

<div class="space-y-14">
	<section aria-label="About">
		<ScrapCard tilt={-0.5}>
			<div class="flex flex-col items-center gap-5 sm:flex-row">
				{#if avatar}
					<figure class="relative shrink-0">
						<enhanced:img
							src={avatar.image}
							alt={avatar.alt}
							sizes="128px"
							draggable="false"
							class="size-28 rounded-full object-cover ring-4 ring-bg sm:size-32"
						/>
						<img
							src={bow}
							alt=""
							data-intro="heart"
							class="pointer-events-none absolute -top-5 -left-6 w-16 -rotate-12 select-none"
						/>
						<figcaption class="mt-2 text-center text-[0.65rem] text-muted">
							<ExternalLink
								href={avatar.credit.href}
								title="{avatar.credit.source} © {avatar.credit.owner}"
								class="hover:text-ink"
							>
								art: {avatar.credit.source}
							</ExternalLink>
						</figcaption>
					</figure>
				{/if}
				<p class="text-lg leading-relaxed">{profile.natalie.intro}</p>
			</div>
			<img
				src={cornerFlowers}
				alt=""
				data-intro="heart"
				class="pointer-events-none absolute -right-4 -bottom-4 w-24 select-none sm:w-28"
			/>
		</ScrapCard>
	</section>

	{#if art.length > 0 || dev}
		<section aria-labelledby="natalie-art" class="relative space-y-5">
			<img
				src={heartSticker}
				alt=""
				data-intro="heart"
				class="pointer-events-none absolute -top-9 right-0 w-28 rotate-6 select-none sm:w-32"
			/>
			<NatalieHeading id="natalie-art" text="stuff i drew" />
			<ArtGallery {art} />
		</section>
	{/if}

	<section aria-labelledby="natalie-likes" class="space-y-6">
		<NatalieHeading id="natalie-likes" text="things i'm obsessed with" footnoteMark />
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each likes as like, i (like.title)}
				<li>
					<ScrapCard
						tilt={tilts[(i + 1) % tilts.length]}
						tape={tapes[(i + 1) % tapes.length]}
						class="flow-root"
					>
						{#if like.photo}
							<ScrapPhoto photo={like.photo} sizes="96px" class="float-right mb-2 ml-3 w-24" />
						{/if}
						<h3 class="font-display text-lg">{like.title}</h3>
						{#if like.natalie}
							<p class="mt-1.5 leading-relaxed">{like.natalie}</p>
						{/if}
					</ScrapCard>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="natalie-projects" class="relative space-y-6">
		<img
			src={kaomoji}
			alt=""
			data-intro="heart"
			class="pointer-events-none absolute -top-10 right-0 w-32 -rotate-3 select-none sm:w-36"
		/>
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

	<div class="space-y-1 text-sm text-muted">
		<p>
			<span aria-hidden="true">* </span><ExternalLink
				class="text-link underline"
				href={natalieFootnote.href}>{natalieFootnote.text}</ExternalLink
			>
		</p>
		<p class="text-xs">
			stickers found on pinterest:
			{#each stickerCredits as credit, i (credit.href)}
				<ExternalLink class="underline hover:text-ink" href={credit.href}
					>{credit.label}</ExternalLink
				>{i < stickerCredits.length - 1 ? ', ' : ''}
			{/each}
		</p>
	</div>
</div>
