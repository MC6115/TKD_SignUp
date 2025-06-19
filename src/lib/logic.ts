type AgeGroupName =
  | 'dragons'
  | 'tigers'
  | 'youth'
  | 'cadet'
  | 'junior'
  | 'senior'
  | 'ultra';

type Gender = 'male' | 'female' | 'Men' | 'Women';

interface Competitor {
  name: string;
  age: number;
  weight: number;
  gender: Gender;
  events: string[];
  belt: string;
  [key: string]: unknown;
}

type WeightClass = { name: string; max: number };

const AgeGroups = [
  { name: "dragons", minAge: 6, maxAge: 7 },
  { name: "tigers", minAge: 8, maxAge: 9 },
  { name: "youth", minAge: 10, maxAge: 11 },
  { name: "cadet", minAge: 12, maxAge: 14 },
  { name: "junior", minAge: 15, maxAge: 17 },
  { name: "senior", minAge: 18, maxAge: 33 },
  { name: "ultra", minAge: 34, maxAge: Number.POSITIVE_INFINITY },
];

const WeightClasses: Record<
  `${AgeGroupName}${'' | '_female'}`,
  WeightClass[]
> = {
  // Male categories
  dragons: [
    { name: 'Fin', max: 19 },
    { name: 'Light', max: 23 },
    { name: 'Middle', max: 27 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  tigers: [
    { name: 'Fin', max: 21 },
    { name: 'Light', max: 25 },
    { name: 'Middle', max: 30 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  youth: [
    { name: 'Fin', max: 30 },
    { name: 'Light', max: 35 },
    { name: 'Middle', max: 40 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  cadet: [
    { name: 'Fin', max: 33 },
    { name: 'Fly', max: 37 },
    { name: 'Bantam', max: 41 },
    { name: 'Feather', max: 45 },
    { name: 'Light', max: 49 },
    { name: 'Welter', max: 53 },
    { name: 'Light Middle', max: 57 },
    { name: 'Middle', max: 61 },
    { name: 'Light Heavy', max: 65 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  junior: [
    { name: 'Fin', max: 45 },
    { name: 'Fly', max: 48 },
    { name: 'Bantam', max: 51 },
    { name: 'Feather', max: 55 },
    { name: 'Light', max: 59 },
    { name: 'Welter', max: 63 },
    { name: 'Light Middle', max: 68 },
    { name: 'Middle', max: 73 },
    { name: 'Light Heavy', max: 78 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  senior: [
    { name: 'Fin', max: 54 },
    { name: 'Fly', max: 58 },
    { name: 'Bantam', max: 63 },
    { name: 'Feather', max: 68 },
    { name: 'Light', max: 74 },
    { name: 'Welter', max: 80 },
    { name: 'Middle', max: 87 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  ultra: [
    { name: 'Fin', max: 58 },
    { name: 'Light', max: 68 },
    { name: 'Middle', max: 80 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],

  // Female categories
  dragons_female: [
    { name: 'Fin', max: 19 },
    { name: 'Light', max: 23 },
    { name: 'Middle', max: 27 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  tigers_female: [
    { name: 'Fin', max: 21 },
    { name: 'Light', max: 25 },
    { name: 'Middle', max: 30 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  youth_female: [
    { name: 'Fin', max: 30 },
    { name: 'Light', max: 35 },
    { name: 'Middle', max: 40 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  cadet_female: [
    { name: 'Fin', max: 29 },
    { name: 'Fly', max: 33 },
    { name: 'Bantam', max: 37 },
    { name: 'Feather', max: 41 },
    { name: 'Light', max: 44 },
    { name: 'Welter', max: 47 },
    { name: 'Light Middle', max: 51 },
    { name: 'Middle', max: 55 },
    { name: 'Light Heavy', max: 59 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  junior_female: [
    { name: 'Fin', max: 42 },
    { name: 'Fly', max: 44 },
    { name: 'Bantam', max: 46 },
    { name: 'Feather', max: 49 },
    { name: 'Light', max: 52 },
    { name: 'Welter', max: 55 },
    { name: 'Light Middle', max: 59 },
    { name: 'Middle', max: 63 },
    { name: 'Light Heavy', max: 68 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  senior_female: [
    { name: 'Fin', max: 46 },
    { name: 'Fly', max: 49 },
    { name: 'Bantam', max: 53 },
    { name: 'Feather', max: 57 },
    { name: 'Light', max: 62 },
    { name: 'Welter', max: 67 },
    { name: 'Middle', max: 73 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ],
  ultra_female: [
    { name: 'Fin', max: 49 },
    { name: 'Light', max: 57 },
    { name: 'Middle', max: 67 },
    { name: 'Heavy', max: Number.POSITIVE_INFINITY }
  ]
};

function normalizeGender(gender: unknown): 'male' | 'female' | null {
  if (typeof gender !== 'string') return null;
  const g = gender.toLowerCase();
  if (g === 'men' || g === 'male') return 'male';
  if (g === 'women' || g === 'female') return 'female';
  return null;
}

function findAgeGroup(age: number): AgeGroupName | null {
  return AgeGroups.find(group => age >= group.minAge && age <= group.maxAge)?.name as AgeGroupName || null;
}

function findWeightClass(ageGroup: AgeGroupName | null, weight: number, gender: unknown): string | null {
  if (!ageGroup) return null;
  const normGender = normalizeGender(gender);
  if (!normGender) return null;
  const key = (normGender === 'female' ? `${ageGroup}_female` : ageGroup) as keyof typeof WeightClasses;
  const classes = WeightClasses[key];
  return classes?.find(wc => weight <= wc.max)?.name || null;
}

export function sortCompetitors(competitors: unknown[]) {
  const sparringBrackets: { [key: string]: { competitors: unknown[]; contactRule: string } } = {};
  const formsGroups: { [key: string]: unknown[] } = {};
  const breakingGroups: { [key: string]: unknown[] } = {};
  const unmatchedSparring: unknown[] = [];
  const unmatchedForms: unknown[] = [];
  const unmatchedBreaking: unknown[] = [];

  for (const comp of competitors) {
    const competitor = comp as Competitor;
    const ageGroup = findAgeGroup(competitor.age);
    const normGender = normalizeGender(competitor.gender);

    if (!ageGroup || !normGender) {
      (competitor.events || []).forEach((event: unknown) => {
        if (event === "sparring") unmatchedSparring.push({ ...competitor, reason: "No age group or gender found" });
        else if (event === "forms") unmatchedForms.push({ ...competitor, reason: "No age group or gender found" });
        else if (event === "breaking") unmatchedBreaking.push({ ...competitor, reason: "No age group or gender found" });
      });
      continue;
    }

    (competitor.events || []).forEach((event: unknown) => {
      if (event === "sparring") {
        const weightClass = findWeightClass(ageGroup, competitor.weight, competitor.gender);
        if (!weightClass) {
          unmatchedSparring.push({ ...competitor, reason: "No weight class found" });
          return;
        }
        const bracketKey = `${ageGroup}-${normGender}-${weightClass}-${competitor.belt}`;
        if (!sparringBrackets[bracketKey]) {
          sparringBrackets[bracketKey] = { competitors: [], contactRule: "full" };
        }
        sparringBrackets[bracketKey].competitors.push(competitor);
      } else if (event === "forms") {
        const key = `${ageGroup}-${normGender}-${competitor.belt}`;
        if (!formsGroups[key]) formsGroups[key] = [];
        formsGroups[key].push(competitor);
      } else if (event === "breaking") {
        const key = `${ageGroup}-${normGender}-${competitor.belt}`;
        if (!breakingGroups[key]) breakingGroups[key] = [];
        breakingGroups[key].push(competitor);
      }
    });
  }

  Object.entries(sparringBrackets).forEach(([key, bracket]) => {
    if (bracket.competitors.length < 2) {
      bracket.competitors.forEach(competitor => {
        unmatchedSparring.push({ ...(competitor as object), reason: "Only one competitor in bracket" });
      });
      delete sparringBrackets[key];
    }
  });

  Object.entries(formsGroups).forEach(([key, group]) => {
    if (group.length < 2) {
      group.forEach(competitor => {
        unmatchedForms.push({ ...(competitor as object), reason: "Only one competitor in group" });
      });
      delete formsGroups[key];
    }
  });

  Object.entries(breakingGroups).forEach(([key, group]) => {
    if (group.length < 2) {
      group.forEach(competitor => {
        unmatchedBreaking.push({ ...(competitor as object), reason: "Only one competitor in group" });
      });
      delete breakingGroups[key];
    }
  });

  return {
    sparringBrackets,
    formsGroups,
    breakingGroups,
    unmatchedSparring,
    unmatchedForms,
    unmatchedBreaking
  };
}

export { findAgeGroup, findWeightClass, normalizeGender };
