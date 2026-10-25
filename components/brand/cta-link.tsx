import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CtaLinkProps {
    href: string;
    children: ReactNode;
    variant?: "solid" | "outline";
    className?: string;
}

const variants = {
    solid: "bg-royal text-white hover:bg-royal-deep",
    outline: "border border-ink/20 bg-white/70 text-ink backdrop-blur hover:border-royal hover:text-royal",
};

export function CtaLink({ href, children, variant = "solid", className }: CtaLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-flex h-11 items-center justify-center rounded-full px-6 text-[0.95rem] font-semibold transition-colors",
                variants[variant],
                className
            )}
        >
            {children}
        </Link>
    );
}
