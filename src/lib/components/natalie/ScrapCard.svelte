<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		tilt = 0,
		tape = 'center',
		class: className = '',
		children
	}: {
		/** Rotation in degrees. Keep it within about ±1.5 so text stays easy to read. */
		tilt?: number;
		tape?: 'center' | 'left' | 'right' | 'none';
		class?: string;
		children: Snippet;
	} = $props();

	const tapePosition = {
		center: 'left-1/2 -translate-x-1/2 -rotate-2',
		left: 'left-5 -rotate-6',
		right: 'right-5 rotate-6'
	};
</script>

<div
	data-intro="card"
	class="relative rounded-md border border-line bg-surface p-5 shadow-[0_1px_0_var(--line)] {className}"
	style:rotate="{tilt}deg"
>
	{#if tape !== 'none'}
		<span
			data-intro="tape"
			class="absolute -top-3 h-6 w-20 rounded-[2px] bg-accent-soft/75 {tapePosition[tape]}"
			aria-hidden="true"
		></span>
	{/if}
	{@render children()}
</div>
