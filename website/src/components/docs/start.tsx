import { motion } from 'framer-motion'
import { CodeSection } from './code'
import { cardVariants } from '../../framerVars'

export default function StartBuilding() {
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
                    <span className="text-neutral-500 text-xs">_users/GET.ts</span>
                    <br />
                    <br />
                    import {"{"} <span>Request, Response</span> {"}"} from <span >"express"</span>;
                    <br />
                    <br />
                    <span>export </span>default async function (<span>req</span>: Request,<span>res</span>: Response){"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp; <span className="text-neutral-500">// do something usefull here ...</span><br />
                    &nbsp;&nbsp;&nbsp; let query = req.query;<br />
                    &nbsp;&nbsp;&nbsp; let params = req.params;<br />
                    {"}"}
                </div>
            </CodeSection>
            <div className='group w-full sm:w-11/12 lg:w-1/2 lg:px-8 rounded-xl flex flex-col items-start text-left gap-2 mb-8 lg:mb-0 lg:-mt-2'>
                <h1 className='tracking-tighter font-black text-2xl lg:text-3xl my-4 lg:m-4 flex items-center gap-1'>
                    <span className='rounded-full w-8 text-sm mr-2 h-8 flex items-center justify-center p-2
                            bg-black text-white dark:bg-white dark:text-black'>
                        4
                    </span>
                    Start Building !
                </h1>
                <div className='px-0 sm:px-4 text-sm'>
                    You need to <CodeSection type="small">export</CodeSection> a default normal function from each file,
                    this function recives express <CodeSection type="small">req</CodeSection> & <CodeSection type="small">res</CodeSection> objects.
                    <div className="bg-black text-white dark:bg-white dark:text-black font-medium p-4 sm:p-2 w-full rounded-lg mt-6 flex ">
                        ⚠️ Exporting arrow functions can cause build errors.
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
