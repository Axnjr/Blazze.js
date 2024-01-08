'use client';
import clsx from 'clsx';
import { motion, useMotionTemplate, useMotionValue, type MotionStyle, type MotionValue } from 'framer-motion';
import { HTMLProps, type MouseEvent } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

type WrapperStyle = MotionStyle & {
    '--x': MotionValue<string>;
    '--y': MotionValue<string>;
};

export function FeatureCard({ children, className }: { children?: React.ReactNode, className?: HTMLProps<HTMLElement>["className"]}) {

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isMobile = useIsMobile();

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={clsx("animated-feature-cards relative drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]",className)}
            onMouseMove={handleMouseMove}
            style={
                {
                    '--x': useMotionTemplate`${mouseX}px`,
                    '--y': useMotionTemplate`${mouseY}px`,
                } as WrapperStyle
            }>
            <div
                className={clsx(
                    'group relative w-full overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b transition duration-300 from-neutral-950/90 to-neutral-800/90',
                    'hover:border-transparent',
                    className,
                )}
            >
                {children}
            </div>
        </motion.div>
    );
}