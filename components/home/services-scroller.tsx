"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content/services";
import { ServicePanel } from "./service-panel";
import { ServicesBackdrop } from "./services-backdrop";

/**
 * Pins the services while vertical scrolling slides them sideways.
 * The track's overflow width is measured so the last panel lands flush right.
 */
export function ServicesScroller() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
    const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="services-scroller-title"
            className="relative isolate z-10 overflow-clip"
            style={{ height: reduce ? "auto" : `calc(100vh + ${distance}px)`, backgroundColor: "#f7f7f7" }}
        >
            <div
                className={
                    reduce
                        ? "relative isolate py-20"
                        : "sticky top-0 isolate flex h-screen flex-col justify-center overflow-hidden pt-16"
                }
            >
                <ServicesBackdrop progress={scrollYProgress} />
                <div className="mx-auto mb-10 flex w-full max-w-6xl items-end justify-between gap-6 px-5 sm:px-8">
                    <h2
                        id="services-scroller-title"
                        className="max-w-xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl"
                    >
                        Three disciplines. One accountable team.
                    </h2>
                    {!reduce && (
                        <div className="hidden h-1 w-40 overflow-hidden rounded-full bg-line sm:block" aria-hidden>
                            <motion.div className="h-full origin-left bg-royal" style={{ scaleX: bar }} />
                        </div>
                    )}
                </div>

                <motion.div
                    ref={trackRef}
                    style={reduce ? undefined : { x }}
                    className={
                        reduce
                            ? "flex flex-col items-center gap-6 px-5"
                            : "flex w-max gap-6 pl-5 pr-5 sm:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]"
                    }
                >
                    {services.map((service) => (
                        <ServicePanel key={service.slug} service={service} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
