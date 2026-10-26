import type { Variants } from "framer-motion";

/** Shared timing for the animated logo. Total run time is about 2.2 seconds. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** The two halves of the S slide together from opposite sides. custom = horizontal offset */
export const halfVariants: Variants = {
    hidden: (dx: number) => ({ x: dx, opacity: 0 }),
    shown: (dx: number) => ({
        x: 0,
        opacity: 1,
        transition: { duration: 1, ease: EASE, delay: dx < 0 ? 0.1 : 0.3 },
    }),
};

/** Pixel squares pop in one after another. custom = delay */
export const pixelVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    shown: (delay: number) => ({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.45, ease: EASE, delay },
    }),
};

/** SVIKARA rises letter by letter. custom = letter index */
export const letterVariants: Variants = {
    hidden: { y: 140, opacity: 0 },
    shown: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 0.7, ease: EASE, delay: 1 + i * 0.05 },
    }),
};

/** INFOTECH, its rules and the tagline fade in last. custom = delay */
export const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    shown: (delay: number) => ({ opacity: 1, transition: { duration: 0.8, ease: EASE, delay } }),
};

/** The INFOTECH rules draw outwards from the lettering */
export const ruleVariants: Variants = {
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 1.5 } },
};
