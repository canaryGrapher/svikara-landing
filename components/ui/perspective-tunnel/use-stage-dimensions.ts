"use client";

import { useEffect, useState } from "react";
import type { StageDimensions } from "./types";

const MOBILE_BREAKPOINT = 768;

export function useStageDimensions(): StageDimensions {
    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    useEffect(() => {
        const update = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < MOBILE_BREAKPOINT,
            });
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return stage;
}
