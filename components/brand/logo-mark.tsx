import { useId } from "react";
import { cn } from "@/lib/utils";
import { MARK_VIEWBOX, PIXELS, S_LOWER, S_LOWER_GRADIENT, S_UPPER } from "./logo-paths";
import { MARK_PALETTE, type LogoTone } from "./logo-palette";

export type MarkPart = "full" | "upper" | "lower";

interface LogoMarkProps {
    className?: string;
    /** Draw the whole S, or just one half with its pixel trail (the per-service glyphs). */
    part?: MarkPart;
    tone?: LogoTone;
    title?: string;
}

/** The Svikara S mark with its pixel squares, as vector paths traced from the artwork. */
export function LogoMark({ className, part = "full", tone = "color", title }: LogoMarkProps) {
    const gradientId = `svk-mark-${useId().replace(/[^\w-]/g, "")}`;
    const palette = MARK_PALETTE[tone];
    const showUpper = part !== "lower";
    const showLower = part !== "upper";
    const pixels = PIXELS.filter((p) => part === "full" || p.half === part);

    return (
        <svg
            viewBox={MARK_VIEWBOX}
            className={cn("h-8 w-auto shrink-0", className)}
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
        >
            {title ? <title>{title}</title> : null}
            <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" {...S_LOWER_GRADIENT}>
                    <stop offset="0" stopColor={palette.lowerFrom} />
                    <stop offset="1" stopColor={palette.lowerTo} />
                </linearGradient>
            </defs>
            {showUpper && <path d={S_UPPER} fill={palette.upper} />}
            {showLower && <path d={S_LOWER} fill={`url(#${gradientId})`} />}
            {pixels.map((p) => (
                <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width={p.size} height={p.size} fill={palette.pixels[p.shade]} />
            ))}
        </svg>
    );
}
