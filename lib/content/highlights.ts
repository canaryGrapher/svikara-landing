import type { LucideIcon } from "lucide-react";
import { FileCheck2, GitBranch, ShieldCheck, UserCheck } from "lucide-react";

export interface Stat {
    value: number;
    suffix?: string;
    label: string;
}

/** Figures that describe how Svikara works, not claims about past volume. */
export const stats: Stat[] = [
    { value: 3, label: "disciplines under one roof" },
    { value: 8, label: "compliance frameworks we prepare you for" },
    { value: 4, label: "clear steps in every engagement" },
    { value: 1, label: "team accountable for build and security" },
];

export interface Highlight {
    icon: LucideIcon;
    title: string;
    detail: string;
}

export const highlights: Highlight[] = [
    {
        icon: ShieldCheck,
        title: "Security in every sprint",
        detail: "Threat modelling and code review happen while the software is written, not after launch.",
    },
    {
        icon: FileCheck2,
        title: "Fixed scope, in writing",
        detail: "You get the scope, timeline and price before work starts. No surprise invoices.",
    },
    {
        icon: UserCheck,
        title: "Senior people on your project",
        detail: "The engineers you meet on the first call are the ones who do the work.",
    },
    {
        icon: GitBranch,
        title: "You own everything",
        detail: "Code, documentation, reports and credentials are handed over at the end.",
    },
];
