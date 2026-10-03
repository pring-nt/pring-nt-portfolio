/**
 * Lets each polaroid in `list` be tugged around with the mouse. Polaroids follow the pointer with
 * some drag and spring back to their slot on release. Skipped on touch screens and with reduced motion.
 */
export function draggablePolaroids(list: HTMLElement) {
	if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

	let cleanup: (() => void) | undefined;
	let cancelled = false;

	import('animejs').then(({ createDraggable }) => {
		if (cancelled) return;
		const reverts = [...list.querySelectorAll<HTMLElement>(':scope > li')].map((slot) => {
			const polaroid = slot.querySelector<HTMLElement>('a');
			if (!polaroid) return () => {};
			let dragged = false;

			const draggable = createDraggable(polaroid, {
				snap: [0],
				dragSpeed: 0.6,
				releaseStiffness: 260,
				releaseDamping: 12,
				cursor: { onHover: 'grab', onGrab: 'grabbing' },
				onGrab: () => {
					dragged = false;
					slot.style.zIndex = '10';
				},
				onDrag: () => (dragged = true),
				onRelease: () => setTimeout(() => (dragged = false)),
				onSettle: () => slot.style.removeProperty('z-index')
			});

			// A drag shouldn't also open the Instagram post.
			const blockClick = (event: MouseEvent) => {
				if (!dragged) return;
				event.preventDefault();
				event.stopImmediatePropagation();
			};
			polaroid.addEventListener('click', blockClick, true);

			return () => {
				polaroid.removeEventListener('click', blockClick, true);
				draggable.revert();
			};
		});
		cleanup = () => reverts.forEach((revert) => revert());
	});

	return () => {
		cancelled = true;
		cleanup?.();
	};
}
