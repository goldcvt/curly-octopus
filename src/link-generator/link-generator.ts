import { randomBytes } from 'node:crypto';

export const generateRandomSuffix = (suffixLength: number) =>
    randomBytes(suffixLength / 2).toString('hex');
export const generateRandomUrl = () =>
    `${process.env.HOST || 'localhost:8080'}/${generateRandomSuffix(
        Number(process.env.SUFFIX_LENGTH) || 16,
    )}`;
