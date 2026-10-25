import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProductList } from "@/components/products/product-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { products } from "@/lib/content/products";

/** Home page teaser for the products page. */
export function ProductsShowcase() {
    if (products.length === 0) return null;

    return (
        <section aria-labelledby="products-title" className="relative z-10 bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading id="products-title" title="Our products.">
                        Ready-to-use software for your organisation, backed by our team.
                    </SectionHeading>
                    <Link href="/products" className="font-semibold text-royal hover:underline">
                        See all products
                    </Link>
                </div>
                <Reveal className="mt-14">
                    <ProductList />
                </Reveal>
            </div>
        </section>
    );
}
