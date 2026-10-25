"use client";

import { motion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { frameworks } from "@/lib/content/frameworks";

export function Compliance() {
    return (
        <section id="compliance" aria-labelledby="compliance-title" className="scroll-mt-16 bg-paper py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading id="compliance-title" title="Standards we prepare you for.">
                    We map your systems to the framework, close the gaps, and assemble the evidence your auditor or
                    customer will ask for.
                </SectionHeading>

                <RevealGroup
                    as="ul"
                    className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
                >
                    {frameworks.map((framework) => (
                        <motion.li key={framework.name} variants={revealItem} className="bg-white p-6">
                            <p className="text-lg font-bold text-ink">{framework.name}</p>
                            <p className="mt-1 text-sm text-muted">{framework.scope}</p>
                        </motion.li>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
