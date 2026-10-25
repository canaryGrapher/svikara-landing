export interface ApproachStep {
    title: string;
    detail: string;
}

/** The order an engagement actually runs in. */
export const approachSteps: ApproachStep[] = [
    {
        title: "Discover",
        detail: "A free first call to understand your systems, your risks and what a good outcome looks like.",
    },
    {
        title: "Plan",
        detail: "A fixed scope, timeline and price in writing, so you know what you are paying for.",
    },
    {
        title: "Deliver",
        detail: "Weekly updates and working results you can see, not a big reveal at the end.",
    },
    {
        title: "Hand over",
        detail: "Documentation, reports and training, so your team can carry on without us.",
    },
];
