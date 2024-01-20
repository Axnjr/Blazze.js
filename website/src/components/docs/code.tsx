export function CodeSection({ children, type }: { children?: React.ReactNode, type: "big" | "small" }) {
    return <code
        className={
            type == "big"
                ?
            `text-sm tracking-tighter text-left w-full sm:w-11/12 lg:w-1/2 p-4  overflow-x-scroll whitespace-nowrap
            bg-neutral-100 dark:bg-neutral-900 rounded-lg mx-2 text-black border shadow-lg
            dark:border-neutral-800 dark:text-white `
                :
            `px-[0.5rem] my-[1.5px] rounded-md bg-neutral-300 dark:bg-neutral-600`
        }>
        {children}
    </code>
}