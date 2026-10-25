import { HomeHero } from "@/components/home/home-hero";
import { PartnersStrip } from "@/components/home/partners-strip";
import { Manifesto } from "@/components/home/manifesto";
import { ServicesScroller } from "@/components/home/services-scroller";
import { Highlights } from "@/components/home/highlights";
import { TestimonialsStack } from "@/components/home/testimonials-stack";
import { ProcessTimeline } from "@/components/shared/process-timeline";
import { CtaBand } from "@/components/shared/cta-band";

export default function HomePage() {
    return (
        <>
            <HomeHero />
            <PartnersStrip />
            <Manifesto />
            <ServicesScroller />
            <Highlights />
            <ProcessTimeline className="bg-paper" />
            <TestimonialsStack />
            <div className="relative z-10">
                <CtaBand />
            </div>
        </>
    );
}
