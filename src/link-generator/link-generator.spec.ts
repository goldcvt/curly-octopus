import { generateRandomSuffix } from './link-generator';

describe('Domain / link-generator', () => {
    it('Generates expected length of suffix', () => {
        const randomSuffix = generateRandomSuffix(4);
        expect(randomSuffix).toHaveLength(4);
    });
    it('Generated suffix is random', () => {
        const randomSuffixOne = generateRandomSuffix(4);
        const randomSuffixTwo = generateRandomSuffix(4);
        expect(randomSuffixOne).not.toEqual(randomSuffixTwo);
    });
});
