"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./reveal";

interface SplitHeadingProps {
    text: string;
    as?: "h1" | "h2" | "h3";
    id?: string;
    className?: string;
    delay?: number;
}

/** A heading whose words slide up from behind a mask when it enters the viewport. */
export function SplitHeading({ text, as = "h2", id, className, delay = 0 }: SplitHeadingProps) {
    const Tag = motion[as];
    const words = text.split(" ");

    return (
        <Tag
            id={id}
            className={cn("text-balance", className)}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            aria-label={text}
        >
            {words.map((word, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: "105%" },
                            shown: { y: "0%", transition: { duration: 0.85, ease: EASE_OUT, delay: delay + i * 0.06 } },
                        }}
                    >
                        {word}
                        {i < words.length - 1 ? " " : ""}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}
