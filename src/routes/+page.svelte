<script lang="ts">
	import { onMount } from 'svelte';
	import ColorModeToggle from '#lib/components/shared/ColorModeToggle.svelte';
	import { themeState } from '#lib/state/theme.svelte.ts';
	import { visibleProjects } from '#lib/content/index.ts';

	const sample = visibleProjects[0];

	const tokens = [
		'bg',
		'surface',
		'ink',
		'muted',
		'line',
		'accent',
		'accent-soft',
		'link',
		'pop'
	] as const;
	type Token = (typeof tokens)[number];

	const textChecks: [fg: Token, bg: Token][] = [
		['ink', 'bg'],
		['ink', 'surface'],
		['muted', 'bg'],
		['link', 'bg'],
		['link', 'surface'],
		['accent', 'bg'],
		['pop', 'bg']
	];

	let values = $state<Record<string, string>>({});
	let appliedTheme = $state('');

	function luminance(hex: string) {
		const [r, g, b] = [1, 3, 5].map((i) => {
			const c = parseInt(hex.slice(i, i + 2), 16) / 255;
			return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	function contrast(a: string, b: string) {
		if (!a || !b) return 0;
		const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
		return (hi + 0.05) / (lo + 0.05);
	}

	function readTokens() {
		const style = getComputedStyle(document.documentElement);
		values = Object.fromEntries(tokens.map((t) => [t, style.getPropertyValue(`--${t}`).trim()]));
		appliedTheme = document.documentElement.dataset.theme ?? '';
	}

	onMount(() => {
		readTokens();
		const observer = new MutationObserver(readTokens);
		observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
		return () => observer.disconnect();
	});
</script>

<main class="mx-auto max-w-3xl space-y-10 px-4 py-10">
	<header class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="font-mono text-xs tracking-wide text-muted uppercase">theme tuning · temporary</p>
			<h1 class="font-display text-3xl font-semibold">{appliedTheme}</h1>
		</div>
		<div class="flex items-center gap-2">
			<button
				type="button"
				class="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-sm"
				onclick={() => themeState.togglePersona()}
			>
				switch to {themeState.persona === 'pring' ? 'natalie' : 'pring'}
			</button>
			<ColorModeToggle />
		</div>
	</header>

	<section class="space-y-3">
		<h2 class="font-mono text-sm text-accent">tokens</h2>
		<ul class="grid grid-cols-2 gap-3 sm:grid-cols-3">
			{#each tokens as token (token)}
				<li class="flex items-center gap-3 rounded-md border border-line bg-surface p-2">
					<span
						class="size-10 shrink-0 rounded border border-line"
						style:background-color="var(--{token})"
					></span>
					<span class="min-w-0">
						<span class="block font-mono text-sm">{token}</span>
						<span class="block font-mono text-xs text-muted">{values[token]}</span>
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="space-y-3">
		<h2 class="font-mono text-sm text-accent">text contrast (AA needs 4.5, large text 3)</h2>
		<ul class="space-y-1 font-mono text-sm">
			{#each textChecks as [fg, bg] (`${fg}-${bg}`)}
				{@const ratio = contrast(values[fg], values[bg])}
				<li class="flex items-center gap-3">
					<span
						class="rounded px-2 py-0.5"
						style:color="var(--{fg})"
						style:background-color="var(--{bg})">Aa</span
					>
					<span class="w-40">{fg} on {bg}</span>
					<span class={ratio >= 4.5 ? 'text-ink' : 'text-pop'}>
						{ratio.toFixed(2)}
						{ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'large only' : 'fail'}
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="space-y-4 rounded-lg border border-line bg-surface p-6">
		<p class="font-mono text-xs text-accent">
			#{String(sample.issue?.number).padStart(2, '0')} · closed by <code>{sample.slug}</code>
		</p>
		<h2 class="font-display text-2xl font-semibold">{sample.issue?.title}</h2>
		<p>
			{themeState.persona === 'natalie' ? sample.natalie : sample.issue?.body}
			<a href={sample.site} class="text-link underline underline-offset-2">{sample.name}</a>
			<span class="text-muted">· {sample.tags.join(', ')}</span>
		</p>
		<p class="inline-block rounded bg-accent-soft px-2 py-1 text-sm">accent-soft highlight</p>
	</section>
</main>
