import { Temporal } from "@js-temporal/polyfill";

export type ApiResponse<T> =
    | { status: "loading" }
    | { status: "success"; data: T; fetchedAt: Temporal.Instant }
    | { status: "error"; message: string; statusCode: number };


// 🎨 Generic Renderer Engine Function
export function renderResponse<T>(
    response: ApiResponse<T>,
    formatter: (data: T) => string,
): string {
    switch (response.status) {
        case "loading":
            return "Loading...";

        case "success":
            // Pass the custom data straight into the formatting callback
            return formatter(response.data);

        case "error":
            return `Error ${response.statusCode}: ${response.message}`;

        default: {
            // 🛡️ Safe guard compile-time check
            const _exhaustiveCheck: never = response;
            throw new Error(`Unhandled API response status: ${JSON.stringify(_exhaustiveCheck)}`);
        }
    }
}