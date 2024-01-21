import Modes from './modes'

function Links() {
	return <div className="flex flex-col-reverse gap-3 md:flex-row">
		<div className="flex gap-2 md:gap-4 items-center">
			<a className="p-2 rounded-xl px-3 dark:hover:bg-neutral-800 flex items-center
			dark:bg-neutral-900 group bg-neutral-100 hover:bg-neutral-200" target="_blank" rel="noreferrer" href="https://github.com/Axnjr/Blazze.js">
				<svg className="h-4 w-4 sm:mr-2 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
				</svg>
				<span className="font-medium text-[0.89rem] hidden sm:block">Github</span>
			</a>
			<a className="p-2 rounded-xl px-3 dark:hover:bg-neutral-800 flex items-center
			dark:bg-neutral-900 group bg-neutral-100 hover:bg-neutral-200" target="_blank" rel="noreferrer" href="https://twitter.com/axnjrno1">
				<svg className="h-4 w-4 sm:mr-2 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
				</svg>
				<span className="font-medium text-[0.89rem] hidden sm:block">TwitterX</span>
			</a>
			<Modes />
		</div>
	</div>
}


export default function Navigation() {
	return (
		<nav className="absolute z-50 top-0 left-0 w-full h-fit py-4 px-6 text-right flex items-center justify-between ">
			<div className="text-2xl font-bold tracking-tighter cursor-copy flex items-center">
				<svg className='w-9 rotate-12 mt-2 -mr-1 h-9 dark:fill-white fill-black' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 125" enableBackground="new 0 0 100 100" xmlSpace="preserve">
					<polygon points="65.242836,5.1528473 15.5359373,55.9843407 50.8480797,51.2610588 26.5569248,94.6702576 83.23629,36.6413841   49.7234917,36.6413841 " />
				</svg>
				<h1>
					&nbsp;Blazze
					<span className="para text-[0.7rem]">. JS</span>
				</h1>
				{/* <span className="text-2xl ">🏎️</span> */}
			</div>
			<div className="flex items-center gap-4">
				<Links />
			</div>
		</nav>
	)
}
