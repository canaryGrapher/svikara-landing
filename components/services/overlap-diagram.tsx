"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Two overlapping rings echoing the logo: security and engineering.
 * They start apart and slide together as the diagram scrolls into view.
 */
export function OverlapDiagram() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.55"] });
    const leftX = useTransform(scrollYProgress, [0, 1], [-50, 0]);
    const rightX = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const overlapOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

    return (
        <div ref={ref} className="w-full max-w-lg">
            <svg viewBox="-60 0 560 300" className="h-auto w-full" role="img" aria-labelledby="overlap-diagram-title">
                <title id="overlap-diagram-title">
                    Security and engineering drawn as two overlapping circles, with Svikara in the overlap
                </title>
                <defs>
                    <clipPath id="overlap-clip">
                        <circle cx="160" cy="150" r="120" />
                    </clipPath>
                </defs>

                <motion.g style={{ x: leftX }}>
                    <circle
                        cx="160"
                        cy="150"
                        r="120"
                        fill="var(--color-sky)"
                        fillOpacity="0.16"
                        stroke="var(--color-sky)"
                        strokeWidth="3"
                    />
                    <text x="105" y="156" textAnchor="middle" className="fill-ink text-[17px] font-semibold">
                        Security
                    </text>
                </motion.g>
                <motion.g style={{ x: rightX }}>
                    <circle
                        cx="280"
                        cy="150"
                        r="120"
                        fill="var(--color-royal)"
                        fillOpacity="0.08"
                        stroke="var(--color-royal)"
                        strokeWidth="3"
                    />
                    <text x="338" y="156" textAnchor="middle" className="fill-ink text-[17px] font-semibold">
                        Engineering
                    </text>
                </motion.g>
                <motion.g style={{ opacity: overlapOpacity }}>
                    <circle
                        cx="280"
                        cy="150"
                        r="120"
                        fill="var(--color-royal)"
                        fillOpacity="0.9"
                        clipPath="url(#overlap-clip)"
                    />
                    <text x="220" y="156" textAnchor="middle" className="fill-white text-[17px] font-bold">
                        Svikara
                    </text>
                </motion.g>
            </svg>
        </div>
    );
}
