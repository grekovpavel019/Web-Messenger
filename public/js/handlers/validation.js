export function isEmpty(value) {
    return value.trim() === "";
}

export function minLength(value, len) {
    return value.length >= len;
}

export function passwordsMatch(p1, p2) {
    return p1 === p2;
}

export function checkEmail(value) {
    return value.includes("@");
}