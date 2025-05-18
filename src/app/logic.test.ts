import { describe, test, expect } from 'vitest';
import {
    findAgeGroup,
    findWeightClass,
    sortCompetitors
} from './logic';
import { competitors } from './data';

describe('sortCompetitors', () => {
  test('sorts competitors into brackets', () => {
    const result = sortCompetitors(competitors);
    console.dir(result, { depth: null });
  });
});

describe('findAgeGroup', () => {
    test('returns the correct age group for a given age', () => {
        expect(findAgeGroup(6)).toBe('dragons'); // Age 6 falls into the "dragons" group
        expect(findAgeGroup(9)).toBe('tigers'); // Age 9 falls into the "tigers" group
        expect(findAgeGroup(15)).toBe('junior'); // Age 15 falls into the "junior" group
        expect(findAgeGroup(34)).toBe('ultra'); // Age 34 falls into the "ultra" group
        expect(findAgeGroup(100)).toBe('ultra'); // Age 100 falls into the "ultra" group
        expect(findAgeGroup(5)).toBeNull(); // Age 5 does not fall into any group
    });
});

describe('findWeightClass', () => {
    test('returns the correct weight class for a given age group, weight, and gender', () => {
        // Senior Men
        expect(findWeightClass('Senior', 54, 'Men')).toBe('Fin'); // Weight 54 falls into "Fin"
        expect(findWeightClass('Senior', 58, 'Men')).toBe('Fly'); // Weight 58 falls into "Fly"
        expect(findWeightClass('Senior', 63, 'Men')).toBe('Bantam'); // Weight 63 falls into "Bantam"
        expect(findWeightClass('Senior', 68, 'Men')).toBe('Feather'); // Weight 68 falls into "Feather"
        expect(findWeightClass('Senior', 74, 'Men')).toBe('Light'); // Weight 74 falls into "Light"
        expect(findWeightClass('Senior', 80, 'Men')).toBe('Welter'); // Weight 80 falls into "Welter"
        expect(findWeightClass('Senior', 87, 'Men')).toBe('Middle'); // Weight 87 falls into "Middle"
        expect(findWeightClass('Senior', 100, 'Men')).toBe('Heavy'); // Weight 100 falls into "Heavy"

        // Senior Women
        expect(findWeightClass('Senior', 46, 'Women')).toBe('Fin'); // Weight 46 falls into "Fin"
        expect(findWeightClass('Senior', 49, 'Women')).toBe('Fly'); // Weight 49 falls into "Fly"
        expect(findWeightClass('Senior', 53, 'Women')).toBe('Bantam'); // Weight 53 falls into "Bantam"
        expect(findWeightClass('Senior', 57, 'Women')).toBe('Feather'); // Weight 57 falls into "Feather"
        expect(findWeightClass('Senior', 62, 'Women')).toBe('Light'); // Weight 62 falls into "Light"
        expect(findWeightClass('Senior', 67, 'Women')).toBe('Welter'); // Weight 67 falls into "Welter"
        expect(findWeightClass('Senior', 73, 'Women')).toBe('Middle'); // Weight 73 falls into "Middle"
        expect(findWeightClass('Senior', 80, 'Women')).toBe('Heavy'); // Weight 80 falls into "Heavy"

        // Junior Men
        expect(findWeightClass('Junior', 45, 'Men')).toBe('Fin'); // Weight 45 falls into "Fin"
        expect(findWeightClass('Junior', 48, 'Men')).toBe('Fly'); // Weight 48 falls into "Fly"
        expect(findWeightClass('Junior', 51, 'Men')).toBe('Bantam'); // Weight 51 falls into "Bantam"
        expect(findWeightClass('Junior', 55, 'Men')).toBe('Feather'); // Weight 55 falls into "Feather"

        // Invalid cases
        expect(findWeightClass('Senior', 10, 'InvalidGender')).toBeNull(); // Invalid gender returns null
        expect(findWeightClass('InvalidAgeGroup', 60, 'Men')).toBeNull(); // Invalid age group returns null
    });
});