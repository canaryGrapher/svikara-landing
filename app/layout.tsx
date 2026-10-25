import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
    variable: "--font-schibsted",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: {
        default: `${siteConfig.name} | Cybersecurity, development and consulting`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${schibsted.variable} antialiased`}>
            <body className="min-h-full">
                <MotionProvider>
                    <SiteHeader />
                    <main>{children}</main>
                    <SiteFooter />
                </MotionProvider>
            </body>
        </html>
    );
}
