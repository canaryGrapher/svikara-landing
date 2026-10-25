import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CtaLink } from "@/components/brand/cta-link";
import { LogoWall } from "@/components/clients/logo-wall";
import { Industries } from "@/components/clients/industries";
import { EngagementModels } from "@/components/clients/engagement-models";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
    title: "Partners and clients",
    description: "The businesses Svikara Infotech builds and secures software for, and how we work together.",
};

export default function ClientsPage() {
    return (
        <>
            <PageHero
                title="Partners and clients."
                intro="Startups and growing businesses trust us with the software they run on and the data they hold. Here's who we work with and how."
            >
                <CtaLink href="/contact">Become a client</CtaLink>
            </PageHero>
            <LogoWall />
            <Industries />
            <EngagementModels />
            <CtaBand title="Your logo could be next." />
        </>
    );
}
