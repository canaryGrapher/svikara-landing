import { OverlapDiagram } from "./overlap-diagram";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";

const points = [
    {
        title: "Security reviews during the build",
        detail: "Threat modelling and code review happen sprint by sprint, so fixes are cheap.",
    },
    {
        title: "Compliance that matches the code",
        detail: "The people writing your audit evidence are the people who built the controls.",
    },
    {
        title: "Advice from practitioners",
        detail: "Our consultants still ship software and run security tests, so the advice is practical.",
    },
];

export function Overlap() {
    return (
        <section aria-labelledby="overlap-title" className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
                <div>
                    <SectionHeading id="overlap-title" title="Where building and securing meet.">
                        Plenty of firms write software. Plenty test it for holes. We do both, which is
                        what the two halves of the S in our logo stand for.
                    </SectionHeading>

                    <dl className="mt-12 grid gap-8">
                        {points.map((point, i) => (
                            <Reveal key={point.title} delay={i * 0.1} className="border-l-2 border-sky pl-5">
                                <dt className="text-lg font-semibold text-ink">{point.title}</dt>
                                <dd className="mt-1 text-muted">{point.detail}</dd>
                            </Reveal>
                        ))}
                    </dl>
                </div>

                <div className="flex justify-center">
                    <OverlapDiagram />
                </div>
            </div>
        </section>
    );
}
