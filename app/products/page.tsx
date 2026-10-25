import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CtaLink } from "@/components/brand/cta-link";
import { ProductList } from "@/components/products/product-list";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
    title: "Products",
    description: "Software products designed and built by Svikara Infotech.",
};

export default function ProductsPage() {
    return (
        <>
            <PageHero
                title="Our products."
                intro="Software that is ready to run your operations, set up and supported by the Svikara team."
            >
                <CtaLink href="/contact">Request a demo</CtaLink>
            </PageHero>
            <section aria-label="Products" className="bg-paper pb-28">
                <div className="mx-auto max-w-6xl px-5 sm:px-8">
                    <ProductList />
                </div>
            </section>
            <CtaBand title="Want to see it in action?" />
        </>
    );
}
