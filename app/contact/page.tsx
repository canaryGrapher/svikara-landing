import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { ContactPanel } from "@/components/contact/contact-panel";
import { FaqList } from "@/components/contact/faq-list";

export const metadata: Metadata = {
    title: "Contact",
    description: "Book a free consultation with Svikara Infotech.",
};

export default function ContactPage() {
    return (
        <>
            <PageHero
                title="Tell us what you're working on."
                intro="The first call is free. You'll speak with a senior engineer, not a salesperson, and leave with a clear next step even if you don't hire us."
            />
            <ContactPanel />
            <FaqList />
        </>
    );
}
