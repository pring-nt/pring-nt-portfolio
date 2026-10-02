<script lang="ts">
	import { currently, profile, visibleProjects } from '#lib/content/index.ts';
	import CurrentlyBlock from './CurrentlyBlock.svelte';
	import IssueList from './IssueList.svelte';
</script>

<div class="space-y-12">
	<section aria-label="About">
		<p class="max-w-prose text-lg leading-relaxed">{profile.pring.intro}</p>
	</section>

	<section aria-labelledby="pring-currently" class="space-y-3">
		<h2 id="pring-currently" class="font-mono text-sm text-muted">currently</h2>
		<CurrentlyBlock items={currently} />
	</section>

	<section aria-labelledby="pring-issues" class="space-y-3">
		<h2 id="pring-issues" class="font-mono text-sm text-muted">
			closed issues <span class="text-muted/70">against the world</span>
		</h2>
		<IssueList projects={visibleProjects} />
	</section>
</div>
