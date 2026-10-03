<script lang="ts">
	import { ArrowUpRight, CircleCheck } from '@lucide/svelte';
	import ExternalLink from '#lib/components/shared/ExternalLink.svelte';
	import type { Project } from '#lib/content/index.ts';

	let { projects }: { projects: Project[] } = $props();

	const issues = $derived(
		projects
			.filter((project) => project.issue)
			.toSorted((a, b) => a.issue!.number - b.issue!.number)
	);

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<ol class="divide-y divide-line overflow-hidden rounded-md border border-line bg-surface">
	{#each issues as project (project.slug)}
		{@const issue = project.issue!}
		<li data-intro="row" class="flex gap-3 px-4 py-4 sm:px-5">
			<CircleCheck
				data-intro="check"
				class="mt-0.5 size-4.5 shrink-0 text-accent"
				aria-label="closed"
			/>
			<article class="min-w-0 space-y-1.5">
				<h3 class="leading-snug font-semibold">
					<span data-intro="decode" class="font-mono font-normal text-accent"
						>#{pad(issue.number)}</span
					>
					{issue.title}
				</h3>
				<p class="font-mono text-xs text-muted">
					{#if project.role === 'qa'}
						closed by the team · QA'd by me
					{:else}
						closed by <code class="text-ink">{project.slug}</code>
					{/if}
				</p>
				{#if issue.body}
					<p class="text-[0.95rem]">{issue.body}</p>
				{/if}
				<p class="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 font-mono text-xs">
					<span class="text-muted">{project.tags.join(' · ')}</span>
					{#if project.site}
						<ExternalLink
							class="inline-flex items-center text-link hover:underline"
							href={project.site}
						>
							{project.name}<ArrowUpRight class="size-3.5" aria-hidden="true" />
						</ExternalLink>
					{/if}
					{#if project.repo}
						<ExternalLink
							class="inline-flex items-center text-link hover:underline"
							href={project.repo}
						>
							source<ArrowUpRight class="size-3.5" aria-hidden="true" />
						</ExternalLink>
					{/if}
				</p>
			</article>
		</li>
	{/each}
</ol>
