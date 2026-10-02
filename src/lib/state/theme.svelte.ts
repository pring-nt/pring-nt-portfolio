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

	togglePersona() {
		this.setPersona(this.persona === 'pring' ? 'natalie' : 'pring');
	}

	setMode(mode: ColorMode) {
		this.mode = mode;
		write(MODE_KEY, mode);
	}
}

export const themeState = new ThemeState();
