/**
 * Client testimonials, loaded from content/testimonials.json.
 * Edit that file to change quotes; this module only checks and types it.
 * Entries with "sample": true are placeholders and are labelled as such on the site.
 */
import data from "@/content/testimonials.json";
import { optionalFlag, optionalText, readList, requireOneOf, requireText } from "./validate";

const FILE = "testimonials.json";
const SERVICES = ["Cybersecurity", "Development", "Consulting"] as const;

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    service: (typeof SERVICES)[number];
    /** Optional headline result, for example "Passed ISO 27001 audit" */
    result?: string;
    /** Shown in the stacked cards on the home page */
    featured?: boolean;
    sample?: boolean;
}

function parse(raw: unknown): Testimonial[] {
    return readList(FILE, raw, "testimonials").map((entry, i) => ({
        quote: requireText(FILE, i, entry, "quote"),
        name: requireText(FILE, i, entry, "name"),
        role: requireText(FILE, i, entry, "role"),
        company: requireText(FILE, i, entry, "company"),
        service: requireOneOf(FILE, i, entry, "service", SERVICES),
        result: optionalText(FILE, i, entry, "result"),
        featured: optionalFlag(FILE, i, entry, "featured"),
        sample: optionalFlag(FILE, i, entry, "sample"),
    }));
}

export const testimonials: Testimonial[] = parse(data);

/** Up to three featured testimonials for the home page, falling back to the first three. */
export const featuredTestimonials: Testimonial[] = (() => {
    const featured = testimonials.filter((t) => t.featured);
    return (featured.length > 0 ? featured : testimonials).slice(0, 3);
})();

export const hasSampleTestimonials = testimonials.some((t) => t.sample);
