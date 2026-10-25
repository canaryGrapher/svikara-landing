/* eslint-disable @next/next/no-img-element -- partner logos are small static files of mixed formats */
import type { Partner } from "@/lib/content/partners";
import { cn } from "@/lib/utils";

/** A partner or client logo. Without a logo file it shows a neutral placeholder tile. */
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
                <img src={partner.logo} alt={partner.name} className="h-8 w-auto max-w-[9rem] object-contain" />
            ) : (
                <>
                    <span
                        aria-hidden
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-royal"
                    >
                        {partner.sector.charAt(0)}
                    </span>
                    <span className="flex flex-col leading-tight">
                        <span className="font-semibold text-ink">{partner.name}</span>
                        <span className="text-sm text-muted">{partner.sector}</span>
                    </span>
                </>
            )}
        </div>
    );
}
