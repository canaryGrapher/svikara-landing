"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollWordsProps {
    text: string;
    className?: string;
}

/**
 * Pins a paragraph while the visitor scrolls and lights each word up in turn,
 * so the sentence is "read" by scrolling.
 */
export function ScrollWords({ text, className }: ScrollWordsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
    const words = text.split(" ");

    return (
        <div ref={ref} className={cn("relative", reduce ? "" : "h-[160vh]")}>
            <div className={cn(reduce ? "" : "sticky top-[22vh]")}>
                <p className={className} aria-label={text}>
                    {words.map((word, i) => (
                        <Word
                            key={i}
                            progress={scrollYProgress}
                            range={[i / words.length, (i + 1) / words.length]}
                            static={!!reduce}
                        >
                            {word}
                        </Word>
                    ))}
                </p>
            </div>
        </div>
    );
}

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    static: boolean;
}

function Word({ children, progress, range, static: isStatic }: WordProps) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return (
        <motion.span aria-hidden style={{ opacity: isStatic ? 1 : opacity }} className="mr-[0.25em] inline-block">
            {children}
        </motion.span>
    );
}
