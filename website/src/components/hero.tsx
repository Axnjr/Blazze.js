import { Balancer } from "react-wrap-balancer"

export default function Hero() {
    return (
        <div className="w-full lg:w-3/2 h-full flex flex-col gap-10 items-center lg:items-start justify-center">
            <a target="_blank" rel="noreferrer" href="https://github.com/typehero/typehero" className="group rounded-full bg-gradient-to-r from-white to-blue-500 bg-[length:420%_420%] bg-right-bottom p-[1px] brightness-90 contrast-150 duration-500 hover:bg-left-top hover:shadow-[0_0_2rem_-0.5rem_#3178c6] dark:from-yellow-500 dark:via-white dark:to-[#5971fb] dark:brightness-125 dark:contrast-100 dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]">
                <div className="rounded-full bg-white/80 px-3 py-1 dark:bg-black/80">
                    <span className="animate-bg-gradient-to-center font-black relative flex select-none items-center bg-gradient-to-r to-70% bg-[length:420%_420%] bg-clip-text bg-right-bottom text-transparent duration-500 group-hover:bg-left-top from-yellow-500 via-white to-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width={2} height={2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                            className="animate-newstar mr-2 h-4 w-4 stroke-2 duration-500 group-hover:rotate-180 group-hover:scale-110 stroke-blue-500 dark:duration-500 group-hover:stroke-white group-hover:fill-white"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
                        </svg>
                        Star it on GitHub
                    </span>
                </div>
            </a>
            <div className="relative flex w-full items-center justify-center gap-2 lg:justify-start">
                <h1 className="heading text-8xl lg:text-7xl text-center lg:text-left font-black tracking-tight
                capitalize bg-gradient-to-br from-white to-blue-500 bg-clip-text text-transparent">
                    The express<br />
                    framework<br />
                    for the web.
                </h1>
            </div>
            <p className="max-w-3/2 w-10/12 text-center font-medium leading-0 mb-4 text-lg lg:text-md sm:px-8 lg:px-0 lg:text-left
            text-neutral-500">
                <Balancer>
                    A light-weight express framework to write typesafe API's with zero configuration, no boiler-plate blazingly fast.
                </Balancer>
            </p>
        </div>
    )
}
