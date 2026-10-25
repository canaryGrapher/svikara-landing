/**
 * Svikara's own products, loaded from content/products.json.
 * Edit that file to add or change a product; this module only checks and types it.
 */
import data from "@/content/products.json";
import { ContentError, optionalText, readList, requireOneOf, requireText, requireTextList } from "./validate";

const FILE = "products.json";
const STATUSES = ["In development", "Early access", "Available"] as const;

export interface Product {
    slug: string;
    name: string;
    /** Optional path to an SVG or PNG logo in /public, for example /products/peepalrp.svg */
    logo?: string;
    category: string;
    status: (typeof STATUSES)[number];
    tagline: string;
    summary: string;
    features: string[];
}

function readLogo(i: number, entry: Record<string, unknown>): string | undefined {
    const logo = optionalText(FILE, i, entry, "logo");
    if (logo && !logo.startsWith("/")) {
        throw new ContentError(FILE, i, `"logo" must start with / and point inside /public, for example /products/peepalrp.svg`);
    }
    return logo;
}

function parse(raw: unknown): Product[] {
    return readList(FILE, raw, "products").map((entry, i) => ({
        logo: readLogo(i, entry),
        slug: requireText(FILE, i, entry, "slug"),
        name: requireText(FILE, i, entry, "name"),
        category: requireText(FILE, i, entry, "category"),
        status: requireOneOf(FILE, i, entry, "status", STATUSES),
        tagline: requireText(FILE, i, entry, "tagline"),
        summary: requireText(FILE, i, entry, "summary"),
        features: requireTextList(FILE, i, entry, "features"),
    }));
}

export const products: Product[] = parse(data);
