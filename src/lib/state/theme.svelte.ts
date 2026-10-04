import { flushSync } from 'svelte';
import type { prepareIntro } from '#lib/motion/intros.ts';

export type Persona = 'pring' | 'natalie';
export type ColorMode = 'system' | 'light' | 'dark';
export type Theme = `${Persona}-${'light' | 'dark'}`;

/** Must match the keys read by the inline script in src/app.html. */
const PERSONA_KEY = 'persona';
const MODE_KEY = 'color-mode';

const personas: readonly Persona[] = ['pring', 'natalie'];
const modes: readonly ColorMode[] = ['system', 'light', 'dark'];

function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
	try {
		const value = localStorage.getItem(key);
		return allowed.includes(value as T) ? (value as T) : fallback;
	} catch {
		return fallback;
	}
}

function write(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		/* storage blocked: the choice just won't persist */
	}
}

const pageTurns: Record<
	Persona,
	{ old: Keyframe[]; new: Keyframe[]; timing: KeyframeAnimationOptions }
> = {
	natalie: {
		old: [
			{ transformOrigin: 'left center', transform: 'perspective(2400px) rotateY(0deg)' },
			{
				transformOrigin: 'left center',
				transform: 'perspective(2400px) rotateY(-30deg) rotateZ(-1deg)',
				filter: 'brightness(0.97)',
				offset: 0.35
			},
			{
				transformOrigin: 'left center',
				transform: 'perspective(2400px) rotateY(-92deg) rotateZ(-2deg)',
				filter: 'brightness(0.8)'
			}
		],
		new: [
			{ transform: 'scale(0.96) rotate(-0.8deg)', filter: 'brightness(0.88)' },
			{ transform: 'scale(1.01) rotate(0.3deg)', filter: 'brightness(1)', offset: 0.82 },
			{ transform: 'none' }
		],
		timing: { duration: 900, easing: 'cubic-bezier(0.45, 0, 0.3, 1)' }
	},
	pring: {
		old: [
			{ transformOrigin: 'center top', transform: 'perspective(2400px) rotateX(0deg)' },
			{
				transformOrigin: 'center top',
				transform: 'perspective(2400px) rotateX(92deg)',
				filter: 'brightness(0.8)'
			}
		],
		new: [{ filter: 'brightness(0.88)' }, { filter: 'brightness(1)' }],
		timing: { duration: 650, easing: 'cubic-bezier(0.6, 0, 0.2, 1)' }
	}
};

/**
 * Starts at the defaults so hydration matches the prerendered HTML. `start()` then loads the saved
 * choice, which the inline script in app.html has already applied to `data-theme`.
 */
class ThemeState {
	persona = $state<Persona>('pring');
	mode = $state<ColorMode>('system');
	#systemDark = $state(false);
	/** Loaded after startup so animejs stays out of the first page load. */
	#prepareIntro?: typeof prepareIntro;

	dark = $derived(this.mode === 'dark' || (this.mode === 'system' && this.#systemDark));
	theme: Theme = $derived(`${this.persona}-${this.dark ? 'dark' : 'light'}` as const);

	/** Keeps `data-theme` on <html> in sync and tracks system changes. Call once from the root layout. */
	start() {
		const query = matchMedia('(prefers-color-scheme: dark)');
		this.persona = read(PERSONA_KEY, personas, 'pring');
		this.mode = read(MODE_KEY, modes, 'system');
		this.#systemDark = query.matches;
		import('#lib/motion/intros.ts').then((m) => (this.#prepareIntro = m.prepareIntro));

		const onChange = (event: MediaQueryListEvent) => (this.#systemDark = event.matches);
		query.addEventListener('change', onChange);

		const stopEffect = $effect.root(() => {
			$effect(() => {
				document.documentElement.dataset.theme = this.theme;
			});
		});

		return () => {
			query.removeEventListener('change', onChange);
			stopEffect();
		};
	}

	setPersona(persona: Persona) {
		this.persona = persona;
		write(PERSONA_KEY, persona);
	}

	/**
	 * Switches persona with a page turn styled after the persona being revealed: for Natalie the page
	 * turns on a side binding like a scrapbook, with a scalloped edge (see app.css), and her page
	 * settles with a small bounce; for Pring it flips up over a top binding like an engineering
	 * notepad. Instant without View Transitions or with reduced motion.
	 */
	async togglePersona() {
		const next = this.persona === 'pring' ? 'natalie' : 'pring';
		const apply = () => {
			this.setPersona(next);
			document.documentElement.dataset.theme = this.theme;
			flushSync();
			scrollTo({ top: 0, behavior: 'instant' });
		};

		if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			apply();
			return;
		}

		const root = document.documentElement;
		root.dataset.pageTurn = next;
		let edge: HTMLElement | undefined;
		if (next === 'natalie') {
			root.style.setProperty('--page-turn-scrollbar', `${innerWidth - root.clientWidth}px`);
			edge = document.createElement('div');
			edge.className = 'page-turn-edge';
			edge.setAttribute('aria-hidden', 'true');
			document.body.append(edge);
		}
		let playIntro = () => {};
		const transition = document.startViewTransition(() => {
			edge?.remove();
			apply();
			playIntro = this.#prepareIntro?.(next) ?? playIntro;
		});
		try {
			await transition.ready;
		} catch {
			playIntro();
			edge?.remove();
			delete root.dataset.pageTurn;
			root.style.removeProperty('--page-turn-scrollbar');
			return;
		}
		playIntro();

		// `fill` holds the last frame so the turned page can't snap back before the transition ends.
		const turn = pageTurns[next];
		const timing = { ...turn.timing, fill: 'both' } as const;
		const animations = [
			root.animate(turn.old, { ...timing, pseudoElement: '::view-transition-old(root)' }),
			root.animate(turn.new, { ...timing, pseudoElement: '::view-transition-new(root)' })
		];
		await transition.finished;
		for (const animation of animations) animation.cancel();
		delete root.dataset.pageTurn;
		root.style.removeProperty('--page-turn-scrollbar');
	}

	setMode(mode: ColorMode) {
		this.mode = mode;
		write(MODE_KEY, mode);
	}
}

export const themeState = new ThemeState();
