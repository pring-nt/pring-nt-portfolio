<script lang="ts">
	import { profile } from '#lib/content/index.ts';
	import NatalieLayout from '#lib/components/natalie/NatalieLayout.svelte';
	import PringLayout from '#lib/components/pring/PringLayout.svelte';
</script>

<svelte:head>
	<title>Pring</title>
	<meta name="description" content={profile.pring.intro} />
</svelte:head>

<div class="natalie:hidden" data-persona="pring"><PringLayout /></div>
<div class="hidden natalie:block" data-persona="natalie"><NatalieLayout /></div>
