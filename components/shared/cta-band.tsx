"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CtaLink } from "@/components/brand/cta-link";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";

interface CtaBandProps {
    title?: string;
    detail?: string;
}

/** Closing call to action. The logo arcs open outward as the band scrolls through. */
export function CtaBand({
    title = "Let's build something secure.",
    detail = "Tell us what you're working on. The first call is free, and you'll leave with a clear next step.",
}: CtaBandProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const leftX = useTransform(scrollYProgress, [0, 0.5], ["18%", "0%"]);
    const rightX = useTransform(scrollYProgress, [0, 0.5], ["-18%", "0%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-royal py-28 text-white sm:py-36">
            <motion.svg
                aria-hidden
                viewBox="0 0 400 200"
                className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[140%] w-auto -translate-y-1/2 opacity-25"
                style={{ rotate }}
                fill="none"
                strokeLinecap="round"
                strokeWidth={22}
            >
                <motion.path d="M150 20 A80 80 0 0 0 150 180" stroke="var(--color-sky)" style={{ x: leftX }} />
                <motion.path d="M250 20 A80 80 0 0 1 250 180" stroke="#ffffff" style={{ x: rightX }} />
            </motion.svg>

            <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
                <SplitHeading
                    text={title}
                    className="text-4xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-6xl"
                />
                <Reveal delay={0.2} y={16}>
                    <p className="mt-6 max-w-[48ch] text-lg text-white/80">{detail}</p>
                </Reveal>
                <Reveal delay={0.35} y={16} className="mt-9 flex flex-wrap justify-center gap-3">
                    <CtaLink href="/contact" className="bg-white text-royal hover:bg-sky hover:text-ink">
                        Book a free consultation
                    </CtaLink>
                    <CtaLink
                        href="/services"
                        variant="outline"
                        className="border-white/40 bg-transparent text-white hover:border-white hover:text-white"
                    >
                        Explore services
                    </CtaLink>
                </Reveal>
            </div>
        </section>
    );
}
