export function textToSqlIdentifier(text: string) {
    return text.toLowerCase().replace(/[^\d\w]/g, '_').replace(/^_|_$/g, '');
}

export function getRandomHash() {
    return Math.random().toString(16).substring(2, 15);
}

export function isMeaningfullString(text: string) {
    return /\w+/.test(text);
}
