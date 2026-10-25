import type { ReactNode } from "react";

interface FormFieldProps {
    id: string;
    label: string;
    optional?: boolean;
    children: ReactNode;
}

export const fieldClass =
    "mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/40";

export function FormField({ id, label, optional = false, children }: FormFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-white/85">
                {label}
                {optional && <span className="font-normal text-white/50"> (optional)</span>}
            </label>
            {children}
        </div>
    );
}
