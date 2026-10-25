import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo-mark";

interface WordmarkProps {
    className?: string;
    inverted?: boolean;
}

export function Wordmark({ className, inverted = false }: WordmarkProps) {
    return (
        <Link
            href="/"
            aria-label="Svikara Infotech, home"
            className={cn("flex items-center gap-2.5 rounded-md", className)}
        >
            <LogoMark className="h-8" />
            <span className="flex flex-col leading-none">
                <span className={cn("text-xl font-bold tracking-tight", inverted ? "text-white" : "text-ink")}>
                    Svikara
                </span>
                <span
                    className={cn(
                        "mt-1 text-[0.6rem] tracking-[0.42em]",
                        inverted ? "text-sky" : "text-slate-logo"
                    )}
                >
                    INFOTECH
                </span>
            </span>
        </Link>
    );
}
