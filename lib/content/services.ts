export type ServiceKind = "security" | "development" | "consulting";

export interface Service {
    kind: ServiceKind;
    slug: string;
    title: string;
    tagline: string;
    summary: string;
    image: string;
    offerings: string[];
    outcomes: string[];
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1400&q=75&auto=format&fit=crop`;

export const services: Service[] = [
    {
        kind: "security",
        slug: "cybersecurity",
        title: "Cybersecurity and compliance",
        tagline: "Find the gaps before attackers do.",
        summary:
            "Penetration tests, audits and compliance programs that find the weak spots, fix them, and give you the evidence to prove it.",
        image: unsplash("photo-1550751827-4bd374c3f58b"),
        offerings: [
            "Vulnerability assessment and penetration testing",
            "ISO 27001 and SOC 2 readiness",
            "DPDP Act and GDPR data privacy programs",
            "Cloud security posture reviews",
            "Security policies, training and incident response plans",
        ],
        outcomes: [
            "A prioritised list of risks in plain language",
            "Fixes verified by a retest",
            "Audit-ready evidence and policies",
        ],
    },
    {
        kind: "development",
        slug: "development",
        title: "Software development",
        tagline: "Products that ship, scale and stay secure.",
        summary:
            "Web platforms, mobile apps and APIs built by engineers who write secure code by habit and test every release.",
        image: unsplash("photo-1555066931-4365d14bab8c"),
        offerings: [
            "Web applications and customer portals",
            "iOS and Android apps",
            "APIs, integrations and microservices",
            "Cloud native builds on AWS, Azure and GCP",
            "Maintenance, upgrades and legacy modernisation",
        ],
        outcomes: [
            "Working software every sprint",
            "Security review built into every release",
            "Code and documentation your team owns",
        ],
    },
    {
        kind: "consulting",
        slug: "consulting",
        title: "Technology consulting",
        tagline: "A senior second opinion when it matters.",
        summary:
            "Architecture, cloud and team decisions are expensive to undo. We help you make them with confidence.",
        image: unsplash("photo-1522071820081-009f0129c71c"),
        offerings: [
            "Architecture and code reviews",
            "Cloud migration and cost planning",
            "Technical due diligence for investors",
            "Fractional CTO and team setup",
            "Vendor and tool selection",
        ],
        outcomes: [
            "A clear recommendation with trade-offs",
            "A roadmap your team can execute",
            "Lower cloud and rework costs",
        ],
    },
];
