"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

const WHEEL_SPEED = 0.0008;
const TOUCH_SPEED = 0.0025;
const TOP_TOLERANCE_PX = 4;
/** Where the tunnel rests when the visitor prefers reduced motion. */
const REDUCED_MOTION_PROGRESS = 0.45;

interface Options {
    containerRef: RefObject<HTMLElement | null>;
    reduceMotion: boolean;
}

interface TunnelScroll {
    /** Smoothed progress for rendering. */
    progress: MotionValue<number>;
    /** Raw target progress; animate this to move the tunnel. */
    target: MotionValue<number>;
}

/**
 * Turns wheel and touch input into tunnel progress (0..1) while the hero
 * fills the viewport. Once progress reaches either end, input is released
 * so the page scrolls normally to the content below.
 */
export function useTunnelScroll({ containerRef, reduceMotion }: Options): TunnelScroll {
    const rawProgress = useMotionValue(reduceMotion ? REDUCED_MOTION_PROGRESS : 0);
    const smoothProgress = useSpring(rawProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.0001,
    });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        if (reduceMotion) {
            rawProgress.jump(REDUCED_MOTION_PROGRESS);
            smoothProgress.jump(REDUCED_MOTION_PROGRESS);
            return;
        }

        /** Applies a delta and reports whether the tunnel consumed it. */
        const advance = (delta: number): boolean => {
            const atTop = Math.abs(el.getBoundingClientRect().top) <= TOP_TOLERANCE_PX;
            if (!atTop) return false;

            const current = rawProgress.get();
            const leavingForward = delta > 0 && current >= 1;
            const leavingBackward = delta < 0 && current <= 0;
            if (leavingForward || leavingBackward) return false;

            rawProgress.set(Math.min(1, Math.max(0, current + delta)));
            return true;
        };

        const onWheel = (e: WheelEvent) => {
            if (advance(e.deltaY * WHEEL_SPEED)) e.preventDefault();
        };

        let lastTouchY: number | null = null;
        const onTouchStart = (e: TouchEvent) => {
            lastTouchY = e.touches[0]?.clientY ?? null;
        };
        const onTouchMove = (e: TouchEvent) => {
            const y = e.touches[0]?.clientY;
            if (y === undefined || lastTouchY === null) return;
            const delta = (lastTouchY - y) * TOUCH_SPEED;
            lastTouchY = y;
            if (advance(delta)) e.preventDefault();
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => {
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
        };
    }, [containerRef, reduceMotion, rawProgress, smoothProgress]);

    return { progress: smoothProgress, target: rawProgress };
}
