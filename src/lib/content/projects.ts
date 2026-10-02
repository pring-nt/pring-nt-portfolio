import type { Project } from './types.ts';

export const projects: Project[] = [
	{
		slug: 'nockr',
		name: 'Nockr',
		summary: "GPA/GWA/honors tracker. I got tired of other people's GPA calculators.",
		role: 'built',
		repo: 'https://github.com/pring-nt/nockr',
		site: 'https://nockr.nockr-app.workers.dev/',
		tags: ['sveltekit', 'typescript', 'tailwind', 'zod'],
		issue: {
			number: 3,
			title: 'every GPA calculator is annoying',
			body: "Couldn't plan future terms, didn't know DLSU's grading. Made my own."
		},
		natalie:
			"ok so nockr exists because every gpa calculator i tried was SO annoying?? like why can't i just plan my next term. so i made one."
	},
	{
		slug: 'enroll_clicker',
		name: 'enroll_clicker',
		summary: 'Tired of sniping GE slots?',
		role: 'built',
		repo: 'https://github.com/pring-nt/enroll_clicker',
		tags: ['python'],
		issue: { number: 7, title: 'sniping GE slots by hand' }
	},
	{
		slug: 'fb-graphql-interceptor',
		name: 'fb-graphql-interceptor',
		summary:
			"Gets exact reaction, comment and share counts from Facebook posts and Reels. The page only shows rounded numbers, so I read the GraphQL responses instead. The normal way didn't work, so I went around it.",
		role: 'built',
		repo: 'https://github.com/pring-nt/fb-graphql-interceptor',
		tags: ['python', 'playwright', 'asyncio']
	},
	{
		slug: 'slottle',
		name: 'Slottle',
		summary:
			'Browser extension that builds conflict-free DLSU schedules. I did QA: testing against acceptance criteria and tracking issues. Reached 1,000+ downloads on Chrome and Firefox.',
		role: 'qa',
		site: 'https://animo.li/slottle',
		tags: ['react', 'typescript', 'webextensions']
	}
];

export const visibleProjects = projects.filter((project) => !project.hidden);
