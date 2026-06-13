export const isEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const isPhone = (phone: string) => /^\\+?[0-9]{7,15}$/.test(phone);

export const isRequired = (value: string) => value.trim().length > 0;
