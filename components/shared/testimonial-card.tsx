import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content/testimonials";
import { cn } from "@/lib/utils";
import { SampleBadge } from "./sample-badge";

interface TestimonialCardProps {
    testimonial: Testimonial;
    size?: "md" | "lg";
    className?: string;
}

export function TestimonialCard({ testimonial: t, size = "md", className }: TestimonialCardProps) {
    const initials = t.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2);

    return (
        <figure
            className={cn(
                "flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_1px_0_rgba(30,41,59,0.04)] sm:p-9",
                className
            )}
        >
            <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-royal">{t.service}</span>
                {t.sample && <SampleBadge />}
            </div>

            {t.result && <p className="mt-6 text-lg font-bold text-ink">{t.result}</p>}

            <blockquote className={cn("mt-4 flex-1 text-pretty text-ink/85", size === "lg" ? "text-2xl leading-snug sm:text-3xl" : "text-lg")}>
                <Quote className="mb-3 size-6 text-sky" aria-hidden />
                {t.quote}
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-sky to-royal font-bold text-white"
                >
                    {initials}
                </span>
                <span className="flex flex-col leading-tight">
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="text-sm text-muted">
                        {t.role}, {t.company}
                    </span>
                </span>
            </figcaption>
        </figure>
    );
}
