<script lang="ts">
	let { id, text }: { id: string; text: string } = $props();
</script>

<h2 {id} class="text-sm text-muted pring:font-mono natalie:font-display natalie:text-xl">
	{text}
</h2>
