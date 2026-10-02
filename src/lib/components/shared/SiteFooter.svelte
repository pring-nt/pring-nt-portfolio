<script lang="ts">
	import { links, profile } from '#lib/content/index.ts';
	import { themeState } from '#lib/state/theme.svelte.ts';
</script>

<footer class="space-y-4 border-t border-line pt-6 text-sm">
	<ul class="flex flex-wrap gap-x-5 gap-y-2">
		{#each links as link (link.kind)}
			<li>
				<a class="text-link hover:underline" href={link.href}>
					<span class="text-xs text-muted pring:font-mono">{link.label}</span>
					{link.handle}
				</a>
			</li>
		{/each}
	</ul>
	<button
		type="button"
		class="rounded-sm text-left text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
		onclick={() => themeState.togglePersona()}
	>
		<span class="natalie:hidden">{profile.pring.switchHint}</span>
		<span class="hidden natalie:inline">{profile.natalie.switchHint}</span>
	</button>
</footer>
