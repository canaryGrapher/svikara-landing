"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { DayNightIcon, SoundIcon } from "./elsewhere/icons";
import { elsewhereCss } from "./elsewhere/styles";
import { useAmbientSound } from "./elsewhere/use-ambient-sound";
import type { ElsewhereHeroProps, ElsewhereLink } from "./elsewhere/types";

export type { ElsewhereHeroProps, ElsewhereLink } from "./elsewhere/types";

/**
 * Elsewhere: a full hero block.
 * Day and night footage that cross-fade, an ambient soundscape generated live with the
 * Web Audio API, an optional navigation bar, a headline and two calls to action.
 * The "Listen" button turns the soundscape on.
 */

const DEFAULT_DAY =
    "https://cdn.21st.dev/assets/mirror/a6/a639af57ee941fdd518c604efb043501ad0e815dcce9f7efba850998bafa3453.mp4";
const DEFAULT_NIGHT =
    "https://cdn.21st.dev/assets/mirror/4b/4badf32b0bc920a2fd1b066182eee89e98d8615f680e01fb19ff62fb56e86872.mp4";

const DEFAULT_LINKS: ElsewhereLink[] = [];
const SANS = "inherit";
const COL_TEXT = "#ffffff";

export default function ElsewhereHero({
    daySrc = DEFAULT_DAY,
    nightSrc = DEFAULT_NIGHT,
    brand = "Elsewhere",
    links = DEFAULT_LINKS,
    navCta = false,
    showNav = true,
    logo,
    headline = "Work from somewhere else.",
    subline = "Ambient soundscapes that follow the day.",
    nightHeadline,
    nightSubline,
    primaryCta = { label: "Start focusing", href: "#start" },
    listenLabel = "Listen",
    listenOffLabel = "Pause sound",
    soundHint = "Turn on the sound",
    revealDelay = 0.15,
    signature = false,
    objectPosition = "42% 50%",
    poster,
    overlay = DEFAULT_OVERLAY,
    className,
    style,
}: ElsewhereHeroProps) {
    const [isNight, setIsNight] = useState(false);
    const [shown, setShown] = useState(false);
    const { muted, toggleMuted } = useAmbientSound(isNight);

    useEffect(() => {
        const raf = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    // Each line of the headline area rises in, a beat after the one before.
    const rise = (i: number): CSSProperties => ({
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transition: `opacity 1s ease ${revealDelay + i * 0.12}s, transform 1s cubic-bezier(.2,.7,.2,1) ${revealDelay + i * 0.12}s`,
    });

    const hasNight = Boolean(nightSrc);
    const title = isNight && nightHeadline ? nightHeadline : headline;
    const sub = isNight && nightSubline ? nightSubline : subline;

    return (
        <section
            className={className}
            aria-label={brand}
            style={{
                position: "relative",
                height: "100dvh",
                minHeight: 600,
                width: "100%",
                overflow: "hidden",
                background: "#0a0f1c",
                fontFamily: SANS,
                color: COL_TEXT,
                ...style,
            }}
        >
            <style>{elsewhereCss}</style>

            <video src={daySrc} poster={poster} autoPlay loop muted playsInline preload="auto" aria-hidden="true"
                style={{ ...videoStyle, objectPosition, opacity: isNight ? 0 : 1 }} />
            {hasNight && (
                <video src={nightSrc || undefined} autoPlay loop muted playsInline preload="auto" aria-hidden="true"
                    style={{ ...videoStyle, objectPosition, opacity: isNight ? 1 : 0 }} />
            )}

            {/* Keeps the headline readable over the footage */}
            <div style={{ ...overlayStyle, background: overlay }} />

            {showNav && (
                <header className="ew-nav" style={rise(0)}>
                    <a href="#" className="ew-brand">{brand}</a>
                    <nav aria-label={brand} className="ew-links">
                        {links.map((l) => (
                            <a key={l.href + l.label} href={l.href} className="ew-link">{l.label}</a>
                        ))}
                    </nav>
                    {navCta && <a href={navCta.href} className="ew-glass ew-pill ew-small">{navCta.label}</a>}
                </header>
            )}

            <div className="ew-copy">
                {logo}
                <h1 className="ew-title" style={rise(1)}><span key={title} className="ew-swap">{title}</span></h1>
                <p className="ew-sub" style={rise(2)} aria-live="polite"><span key={sub} className="ew-swap">{sub}</span></p>
                <div className="ew-ctas" style={rise(3)}>
                    <a href={primaryCta.href} className="ew-pill ew-primary">{primaryCta.label}</a>
                    <button type="button" onClick={toggleMuted} aria-pressed={!muted} className="ew-glass ew-pill">
                        <SoundIcon muted={muted} size={16} />
                        {muted ? listenLabel : listenOffLabel}
                    </button>
                </div>
            </div>

            <div style={controlsStyle}>
                {hasNight && (
                    <button
                        type="button"
                        className="ew-icon"
                        onClick={() => setIsNight((v) => !v)}
                        aria-label={isNight ? "Switch to day" : "Switch to night"}
                        style={iconButtonStyle}
                    >
                        <DayNightIcon isNight={isNight} />
                    </button>
                )}
                <button
                    type="button"
                    className="ew-icon"
                    onClick={toggleMuted}
                    aria-label={muted ? "Unmute" : "Mute"}
                    style={iconButtonStyle}
                >
                    <SoundIcon muted={muted} size={18} />
                </button>
                {soundHint && muted && <span className="ew-hint" aria-hidden="true">← {soundHint}</span>}
            </div>

            {signature && (
                <span style={signatureStyle}>
                    by{" "}
                    <a href={signature.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                        {signature.name}
                    </a>
                </span>
            )}
        </section>
    );
}

const videoStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 1.2s ease",
};

const DEFAULT_OVERLAY =
    "linear-gradient(180deg, rgba(8,16,40,0.55), rgba(8,16,40,0.3) 45%, rgba(0,0,0,0) 64%, rgba(8,16,40,0.4))";

const overlayStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
};

const controlsStyle: CSSProperties = {
    position: "absolute",
    left: "clamp(14px, 3vw, 28px)",
    bottom: "clamp(14px, 3vh, 28px)",
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1.5vw, 12px)",
    zIndex: 2,
};

const iconButtonStyle: CSSProperties = {
    width: "clamp(38px, 6vw, 44px)",
    height: "clamp(38px, 6vw, 44px)",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(14px) saturate(150%)",
    WebkitBackdropFilter: "blur(14px) saturate(150%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    color: COL_TEXT,
};

const signatureStyle: CSSProperties = {
    position: "absolute",
    right: "clamp(12px, 2.5vw, 24px)",
    bottom: "clamp(10px, 2vw, 18px)",
    fontWeight: 500,
    fontSize: "clamp(11px, 1.4vw, 13px)",
    color: "rgba(255,255,255,0.6)",
    zIndex: 2,
};
