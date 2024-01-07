function Links(){
	return <div className="flex flex-col-reverse gap-3 md:flex-row">
		<div className="flex gap-3">
			<a className="border border-neutral-800 p-2 rounded-xl hover:bg-neutral-500/20 " target="_blank" rel="noreferrer" href="https://github.com/typehero/typehero">
				<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 fill-white hover:fill-black"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
				</svg>
			</a>
			<a className="border border-neutral-800 p-2 rounded-xl hover:bg-neutral-500/20" target="_blank" rel="noreferrer" href="https://twitter.com/typeheroapp">
				<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 fill-white hover:fill-black"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
				</svg>
			</a>
		</div>
	</div>
}


export default function Navigation() {
    return (
        <nav className="absolute z-50 top-0 left-0 w-full h-fit py-4 px-6 text-right flex items-center justify-between 
			flex-row-reerse border-b border-neutral-800">
            <h1 className="text-xl font-black tracking-tighter cursor-copy">
                <span className="text-3xl">✦</span>&nbsp; Blazze&nbsp;<span className="text-xs text-blue-500"> / v1.1.4</span>
            </h1>
            <div className="flex items-center gap-4">
                <Links />
                <div className="font-mono text-sm rounded-xl hover:bg-neutral-500/20
				 border border-neutral-800 px-6 p-2 text-left cursor-copy z-30">
                    {">_"} <span className="text-white">npx</span> <span className="text-blue-500">blazze-init</span>
                </div>
            </div>
        </nav>
    )
}
