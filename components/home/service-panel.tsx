/* eslint-disable @next/next/no-img-element -- remote stock photography */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark, type MarkPart } from "@/components/brand/logo-mark";
import type { Service, ServiceKind } from "@/lib/content/services";

/** Security wears the top half of the S, development the bottom half, consulting the whole mark. */
export const glyphParts: Record<ServiceKind, MarkPart> = {
    security: "upper",
    development: "lower",
    consulting: "full",
};

export function ServicePanel({ service }: { service: Service }) {
    return (
        <article className="group relative flex h-[min(72vh,620px)] w-[86vw] shrink-0 flex-col justify-end overflow-hidden rounded-[2rem] bg-ink text-white sm:w-[62vw] lg:w-[46vw]">
            <img
                src={service.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

            <div className="relative p-7 sm:p-10">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-white/95">
                    <LogoMark part={glyphParts[service.kind]} className="h-9" />
                </span>
                <h3 className="mt-6 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">{service.title}</h3>
                <p className="mt-3 max-w-[40ch] text-lg text-white/80">{service.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {service.offerings.slice(0, 3).map((o) => (
                        <li key={o} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur">
                            {o}
                        </li>
                    ))}
                </ul>
                <Link
                    href={`/services#${service.slug}`}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-sky hover:text-white"
                >
                    Explore {service.title.toLowerCase()}
                    <ArrowUpRight className="size-4" aria-hidden />
                </Link>
            </div>
        </article>
    );
}
