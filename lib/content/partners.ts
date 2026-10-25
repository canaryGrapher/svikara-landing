/**
 * Partners and clients, loaded from content/clients.json.
 * Edit that file to add, remove or reorder clients; this module only checks and types it.
 */
import data from "@/content/clients.json";
import { ContentError, optionalFlag, optionalText, readList, requireOneOf, requireText } from "./validate";

const FILE = "clients.json";
const KINDS = ["client", "technology-partner"] as const;

export interface Partner {
    name: string;
    sector: string;
    kind: (typeof KINDS)[number];
    /** Optional path to an SVG or PNG logo in /public */
    logo?: string;
    sample?: boolean;
}

function parse(raw: unknown): Partner[] {
    return readList(FILE, raw, "clients").map((entry, i) => {
        const logo = optionalText(FILE, i, entry, "logo");
        if (logo && !logo.startsWith("/")) {
            throw new ContentError(FILE, i, `"logo" must start with / and point inside /public, for example /partners/acme.svg`);
        }
        return {
            name: requireText(FILE, i, entry, "name"),
            sector: requireText(FILE, i, entry, "sector"),
            kind: requireOneOf(FILE, i, entry, "kind", KINDS),
            logo,
            sample: optionalFlag(FILE, i, entry, "sample"),
        };
    });
}

export const partners: Partner[] = parse(data);

export const hasSamplePartners = partners.some((p) => p.sample);
