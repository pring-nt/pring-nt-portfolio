import type { Picture } from '@sveltejs/enhanced-img';

export type Project = {
	slug: string;
	name: string;
	/** One plain line, shared by both personas. */
	summary: string;
	/** `qa` projects are credited as "QA'd by me", never as built by me. */
	role: 'built' | 'qa';
	repo?: string;
	site?: string;
	tags: string[];
	/**
	 * Pring frames projects as closed issues against the world. The "closed by" line is derived from
	 * `role`: `built` → closed by `slug`, `qa` → closed by the team · QA'd by me.
	 */
	issue?: { number: number; title: string; body?: string };
	/** Natalie's version, in her own voice. Falls back to `summary`. */
	natalie?: string;
	hidden?: boolean;
};

export type Link = {
	label: string;
	href: string;
	handle: string;
	kind: 'email' | 'github' | 'linkedin' | 'instagram' | 'instagram-art';
};

export type CurrentlyItem = { label: string; value: string };

export type Like = {
	title: string;
	kind: 'anime' | 'manga' | 'game' | 'other';
	/** Natalie's gush about it. */
	natalie?: string;
};

export type PersonaProfile = {
	name: string;
	intro: string;
	/** Footer line that leads to the other persona. */
	switchHint: string;
};

export type Artwork = {
	image: Picture;
	alt: string;
	/** Instagram post URL. */
	href: string;
	/** ISO date, e.g. `2026-04-12`. */
	date?: string;
};

export type Experience = {
	name: string;
	role: string;
	kind: 'work' | 'hackathon' | 'course' | 'organization';
	/** Free text as it should read, e.g. `May 2026` or `Jul 2026 – present`. */
	period?: string;
	context?: string;
	stack?: string[];
	highlights: string[];
	href?: string;
};

export type Education = {
	school: string;
	degree: string;
	expected: string;
	notes: string[];
};

export type SkillGroup = { label: string; items: string[] };
