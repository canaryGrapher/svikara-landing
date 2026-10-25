import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SampleBadge } from "@/components/shared/sample-badge";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";
import { CtaBand } from "@/components/shared/cta-band";
import { hasSampleTestimonials } from "@/lib/content/testimonials";

export const metadata: Metadata = {
    title: "Testimonials",
    description: "What clients say about working with Svikara Infotech.",
};

export default function TestimonialsPage() {
    return (
        <>
            <PageHero
                title="In our clients' words."
                intro="Results from security audits, product builds and consulting engagements, told by the people we worked with."
            >
                {hasSampleTestimonials && <SampleBadge label="Sample testimonials, replace before launch" />}
            </PageHero>
            <TestimonialsGrid />
            <CtaBand title="Let's write your success story." />
        </>
    );
}
