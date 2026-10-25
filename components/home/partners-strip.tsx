import Link from "next/link";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { PartnerTile } from "@/components/shared/partner-tile";
import { SampleBadge } from "@/components/shared/sample-badge";
import { hasSamplePartners, partners } from "@/lib/content/partners";

/** Two rows of partner logos drifting in opposite directions, faster while scrolling. */
export function PartnersStrip() {
    if (partners.length === 0) return null;
    const half = Math.ceil(partners.length / 2);
    const rows = [partners.slice(0, half), partners.slice(half).concat(partners.slice(0, half))];

    return (
        <section
            aria-labelledby="partners-title"
            className="relative z-10 rounded-t-[2.5rem] bg-paper pb-20 pt-20 sm:pb-24 sm:pt-24"
        >
            <Reveal className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-5 sm:px-8">
                <div>
                    <h2 id="partners-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        Partners and clients
                    </h2>
                    <p className="mt-2 text-muted">Teams we build for, and the platforms we build on.</p>
                </div>
                <div className="flex items-center gap-4">
                    {hasSamplePartners && <SampleBadge label="Sample logos" />}
                    <Link href="/clients" className="font-semibold text-royal hover:underline">
                        See all clients
                    </Link>
                </div>
            </Reveal>

            <div className="mt-12 flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                {rows.map((row, r) => (
                    <Marquee key={r} speed={r === 0 ? 1.6 : -1.6}>
                        {row.map((p, i) => (
                            <PartnerTile key={`${p.sector}-${i}`} partner={p} className="mr-4 min-w-60" />
                        ))}
                    </Marquee>
                ))}
            </div>
        </section>
    );
}
