"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { LOGO_VIEWBOX, LOGO_STROKE, SKY_ARC, ROYAL_ARC } from "@/components/brand/logo-geometry";

interface AnimatedLogoProps {
    className?: string;
    /** Light text for dark backgrounds */
    inverted?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const WORD = "Svikara".split("");

const arc: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    shown: (delay: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: { pathLength: { duration: 1.1, ease: EASE, delay }, opacity: { duration: 0.2, delay } },
    }),
};

const letter: Variants = {
    hidden: { y: "110%", opacity: 0 },
    shown: (i: number) => ({
        y: "0%",
        opacity: 1,
        transition: { duration: 0.7, ease: EASE, delay: 0.9 + i * 0.05 },
    }),
};

/**
 * The Svikara logo drawing itself: the sky arc, then the royal arc,
 * then the wordmark rising letter by letter and INFOTECH spreading out.
 * Total run time is about 1.9 seconds.
 */
export function AnimatedLogo({ className, inverted = true }: AnimatedLogoProps) {
    const reduce = useReducedMotion();
    const initial = reduce ? "shown" : "hidden";

    return (
        <div className={cn("flex flex-col items-center", className)} role="img" aria-label="Svikara Infotech">
            <motion.svg
                viewBox={LOGO_VIEWBOX}
                fill="none"
                strokeLinecap="round"
                strokeWidth={LOGO_STROKE}
                className="h-16 w-auto drop-shadow-[0_0_24px_rgba(97,165,250,0.55)] sm:h-20"
                initial={initial}
                animate="shown"
                aria-hidden
            >
                <motion.path d={SKY_ARC} stroke="var(--color-sky)" variants={arc} custom={0.1} />
                <motion.path d={ROYAL_ARC} stroke="var(--color-royal)" variants={arc} custom={0.45} />
            </motion.svg>

            <motion.div initial={initial} animate="shown" className="mt-3 flex flex-col items-center" aria-hidden>
                <span className="flex overflow-hidden pb-1">
                    {WORD.map((char, i) => (
                        <motion.span
                            key={i}
                            variants={letter}
                            custom={i}
                            className={cn(
                                "inline-block text-3xl font-bold tracking-tight sm:text-4xl",
                                inverted ? "text-white" : "text-ink"
                            )}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
                <motion.span
                    variants={{
                        hidden: { opacity: 0, letterSpacing: "0.1em" },
                        shown: {
                            opacity: 1,
                            letterSpacing: "0.5em",
                            transition: { duration: 1, ease: EASE, delay: 1.3 },
                        },
                    }}
                    className={cn("mr-[-0.5em] text-[0.7rem] sm:text-xs", inverted ? "text-white/85" : "text-slate-logo")}
                >
                    INFOTECH
                </motion.span>
            </motion.div>
        </div>
    );
}
