export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const isValid = regex.test(email);
    return isValid
}