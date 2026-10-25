import type { MotionValue } from "framer-motion";

export interface TunnelImage {
    src: string;
    title: string;
}

export interface TunnelCardData {
    item: TunnelImage;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

export interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

export interface PointerMotion {
    x: MotionValue<number>;
    y: MotionValue<number>;
}
