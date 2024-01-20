import { Variants } from 'framer-motion';

export const cardVariants: Variants = {
    offscreen: {
        y: 300,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        // rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 1
        }
    }
};