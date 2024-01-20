import { FeatureCard } from './cards'

const features = [
    { name: "Routing", description: "Keep the logic separated without any setup. Routes are based on the directory structure." },
    { name: "Powered by SWC", description: "Super speed transpilation via the power of Rust." },
    { name: "Request Caching", description: "Blazze handles caching automatically to optimize large computations." },
    { name: "TypeScript", description: "No configurations and environment setup, just get started directly" },
    { name: "Fast & Robust", description: "Built on top of express, for better developer experience." },
    { name: "Build Optimization", description: "Makes a single optimized bundle for your app" },
    { name: "Easy Setup", description: "Hit `npx blazze-init` to start building your projects." },
    { name: "No Boiler Plate Code", description: "Install init and start, Nothing else 🚀" },
]


export default function Features() {
    return (
        <section className='relative w-full h-full mt-28'>
            <div className="mx-auto  mb-[64px] grid max-w-[1400px] items-center justify-center px-4 sm:px-24 md:px-4 lg:px-24">
                <div className="flex flex-col  items-center justify-center gap-16">
                    <div className="mt-1 flex flex-col gap-3 px-4 text-center sm:px-0">

                        {/* <a className="mx-auto mt-12 mb-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl p-2 shadow-[0_0_2rem_-0.1rem_#fffb]" href="#features">
                            <div className="group relative overflow-hidden rounded-xl px-3 py-1 duration-300 hover:pr-9 ">
                                <span className="font-semibold text-md group-hover:font-bold">
                                    <svg
                                        className="mr-1 inline-block h-5 w-5 fill-white dark:fill-[#000000]"
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
                        </a> */}

                        <h1 id='features' className='text-3xl sm:text-5xl lg:text-6xl leading-8 my-10 tracking-tighter font-[700]'>
                            What's in Blazze ?
                        </h1>
                        <div className='text-neutral-600 font-medium text-md'>All you need to write API's with ease & peace 😌</div>

                        <br />

                        <div className='relative z-10 grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2 lg:gap-8'>
                            {
                                features.map((f, id) => {
                                    return <FeatureCard key={id} className='w-[100%] h-fit hover:shadow-2xl shadow-blue-500'>
                                        <div className='group w-full h-52 md:h-44 md:p-8 rounded-xl flex 
											flex-col items-start justify-center text-left gap-2'>
                                            <h1 className='tracking-tighter font-[700] group-hover:font-black text-xl sm:text-2xl lg:text-3xl m-4 flex items-center bg-gradient-to-r
                                            from-blue-500 to-fuchsia-500 bg-clip-text group-hover:text-transparent gap-1'>
                                                <span className='rounded-full w-10 text-base mx-2 h-10 flex items-center justify-center p-2
                                                bg-black text-white dark:bg-white dark:text-black '>
                                                    {id + 1}
                                                </span>
                                                {f.name}
                                            </h1>
                                            <div className='px-4 text-sm'>{f.description}</div>
                                        </div>
                                    </FeatureCard>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
