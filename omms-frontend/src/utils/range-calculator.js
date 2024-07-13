export const calculateRange = (total, page, limit) => {
    if (!total || !page || !limit) {
        return;
    }
    const start = (page - 1) * limit + 1;
    const end = Math.min(start + limit - 1, total);
    return { start, end };
};