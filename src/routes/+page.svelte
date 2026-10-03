<script lang="ts">
	import NatalieLayout from '#lib/components/natalie/NatalieLayout.svelte';
	import PringLayout from '#lib/components/pring/PringLayout.svelte';
	import PageMeta from '#lib/components/shared/PageMeta.svelte';
</script>

<PageMeta
	path="/"
	description="Portfolio of Pring (pring-nt), a CS student at DLSU majoring in Software Technology. Frontend projects, and the things I build when something bugs me."
/>

<div class="natalie:hidden" data-persona="pring"><PringLayout /></div>
<div class="hidden natalie:block" data-persona="natalie"><NatalieLayout /></div>
