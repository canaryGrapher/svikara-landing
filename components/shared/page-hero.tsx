"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/logo-mark";
import { SplitHeading } from "@/components/motion/split-heading";
import { EASE_OUT } from "@/components/motion/reveal";

interface PageHeroProps {
    title: string;
    intro: string;
    children?: ReactNode;
}

/** Opening block for inner pages: the logo arcs sweep in behind a large headline. */
export function PageHero({ title, intro, children }: PageHeroProps) {
    return (
        <section className="relative overflow-hidden bg-paper pb-20 pt-36 sm:pb-28 sm:pt-44">
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-24 top-10 opacity-[0.12] sm:-right-10"
                initial={{ rotate: -25, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 0.12 }}
                transition={{ duration: 1.6, ease: EASE_OUT }}
            >
                <LogoMark className="h-[28rem] sm:h-[36rem]" />
            </motion.div>

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
                <SplitHeading
                    as="h1"
                    text={title}
                    className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-ink sm:text-7xl"
                />
                <motion.p
                    className="mt-7 max-w-[52ch] text-pretty text-lg text-muted sm:text-xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
                >
                    {intro}
                </motion.p>
                {children ? (
                    <motion.div
                        className="mt-9"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
                    >
                        {children}
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
}
