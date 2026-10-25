import type { CSSProperties, ReactNode } from "react";

export interface ElsewhereLink {
    label: string;
    href: string;
}

export interface ElsewhereHeroProps {
    daySrc?: string;
    /** Second clip for the day/night toggle. Pass false for a single video and no toggle. */
    nightSrc?: string | false;
    /** Still image shown until the first video frame loads */
    poster?: string;
    /** CSS background layered over the video to keep text readable */
    overlay?: string;
    /** Brand shown top-left in the built-in navigation bar */
    brand?: string;
    /** Navigation links (hidden on small screens) */
    links?: ElsewhereLink[];
    /** Call to action in the navigation bar */
    navCta?: ElsewhereLink | false;
    /** Set false when the page already has its own header */
    showNav?: boolean;
    /** Rendered above the headline, for example an animated logo */
    logo?: ReactNode;
    headline?: string;
    subline?: string;
    /** Optional copy shown while the night footage plays */
    nightHeadline?: string;
    nightSubline?: string;
    primaryCta?: ElsewhereLink;
    /** Label of the second button, which turns the soundscape on and off */
    listenLabel?: string;
    listenOffLabel?: string;
    /** Small hint next to the sound button. Set to "" to hide it. */
    soundHint?: string;
    /** Seconds before the headline lines start rising in */
    revealDelay?: number;
    signature?: { name: string; url: string } | false;
    objectPosition?: string;
    className?: string;
    style?: CSSProperties;
}
