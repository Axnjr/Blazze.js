"use client";
import { useState } from 'react'

export default function Modes() {

    const [mode,setMode] = useState(true) // true for light mode
    
    return (
        <>
            {
                mode && <svg onClick={() => {
                    setMode(!mode);
                    document.documentElement.classList.remove('dark');
                }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 duration-150 hover:scale-110 hover:fill-black dark:hover:fill-white" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            }
            {
                !mode && <svg onClick={() => {
                    setMode(!mode);
                    document.documentElement.classList.add('dark');
                }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 duration-150 hover:scale-110 hover:fill-black dark:hover:fill-white" aria-hidden="true"><circle cx={12} cy={12} r={4} /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </svg>	  
            }
        </>
    )
}

