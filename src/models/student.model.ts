export interface Student {
    id: string;
    name: string;
    gpa?: number;
    enrollmentDate?: string | Date;
}

// Type Guard: Returns a boolean to narrow down the unknown API packet safely
export function isStudent(value: unknown): value is Student {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        typeof (value as any).id === "string" &&
        typeof (value as any).name === "string"
    );
}

// Parse Function: Throws an explicit TypeError if validation parameters break
export function parseStudent(raw: unknown): Student {
    if (typeof raw !== "object" || raw === null) {
        throw new TypeError(
            `Expected an object, received ${raw === null ? "null" : typeof raw}`,
        );
    }

    const obj = raw as Record<string, unknown>;

    if (typeof obj.id !== "string") {
        throw new TypeError(
            `Expected id to be a string, received ${typeof obj.id}`,
        );
    }

    if (typeof obj.name !== "string") {
        throw new TypeError(
            `Expected name to be a string, received ${typeof obj.name}`,
        );
    }

    return {
        id: obj.id,
        name: obj.name,
        gpa: typeof obj.gpa === "number" ? obj.gpa : undefined,
        enrollmentDate: new Date().toISOString(),
    };
}