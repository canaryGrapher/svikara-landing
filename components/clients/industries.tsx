"use client";

import { motion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { industries } from "@/lib/content/industries";

export function Industries() {
    return (
        <section aria-labelledby="industries-title" className="bg-ink py-24 text-white sm:py-32">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading id="industries-title" title="Industries we build for." inverted>
                    Every sector has its own rules and risks. We start from yours.
                </SectionHeading>

                <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map(({ icon: Icon, name, need }) => (
                        <motion.li
                            key={name}
                            variants={revealItem}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                        >
                            <Icon className="size-8 text-sky" aria-hidden />
                            <h3 className="mt-5 text-xl font-bold">{name}</h3>
                            <p className="mt-2 text-white/70">{need}</p>
                        </motion.li>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
