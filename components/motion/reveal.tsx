"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** Distance in px the element travels up while fading in */
    y?: number;
    as?: "div" | "li" | "section" | "article";
}

/** Fades and lifts its content the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 32, as = "div" }: RevealProps) {
    const Tag = motion[as];
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay }}
        >
            {children}
        </Tag>
    );
}

const groupVariants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: 0.1 } },
};

export const revealItem: Variants = {
    hidden: { opacity: 0, y: 28 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

interface RevealGroupProps {
    children: ReactNode;
    className?: string;
    as?: "div" | "ul" | "ol";
}

/** Staggers children that use the `revealItem` variants. */
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
    const Tag = motion[as];
    return (
        <Tag
            className={className}
            variants={groupVariants}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
            {children}
        </Tag>
    );
}
