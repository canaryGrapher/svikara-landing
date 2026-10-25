"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * On the home page the header floats over the dark video hero until the
 * visitor scrolls most of the way past it. Every other page gets the solid header.
 */
export function useHeaderState() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [pastHero, setPastHero] = useState(false);

    useEffect(() => {
        if (!isHome) return;
        const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    return { pathname, overHero: isHome && !pastHero };
}
