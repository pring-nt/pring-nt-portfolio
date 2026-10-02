<script lang="ts">
	let { src, class: className = '' }: { src: string; class?: string } = $props();
</script>

<!--
	Single-color doodles are drawn as a CSS mask filled with `currentColor`, so they follow the
	theme: set the color with a text utility (e.g. `text-ink`, `text-accent`).
-->
<span
	class="pointer-events-none block bg-current select-none {className}"
	style:mask-image="url({src})"
	style:mask-size="contain"
	style:mask-repeat="no-repeat"
	style:mask-position="center"
	aria-hidden="true"
></span>
