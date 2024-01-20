'use client';
import clsx from 'clsx';
import { motion, useMotionTemplate, useMotionValue, type MotionStyle, type MotionValue } from 'framer-motion';
import { cardVariants } from '../framerVars';
import { HTMLProps, type MouseEvent } from 'react';

type WrapperStyle = MotionStyle & {
    '--x': MotionValue<string>;
    '--y': MotionValue<string>;
};

export function FeatureCard({ children, className }: { children?: React.ReactNode, className?: HTMLProps<HTMLElement>["className"]}) {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={clsx("animated-feature-cards relative drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]",className)}
            onMouseMove={handleMouseMove}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            style={
                {
                    '--x': useMotionTemplate`${mouseX}px`,
                    '--y': useMotionTemplate`${mouseY}px`,
                } as WrapperStyle
            }>
            <div
                className={clsx(
                    'group relative w-full overflow-hidden rounded-3xl border border-neutral-300 dark:border-neutral-800 bg-gradient-to-b transition duration-300 from-neutral-50/90 to-neutral-100/90 dark:from-neutral-950/90 dark:to-neutral-800/90 ',
                    'hover:border-transparent',
                    className,
                )}
            >
                {children}
            </div>
        </motion.div>
    );
}