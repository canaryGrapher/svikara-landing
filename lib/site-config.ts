/**
 * Business details used across the site. Replace the placeholder
 * contact values before going live.
 */
export const siteConfig = {
    name: "Svikara Infotech",
    shortName: "Svikara",
    description:
        "Cybersecurity, compliance, software development and technology consulting for growing businesses.",
    email: "hello@svikara.in", // TODO: replace with the real inbox
    location: "India",
    nav: [
        { label: "Services", href: "/services" },
        { label: "Clients", href: "/clients" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Contact", href: "/contact" },
    ],
} as const;
