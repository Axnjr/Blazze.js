// import { Balancer } from "react-wrap-balancer"

export default function Hero() {
    return (
        <div className="w-full h-fit flex flex-col gap-4 items-center justify-start py-20 md:py-24 ">
            <div className="bg-neutral-100 dark:bg-neutral-900 py-1 px-2 rounded-lg text-xs sm:text-sm md:text-base font-medium">
                🎉 Introducing yet another js framework, Blazze.js
            </div>
            <div className="relative flex w-fit mx-auto text-center ">
                <h1 className="text-4xl sm:text-6xl lg:text-6xl text-center tracking-tighter font-[700]
                px-12 py-2 rounded-2xl lg:[word-spacing:-1.5px] text-black dark:text-white">
                    Build your web apps with ease
                </h1>
            </div>
            <div className="max-w-2/3 w-8/12 text-center font-medium text-sm md:text-lg tracking-tight leading-0 my-2 text-zinc-500 ">
                Blazze.js enables you to write Typesafe API's for the web with ease and powerfull Rust-based JavaScript
                tooling for the fastest builds. It makes you complete your projects blazzingly fast.
            </div>

            <div className="flex items-center justify-center gap-5 z-50">
                <button className="py-2 px-4 dark:bg-white bg-black text-white dark:text-black text-xs sm:text-sm md:text-base rounded-xl hover:bg-black/90 dark:hover:bg-white/90">
                    Star on Github🎉
                </button>
                <button className="px-4 py-2 rounded-xl flex items-center dark:hover:bg-neutral-900 z-50 text-xs sm:text-sm md:text-base 
			    bg-white dark:bg-neutral-950 dark:border-neutral-900 border-neutral-100 border-2 group hover:bg-neutral-100 ">
                    Get Started 🚀
                </button>
            </div>

            {/* <div className="w-full h-1 shadow-[0_0_8rem_1rem_#3b82f6] bg-transparent"></div> */}
            

        </div>
    )
}


{/* <div className="rounded-2xl h-96 lg:w-full md:h-[34rem] mt-4 shadow-[0_0_8rem_.5rem_#669eff] lg:shadow-none">
    <section className="flex flex-col lg:flex-row items-center justify-center gap-2 w-11/12 h-full m-auto">
        <img className="w-1/2 h-full hidden lg:block lg:scale-[1.005] lg:shadow-[0_0_8rem_.5rem_#669eff] rounded-2xl" src="./dir.svg" alt="" />
        <img className="w-full z-10 bg-cover lg:w-1/2 h-full lg:shadow-[0_0_8rem_.5rem_#669eff] rounded-2xl" src="./img.svg" alt="" />
    </section>
</div> */}
