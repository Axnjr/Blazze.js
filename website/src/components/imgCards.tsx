export default function ImgCards() {
    return (
        <div className="relative w-full h-96 grid grid-rows-10 bg-red-500">
            <div className="flex w-[320px] h-full flex-col gap-3 rounded-2xl border duration-300 bg-center
                hover:-skew-x-3 hover:scale-105 hover:shadow-[2rem_2rem_2rem_-1rem_#0004,inset_1rem_1rem_4rem_-1rem_#fff1]
                border-zinc-800 bg-zinc-900 drop-shadow-[0_0_15px_rgba(49,49,49,0.35)] hover:border-zinc-600
                bg-[url(/dir.png)] bg-contain bg-no-repeat row-span-full col-start-1 col-span-6 self-center">
            </div>
            <div className="flex w-[420px] h-full flex-col gap-3 rounded-2xl border duration-300 bg-center
                hover:-skew-x-3 hover:scale-105 hover:shadow-[2rem_2rem_2rem_-1rem_#0004,inset_1rem_1rem_4rem_-1rem_#fff1]
                border-zinc-800 bg-zinc-900 drop-shadow-[0_0_15px_rgba(49,49,49,0.35)] hover:border-zinc-600
                bg-[url(/img.png)] bg-contain bg-no-repeat row-span-full col-span-6 col-end-11 self-center">
            </div>
        </div>
    )
}
