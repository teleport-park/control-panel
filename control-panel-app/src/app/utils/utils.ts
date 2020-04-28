const genders: string[] = ['male', 'female'];

export const toggleGender = (gender: string) => {
    const index = genders.indexOf(gender) + 1;
    return index === genders.length ? genders[0] : genders[index];
};

// tslint:disable-next-line:max-line-length
export const urlPattern: string = '(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?|^((http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';
