import { CalendarCheck, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

const promises = [
    { icon: CalendarCheck, text: "Reply within one business day" },
    { icon: ShieldCheck, text: "NDA available before you share details" },
];

export function ContactPanel() {
    return (
        <section aria-label="Contact form" className="bg-paper pb-24 sm:pb-32">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.25fr]">
                <Reveal className="flex flex-col gap-8">
                    <ul className="grid gap-4">
                        <li className="flex items-center gap-3 text-ink">
                            <Mail className="size-5 text-royal" aria-hidden />
                            <a href={`mailto:${siteConfig.email}`} className="font-semibold hover:text-royal">
                                {siteConfig.email}
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-ink">
                            <MapPin className="size-5 text-royal" aria-hidden />
                            Based in {siteConfig.location}, working with clients worldwide
                        </li>
                    </ul>
                    <ul className="grid gap-3 border-t border-line pt-8">
                        {promises.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3 text-muted">
                                <Icon className="size-5 text-sky" aria-hidden />
                                {text}
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal delay={0.15} className="rounded-[2rem] bg-ink p-2">
                    <ContactForm />
                </Reveal>
            </div>
        </section>
    );
}
