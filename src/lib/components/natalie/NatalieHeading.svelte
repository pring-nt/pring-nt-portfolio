<script lang="ts">
	import { Heart } from '@lucide/svelte';

	let {
		id,
		text,
		footnoteMark = false
	}: { id: string; text: string; footnoteMark?: boolean } = $props();
</script>

<h2 {id} class="flex items-center gap-2 font-display text-2xl">
	<Heart class="size-4 fill-accent text-accent" aria-hidden="true" />
	{text}{#if footnoteMark}<sup class="text-sm text-muted">*</sup>{/if}
</h2>
