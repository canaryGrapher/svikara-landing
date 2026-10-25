"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
    to: number;
    suffix?: string;
    duration?: number;
    className?: string;
}

/** Counts from zero to `to` the first time it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1.6, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
    const reduce = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setValue(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, reduce, to, duration]);

    return (
        <span ref={ref} className={className}>
            {reduce ? to : value}
            {suffix}
        </span>
    );
}
