// ['page', 'limit', 'sortBy', 'sortOrder']
// <T extends object, k extends keyof T>
exports.pick = (obj, keys) => {
    const finalObj = {};

    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }

    return finalObj;
};
