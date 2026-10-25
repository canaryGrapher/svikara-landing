export interface Framework {
    name: string;
    scope: string;
}

export const frameworks: Framework[] = [
    { name: "ISO/IEC 27001", scope: "Information security management" },
    { name: "SOC 2", scope: "Trust services for SaaS vendors" },
    { name: "DPDP Act 2023", scope: "India's personal data law" },
    { name: "GDPR", scope: "EU personal data" },
    { name: "PCI DSS", scope: "Card payment data" },
    { name: "HIPAA", scope: "US health information" },
    { name: "OWASP ASVS", scope: "Application security testing" },
    { name: "CERT-In", scope: "Indian incident reporting rules" },
];
