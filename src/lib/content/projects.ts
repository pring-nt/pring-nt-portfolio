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
			"ok so nockr exists bc every gpa calculator i tried was soooo annoying?? like why can't i just plan my next term, it's totes not that hard. so i made one!!"
	},
	{
		slug: 'enroll_clicker',
		name: 'enroll_clicker',
		summary: 'Tired of sniping GE slots?',
		role: 'built',
		repo: 'https://github.com/pring-nt/enroll_clicker',
		tags: ['python'],
		issue: { number: 7, title: 'sniping GE slots by hand', body: 'Had a clanker do the clicking.' },
		natalie:
			'sniping GE slots by hand is sooo stressful omg. so i made a lil script to do the clicking for me. totes worth it'
	},
	{
		slug: 'fb-graphql-interceptor',
		name: 'fb-graphql-interceptor',
		summary:
			'Gets exact reaction, comment and share counts from Facebook posts and Reels by reading the GraphQL responses instead of the rounded numbers on the page.',
		role: 'built',
		repo: 'https://github.com/pring-nt/fb-graphql-interceptor',
		tags: ['python', 'playwright', 'asyncio'],
		issue: {
			number: 5,
			title: 'facebook rounds off the numbers I need',
			body: 'The exact counts exist, just not on the page. Pulled them from the GraphQL responses instead.'
		},
		natalie:
			'facebook rounds off all the numbers and i wanted the exact ones, so i went and grabbed them from behind the scenes. totes sneaky (¬‿¬)'
	},
	{
		slug: 'slottle',
		name: 'Slottle',
		summary:
			'Browser extension that builds conflict-free DLSU schedules. I did QA: testing against acceptance criteria and tracking issues. Reached 1,000+ downloads on Chrome and Firefox.',
		role: 'qa',
		site: 'https://slottle-co.vercel.app/',
		tags: ['react', 'typescript', 'webextensions'],
		issue: {
			number: 1,
			title: 'the uni website is terrible and the old schedule generator got deprecated',
			body: 'Reproduced bugs, filed issues, checked fixes. 1,000+ downloads across Chrome and Firefox.'
		},
		natalie:
			"ok so our uni's website is reeeally bad, and the old schedule maker we all used got shut down?? so the team made slottle! i didn't build it tho, i'm the one who tried to break it (QA) so it's totes conflict-free. 1,000+ downloads!!"
	}
];

export const visibleProjects = projects.filter((project) => !project.hidden);
