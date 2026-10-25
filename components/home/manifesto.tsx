import { ScrollWords } from "@/components/motion/scroll-words";

const STATEMENT =
    "Svikara is a security-first engineering company. We build the software your business runs on, test it the way an attacker would, and stay on to keep it safe. One team, from the first line of code to the last audit.";

export function Manifesto() {
    return (
        <section aria-label="About Svikara" className="relative z-10 bg-paper pb-24 pt-16 sm:pb-36 sm:pt-24">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">
                <ScrollWords
                    text={STATEMENT}
                    className="text-balance text-3xl font-bold leading-[1.18] tracking-[-0.025em] text-ink sm:text-5xl md:text-[3.5rem]"
                />
            </div>
        </section>
    );
}
