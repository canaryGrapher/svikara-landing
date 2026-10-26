/**
 * Colours of the Svikara Infotech logo, sampled from the master artwork.
 * "color" is the original artwork for light backgrounds; "light" is the
 * reversed version for dark backgrounds, where navy would disappear.
 */
export type LogoTone = "color" | "light";

export interface MarkPalette {
    upper: string;
    /** Bottom half gradient, from lower left to right */
    lowerFrom: string;
    lowerTo: string;
    /** Pixel squares, indexed by Pixel.shade (darkest first) */
    pixels: readonly [string, string, string, string];
}

export interface TypePalette {
    letters: string;
    accent: string;
    tagline: string;
}

export const MARK_PALETTE: Record<LogoTone, MarkPalette> = {
    color: {
        upper: "#07225a",
        lowerFrom: "#00104a",
        lowerTo: "#0066ff",
        pixels: ["#00124b", "#022873", "#01338c", "#0052e3"],
    },
    light: {
        upper: "#ffffff",
        lowerFrom: "#2f6fed",
        lowerTo: "#7cb8ff",
        pixels: ["#2f6fed", "#4d8ff5", "#9cc8ff", "#ffffff"],
    },
};

export const TYPE_PALETTE: Record<LogoTone, TypePalette> = {
    color: { letters: "#0e1c4f", accent: "#0a5ce0", tagline: "#0e1c4f" },
    light: { letters: "#ffffff", accent: "#7cb8ff", tagline: "rgba(255,255,255,0.8)" },
};
