import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/services-hero";
import { ServiceDetail } from "@/components/services/service-detail";
import { Overlap } from "@/components/services/overlap";
import { Compliance } from "@/components/services/compliance";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaBand } from "@/components/shared/cta-band";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
    title: "Services",
    description: "Cybersecurity and compliance, software development, and technology consulting from Svikara Infotech.",
};

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <section aria-label="Our services" className="bg-paper">
                <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    {services.map((service, i) => (
                        <ServiceDetail key={service.slug} service={service} flip={i % 2 === 1} />
                    ))}
                </div>
            </section>
            <Overlap />
            <Compliance />
            <ProcessTimeline />
            <CtaBand />
        </>
    );
}
