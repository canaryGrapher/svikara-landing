import { cn } from "@/lib/utils";
import { LOGO_VIEWBOX, LOGO_STROKE, SKY_ARC, ROYAL_ARC } from "@/components/brand/logo-geometry";

type Arcs = "both" | "outer" | "inner";

interface LogoMarkProps {
    className?: string;
    /** Which of the two interlocking arcs to draw. */
    arcs?: Arcs;
    title?: string;
}

/**
 * The Svikara mark: two offset arcs, sky behind and royal in front.
 * Drawing just one arc gives the per-service glyphs.
 */
export function LogoMark({ className, arcs = "both", title }: LogoMarkProps) {
    const showOuter = arcs !== "inner";
    const showInner = arcs !== "outer";

    return (
        <svg
            viewBox={LOGO_VIEWBOX}
            fill="none"
            strokeLinecap="round"
            strokeWidth={LOGO_STROKE}
            className={cn("h-8 w-auto", className)}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
        >
            {title ? <title>{title}</title> : null}
            {showOuter && <path d={SKY_ARC} stroke="var(--color-sky)" />}
            {showInner && <path d={ROYAL_ARC} stroke="var(--color-royal)" />}
        </svg>
    );
}
