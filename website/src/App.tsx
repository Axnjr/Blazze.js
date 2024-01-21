// "use server"
import './App.css'
import Navigation from "./components/nav"
import Hero from './components/hero'
import Features from './components/features'
import Docs from './components/docs'
import Modes from './components/modes';

export default function App() {
	return (
		<>
			<main className="w-full m-auto h-fit  overflow-hidden bg-white bg-left-bottom
			dark:bg-black text-black dark:text-white">
				<Navigation />
				<div className='hero m-auto w-full h-screen flex flex-col items-center justify-center text-center'>
					<Hero />
				</div>
				<Features />
				<Docs />
				<div className='py-20 md:py-12 mt-12 text-left w-full text-sm sm:text-base h-12 border-t 
				flex flex-col gap-6 md:flex-row items-start md:items-center justify-center md:justify-between
				md:px-12 px-6 dark:border-neutral-800'>
					<span>Built with devotion by <a className="underline" href="https://twitter.com/axnjrno1"> Axn</a>. Source code on <a className="underline" href="https://github.com/Axnjr/Blazze-Home">Github</a>.</span>
					<div className='flex items-center gap-2'>
						<Modes/>
						<svg className="h-8 w-8 fill-black dark:fill-white bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
						<svg className="h-8 w-8 fill-black dark:fill-white bg-neutral-200 dark:bg-neutral-800 p-2 rounded-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
					</div>
				</div>
			</main>
		</>
	)
}

/**
 * 
 * 1 - Install blazze
 * 2 - blazze-init
 * 3 - Create your API routes in the root-endpoint directory
 * 4 - Each route can have 5 http method files viz: GET, POST, PUT, PATCH, DELETE
 * 5 - Each files handles specific API request methods
 * 6 - You need to export a default normal function from each file
 * 7 - These functions get Express Request and Response objects as parameters
 * 8 - ex: ....
 * 9 - For nested routes use "@" symbol ex: new/subs/ppl will be -> new@subs@ppl which will have its respective logic
 * 10 - This is to avoid deep recursive file watching and being more performent for the system
 * 11 - Dynamic routes start with a underscore "_" ex: api/v1/_users 
 * 12 - That's it you are ready to blazze ...
 * 
 */