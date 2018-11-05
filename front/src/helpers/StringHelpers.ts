export function textToSqlIdentifier(text: string) {
    return text.toLowerCase().replace(/[^\d\w]/g, '_').replace(/^_|_$/g, '');
}

export function getRandomHash() {
    return Math.random().toString(16).substring(2, 15);
}

export function isMeaningfulString(text: string) {
    return /\w+/.test(text);
}

export function isNullLikeString(value: string | null) {
    return value === null || /^\s*$/.test(value);
}

export function isIntegerString(value: string) {
    return /^[-+]?\d+$/.test(value);
}

export function isFloatString(value: string) {
    if (isIntegerString(value)) {
        return true;
    }

    return /^[-+]?(\d+[.,]\d+|[.,]\d+|\d+[.,])$/.test(value);
}

export function normalizeFloatString(value: string) {
    if (!isFloatString(value)) {
        return null;
    }

    return value
        .replace(/,/g, '.')
        .replace(/\+/g, '');
}
