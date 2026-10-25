export interface Enquiry {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
}

/** Builds a mailto: link carrying the enquiry, for sites without a form backend. */
export function buildEnquiryMailto(to: string, enquiry: Enquiry): string {
    const subject = `Enquiry: ${enquiry.service} (${enquiry.name})`;
    const body = [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        enquiry.company ? `Company: ${enquiry.company}` : null,
        `Service: ${enquiry.service}`,
        "",
        enquiry.message,
    ]
        .filter((line) => line !== null)
        .join("\n");

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
