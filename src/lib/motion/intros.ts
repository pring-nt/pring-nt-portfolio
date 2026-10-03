import { animate, createDrawable, scrambleText, spring, stagger, utils } from 'animejs';
import type { Persona } from '#lib/state/theme.svelte.ts';

/**
 * Entrances that play while a persona switch reveals the page. Elements opt in with
 * `data-intro="<kind>"` inside the persona's `data-persona` wrapper; only ones on screen animate.
 *
 * `prepare` runs inside the view transition's update so the new page is captured already hidden,
 * and returns `play`, called once the page turn starts.
 */
type Intro = (find: (kind: string) => HTMLElement[]) => () => void;

/** Drops the inline styles an intro left behind so hover effects and tilts apply normally again. */
const release = (targets: HTMLElement[]) => () => {
	for (const el of targets) {
		el.style.removeProperty('opacity');
		el.style.removeProperty('transform');
	}
};

const intros: Record<Persona, Intro> = {
	natalie(find) {
		const cards = find('card');
		const tapes = find('tape');
		const hearts = find('heart');
		utils.set(cards, { opacity: 0, y: -18, scale: 0.92 });
		utils.set(tapes, { opacity: 0, scaleX: 0.3 });
		utils.set(hearts, { scale: 0 });

		return () => {
			animate(cards, {
				opacity: { to: 1, duration: 200, ease: 'outQuad' },
				y: 0,
				scale: 1,
				ease: spring({ bounce: 0.45, duration: 450 }),
				delay: stagger(70, { start: 380 }),
				onComplete: release(cards)
			});
			animate(tapes, {
				opacity: { to: 1, duration: 120 },
				scaleX: 1,
				ease: 'outBack(3)',
				duration: 260,
				delay: stagger(70, { start: 620 }),
				onComplete: release(tapes)
			});
			animate(hearts, {
				scale: [0, 1.35, 1],
				ease: 'outQuad',
				duration: 420,
				delay: stagger(90, { start: 500 }),
				onComplete: release(hearts)
			});
		};
	},

	pring(find) {
		const labels = find('decode');
		const rows = find('row');
		const checks = find('check').flatMap((icon) =>
			createDrawable(icon.querySelectorAll('path, circle'))
		);
		utils.set(rows, { opacity: 0, x: -8 });
		utils.set(checks, { draw: '0 0' });

		return () => {
			animate(labels, {
				innerHTML: scrambleText({ chars: 'a-z0-9_#:', settleDuration: 220 }),
				delay: stagger(60, { start: 150 })
			});
			animate(rows, {
				opacity: 1,
				x: 0,
				ease: 'outQuart',
				duration: 320,
				delay: stagger(80, { start: 250 }),
				onComplete: release(rows)
			});
			animate(checks, {
				draw: '0 1',
				ease: 'inOutQuad',
				duration: 380,
				delay: stagger(80, { start: 400 })
			});
		};
	}
};

export function prepareIntro(persona: Persona) {
	const scope = document.querySelector(`[data-persona="${persona}"]`);
	if (!scope) return () => {};
	const find = (kind: string) =>
		[...scope.querySelectorAll<HTMLElement>(`[data-intro="${kind}"]`)].filter(
			(el) => el.getBoundingClientRect().top < innerHeight
		);
	return intros[persona](find);
}
