/**
 * Small helpers for checking hand-edited JSON content. A mistake fails the build
 * with a message naming the file, the entry and the field, instead of breaking a page.
 */

type Entry = Record<string, unknown>;

export class ContentError extends Error {
    constructor(file: string, index: number, message: string) {
        super(`content/${file}, entry ${index + 1}: ${message}`);
        this.name = "ContentError";
    }
}

export function readList(file: string, data: unknown, key: string): Entry[] {
    const list = (data as Record<string, unknown> | null)?.[key];
    if (!Array.isArray(list)) {
        throw new Error(`content/${file}: expected a "${key}" array at the top level`);
    }
    return list.map((item, i) => {
        if (typeof item !== "object" || item === null || Array.isArray(item)) {
            throw new ContentError(file, i, "each entry must be an object { ... }");
        }
        return item as Entry;
    });
}

export function requireText(file: string, i: number, entry: Entry, field: string): string {
    const value = entry[field];
    if (typeof value !== "string" || value.trim() === "") {
        throw new ContentError(file, i, `"${field}" is required and must be text`);
    }
    return value.trim();
}

export function optionalText(file: string, i: number, entry: Entry, field: string): string | undefined {
    const value = entry[field];
    if (value === undefined) return undefined;
    if (typeof value !== "string") throw new ContentError(file, i, `"${field}" must be text`);
    return value.trim() || undefined;
}

export function optionalFlag(file: string, i: number, entry: Entry, field: string): boolean {
    const value = entry[field];
    if (value === undefined) return false;
    if (typeof value !== "boolean") throw new ContentError(file, i, `"${field}" must be true or false`);
    return value;
}

export function requireOneOf<T extends string>(
    file: string,
    i: number,
    entry: Entry,
    field: string,
    allowed: readonly T[]
): T {
    const value = entry[field];
    if (typeof value !== "string" || !allowed.includes(value as T)) {
        throw new ContentError(file, i, `"${field}" must be one of: ${allowed.join(", ")}`);
    }
    return value as T;
}

export function requireTextList(file: string, i: number, entry: Entry, field: string): string[] {
    const value = entry[field];
    if (!Array.isArray(value) || value.length === 0 || value.some((v) => typeof v !== "string" || v.trim() === "")) {
        throw new ContentError(file, i, `"${field}" is required and must be a list of text values`);
    }
    return value.map((v) => (v as string).trim());
}
