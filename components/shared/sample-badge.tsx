import { cn } from "@/lib/utils";

/**
 * Marks placeholder content so it is never mistaken for a real client or review.
 * It disappears once the content file has no `sample: true` entries.
 */
export function SampleBadge({ className, label = "Sample content" }: { className?: string; label?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-dashed border-amber-500/70 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800",
                className
            )}
        >
            {label}
        </span>
    );
}
