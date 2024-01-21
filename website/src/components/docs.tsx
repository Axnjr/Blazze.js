import Create from "./docs/create";
import Structure from "./docs/structure";
import Conventions from "./docs/conventions";
import StartBuilding from "./docs/start";

export default function Docs() {
    return (
        <div className='w-full h-fit relative mt-28 pt-20 text-center m-auto overflow-hidden flex 
            flex-col justify-center items-center '>
            <div className='w-fit h-fit p-4 bg-black dark:bg-white rounded-full my-6'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} className="w-16 h-16 dark:stroke-black stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
            </div>

            <h1 className='text-4xl sm:text-5xl md:text-5xl tracking-tighter font-[700] px-12 leading-9'>
                Start Building with Blazze.js
            </h1>

            <div className='px-8 md:px-0 max-w-xl m-auto mt-12 mb-10 text-md  text-neutral-500'>
                Not a new framework for you to learn, Zero learning curve, built to enhance developer experience.
                Get started by checking out few foundational rules of blazze.
            </div>

            <section className="w-full h-fit pb-40 flex-col flex gap-16 mt-16 ">
                <Create />
                <Structure />
                <Conventions />
                <StartBuilding />
            </section>

            <div className="w-screen h-fit grid place-items-center gap-12 my-6 ">
                <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tighter font-[700] px-4">
                    By developer, for developer's
                </h1>

                <div className="px-8 md:px-0 max-w-xl m-auto text-md  text-neutral-500">
                    Blazze is an opensource project to make API dev a breeze, become a part of the
                    hottest JS community 🔥 wheather you are a begginar like me 😅 or a JS chad 😎,
                    and help me start my first opensource project.
                </div>

                <div className="flex items-center justify-center gap-5 z-50 ">
                    <button className="py-2 px-4 dark:bg-white bg-black text-white dark:text-black text-xs sm:text-sm md:text-base rounded-xl hover:bg-black/90 dark:hover:bg-white/90">
                        Contribute to Blazze
                    </button>
                    {/* <button className="px-4 py-2 rounded-xl flex items-center dark:hover:bg-neutral-900 z-50 text-xs sm:text-sm md:text-base 
			        bg-white dark:bg-neutral-950 dark:border-neutral-900 border-neutral-100 border-2 group hover:bg-neutral-100 ">
                        Improve this page 💥
                    </button> */}
                    <button className="px-4 py-2 rounded-xl flex items-center dark:hover:bg-neutral-900 z-50 text-xs sm:text-sm md:text-base 
			        bg-white dark:bg-neutral-950 dark:border-neutral-900 border-neutral-100 border-2 group hover:bg-neutral-100 ">
                        Sponsor Blazze ❤️
                    </button>
                </div>

            </div>

        </div>
    )
}