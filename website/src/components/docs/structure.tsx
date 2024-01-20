import { cardVariants } from '../../framerVars'
import { CodeSection } from './code'
import { motion } from 'framer-motion'

const methods = ["get", "post", "put", "patch", "delete"]

export default function Structure() {
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
                    YourBlazzeApp<br />
                    ├── api/v1 (root-endpoint)<br />
                    │   ├── Route-1<br />
                    │   │   ├── GET.ts<br />
                    │   │   ├── POST.ts<br />
                    │   │   ├── PUT.ts<br />
                    │   │   ├── DELETE.ts<br />
                    │   │   ├── PATCH.ts
                    <br />
                    │   └── Other-routes / ... <br />
                    ├── blazze (for typescript)<br />
                    ├── cache (if enabled)<br />
                    ├── public (static-root)<br />
                    ├── blaze.config.js (from blazze-init)<br />
                    ├── package.json<br />
                    ├── packagelock.json<br />
                    └── ...<br />
                </div>
            </CodeSection>
            <div className='group w-full sm:w-11/12 lg:w-1/2 lg:px-8 rounded-xl flex flex-col items-start text-left gap-2 mb-8 lg:mb-0  lg:-mt-2'>
                <h1 className='tracking-tighter font-black text-2xl lg:text-3xl my-4 lg:m-4 flex items-center gap-1'>
                    <span className='rounded-full w-8 text-sm mr-2 h-8 flex items-center justify-center p-2
                            bg-black text-white dark:bg-white dark:text-black'>
                        2
                    </span>
                    Project Structure
                </h1>
                <div className='px-0 sm:px-4 text-sm'>
                    Blazze creates a root endpoint dir that you specified in the cli. You can add your <CodeSection type="small">API</CodeSection> routes in it, each with its own respective files namely:
                    <ul>
                        {
                            methods.map((ele, id) => <li className="flex items-center justify-between my-2 p-1 border-b dark:border-neutral-800" key={id}>
                                <CodeSection type="small">{ele.toLocaleUpperCase()}</CodeSection>
                                To handle {ele} requests
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}
