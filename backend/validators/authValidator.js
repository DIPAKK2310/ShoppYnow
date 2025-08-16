// validators/authValidator.js

const validateRegistration = (username, email, password) => {
    const errors = [];

    if (!username || typeof username !== 'string') {
        errors.push('Username is required and must be text');
    }
    if (!email || typeof email !== 'string') {
        errors.push('Email is required and must be text');
    }
    if (!password || typeof password !== 'string') {
        errors.push('Password is required and must be text');
    }

    if (username && username.trim().length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    if (username && username.length > 30) {
        errors.push('Username cannot exceed 30 characters');
    }

    if (password && password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }

    return errors;
};

const validateLogin = (email, password) => {
    const errors = [];

    if (!email || typeof email !== 'string') {
        errors.push('Email is required and must be text');
    }
    if (!password || typeof password !== 'string') {
        errors.push('Password is required and must be text');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }

    return errors;
};

module.exports = {
    validateRegistration,
    validateLogin
};
