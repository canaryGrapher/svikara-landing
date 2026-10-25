"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { featuredTestimonials, type Testimonial } from "@/lib/content/testimonials";

const FEATURED = featuredTestimonials;

/** Cards pin one after another and the earlier ones shrink back as the next arrives. */
export function TestimonialsStack() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    if (FEATURED.length === 0) return null;

    return (
        <section aria-labelledby="testimonials-title" className="relative z-10 bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading id="testimonials-title" title="What clients say.">
                        Results from security, development and consulting engagements.
                    </SectionHeading>
                    <Link href="/testimonials" className="font-semibold text-royal hover:underline">
                        Read all testimonials
                    </Link>
                </div>

                <div ref={ref} className="mt-16">
                    {FEATURED.map((t, i) => (
                        <StackedCard key={i} index={i} total={FEATURED.length} progress={scrollYProgress} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface StackedCardProps {
    index: number;
    total: number;
    progress: MotionValue<number>;
    testimonial: Testimonial;
}

function StackedCard({ index, total, progress, testimonial }: StackedCardProps) {
    const start = index / total;
    const targetScale = 1 - (total - 1 - index) * 0.05;
    const scale = useTransform(progress, [start, 1], [1, targetScale]);

    return (
        <div className="sticky flex h-[70vh] items-start" style={{ top: `calc(7rem + ${index * 1.75}rem)` }}>
            <motion.div style={{ scale }} className="w-full origin-top">
                <TestimonialCard testimonial={testimonial} size="lg" className="min-h-[22rem] shadow-xl shadow-ink/5" />
            </motion.div>
        </div>
    );
}
