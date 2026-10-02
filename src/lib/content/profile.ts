import type { Persona } from '#lib/state/theme.svelte.ts';
import type { PersonaProfile } from './types.ts';

export const profile: Record<Persona, PersonaProfile> = {
	pring: {
		name: 'Pring',
		intro:
			'CS student at DLSU, majoring in Software Technology. I like frontend, and I build things when something bugs me.',
		switchHint: 'not feeling like Pring today?'
	},
	natalie: {
		name: 'Natalie',
		intro:
			"hiii i'm natalie!! cs student at dlsu, and i'm totes obsessed with pretty things, anime and drawing. also whenever something annoys me i just go make a thing about it, so... a lot of things lol",
		switchHint: "ok that's enough of me, pring's still around if you wanna go back"
	}
};
