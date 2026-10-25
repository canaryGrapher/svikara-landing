"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { approachSteps } from "@/lib/content/approach";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

/** The engagement steps on a vertical line that fills in as the visitor scrolls. */
export function ProcessTimeline({ className = "bg-white" }: { className?: string }) {
    const ref = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.55"] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section aria-labelledby="process-title" className={cn("relative z-10 py-24 sm:py-32", className)}>
            <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <SectionHeading id="process-title" title="How an engagement runs.">
                        The same four steps whether it&apos;s a two week penetration test or a year long product
                        build.
                    </SectionHeading>
                </div>

                <ol ref={ref} className="relative">
                    <span aria-hidden className="absolute bottom-6 left-5 top-6 w-0.5 bg-line" />
                    <motion.span
                        aria-hidden
                        className="absolute bottom-6 left-5 top-6 w-0.5 origin-top bg-royal"
                        style={{ scaleY: fill }}
                    />
                    {approachSteps.map((step, i) => (
                        <Step
                            key={step.title}
                            index={i}
                            total={approachSteps.length}
                            progress={fill}
                            title={step.title}
                            detail={step.detail}
                        />
                    ))}
                </ol>
            </div>
        </section>
    );
}

interface StepProps {
    index: number;
    total: number;
    progress: MotionValue<number>;
    title: string;
    detail: string;
}

function Step({ index, total, progress, title, detail }: StepProps) {
    const at = index / (total - 1);
    const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1]);
    const bg = useTransform(lit, [0, 1], ["#ffffff", "#1a56db"]);
    const color = useTransform(lit, [0, 1], ["#1a56db", "#ffffff"]);
    const textOpacity = useTransform(lit, [0, 1], [0.35, 1]);

    return (
        <li className="relative flex gap-6 pb-14 last:pb-0">
            <motion.span
                style={{ backgroundColor: bg, color }}
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-royal text-base font-bold"
            >
                {index + 1}
            </motion.span>
            <motion.div style={{ opacity: textOpacity }} className="pt-1">
                <h3 className="text-2xl font-bold text-ink">{title}</h3>
                <p className="mt-2 max-w-[44ch] text-lg text-muted">{detail}</p>
            </motion.div>
        </li>
    );
}
