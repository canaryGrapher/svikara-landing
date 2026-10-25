"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { PointerMotion, StageDimensions, TunnelCardData } from "./types";

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: PointerMotion;
    total: number;
    stage: StageDimensions;
}

const STAGGER_SPAN = 0.55;

export function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
    const start = (card.index / total) * (1 - STAGGER_SPAN);
    const end = start + STAGGER_SPAN;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(130, Math.min(180, stage.width * 0.38))
        : Math.max(180, Math.min(270, stage.width * 0.18));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform([z, pointer.x, pointer.y], ([currZ, px, py]: number[]) => {
        const offsetX = baseX - px * panStrength;
        const offsetY = baseY - py * panStrength;
        return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    });

    return (
        <motion.div
            style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
            className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] select-none will-change-transform"
        >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-ink/25 ring-1 ring-ink/10 transition-shadow duration-500 hover:ring-2 hover:ring-royal">
                {/* eslint-disable-next-line @next/next/no-img-element -- remote art inside a 3D transform; next/image adds no value here */}
                <img
                    src={card.item.src}
                    alt=""
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-4 sm:p-5">
                    <span className="text-sm font-semibold text-white drop-shadow-md sm:text-base">
                        {card.item.title}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
