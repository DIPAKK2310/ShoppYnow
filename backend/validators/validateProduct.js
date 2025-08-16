const validateProduct = (name, description, price) => {
    const errors = [];

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Product name is required and must be a non-empty string');
    } else if (name.length > 100) {
        errors.push('Product name cannot exceed 100 characters');
    }

    // Validate description
    if (description && typeof description !== 'string') {
        errors.push('Description must be a string');
    } else if (description && description.length > 1000) {
        errors.push('Description cannot exceed 1000 characters');
    }

    // Validate price
    if (price == null || price === '') {
        errors.push('Price is required');
    } else {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(numPrice) || numPrice < 0) {
            errors.push('Price must be a valid number greater than or equal to 0');
        }
    }

    return errors;
};

module.exports = {
    validateProduct
};
