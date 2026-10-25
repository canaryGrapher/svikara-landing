"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials, type Testimonial } from "@/lib/content/testimonials";
import { cn } from "@/lib/utils";

type Filter = "All" | Testimonial["service"];
const FILTERS: Filter[] = ["All", "Cybersecurity", "Development", "Consulting"];

/** Filterable testimonials; cards re-flow with a layout animation when the filter changes. */
export function TestimonialsGrid() {
    const [filter, setFilter] = useState<Filter>("All");
    const visible = filter === "All" ? testimonials : testimonials.filter((t) => t.service === filter);

    return (
        <section aria-label="Testimonials" className="bg-paper pb-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            type="button"
                            onClick={() => setFilter(f)}
                            aria-pressed={filter === f}
                            className={cn(
                                "relative rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors",
                                filter === f ? "text-white" : "text-ink hover:bg-ink/5"
                            )}
                        >
                            {filter === f && (
                                <motion.span
                                    layoutId="testimonial-filter"
                                    className="absolute inset-0 rounded-full bg-royal"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative">{f}</span>
                        </button>
                    ))}
                </div>

                <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {visible.map((t) => (
                            <motion.li
                                key={testimonials.indexOf(t)}
                                layout
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <TestimonialCard testimonial={t} />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
}
