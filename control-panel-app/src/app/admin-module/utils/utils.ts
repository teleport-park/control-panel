export const Currencies: string[] = [
    'TLPVR', 'BYN'
];

export enum Currency {
    BYN = 'BYN',
    TLPVR = 'TLPVR'
}

export function to4Hex(value?: string): string | null {
    if (!value || value.length < 8) {
        return null;
    }
    const hexPattern: RegExp = new RegExp('^[0-9A-Fa-f]+$');
    const isHex = () => {
        return hexPattern.test(value);
    };
    return value.length === 8 && isHex() ? value : isNaN(+value) ? null : (+value).toString(16);
}

