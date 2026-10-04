import { animate, createDrawable, scrambleText, splitText, spring, stagger, utils } from 'animejs';
import type { Persona } from '#lib/state/theme.svelte.ts';

/**
 * Entrances that play while a persona switch reveals the page. Elements opt in with
 * `data-intro="<kind>"` inside one of the persona's `data-persona` wrappers; only ones on screen
 * animate.
 *
 * `prepare` runs inside the view transition's update so the new page is captured already hidden,
 * and returns `play`, called once the page turn starts.
 */
type Intro = (find: (kind: string) => HTMLElement[], previousName: string) => () => void;

const heartPath =
	'M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.2 5 6.6 5c2 0 3.6 1.1 5.4 3 1.8-1.9 3.4-3 5.4-3 3.4 0 5.4 3.6 4.1 6.8C19.5 16.4 12 21 12 21z';

/** Stop functions for in-flight name swaps, so a quick second switch can't leave a name half-swapped. */
const nameSwaps = new Map<HTMLElement, () => void>();

/**
 * Pring's header name scrambles from the previous persona's name into this one's, starting once the
 * page turn has uncovered the header. A timeout rather than `delay`, since scrambleText already
 * scrambles during its delay and the old name should hold still until then. The width glides from
 * the old name to the new one so the random glyph widths don't jitter whatever sits next to it.
 */
function swapName(find: (kind: string) => HTMLElement[], previousName: string, start: number) {
	const [name] = find('name');
	if (!name) return () => {};
	const text = name.dataset.name ?? '';
	name.textContent = previousName;

	const play = () => {
		const from = name.getBoundingClientRect().width;
		name.textContent = text;
		const to = name.getBoundingClientRect().width;
		name.textContent = previousName;
		name.style.whiteSpace = 'nowrap';

		const revealRate = 9;
		const settleDuration = 550;
		const duration = (Math.max(text.length, previousName.length) - 1) * (1000 / revealRate);
		const animation = animate(name, {
			width: { from, to, duration: duration + settleDuration, ease: 'inOutQuad' },
			innerHTML: scrambleText({ text, chars: 'a-z', revealRate, settleDuration }),
			onComplete: () => nameSwaps.get(name)?.()
		});
		nameSwaps.set(name, () => finish(animation));
	};
	const finish = (animation?: { cancel(): unknown }) => {
		clearTimeout(timeout);
		animation?.cancel();
		name.textContent = text;
		name.style.removeProperty('width');
		name.style.removeProperty('white-space');
		nameSwaps.delete(name);
	};
	let timeout: ReturnType<typeof setTimeout>;
	nameSwaps.set(name, () => finish());
	return () => (timeout = setTimeout(play, start));
}

/**
 * Natalie's header name hops in letter by letter, each letter flipping once on the way up and
 * bouncing back onto the line. The letters stay hidden until the page turn has uncovered the header.
 */
function hopName(find: (kind: string) => HTMLElement[], start: number) {
	const [name] = find('name');
	if (!name) return () => {};
	const split = splitText(name, { chars: true });
	utils.set(split.chars, { opacity: 0 });

	const play = () => {
		const animation = animate(split.chars, {
			opacity: { to: 1, duration: 120, ease: 'linear' },
			y: [
				{ to: '-0.6em', ease: 'outExpo', duration: 420 },
				{ to: 0, ease: 'outBounce', duration: 650, delay: 60 }
			],
			rotate: { from: '-1turn', duration: 560, ease: 'inOutCirc' },
			delay: stagger(50),
			onComplete: () => nameSwaps.get(name)?.()
		});
		nameSwaps.set(name, () => finish(animation));
	};
	const finish = (animation?: { cancel(): unknown }) => {
		clearTimeout(timeout);
		animation?.cancel();
		split.revert();
		nameSwaps.delete(name);
	};
	let timeout: ReturnType<typeof setTimeout>;
	nameSwaps.set(name, () => finish());
	return () => (timeout = setTimeout(play, start));
}

/** Throws a handful of small hearts out of `origin`, then removes them. */
function burst(origin: HTMLElement) {
	const box = origin.getBoundingClientRect();
	const hearts = Array.from({ length: 9 }, (_, i) => {
		const heart = document.createElement('span');
		heart.setAttribute('aria-hidden', 'true');
		heart.style.cssText = `position:fixed;z-index:50;pointer-events:none;left:${box.left + box.width / 2 - 6}px;top:${box.top + box.height / 2 - 6}px;width:12px;height:12px;color:var(${i % 3 ? '--accent' : '--pop'})`;
		heart.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="${heartPath}"/></svg>`;
		document.body.append(heart);
		return heart;
	});
	hearts.forEach((heart, i) => {
		const angle = (i / hearts.length) * Math.PI * 2 + utils.random(-0.3, 0.3, 2);
		const distance = utils.random(22, 46);
		animate(heart, {
			x: Math.cos(angle) * distance,
			y: Math.sin(angle) * distance - 6,
			rotate: utils.random(-35, 35),
			scale: [
				{ from: 0, to: utils.random(0.8, 1.2, 2), duration: 260, ease: 'outBack(2)' },
				{ to: 0.4, duration: 520, ease: 'inQuad' }
			],
			opacity: { from: 1, to: 0, delay: 380, duration: 400 },
			duration: 780,
			ease: 'outCirc',
			onComplete: () => heart.remove()
		});
	});
}

/** Drops the inline styles an intro left behind so hover effects and tilts apply normally again. */
const release = (targets: HTMLElement[]) => () => {
	for (const el of targets) {
		el.style.removeProperty('opacity');
		el.style.removeProperty('transform');
	}
};

const intros: Record<Persona, Intro> = {
	natalie(find) {
		const playName = hopName(find, 700);
		const [burstFrom] = find('burst');
		const cards = find('card');
		const tapes = find('tape');
		const hearts = find('heart');
		utils.set(cards, { opacity: 0, y: -18, scale: 0.92 });
		utils.set(tapes, { opacity: 0, scaleX: 0.3 });
		utils.set(hearts, { scale: 0 });

		return () => {
			playName();
			if (burstFrom) setTimeout(() => burst(burstFrom), 780);
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

	pring(find, previousName) {
		const playName = swapName(find, previousName, 550);
		const labels = find('decode');
		const rows = find('row');
		const checks = find('check').flatMap((icon) =>
			createDrawable(icon.querySelectorAll('path, circle'))
		);
		utils.set(rows, { opacity: 0, x: -8 });
		utils.set(checks, { draw: '0 0' });

		// Natalie's page flips up from the bottom, so the labels near the top are uncovered last.
		return () => {
			playName();
			animate(labels, {
				innerHTML: scrambleText({ chars: 'a-z0-9_#:', revealRate: 20, settleDuration: 450 }),
				delay: stagger(70, { start: 450 })
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

const inPersona = (persona: Persona, kind: string) => [
	...document.querySelectorAll<HTMLElement>(`[data-persona="${persona}"] [data-intro="${kind}"]`)
];

export function prepareIntro(persona: Persona) {
	for (const stop of [...nameSwaps.values()]) stop();
	const find = (kind: string) =>
		inPersona(persona, kind).filter((el) => el.getBoundingClientRect().top < innerHeight);
	const [previous] = inPersona(persona === 'pring' ? 'natalie' : 'pring', 'name');
	return intros[persona](find, previous?.dataset.name ?? '');
}
