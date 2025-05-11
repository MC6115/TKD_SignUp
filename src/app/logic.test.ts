import { describe, test } from 'vitest';
import {
    // processFormsBreakingCompetitors,
    // processSparringCompetitors,
    sortCompetitors,
    // AgeGroups,
    // Weights
} from './logic';
import { competitors } from './data';

describe('sortCompetitors', () => {
  test('sorts competitors by age', () => {
    const result = sortCompetitors(competitors);
    console.dir(result, { depth: null });
  });
});