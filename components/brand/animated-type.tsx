"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { INFOTECH_LETTERS, INFOTECH_RULES, TAGLINE, WORD_DOTS, WORD_LETTERS, WORD_TAGLINE_VIEWBOX } from "./logo-paths";
import { TYPE_PALETTE, type LogoTone } from "./logo-palette";
import { fadeVariants, letterVariants, ruleVariants } from "./logo-motion";

interface AnimatedTypeProps {
    className?: string;
    tone: LogoTone;
    initial: "hidden" | "shown";
}

/** Index of the letter each A dot belongs to, so the dot rises with its A. */
const DOT_LETTER = [4, 6];

/** SVIKARA rising letter by letter, then INFOTECH, its rules and the tagline. */
export function AnimatedType({ className, tone, initial }: AnimatedTypeProps) {
    const palette = TYPE_PALETTE[tone];
    const clipId = `svk-word-${useId().replace(/[^\w-]/g, "")}`;

    return (
        <motion.svg
            viewBox={WORD_TAGLINE_VIEWBOX}
            className={cn("w-auto overflow-visible", className)}
            initial={initial}
            animate="shown"
            aria-hidden
        >
            <clipPath id={clipId}>
                <rect x="140" y="830" width="940" height="120" />
            </clipPath>
            <g clipPath={`url(#${clipId})`}>
                {WORD_LETTERS.map((l, i) => (
                    <motion.path key={i} d={l.d} fill={palette.letters} variants={letterVariants} custom={i} />
                ))}
                {WORD_DOTS.map((d, i) => (
                    <motion.path key={i} d={d} fill={palette.accent} variants={letterVariants} custom={DOT_LETTER[i]} />
                ))}
            </g>
            <motion.g fill={palette.accent} variants={fadeVariants} custom={1.4}>
                {INFOTECH_LETTERS.map((d, i) => (
                    <path key={i} d={d} />
                ))}
            </motion.g>
            {INFOTECH_RULES.map((r, i) => (
                <motion.rect
                    key={r.x}
                    x={r.x}
                    y={r.y + 1}
                    width={r.width}
                    height={5}
                    rx={2.5}
                    fill={palette.accent}
                    style={{ transformBox: "fill-box", transformOrigin: i === 0 ? "right" : "left" }}
                    variants={ruleVariants}
                />
            ))}
            <motion.path d={TAGLINE} fill={palette.tagline} variants={fadeVariants} custom={1.8} />
        </motion.svg>
    );
}
