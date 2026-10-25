"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/count-up";
import { RevealGroup, revealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { highlights, stats } from "@/lib/content/highlights";

/** Starts white to continue from the services gradient, then eases into paper for the process section. */
const BACKGROUND = "linear-gradient(180deg, #ffffff 0%, #ffffff 65%, #fbfbfb 82%, #f7f7f7 100%)";

export function Highlights() {
    return (
        <section
            aria-labelledby="highlights-title"
            className="relative z-10 py-24 sm:py-32"
            style={{ background: BACKGROUND }}
        >
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading id="highlights-title" title="Why teams choose Svikara.">
                    Building and securing software usually means juggling two vendors who blame each other. We do both,
                    so the buck stops with us.
                </SectionHeading>

                <RevealGroup as="ul" className="mt-16 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <motion.li
                            key={stat.label}
                            variants={revealItem}
                            className={
                                i % 2 === 1
                                    ? "border-l border-line pl-6 lg:pl-8"
                                    : i > 0
                                      ? "lg:border-l lg:border-line lg:pl-8"
                                      : ""
                            }
                        >
                            <CountUp
                                to={stat.value}
                                suffix={stat.suffix}
                                className="block text-6xl font-extrabold tracking-[-0.04em] text-royal sm:text-7xl"
                            />
                            <span className="mt-3 block max-w-[18ch] text-muted">{stat.label}</span>
                        </motion.li>
                    ))}
                </RevealGroup>

                <RevealGroup as="ul" className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-2">
                    {highlights.map(({ icon: Icon, title, detail }) => (
                        <motion.li key={title} variants={revealItem} className="flex gap-5">
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-royal">
                                <Icon className="size-6" aria-hidden />
                            </span>
                            <div>
                                <h3 className="text-xl font-bold text-ink">{title}</h3>
                                <p className="mt-2 max-w-[42ch] text-muted">{detail}</p>
                            </div>
                        </motion.li>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
