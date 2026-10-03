<script lang="ts">
	import type { CurrentlyItem } from '#lib/content/index.ts';

	let { items }: { items: CurrentlyItem[] } = $props();
</script>

<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.95rem]">
	{#each items as item (item.label)}
		<dt data-intro="decode" class="font-mono text-sm leading-6 text-accent">{item.label}:</dt>
		<dd>{item.value}</dd>
	{/each}
</dl>
