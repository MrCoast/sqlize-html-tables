import { transliterate } from 'transliteration';

export function textToSqlIdentifier(text: string) {
    let potentialResult = transliterate(text);

    potentialResult = potentialResult
        .toLowerCase()
        .replace(/[^\d\w]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

    if (/^\d/.test(potentialResult)) {
        potentialResult = 'i_' + potentialResult;
    }

    if (potentialResult === '') {
        potentialResult = 'i_' + getRandomHash();
    }

    return potentialResult;
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

export function escapeStringForSql(value: string) {
    return value.replace(/'/g, `''`);
}
