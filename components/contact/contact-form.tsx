"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { buildEnquiryMailto } from "@/lib/build-enquiry-mailto";
import { FormField, fieldClass } from "./form-field";

const NOT_SURE = "Not sure yet";

export function ContactForm() {
    const [sent, setSent] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const read = (key: string) => String(data.get(key) ?? "").trim();

        window.location.href = buildEnquiryMailto(siteConfig.email, {
            name: read("name"),
            email: read("email"),
            company: read("company"),
            service: read("service"),
            message: read("message"),
        });
        setSent(true);
    };

    return (
        <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="name" label="Name">
                    <input id="name" name="name" required autoComplete="name" className={fieldClass} />
                </FormField>
                <FormField id="email" label="Work email">
                    <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
                </FormField>
            </div>

            <FormField id="company" label="Company" optional>
                <input id="company" name="company" autoComplete="organization" className={fieldClass} />
            </FormField>

            <FormField id="service" label="What do you need help with?">
                <select id="service" name="service" defaultValue={services[0].title} className={`${fieldClass} [&>option]:text-ink`}>
                    {services.map((s) => (
                        <option key={s.kind}>{s.title}</option>
                    ))}
                    <option>{NOT_SURE}</option>
                </select>
            </FormField>

            <FormField id="message" label="Tell us a little about the project">
                <textarea id="message" name="message" required rows={4} className={fieldClass} />
            </FormField>

            <button
                type="submit"
                className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-royal px-6 font-semibold text-white transition-colors hover:bg-sky hover:text-ink"
            >
                Send enquiry
            </button>

            <p role="status" className="min-h-5 text-sm text-white/70">
                {sent && `Your email app should open with the enquiry ready to send. If it doesn't, write to ${siteConfig.email}.`}
            </p>
        </form>
    );
}
