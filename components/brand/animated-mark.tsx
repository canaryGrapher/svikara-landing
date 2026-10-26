"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { MARK_VIEWBOX, PIXELS, S_LOWER, S_LOWER_GRADIENT, S_UPPER } from "./logo-paths";
import { MARK_PALETTE, type LogoTone } from "./logo-palette";
import { halfVariants, pixelVariants } from "./logo-motion";

interface AnimatedMarkProps {
    className?: string;
    tone: LogoTone;
    initial: "hidden" | "shown";
}

/** The S mark assembling itself: halves slide together, then the pixel trails pop out. */
export function AnimatedMark({ className, tone, initial }: AnimatedMarkProps) {
    const gradientId = `svk-amark-${useId().replace(/[^\w-]/g, "")}`;
    const palette = MARK_PALETTE[tone];

    return (
        <motion.svg
            viewBox={MARK_VIEWBOX}
            className={cn("w-auto overflow-visible", className)}
            initial={initial}
            animate="shown"
            aria-hidden
        >
            <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" {...S_LOWER_GRADIENT}>
                    <stop offset="0" stopColor={palette.lowerFrom} />
                    <stop offset="1" stopColor={palette.lowerTo} />
                </linearGradient>
            </defs>
            <motion.path d={S_UPPER} fill={palette.upper} variants={halfVariants} custom={-60} />
            <motion.path d={S_LOWER} fill={`url(#${gradientId})`} variants={halfVariants} custom={60} />
            {PIXELS.map((p, i) => (
                <motion.rect
                    key={`${p.x}-${p.y}`}
                    x={p.x}
                    y={p.y}
                    width={p.size}
                    height={p.size}
                    fill={palette.pixels[p.shade]}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    variants={pixelVariants}
                    custom={0.75 + (i % 3) * 0.1}
                />
            ))}
        </motion.svg>
    );
}
