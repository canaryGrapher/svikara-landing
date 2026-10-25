import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";

/** Cached at build time; the footer year refreshes on each deploy. */
async function getYear() {
    "use cache";
    return new Date().getFullYear();
}

const linkClass = "text-white/65 transition-colors hover:text-white";

export async function SiteFooter() {
    const year = await getYear();

    return (
        <footer className="bg-ink text-white">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <Wordmark inverted />
                    <p className="mt-5 max-w-[34ch] text-white/65">{siteConfig.description}</p>
                </div>

                <FooterColumn title="Services">
                    {services.map((s) => (
                        <Link key={s.slug} href={`/services#${s.slug}`} className={linkClass}>
                            {s.title}
                        </Link>
                    ))}
                </FooterColumn>

                <FooterColumn title="Company">
                    {siteConfig.nav.map((item) => (
                        <Link key={item.href} href={item.href} className={linkClass}>
                            {item.label}
                        </Link>
                    ))}
                </FooterColumn>

                <FooterColumn title="Get in touch">
                    <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                        {siteConfig.email}
                    </a>
                    <span className="text-white/65">{siteConfig.location}</span>
                </FooterColumn>
            </div>
            <div className="border-t border-white/10">
                <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-white/50 sm:px-8">
                    © {year} {siteConfig.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <p className="font-semibold">{title}</p>
            <div className="mt-4 flex flex-col gap-2.5 text-[0.95rem]">{children}</div>
        </div>
    );
}
