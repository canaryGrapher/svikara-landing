const STROKE = "currentColor";

export function SoundIcon({ muted, size }: { muted: boolean; size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 9.5v5h3.6L13 19V5L7.6 9.5H4Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
            {muted ? (
                <path d="M16 9.5 20 14.5M20 9.5 16 14.5" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
            ) : (
                <path
                    d="M16.2 8.8a5 5 0 0 1 0 6.4M18.6 6.6a8.5 8.5 0 0 1 0 10.8"
                    stroke={STROKE}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            )}
        </svg>
    );
}

export function DayNightIcon({ isNight }: { isNight: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isNight ? (
                <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                    stroke={STROKE}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
            ) : (
                <>
                    <circle cx="12" cy="12" r="4.5" stroke={STROKE} strokeWidth="1.6" />
                    <path
                        d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"
                        stroke={STROKE}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    />
                </>
            )}
        </svg>
    );
}
