<script lang="ts">
	import { ArrowUpRight, FileText } from '@lucide/svelte';
	import SectionHeading from '#lib/components/shared/SectionHeading.svelte';
	import { cvHref, education, experience, resume, skills } from '#lib/content/index.ts';

	const work = experience.filter((entry) => entry.kind !== 'organization');
	const organizations = experience.filter((entry) => entry.kind === 'organization');
</script>

<svelte:head>
	<title>Experience · Pring</title>
	<meta
		name="description"
		content="Experience, education and skills of {resume.name} (pring-nt)."
	/>
</svelte:head>

<div class="space-y-12">
	<header class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="text-2xl font-semibold natalie:font-display natalie:font-normal">Experience</h1>
			<p class="text-muted">{resume.name} · {resume.tagline}</p>
		</div>
		<a
			href={cvHref}
			class="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-link hover:underline"
		>
			<FileText class="size-4" aria-hidden="true" />
			Download CV (PDF)
		</a>
	</header>

	<section aria-labelledby="exp-education" class="space-y-3">
		<SectionHeading id="exp-education" text="education" />
		<div class="rounded-md border border-line bg-surface p-4 sm:p-5">
			<h3 class="font-semibold">{education.school}</h3>
			<p class="text-sm text-muted">{education.degree} · Expected {education.expected}</p>
			<p class="mt-1.5 text-sm">{education.notes.join(' · ')}</p>
		</div>
	</section>

	<section aria-labelledby="exp-work" class="space-y-3">
		<SectionHeading id="exp-work" text="engineering experience" />
		<ol class="divide-y divide-line rounded-md border border-line bg-surface">
			{#each work as entry (entry.name)}
				<li class="space-y-2 p-4 sm:p-5">
					<div>
						<h3 class="font-semibold">
							{#if entry.href}
								<a class="inline-flex items-center text-link hover:underline" href={entry.href}>
									{entry.name}<ArrowUpRight class="size-4" aria-hidden="true" />
								</a>
							{:else}
								{entry.name}
							{/if}
						</h3>
						<p class="text-sm text-muted">
							{[entry.role, entry.context, entry.period].filter(Boolean).join(' · ')}
						</p>
					</div>
					<ul class="list-disc space-y-1 pl-5 text-[0.95rem] marker:text-muted">
						{#each entry.highlights as highlight (highlight)}
							<li>{highlight}</li>
						{/each}
					</ul>
					{#if entry.stack}
						<p class="text-xs text-muted pring:font-mono">{entry.stack.join(' · ')}</p>
					{/if}
				</li>
			{/each}
		</ol>
	</section>

	<section aria-labelledby="exp-skills" class="space-y-3">
		<SectionHeading id="exp-skills" text="skills" />
		<dl
			class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-md border border-line bg-surface p-4 text-[0.95rem] sm:p-5"
		>
			{#each skills as group (group.label)}
				<dt class="text-muted">{group.label}</dt>
				<dd>{group.items.join(', ')}</dd>
			{/each}
		</dl>
	</section>

	<section aria-labelledby="exp-orgs" class="space-y-3">
		<SectionHeading id="exp-orgs" text="organizations" />
		<ul class="divide-y divide-line rounded-md border border-line bg-surface">
			{#each organizations as entry (entry.name)}
				<li class="p-4 sm:p-5">
					<h3 class="font-semibold">{entry.name}</h3>
					<p class="text-sm text-muted">{[entry.role, entry.period].filter(Boolean).join(' · ')}</p>
					{#each entry.highlights as highlight (highlight)}
						<p class="mt-1.5 text-[0.95rem]">{highlight}</p>
					{/each}
				</li>
			{/each}
		</ul>
	</section>
</div>
