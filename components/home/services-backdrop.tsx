"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { MARK_VIEWBOX, PIXELS, S_LOWER, S_UPPER } from "@/components/brand/logo-paths";

interface ServicesBackdropProps {
    /** Scroll progress of the pinned services section, 0..1 */
    progress: MotionValue<number>;
}

/**
 * Eases in from the page's paper tone, peaks at a soft blue, and eases back out to
 * white so it hands over cleanly to the white section that follows. Extra stops
 * approximate an ease-in-out curve so there is no visible band.
 */
const BASE =
    "linear-gradient(180deg, #f7f7f7 0%, #f3f6fb 8%, #eaf0fa 20%, #e2eaf8 34%, #dfe8f7 50%, #e2eaf8 64%, #eaf0fa 78%, #f4f7fc 90%, #ffffff 100%)";

/** Fades the decorations out at the top and bottom edges, matching the base gradient. */
const EDGE_MASK = "linear-gradient(180deg, transparent 0%, #000 22%, #000 70%, transparent 96%)";

/**
 * Abstract backdrop for the services scroller: drifting colour blobs, a dot grid,
 * and the logo S drawn large in outline, turning as the visitor scrolls.
 * The base gradient is an inline style so the section is never see-through.
 */
export function ServicesBackdrop({ progress }: ServicesBackdropProps) {
    const reduce = useReducedMotion();
    const spin = useTransform(progress, [0, 1], [0, 140]);
    const counterSpin = useTransform(progress, [0, 1], [0, -90]);
    const drift = useTransform(progress, [0, 1], ["0%", "-18%"]);

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            style={{ background: BASE }}
        >
            <div className="absolute inset-0" style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}>
                <div className="absolute inset-0 bg-[radial-gradient(#b9c8e3_1px,transparent_1px)] [background-size:26px_26px] opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_40%,transparent_100%)]" />

                <Blob
                    className="-left-[10%] top-[8%] size-[38rem] bg-sky/35"
                    animate={!reduce}
                    duration={22}
                    path={[0, 60, -30, 0]}
                />
                <Blob
                    className="right-[-8%] top-[30%] size-[32rem] bg-royal/20"
                    animate={!reduce}
                    duration={26}
                    path={[0, -50, 40, 0]}
                />
                <Blob
                    className="bottom-[-18%] left-[35%] size-[28rem] bg-sky/25"
                    animate={!reduce}
                    duration={19}
                    path={[0, 40, -40, 0]}
                />

                <motion.svg
                    viewBox={MARK_VIEWBOX}
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    className="absolute -right-[12%] top-1/2 h-[120vh] w-auto -translate-y-1/2 opacity-[0.16]"
                    style={reduce ? undefined : { rotate: spin, x: drift }}
                >
                    <path d={S_UPPER} stroke="var(--color-royal)" />
                    <path d={S_LOWER} stroke="var(--color-sky)" />
                    {PIXELS.map((p) => (
                        <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={p.size} height={p.size} stroke="var(--color-royal)" />
                    ))}
                </motion.svg>

                <motion.svg
                    viewBox="0 0 100 100"
                    fill="none"
                    className="absolute -left-[6%] bottom-[-10%] h-[50vh] w-auto opacity-[0.22]"
                    style={reduce ? undefined : { rotate: counterSpin }}
                >
                    <circle cx="50" cy="50" r="46" stroke="var(--color-royal)" strokeWidth={1} strokeDasharray="2 5" />
                    <circle cx="50" cy="50" r="32" stroke="var(--color-sky)" strokeWidth={1.5} />
                </motion.svg>
            </div>
        </div>
    );
}

interface BlobProps {
    className: string;
    animate: boolean;
    duration: number;
    path: number[];
}

/** A soft, blurred colour field that wanders slowly on a loop. */
function Blob({ className, animate, duration, path }: BlobProps) {
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl ${className}`}
            animate={animate ? { x: path, y: path.map((v) => -v * 0.6), scale: [1, 1.08, 0.96, 1] } : undefined}
            transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}
