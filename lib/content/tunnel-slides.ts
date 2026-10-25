import type { TunnelImage } from "@/components/ui/perspective-tunnel-hero";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&h=750&fit=crop&q=75`;

export const tunnelSlides: TunnelImage[] = [
    { src: unsplash("photo-1550751827-4bd374c3f58b"), title: "Security audits" },
    { src: unsplash("photo-1555066931-4365d14bab8c"), title: "Web platforms" },
    { src: unsplash("photo-1558494949-ef010cbdcc31"), title: "Cloud infrastructure" },
    { src: unsplash("photo-1519389950473-47ba0277781c"), title: "Architecture reviews" },
    { src: unsplash("photo-1451187580459-43490279c0fa"), title: "Global compliance" },
    { src: unsplash("photo-1563986768609-322da13575f3"), title: "Mobile apps" },
    { src: unsplash("photo-1504639725590-34d0984388bd"), title: "Secure code review" },
    { src: unsplash("photo-1460925895917-afdab827c52f"), title: "Data and dashboards" },
    { src: unsplash("photo-1522071820081-009f0129c71c"), title: "Dedicated teams" },
];
