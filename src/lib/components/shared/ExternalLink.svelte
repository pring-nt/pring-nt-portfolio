<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let { href, children, ...rest }: HTMLAnchorAttributes & { href: string; children: Snippet } =
		$props();

	const newTab = $derived(/^https?:\/\//.test(href));
</script>

<a
	{href}
	target={newTab ? '_blank' : undefined}
	rel={newTab ? 'noopener noreferrer' : undefined}
	{...rest}
	>{@render children()}{#if newTab}<span class="sr-only"> (opens in a new tab)</span>{/if}</a
>
