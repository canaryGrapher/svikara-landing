/**
 * Business details used across the site. Replace the placeholder
 * contact values before going live.
 */

/** Switch sections on or off without deleting them. */
export const features = {
    /** Testimonials are hidden for now; set to true to bring back the home section, nav link and page. */
    testimonials: false,
} as const;

const allNav = [
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Clients", href: "/clients" },
    { label: "Testimonials", href: "/testimonials", enabled: features.testimonials },
    { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
    name: "Svikara Infotech",
    shortName: "Svikara",
    description:
        "Cybersecurity, compliance, software development and technology consulting for growing businesses.",
    email: "hello@svikara.in", // TODO: replace with the real inbox
    location: "India",
    nav: allNav.filter((item) => !("enabled" in item) || item.enabled),
} as const;
