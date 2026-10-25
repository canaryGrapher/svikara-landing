export interface Faq {
    question: string;
    answer: string;
}

export const faqs: Faq[] = [
    {
        question: "How quickly can you start?",
        answer: "Most projects start within one to two weeks of signing. Urgent security work can often start sooner.",
    },
    {
        question: "Do you sign NDAs?",
        answer: "Yes. We are happy to sign your NDA, or send ours, before you share any details.",
    },
    {
        question: "Can you work with our existing team?",
        answer: "Yes. We regularly work alongside in-house engineers, and we hand over documentation so your team can continue without us.",
    },
    {
        question: "How is pricing decided?",
        answer: "After the first call we send a written proposal with a fixed scope and price, or a monthly rate for ongoing work.",
    },
    {
        question: "Which clients do you work with?",
        answer: "Startups and growing businesses that need software built or secured, in India and abroad.",
    },
];
