import type { Education, Experience, SkillGroup } from './types.ts';

export const resume = {
	name: 'Nathan Trinidad',
	tagline: 'Software Engineering undergraduate · Manila, Philippines'
};

export const education: Education = {
	school: 'De La Salle University — Manila',
	degree: 'B.S. Computer Science, Major in Software Technology',
	expected: '2028',
	notes: ['CGPA 3.84 / 4.00', "1st Honor Dean's Lister"]
};

export const experience: Experience[] = [
	{
		name: 'Slottle',
		role: 'QA / Engineering Contributor',
		kind: 'work',
		stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Bun', 'WebExtensions API'],
		href: 'https://animo.li/slottle',
		highlights: [
			'Acceptance-criteria-driven QA for a DLSU browser extension that retrieves course offerings and generates conflict-free schedules on Chrome and Firefox.',
			'Reproduced, documented and tracked feature, bug and UI/UX issues through a GitHub workflow, validating fixes against acceptance criteria. The extension reached 1,000+ downloads across both web stores.'
		]
	},
	{
		name: 'BoomBox Gym',
		role: 'Frontend QA / Architecture',
		kind: 'work',
		context: 'Client-facing web application',
		stack: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'TanStack Table'],
		highlights: [
			'Frontend QA for a gym management app covering member, coach and admin workflows. Created reusable GitHub issue templates and suggested development workflows.',
			'Refactored the frontend from an unstructured codebase into a Feature-Sliced Design architecture for clearer separation of concerns and easier maintenance.'
		]
	},
	{
		name: 'NATS — Notes-to-Action Task Synthesizer',
		role: 'Frontend / Architecture / UI/UX / QA',
		kind: 'hackathon',
		period: 'May 2026',
		context: 'LABLABAI Hackathon',
		stack: ['React', 'TypeScript'],
		highlights: [
			'Built and shaped the frontend of an AI app that turns meeting notes and transcripts into structured engineering tasks and repository-ready GitHub issues.',
			'Proposed the GitHub issue-generation workflow, shaped app flow and component design, added persisted client-side state, and refined a responsive dark-mode-first UI during a two-day sprint.'
		]
	},
	{
		name: 'Wi-Fi Evolution',
		role: 'Primary designer and developer',
		kind: 'course',
		context: 'DLSU course project',
		stack: ['React', 'MDX', 'Astro'],
		href: 'https://pring-nt.github.io/virtual-exhibit-wifi-evolution/',
		highlights: [
			"Created the project's React components and wrote the Wi-Fi Evolution MDX page for an interactive educational exhibit."
		]
	},
	{
		name: 'Peer Tutor Society (PTS)',
		role: 'Peer Tutor',
		kind: 'organization',
		period: 'Jul 2026 – present',
		highlights: ['Tutor CS-related mathematics courses and give peer-led academic support.']
	},
	{
		name: 'CATCH 2T28',
		role: 'Executive for Finance',
		kind: 'organization',
		period: 'Feb 2025 – Sep 2025',
		highlights: []
	}
];

export const skills: SkillGroup[] = [
	{ label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'Java', 'Rust'] },
	{ label: 'Frontend', items: ['React', 'SvelteKit', 'Vue.js', 'HTML/CSS', 'Tailwind CSS'] },
	{ label: 'Tools', items: ['Git', 'GitHub', 'Vite', 'Bun', 'Playwright', 'MySQL', 'Zod'] }
];

export const cvHref = '/nathan_trinidad_cv.pdf';
