<script lang="ts">
	import portrait from '#lib/assets/pring/portrait.webp';
	import straightArrow from '#lib/assets/pring/straight_arrow.svg';
	import { currently, profile, visibleProjects } from '#lib/content/index.ts';
	import CurrentlyBlock from './CurrentlyBlock.svelte';
	import Doodle from './Doodle.svelte';
	import IssueList from './IssueList.svelte';
</script>

<div class="space-y-12">
	<section aria-label="About" class="flow-root">
		<Doodle src={portrait} class="float-right -mt-2 ml-4 size-24 text-ink sm:size-28" />
		<p class="max-w-prose text-lg leading-relaxed">{profile.pring.intro}</p>
	</section>

	<section aria-labelledby="pring-currently" class="relative space-y-3">
		<h2 id="pring-currently" class="font-mono text-sm text-muted">currently</h2>
		<CurrentlyBlock items={currently} />
		<Doodle
			src={straightArrow}
			class="absolute top-6 right-0 hidden h-10 w-24 -scale-x-100 text-accent sm:block"
		/>
	</section>

	<section aria-labelledby="pring-issues" class="space-y-3">
		<h2 id="pring-issues" class="font-mono text-sm text-muted">
			closed issues <span class="text-muted/70">against the world</span>
		</h2>
		<IssueList projects={visibleProjects} />
	</section>
</div>
