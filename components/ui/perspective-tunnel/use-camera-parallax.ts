"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import type { PointerMotion } from "./types";

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

/** Tracks the pointer as a -1..1 value on each axis, smoothed by a spring. */
export function useCameraParallax(enabled: boolean): PointerMotion {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}
