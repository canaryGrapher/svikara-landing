import { cn } from "@/lib/utils";
import {
    INFOTECH_LETTERS,
    INFOTECH_RULES,
    TAGLINE,
    WORD_DOTS,
    WORD_LETTERS,
    WORD_TAGLINE_VIEWBOX,
    WORD_VIEWBOX,
} from "./logo-paths";
import { TYPE_PALETTE, type LogoTone } from "./logo-palette";

interface LogoTypeProps {
    className?: string;
    tone?: LogoTone;
    /** Also draw EMPOWERING YOUR FUTURE beneath INFOTECH */
    tagline?: boolean;
}

/** The SVIKARA / INFOTECH lettering from the logo, as traced vector paths. */
export function LogoType({ className, tone = "color", tagline = false }: LogoTypeProps) {
    const palette = TYPE_PALETTE[tone];

    return (
        <svg
            viewBox={tagline ? WORD_TAGLINE_VIEWBOX : WORD_VIEWBOX}
            className={cn("h-8 w-auto shrink-0", className)}
            aria-hidden
        >
            <g fill={palette.letters}>
                {WORD_LETTERS.map((l, i) => (
                    <path key={i} d={l.d} />
                ))}
            </g>
            <g fill={palette.accent}>
                {WORD_DOTS.map((d, i) => (
                    <path key={i} d={d} />
                ))}
                {INFOTECH_LETTERS.map((d, i) => (
                    <path key={i} d={d} />
                ))}
                {INFOTECH_RULES.map((r) => (
                    <rect key={r.x} x={r.x} y={r.y + 1} width={r.width} height={5} rx={2.5} />
                ))}
            </g>
            {tagline && <path d={TAGLINE} fill={palette.tagline} />}
        </svg>
    );
}
