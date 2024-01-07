"use server"
import { BackgroundGrid } from './components/grid'
import { BeamOfLight } from './components/beam'
import DogeSmile from "/doge.webp"
import './App.css'
import ImgCards from "./components/imgCards"
import Navigation from "./components/nav"
import Hero from './components/hero'
import { FeatureCard } from './components/cards'

const features = [
	{ name: "Routing", description: "Keep the logic separated without any setup. Routes are based on the directory structure." },
	{ name: "Easy Setup", description: "Hit `npx blazze-init` to start building your projects." },
	{ name: "TypeScript", description: "No configurations and environment setup, just get started directly" },
	{ name: "Build Optimization", description: "Makes a single optimized bundle for your app"},
	{ name: "No Boiler Plate Code", description: "Install init and start nothing else :)" },
	{ name: "Powered by SWC", description: "Super speed transpilation via the power of Rust." },
	{ name: "Fast & Robust", description: "Built on top of express, for better developer experience." }
]

export default function App() {
	return (
		<>
			<main className="w-full m-auto h-fit p-8 overflow-hidden">
				<BeamOfLight />
				<Navigation />
				<div className="absolute inset-0 overflow-hidden opacity-50 -z-30">
					<BackgroundGrid />
				</div>
				<div className="grid m-auto grid-rows-1 lg:grid-cols-2 w-full h-full lg:h-screen items-center justify-center mt-24 lg:mt-8 px-8">
					<Hero />
					<ImgCards />
				</div>
				<section className='relative w-full h-full mt-20'>
					<div className="mx-auto  mb-[64px] grid max-w-[1400px] items-center justify-center px-4 sm:px-24 md:px-4 lg:px-24">
						<div className="flex flex-col  items-center justify-center gap-16">
							<div className="mt-1 flex flex-col gap-3 px-4 text-center sm:px-0">
								<a className="mx-auto hidden rounded-full bg-gradient-to-r from-[#ffffff] to-blue-500 p-[1px] brightness-90 contrast-150 focus:outline-none focus:ring-blue-600 focus-visible:ring-2 dark:brightness-125 dark:contrast-100 sm:block" href="#features">
									<div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80">
										<span className="select-none bg-gradient-to-r from-[#31bdc6] to-[#3178c6] bg-clip-text text-transparent">
											<svg
												className="mr-1 inline-block h-4 w-4 fill-[#31bdc6]"
												viewBox="4 4 48 48"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="m19.2 36.4-4.75-10.45L4 21.2l10.45-4.75L19.2 6l4.75 10.45L34.4 21.2l-10.45 4.75ZM36.4 42l-2.35-5.25-5.25-2.35 5.25-2.4 2.35-5.2 2.4 5.2 5.2 2.4-5.2 2.35Z" />
											</svg>
											Many features, Wow
											<img
												className="absolute -bottom-1 right-1 translate-y-7 duration-300 group-hover:translate-y-0"
												alt="doge smile"
												height="28"
												width="28"
												src={DogeSmile}
											/>
										</span>
									</div>
								</a>

								<h1 className='text-5xl m-4 tracking-tighter font-black'>
									What's in Blazze ?
								</h1>
								<p className='text-neutral-400/90 text-md'>All you need to write API's with ease & peace 😌</p>

								<br />

								<div className='relative z-10 grid w-full gap-4 md:grid-cols-2 lg:gap-8'>
								{
									features.map((f, id) => {
										return <FeatureCard key={id} className='w-[100%] h-fit hover:shadow-2xl shadow-blue-500'>
											<div className='w-full h-44 p-8 rounded-xl bg-neutral-500/10 hover:bg-neutral-500/20 flex 
											flex-col items-start justify-center text-left gap-2 '>
												<h1 className=' tracking-tighter font-black text-3xl m-4'>{f.name}</h1>
												<p className='px-4 text-sm'>{f.description}</p>
											</div>
										</FeatureCard>
									})
								}
								</div>

							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

/**
 * {
									features.map((f,id) => {
										return <FeatureCard key={id}>
										<div className='w-full h-24 rounded-xl bg-neutral-500/10 hover:bg-neutral-500/20 flex items-center justify-center'>
											<h1 className='heading text-3xl'>{f}</h1>
										</div>
									</FeatureCard>
									})
								}
 */