"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    /** How far the image drifts, as a percentage of its height */
    strength?: number;
}

/** An image that drifts slower than the page inside a clipped frame. */
export function ParallaxImage({ src, alt, className, strength = 12 }: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            <motion.div style={{ y }} className="absolute inset-[-14%]">
                {/* eslint-disable-next-line @next/next/no-img-element -- remote stock image with parallax transform */}
                <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
        </div>
    );
}
