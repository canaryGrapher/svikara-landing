"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CtaLink } from "@/components/brand/cta-link";
import { MARK_VIEWBOX, PIXELS, S_LOWER, S_UPPER } from "@/components/brand/logo-paths";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";

interface CtaBandProps {
    title?: string;
    detail?: string;
}

/** Closing call to action. The two halves of the logo S close together as the band scrolls through. */
export function CtaBand({
    title = "Let's build something secure.",
    detail = "Tell us what you're working on. The first call is free, and you'll leave with a clear next step.",
}: CtaBandProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const leftX = useTransform(scrollYProgress, [0, 0.5], [-90, 0]);
    const rightX = useTransform(scrollYProgress, [0, 0.5], [90, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

    return (
        <section ref={ref} className="relative overflow-hidden bg-royal py-28 text-white sm:py-36">
            <motion.svg
                aria-hidden
                viewBox={MARK_VIEWBOX}
                className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[140%] w-auto -translate-y-1/2 overflow-visible opacity-20"
                style={{ rotate }}
            >
                <motion.g fill="var(--color-sky)" style={{ x: leftX }}>
                    <path d={S_UPPER} />
                    {PIXELS.filter((p) => p.half === "upper").map((p) => (
                        <rect key={p.x} x={p.x} y={p.y} width={p.size} height={p.size} />
                    ))}
                </motion.g>
                <motion.g fill="#ffffff" style={{ x: rightX }}>
                    <path d={S_LOWER} />
                    {PIXELS.filter((p) => p.half === "lower").map((p) => (
                        <rect key={p.x} x={p.x} y={p.y} width={p.size} height={p.size} />
                    ))}
                </motion.g>
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
