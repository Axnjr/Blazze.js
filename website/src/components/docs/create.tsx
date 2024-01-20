import React from 'react'
import { motion } from 'framer-motion';
import { cardVariants } from '../../framerVars';
import { CodeSection } from './code'

const cliQuestions = [
    "What is your project named ? (myApp)",
    "What will be root endpoint for your project ? (api/v1)",
    "Would you like to use TypeScript ? (yes)",
    "Which port should the server listen to ? (3000)",
    "Where would you like to keep your static content like html, imgs, etc ? (public)",
    "Would you like to enable request caching ?"
]



export default function Create() {
    return (
        <motion.div 
            className="flex items-center justify-start lg:flex-row lg:items-start 
            lg:justify-between w-10/12 m-auto flex-col-reverse"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}    
        >
            <CodeSection type="big">
                <div>
                    npm install <span className="text-blue-500">blazze@latest</span>
                    {" >> "}
                    npx <span className="text-fuchsia-500">blazze-init</span>
                    <br />
                    <br />
                    {cliQuestions.map((q, id) => {
                        return <React.Fragment key={id}><span><span className="text-neutral-400 dark:text-neutral-500">{id+1}&nbsp;</span> {q}</span><br /></React.Fragment>
                    })}
                </div>
            </CodeSection>
            <div className='group w-full sm:w-11/12 lg:w-1/2 lg:px-8 rounded-xl flex flex-col items-start text-left lg:gap-2 mb-8 lg:mb-0 lg:-mt-2'>
                <h1 className='tracking-tighter font-black text-2xl lg:text-3xl my-4 lg:m-4 flex items-center gap-1'>
                    <span className='rounded-full w-8 text-sm mr-2 h-8 flex items-center justify-center p-2
                            bg-black text-white dark:bg-white dark:text-black'>
                        1
                    </span>
                    Create & Configure
                </h1>
                <div className='px-0 sm:px-4 text-sm'>
                    Get started quickly with Blazze cli. You will be asked a few questions
                    to configure <CodeSection type="small">blazze.config.js</CodeSection>
                </div>
            </div>
        </motion.div>
    )
}
