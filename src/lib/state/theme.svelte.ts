import { flushSync } from 'svelte';

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

/**
 * Starts at the defaults so hydration matches the prerendered HTML. `start()` then loads the saved
 * choice, which the inline script in app.html has already applied to `data-theme`.
 */
class ThemeState {
	persona = $state<Persona>('pring');
	mode = $state<ColorMode>('system');
	#systemDark = $state(false);

	dark = $derived(this.mode === 'dark' || (this.mode === 'system' && this.#systemDark));
	theme: Theme = $derived(`${this.persona}-${this.dark ? 'dark' : 'light'}` as const);

	/** Keeps `data-theme` on <html> in sync and tracks system changes. Call once from the root layout. */
	start() {
		const query = matchMedia('(prefers-color-scheme: dark)');
		this.persona = read(PERSONA_KEY, personas, 'pring');
		this.mode = read(MODE_KEY, modes, 'system');
		this.#systemDark = query.matches;

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
	 * Switches persona with a circular reveal growing from `from` (usually the clicked element).
	 * Falls back to an instant switch without View Transitions or with reduced motion.
	 */
	async togglePersona(from?: Element) {
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

		const rect = from?.getBoundingClientRect();
		const x = rect ? rect.left + rect.width / 2 : innerWidth / 2;
		const y = rect ? rect.top + rect.height / 2 : 0;
		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

		const transition = document.startViewTransition(apply);
		try {
			await transition.ready;
		} catch {
			return;
		}
		document.documentElement.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
			{
				duration: 600,
				easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
				pseudoElement: '::view-transition-new(root)'
			}
		);
	}

	setMode(mode: ColorMode) {
		this.mode = mode;
		write(MODE_KEY, mode);
	}
}

export const themeState = new ThemeState();
