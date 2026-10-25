"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import ElsewhereHero from "@/components/ui/elsewhere-hero";
import { AnimatedLogo } from "@/components/brand/animated-logo";

/**
 * Home hero: looping blue ribbon footage (public/videos/hero-ribbons.mp4) with the
 * Svikara logo drawing itself in. As the visitor scrolls,
 * the hero shrinks into a rounded card and the next section slides over it.
 * Sections that follow it must be `relative z-10` with a solid background.
 */
/** Darkens the centre behind the copy, where the ribbons are brightest. */
const HERO_OVERLAY =
    "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(5,10,25,0.6), rgba(5,10,25,0.2) 75%), linear-gradient(180deg, rgba(5,10,25,0.35), rgba(5,10,25,0) 30%, rgba(5,10,25,0.45))";

export function HomeHero() {
    const reduce = useReducedMotion();
    const [viewport, setViewport] = useState(900);
    const { scrollY } = useScroll();
    // The hero stays pinned behind the page, so progress comes from window scroll over one screen.
    const scrollYProgress = useTransform(scrollY, (y) => Math.min(1, Math.max(0, y / viewport)));

    useEffect(() => {
        const update = () => setViewport(window.innerHeight);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
    const radius = useTransform(scrollYProgress, [0, 0.4], [0, 36]);
    const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

    return (
        <div className="sticky top-0 z-0 h-[100dvh] min-h-[600px] bg-ink">
            <motion.div
                className="h-full origin-top overflow-hidden"
                style={reduce ? undefined : { scale, borderRadius: radius }}
            >
                <ElsewhereHero
                    brand="Svikara Infotech"
                    showNav={false}
                    daySrc="/videos/hero-ribbons.mp4"
                    nightSrc={false}
                    poster="/videos/hero-ribbons.jpg"
                    overlay={HERO_OVERLAY}
                    objectPosition="50% 50%"
                    logo={<AnimatedLogo className="mb-6 sm:mb-8" />}
                    revealDelay={1.5}
                    headline="Built by day. Guarded by night."
                    subline="We design and ship your web platforms, apps and APIs, then test, monitor and harden them so nothing slips through."
                    primaryCta={{ label: "Book a free consultation", href: "/contact" }}
                    listenLabel="Listen"
                    soundHint="Turn on the sound"
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-ink"
                    style={{ opacity: reduce ? 0 : dim }}
                />
            </motion.div>
        </div>
    );
}
