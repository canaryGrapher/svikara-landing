import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo-mark";
import { LogoType } from "./logo-type";

interface WordmarkProps {
    className?: string;
    inverted?: boolean;
}

/** Horizontal logo lockup linking home: the S mark beside the SVIKARA / INFOTECH lettering. */
export function Wordmark({ className, inverted = false }: WordmarkProps) {
    const tone = inverted ? "light" : "color";

    return (
        <Link
            href="/"
            aria-label="Svikara Infotech, home"
            className={cn("flex items-center gap-2.5 rounded-md", className)}
        >
            <LogoMark tone={tone} className="h-10" />
            <LogoType tone={tone} className="h-9" />
        </Link>
    );
}
