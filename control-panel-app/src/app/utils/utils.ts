import { SchemaValidationItem } from '../models/intefaces';

export const genders: string[] = ['male', 'female'];

export const toggleGender = (gender: string) => {
    const index = genders.indexOf(gender) + 1;
    return index === genders.length ? genders[0] : genders[index];
};

// tslint:disable-next-line:max-line-length
export const urlPattern: string = '(http|https):\\/\\/(([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])\\.)*([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])(:[0-9]+)?$';

export function transformToken(token: string = '') {
    return token.length > 15 ? `${token.substr(0, 4)}...${token.substr(-4, 4)}` : token;
}

export function validateSchema(data: object, schema: SchemaValidationItem[], api: string): void {
    const missing = schema.filter(item => Object.keys(data).indexOf(item.key) < 0 && item.required).map(item => item.key);
    missing?.length && console.warn(`In response from ${api} is missing next properties: ${missing}`);
}
