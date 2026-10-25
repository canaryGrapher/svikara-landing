import type { LucideIcon } from "lucide-react";
import { Banknote, GraduationCap, HeartPulse, Landmark, ShoppingBag, Truck } from "lucide-react";

export interface Industry {
    icon: LucideIcon;
    name: string;
    need: string;
}

export const industries: Industry[] = [
    { icon: Banknote, name: "Fintech", need: "PCI DSS, RBI guidelines and secure payment flows" },
    { icon: HeartPulse, name: "Healthcare", need: "Patient data privacy and HIPAA-aligned systems" },
    { icon: ShoppingBag, name: "E-commerce", need: "Fast storefronts that keep card data safe" },
    { icon: GraduationCap, name: "Education", need: "Student platforms that scale at exam time" },
    { icon: Truck, name: "Logistics", need: "Tracking, integrations and partner APIs" },
    { icon: Landmark, name: "Public sector", need: "CERT-In reporting and audit-ready controls" },
];

export interface EngagementModel {
    title: string;
    bestFor: string;
    detail: string;
}

export const engagementModels: EngagementModel[] = [
    {
        title: "Fixed-scope project",
        bestFor: "A defined build, audit or penetration test",
        detail: "Agreed deliverables, timeline and price before we start.",
    },
    {
        title: "Dedicated team",
        bestFor: "Ongoing product development",
        detail: "Engineers who work as an extension of your team, billed monthly.",
    },
    {
        title: "Security retainer",
        bestFor: "Continuous protection and compliance",
        detail: "Regular testing, reviews and on-call help when something goes wrong.",
    },
];
