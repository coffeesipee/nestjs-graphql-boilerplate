export interface PageParams {
    page?: number;
    limit?: number;
    // Optional safety cap to prevent huge queries
    maxLimit?: number;
}

export interface NormalizedPage {
    page: number;
    limit: number;
    skip: number; // same as offset
    take: number; // same as limit
}

export function normalizePageParams(
    { page, limit, maxLimit = 100 }: PageParams = {}
): NormalizedPage {
    const p = Math.max(1, Number(page) || 1);
    const l = Math.min(Math.max(1, Number(limit) || 10), maxLimit);
    const skip = (p - 1) * l;

    return { page: p, limit: l, skip, take: l };
}