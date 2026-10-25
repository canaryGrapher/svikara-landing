"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav({ inverted = false }: { inverted?: boolean }) {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className={cn(
                    "flex size-10 items-center justify-center rounded-full",
                    inverted && !open ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
                )}
            >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        id="mobile-menu"
                        aria-label="Mobile"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-x-0 top-16 border-b border-line bg-paper px-5 pb-6 pt-2 shadow-lg shadow-ink/5"
                    >
                        <ul className="flex flex-col">
                            <li>
                                <Link href="/" onClick={close} className="block border-b border-line py-3.5 text-lg text-ink">
                                    Home
                                </Link>
                            </li>
                            {siteConfig.nav.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={close}
                                        className="block border-b border-line py-3.5 text-lg text-ink"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
}
