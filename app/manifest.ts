import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Web app manifest: name, colours and home-screen icons for Android and installed PWAs. */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        description: siteConfig.description,
        start_url: "/",
        display: "standalone",
        background_color: "#f7f7f7",
        theme_color: "#1a56db",
        icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
    };
}
