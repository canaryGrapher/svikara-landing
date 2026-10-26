"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { glyphParts } from "@/components/home/service-panel";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, RevealGroup, revealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import type { Service } from "@/lib/content/services";
import { cn } from "@/lib/utils";

export function ServiceDetail({ service, flip = false }: { service: Service; flip?: boolean }) {
    return (
        <article
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className="scroll-mt-24 border-t border-line py-20 sm:py-28"
        >
            <div className={cn("grid items-start gap-12 lg:grid-cols-2 lg:gap-16", flip && "lg:[&>*:first-child]:order-2")}>
                <div className="lg:sticky lg:top-28">
                    <ParallaxImage src={service.image} alt="" className="aspect-[4/3] rounded-[2rem]" />
                </div>

                <div>
                    <Reveal y={20}>
                        <LogoMark part={glyphParts[service.kind]} className="h-12" />
                    </Reveal>
                    <SplitHeading
                        id={`${service.slug}-title`}
                        text={service.title}
                        className="mt-6 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
                    />
                    <Reveal delay={0.15} y={16}>
                        <p className="mt-3 text-xl font-semibold text-royal">{service.tagline}</p>
                        <p className="mt-4 max-w-[52ch] text-lg text-muted">{service.summary}</p>
                    </Reveal>

                    <h4 className="mt-10 font-semibold text-ink">What we do</h4>
                    <RevealGroup as="ul" className="mt-4 grid gap-3">
                        {service.offerings.map((o) => (
                            <motion.li key={o} variants={revealItem} className="flex gap-3 text-ink">
                                <Check className="mt-1 size-4 shrink-0 text-royal" aria-hidden />
                                {o}
                            </motion.li>
                        ))}
                    </RevealGroup>

                    <h4 className="mt-10 font-semibold text-ink">What you get</h4>
                    <RevealGroup as="ul" className="mt-4 grid gap-3 sm:grid-cols-3">
                        {service.outcomes.map((o) => (
                            <motion.li
                                key={o}
                                variants={revealItem}
                                className="rounded-2xl bg-secondary p-4 text-[0.95rem] font-medium text-ink"
                            >
                                {o}
                            </motion.li>
                        ))}
                    </RevealGroup>
                </div>
            </div>
        </article>
    );
}
