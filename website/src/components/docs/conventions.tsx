import { motion } from 'framer-motion'
import { CodeSection } from './code'
import { cardVariants } from '../../framerVars'

export default function Conventions() {
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
                    <span className="text-neutral-500">1.</span> For nested route like this
                    <span className=""> "users/new/payments"</span> create this <br />
                    <span className="">&nbsp;&nbsp; "users@new@payments"</span> route folder.
                    <br />
                    <br />
                    <span className="text-neutral-500">2.</span> For dynamic routes create folder with "_" (underscore)<br />
                    &nbsp;&nbsp; at the beggining ex: <span className=""> "_users"</span>
                </div>
            </CodeSection>
            <div className='group w-full sm:w-11/12 lg:w-1/2 lg:px-8 rounded-xl flex flex-col items-start text-left gap-2 mb-8 lg:mb-0 lg:-mt-2'>
                <h1 className='tracking-tighter font-black text-2xl lg:text-3xl my-4 lg:m-4 flex items-center gap-1'>
                    <span className='rounded-full w-8 text-sm mr-2 h-8 flex items-center justify-center p-2
                            bg-black text-white dark:bg-white dark:text-black'>
                        3
                    </span>
                    Conventions
                </h1>
                <div className='px-0 sm:px-4 text-sm'>
                    To have nested <CodeSection type="small">API</CodeSection> routes use <CodeSection type="small">"@"</CodeSection> symbol,
                    and for dynamic routes use <CodeSection type="small">"_"</CodeSection> underscore symbol.
                </div>
            </div>
        </motion.div>
    )
}
