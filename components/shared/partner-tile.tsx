/* eslint-disable @next/next/no-img-element -- partner logos are small static files of mixed formats */
import type { Partner } from "@/lib/content/partners";
import { cn } from "@/lib/utils";

/** A partner or client tile: logo (or an initial when there is none) beside the name and optional sector. */
export function PartnerTile({ partner, className }: { partner: Partner; className?: string }) {
    return (
        <div
            className={cn(
                "flex h-20 items-center gap-3 rounded-2xl border border-line bg-white px-6",
                partner.sample && "border-dashed",
                className
            )}
        >
            {partner.logo ? (
                <img src={partner.logo} alt="" className="size-9 shrink-0 rounded-lg object-contain" />
            ) : (
                <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-royal"
                >
                    {partner.name.charAt(0)}
                </span>
            )}
            <span className="flex flex-col leading-tight">
                <span className="font-semibold text-ink">{partner.name}</span>
                {partner.sector && <span className="text-sm text-muted">{partner.sector}</span>}
            </span>
        </div>
    );
}
