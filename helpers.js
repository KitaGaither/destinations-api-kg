export function filterObj({ objectToFilter: obj,
filterValue}) {
    const filtered = {};

    for (const prop in obj) {
        if (obj[prop].location.toLowerCase() === 
        filterValue.toLowerCase()) {
            filtered[prop] = obj[prop];
        }
    }
    return filtered;
}