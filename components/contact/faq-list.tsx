"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { faqs } from "@/lib/content/faqs";

export function FaqList() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section aria-labelledby="faq-title" className="bg-white py-24 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
                <SectionHeading id="faq-title" title="Questions we often hear." />

                <ul className="divide-y divide-line border-y border-line">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        const panelId = `faq-panel-${i}`;
                        return (
                            <li key={faq.question}>
                                <h3>
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink"
                                    >
                                        {faq.question}
                                        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-royal">
                                            <Plus className="size-5" aria-hidden />
                                        </motion.span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={panelId}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-[60ch] pb-6 text-muted">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
