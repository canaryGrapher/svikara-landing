"use client";

import { animate, motion, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { buildTunnelCards } from "./perspective-tunnel/build-cards";
import { TunnelCard } from "./perspective-tunnel/tunnel-card";
import { useCameraParallax } from "./perspective-tunnel/use-camera-parallax";
import { useStageDimensions } from "./perspective-tunnel/use-stage-dimensions";
import { useTunnelScroll } from "./perspective-tunnel/use-tunnel-scroll";
import type { TunnelImage } from "./perspective-tunnel/types";

export type { TunnelImage } from "./perspective-tunnel/types";

interface PerspectiveTunnelHeroProps {
    images: TunnelImage[];
    /** Centre content: headline, copy and calls to action. */
    children: ReactNode;
    scrollHint?: string;
    /** Progress the tunnel glides to on load, so a few cards are visible. */
    introProgress?: number;
}

export default function PerspectiveTunnelHero({
    images,
    children,
    scrollHint = "Scroll to explore",
    introProgress = 0.14,
}: PerspectiveTunnelHeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion() ?? false;
    const stage = useStageDimensions();
    const cards = useMemo(() => buildTunnelCards(images), [images]);
    // Phones have less room around the headline, so the intro glides a shorter way in.
    const restProgress = stage.isMobile ? introProgress * 0.55 : introProgress;

    const { progress, target } = useTunnelScroll({ containerRef, reduceMotion: reduce });
    const pointer = useCameraParallax(!reduce);

    useEffect(() => {
        if (reduce) return;
        const controls = animate(target, restProgress, { duration: 2.4, ease: [0.22, 1, 0.36, 1] });
        return () => controls.stop();
    }, [target, restProgress, reduce]);

    // The headline sits above the cards, so it clears out early and lets the imagery take over.
    const titleScale = useTransform(progress, [restProgress, 0.45], [1, 1.15]);
    const titleOpacity = useTransform(progress, [restProgress + 0.04, 0.4], [1, 0]);
    const promptOpacity = useTransform(progress, [restProgress, restProgress + 0.1], [1, 0]);

    return (
        <section
            ref={containerRef}
            aria-label="Introduction"
            className="relative h-[100svh] w-full select-none overflow-hidden bg-paper text-ink"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c7d2e0_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-80" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,86,219,0.12)_0%,transparent_70%)]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-royal/15" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky/40" />

            {/* The stage must not clip, or the browser flattens 3D and cannot depth-sort cards around the title. */}
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
            >
                <motion.div
                    style={{ scale: titleScale, opacity: titleOpacity, z: 0 }}
                    className="pointer-events-none relative flex max-w-3xl flex-col items-center px-6 text-center"
                >
                    {children}
                </motion.div>

                {!reduce && (
                    <motion.div
                        style={{ opacity: promptOpacity }}
                        className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-sm text-muted"
                    >
                        <span>{scrollHint}</span>
                        <div className="h-6 w-px bg-gradient-to-b from-royal to-transparent" />
                    </motion.div>
                )}

                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {cards.map((card) => (
                        <TunnelCard
                            key={card.item.src}
                            card={card}
                            progress={progress}
                            pointer={pointer}
                            total={cards.length}
                            stage={stage}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
