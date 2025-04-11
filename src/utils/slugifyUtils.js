export const slugify = (text, id) => {
    return (
        text
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + `_${id}`
    );
};

export const deslugify = (slug) => {
    // Tách slug thành phần text và id
    const [text, id] = slug.split('_');

    return parseInt(id);
};
