"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedMark } from "./animated-mark";
import { AnimatedType } from "./animated-type";

interface AnimatedLogoProps {
    className?: string;
    /** Reversed colours for dark backgrounds */
    inverted?: boolean;
}

/**
 * The full Svikara Infotech logo assembling itself: the two halves of the S slide
 * together, the pixel squares pop out, SVIKARA rises letter by letter and
 * INFOTECH with the tagline fades in. Total run time is about 2.2 seconds.
 */
export function AnimatedLogo({ className, inverted = true }: AnimatedLogoProps) {
    const reduce = useReducedMotion();
    const initial = reduce ? "shown" : "hidden";
    const tone = inverted ? "light" : "color";

    return (
        <div className={cn("flex flex-col items-center", className)} role="img" aria-label="Svikara Infotech">
            <AnimatedMark
                tone={tone}
                initial={initial}
                className="h-20 drop-shadow-[0_0_24px_rgba(97,165,250,0.45)] sm:h-24"
            />
            <AnimatedType tone={tone} initial={initial} className="mt-4 h-14 sm:h-16" />
        </div>
    );
}
