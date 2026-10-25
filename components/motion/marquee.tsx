"use client";

import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    /** Base speed in percent of the track per second; negative runs right */
    speed?: number;
    className?: string;
}

/**
 * An endless row that drifts on its own and speeds up (or reverses) with
 * the visitor's scroll velocity. Children are rendered twice for the loop.
 */
export function Marquee({ children, speed = 2, className }: MarqueeProps) {
    const reduce = useReducedMotion();
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
    const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
    const direction = useRef(1);

    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        if (reduce) return;
        const b = boost.get();
        if (b < 0) direction.current = -1;
        else if (b > 0) direction.current = 1;
        const move = direction.current * speed * (delta / 1000) * (1 + Math.abs(b));
        baseX.set(baseX.get() - move);
    });

    return (
        <div className={className} style={{ overflow: "hidden" }}>
            <motion.div className="flex w-max" style={{ x }}>
                <div className="flex shrink-0">{children}</div>
                <div className="flex shrink-0" aria-hidden>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
