/* eslint-disable @next/next/no-img-element -- product logos are small static files of mixed formats */
import { Check } from "lucide-react";
import type { Product } from "@/lib/content/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product: p, className }: ProductCardProps) {
    return (
        <article
            id={p.slug}
            className={cn(
                "flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_1px_0_rgba(30,41,59,0.04)] sm:p-9",
                className
            )}
        >
            <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-royal">{p.category}</span>
                <span className="rounded-full border border-line px-3 py-1 text-sm font-medium text-muted">{p.status}</span>
            </div>

            {p.logo && <img src={p.logo} alt={`${p.name} logo`} className="mt-6 size-16 rounded-2xl object-contain" />}

            <h3 className={cn("text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl", p.logo ? "mt-4" : "mt-6")}>
                {p.name}
            </h3>
            <p className="mt-2 text-lg font-semibold text-royal">{p.tagline}</p>
            <p className="mt-4 max-w-[56ch] text-pretty text-muted">{p.summary}</p>

            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {p.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-ink">
                        <Check className="mt-0.5 size-5 shrink-0 text-royal" aria-hidden />
                        {feature}
                    </li>
                ))}
            </ul>

        </article>
    );
}
