import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
    id?: string;
    title: string;
    children?: ReactNode;
    inverted?: boolean;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeading({
    id,
    title,
    children,
    inverted = false,
    align = "left",
    className,
}: SectionHeadingProps) {
    return (
        <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
            <SplitHeading
                id={id}
                text={title}
                className={cn(
                    "text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl",
                    inverted ? "text-white" : "text-ink"
                )}
            />
            {children ? (
                <Reveal delay={0.2} y={16}>
                    <p className={cn("mt-5 text-pretty text-lg", inverted ? "text-white/70" : "text-muted")}>
                        {children}
                    </p>
                </Reveal>
            ) : null}
        </div>
    );
}
