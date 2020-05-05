const genders: string[] = ['male', 'female'];

export const toggleGender = (gender: string) => {
    const index = genders.indexOf(gender) + 1;
    return index === genders.length ? genders[0] : genders[index];
};

// tslint:disable-next-line:max-line-length
export const urlPattern: string = '(http|https):\\/\\/(([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])\\.)*([a-z0-9]|[a-z0-9][a-z0-9\\-]*[a-z0-9])(:[0-9]+)?$';
