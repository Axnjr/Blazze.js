"use server"
import { BackgroundGrid } from './components/grid'
import { BeamOfLight } from './components/beam'
import './App.css'
import ImgCards from "./components/imgCards"
import Navigation from "./components/nav"
import Hero from './components/hero'
import Features from './components/features'

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
				<Features />
				<div style={{contain:"layout"}} className='w-full rounded-full h-full relative mt-32 py-24 text-center m-auto overflow-hidden'>
					<h1 className='text-5xl tracking-tighter font-black'>
						Start building with Blazze.js
					</h1>
					<div className='para max-w-xl m-auto my-12 font-medium text-md text-gray-400'>
						If you are familar with next.js its almost the same, the only diffrence is that instead of a route.ts/js file
						you have seprate files for each method ex: GET.ts for get requests and so on ..
					</div>
					<button className='bg-white text-black py-1 px-2'>Quick Docs</button>
					<svg className='m-auto w- absolute left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/' fill="none" height={640} viewBox="0 0 1744 640" width={1744} xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_f_521_2815)" opacity="0.25"><ellipse cx={872} cy={330} fill="#D6DBDC" rx={792} ry={230} /></g><g filter="url(#filter1_f_521_2815)" opacity="0.2"><ellipse cx={464} cy="411.5" fill="#6ADDF4" rx={256} ry="129.5" /></g><g filter="url(#filter2_f_521_2815)" opacity="0.2"><ellipse cx={592} cy="364.5" fill="#6AB2F4" rx={128} ry="176.5" /></g><g filter="url(#filter3_f_521_2815)" opacity="0.2"><ellipse cx={1162} cy="396.5" fill="#6ADDF4" rx={256} ry="129.5" /></g><g filter="url(#filter4_f_521_2815)" opacity="0.2"><ellipse cx={1162} cy="256.5" fill="#6AB2F4" rx={128} ry="176.5" /></g><defs><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height={620} id="filter0_f_521_2815" width={1744} x={0} y={20}><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_521_2815" stdDeviation={40} /></filter><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height={419} id="filter1_f_521_2815" width={672} x={128} y={202}><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_521_2815" stdDeviation={40} /></filter><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height={513} id="filter2_f_521_2815" width={416} x={384} y={108}><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_521_2815" stdDeviation={40} /></filter><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height={419} id="filter3_f_521_2815" width={672} x={826} y={187}><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_521_2815" stdDeviation={40} /></filter><filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height={513} id="filter4_f_521_2815" width={416} x={954} y={0}><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_521_2815" stdDeviation={40} /></filter></defs></svg>
				</div>
			</main>
		</>
	)
}