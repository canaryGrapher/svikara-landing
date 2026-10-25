"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wordmark } from "@/components/brand/wordmark";
import { CtaLink } from "@/components/brand/cta-link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { useHeaderState } from "./use-header-state";

export function SiteHeader() {
    const { pathname, overHero } = useHeaderState();

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
                overHero
                    ? "border-b border-transparent bg-transparent"
                    : "border-b border-line/70 bg-paper/85 backdrop-blur-md"
            )}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                {/* The hero already shows the big animated logo, so the small one waits */}
                <motion.div
                    inert={overHero}
                    animate={{ opacity: overHero ? 0 : 1, y: overHero ? -8 : 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Wordmark />
                </motion.div>

                <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
                    {siteConfig.nav.filter((item) => item.href !== "/contact").map((item) => {
                        const active = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                    "relative text-[0.95rem] transition-colors",
                                    overHero ? "text-white/85 hover:text-white" : "text-muted hover:text-ink",
                                    active && !overHero && "text-ink"
                                )}
                            >
                                {item.label}
                                {active && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-royal"
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <CtaLink href="/contact" className="h-10 px-5">
                        Book a consultation
                    </CtaLink>
                </nav>

                <MobileNav inverted={overHero} />
            </div>
        </header>
    );
}
