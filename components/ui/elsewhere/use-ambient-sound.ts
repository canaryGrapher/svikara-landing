"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createAmbientEngine, type AmbientEngine } from "./ambient-engine";

type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };

/**
 * Owns the AudioContext for the hero soundscape. The context is only created
 * on the first user click, as browsers require.
 */
export function useAmbientSound(isNight: boolean) {
    const ctxRef = useRef<AudioContext | null>(null);
    const engineRef = useRef<AmbientEngine | null>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        engineRef.current?.setNight(isNight);
    }, [isNight]);

    useEffect(() => {
        return () => {
            engineRef.current?.dispose();
            ctxRef.current?.close();
        };
    }, []);

    const toggleMuted = useCallback(() => {
        if (!ctxRef.current) {
            const AudioCtx = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;
            if (!AudioCtx) return;

            const ctx = new AudioCtx();
            const engine = createAmbientEngine(ctx);
            ctxRef.current = ctx;
            engineRef.current = engine;
            engine.setNight(isNight);
            engine.setMuted(false);
            setMuted(false);
            return;
        }

        if (ctxRef.current.state === "suspended") ctxRef.current.resume();

        setMuted((value) => {
            engineRef.current?.setMuted(!value);
            return !value;
        });
    }, [isNight]);

    return { muted, toggleMuted };
}
