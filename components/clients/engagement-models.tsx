"use client";

import { motion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { engagementModels } from "@/lib/content/industries";

export function EngagementModels() {
    return (
        <section aria-labelledby="models-title" className="bg-paper py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading id="models-title" title="Ways to work with us.">
                    Pick the model that fits the work. You can switch as your needs change.
                </SectionHeading>

                <RevealGroup as="ol" className="mt-14 grid gap-5 md:grid-cols-3">
                    {engagementModels.map((model) => (
                        <motion.li
                            key={model.title}
                            variants={revealItem}
                            className="flex flex-col rounded-3xl border border-line bg-white p-8"
                        >
                            <h3 className="text-2xl font-bold text-ink">{model.title}</h3>
                            <p className="mt-2 font-medium text-royal">Best for: {model.bestFor}</p>
                            <p className="mt-4 text-muted">{model.detail}</p>
                        </motion.li>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
