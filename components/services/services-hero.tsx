import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";
import { CtaLink } from "@/components/brand/cta-link";
import { tunnelSlides } from "@/lib/content/tunnel-slides";

export function ServicesHero() {
    return (
        <PerspectiveTunnelHero images={tunnelSlides} scrollHint="Scroll to fly through our services">
            <h1 className="text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ink sm:text-7xl md:text-[5.5rem]">
                Everything you need to build and protect.
            </h1>
            <p className="mt-6 max-w-[44ch] text-pretty text-base text-muted sm:text-lg">
                Cybersecurity and compliance, software development and technology consulting, delivered by one
                team that answers for all of it.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
                <CtaLink href="/contact">Book a consultation</CtaLink>
                <CtaLink href="#cybersecurity" variant="outline">
                    Jump to services
                </CtaLink>
            </div>
        </PerspectiveTunnelHero>
    );
}
