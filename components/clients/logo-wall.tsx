"use client";

import { motion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/motion/reveal";
import { PartnerTile } from "@/components/shared/partner-tile";
import { SampleBadge } from "@/components/shared/sample-badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { hasSamplePartners, partners, type Partner } from "@/lib/content/partners";

const groups: { kind: Partner["kind"]; title: string }[] = [
    { kind: "client", title: "Clients" },
    { kind: "technology-partner", title: "Technology partners" },
];

export function LogoWall() {
    return (
        <section aria-labelledby="logo-wall-title" className="bg-white py-24 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHeading id="logo-wall-title" title="Who we work with." />
                    {hasSamplePartners && <SampleBadge label="Sample logos, replace before launch" />}
                </div>

                {groups.map((group) => {
                    const list = partners.filter((p) => p.kind === group.kind);
                    if (list.length === 0) return null;
                    return (
                        <div key={group.kind} className="mt-14">
                            <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
                            <RevealGroup as="ul" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {list.map((p, i) => (
                                    <motion.li key={`${p.name}-${i}`} variants={revealItem}>
                                        <PartnerTile partner={p} className="h-24" />
                                    </motion.li>
                                ))}
                            </RevealGroup>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
