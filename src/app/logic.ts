// Parameters
const Events = ['sparring', 'forms', 'breaking'];
const Belts = [`yellow`, `green`, `blue`, `red`, `black`];
const AgeGroups = [
    {
        name: `dragons`,
        minAge: 6,
        maxAge: 7
    },
    {
        name: `tigers`,
        minAge: 8,
        maxAge: 9
    },
    {
        name: `youth`,
        minAge: 10,
        maxAge: 11
    },
    {
        name: `cadet`,
        minAge: 12,
        maxAge: 14
    },
    {
        name: `junior`,
        minAge: 15,
        maxAge: 17
    },
    {
        name: `senior`,
        minAge: 18,
        maxAge: 33
    },
    {
        name: `ultra`,
        minAge: 32,
        maxAge: Infinity
    }
];
const Weights = {
    Senior: [
        { name: 'Fin', Men: { min: 0, max: 54 }, Women: { min: 0, max: 46 } },
        { name: 'Fly', Men: { min: 54.01, max: 58 }, Women: { min: 46.01, max: 49 } },
        { name: 'Bantam', Men: { min: 58.01, max: 63 }, Women: { min: 49.01, max: 53 } },
        { name: 'Feather', Men: { min: 63.01, max: 68 }, Women: { min: 53.01, max: 57 } },
        { name: 'Light', Men: { min: 68.01, max: 74 }, Women: { min: 57.01, max: 62 } },
        { name: 'Welter', Men: { min: 74.01, max: 80 }, Women: { min: 62.01, max: 67 } },
        { name: 'Middle', Men: { min: 80.01, max: 87 }, Women: { min: 67.01, max: 73 } },
        { name: 'Heavy', Men: { min: 87.01, max: Infinity }, Women: { min: 73.01, max: Infinity } }
    ],
    Junior: [
        { name: 'Fin', Men: { min: 0, max: 45 }, Women: { min: 0, max: 42 } },
        { name: 'Fly', Men: { min: 45.01, max: 48 }, Women: { min: 42.01, max: 44 } },
        { name: 'Bantam', Men: { min: 48.01, max: 51 }, Women: { min: 44.01, max: 46 } },
        { name: 'Feather', Men: { min: 51.01, max: 55 }, Women: { min: 46.01, max: 49 } },
        { name: 'Light', Men: { min: 55.01, max: 59 }, Women: { min: 49.01, max: 52 } },
        { name: 'Welter', Men: { min: 59.01, max: 63 }, Women: { min: 52.01, max: 55 } },
        { name: 'Light Middle', Men: { min: 63.01, max: 68 }, Women: { min: 55.01, max: 59 } },
        { name: 'Middle', Men: { min: 68.01, max: 73 }, Women: { min: 59.01, max: 63 } },
        { name: 'Light Heavy', Men: { min: 73.01, max: 78 }, Women: { min: 63.01, max: 68 } },
        { name: 'Heavy', Men: { min: 78.01, max: Infinity }, Women: { min: 68.01, max: Infinity } }
    ],
    Cadet: [
        { name: 'Fin', Men: { min: 0, max: 33 }, Women: { min: 0, max: 29 } },
        { name: 'Fly', Men: { min: 33.01, max: 37 }, Women: { min: 29.01, max: 33 } },
        { name: 'Bantam', Men: { min: 37.01, max: 41 }, Women: { min: 33.01, max: 37 } },
        { name: 'Feather', Men: { min: 41.01, max: 45 }, Women: { min: 37.01, max: 41 } },
        { name: 'Light', Men: { min: 45.01, max: 49 }, Women: { min: 41.01, max: 44 } },
        { name: 'Welter', Men: { min: 49.01, max: 53 }, Women: { min: 44.01, max: 47 } },
        { name: 'Light Middle', Men: { min: 53.01, max: 57 }, Women: { min: 47.01, max: 51 } },
        { name: 'Middle', Men: { min: 57.01, max: 61 }, Women: { min: 51.01, max: 55 } },
        { name: 'Light Heavy', Men: { min: 61.01, max: 65 }, Women: { min: 55.01, max: 59 } },
        { name: 'Heavy', Men: { min: 65.01, max: Infinity }, Women: { min: 59.01, max: Infinity } }
    ],
    Youth: [
        { name: 'Fin', Men: { min: 0, max: 30 }, Women: { min: 0, max: 30 } },
        { name: 'Light', Men: { min: 30.01, max: 35 }, Women: { min: 30.01, max: 35 } },
        { name: 'Middle', Men: { min: 35.01, max: 40 }, Women: { min: 35.01, max: 40 } },
        { name: 'Heavy', Men: { min: 40.01, max: Infinity }, Women: { min: 40.01, max: Infinity } }
    ],
    Tigers: [
        { name: 'Fin', Men: { min: 0, max: 21 }, Women: { min: 0, max: 21 } },
        { name: 'Light', Men: { min: 21.01, max: 25 }, Women: { min: 21.01, max: 25 } },
        { name: 'Middle', Men: { min: 25.01, max: 30 }, Women: { min: 25.01, max: 30 } },
        { name: 'Heavy', Men: { min: 30.01, max: Infinity }, Women: { min: 30.01, max: Infinity } }
    ],
    Dragons: [
        { name: 'Fin', Men: { min: 0, max: 19 }, Women: { min: 0, max: 19 } },
        { name: 'Light', Men: { min: 19.01, max: 23 }, Women: { min: 19.01, max: 23 } },
        { name: 'Middle', Men: { min: 23.01, max: 27 }, Women: { min: 23.01, max: 27 } },
        { name: 'Heavy', Men: { min: 27.01, max: Infinity }, Women: { min: 27.01, max: Infinity } }
    ],
    Ultra: [
        { name: 'Fin', Men: { min: 0, max: 58 }, Women: { min: 0, max: 49 } },
        { name: 'Light', Men: { min: 58.01, max: 68 }, Women: { min: 49.01, max: 57 } },
        { name: 'Middle', Men: { min: 68.01, max: 80 }, Women: { min: 57.01, max: 67 } },
        { name: 'Heavy', Men: { min: 80.01, max: Infinity }, Women: { min: 67.01, max: Infinity } }
    ]
};
const ContactRules = [
    {
        ageGroup: `dragons`,
        belts: {
            all: `no head contact`
        }
    },
    {
        ageGroup: `tigers`,
        belts: {
            yellow: `no head contact`,
            green: `no head contact`,
            blue: `no head contact`,
            red: `no head contact`,
            black: `light head contact`
        }
    },
    {
        ageGroup: `youth`,
        belts: {
            yellow: `no head contact`,
            green: `no head contact`,
            blue: `no head contact`,
            red: `no head contact`,
            black: `light head contact`
        }
    },
    {
        ageGroup: `cadet`,
        belts: {
            yellow: `light head contact`,
            green: `light head contact`,
            blue: `light head contact`,
            red: `light face contact`,
            black: `full face contact`
        }
    },
    {
        ageGroup: `junior`,
        belts: {
            yellow: `light head contact`,
            green: `light head contact`,
            blue: `light face contact`,
            red: `light face contact`,
            black: `full face contact`
        }
    },
    {
        ageGroup: `senior`,
        belts: {
            all: `full face contact`
        }
    },
    {
        ageGroup: `ultra`,
        belts: {
            all: `light face contact`
        }
    }
];

// Bracketing logic

interface Competitor {
    age: number;
    gender: string;
    belt: string;
    [key: string]: unknown;
}

function findAgeGroup(age: number) {
    return AgeGroups.find(group => age >= group.minAge && age <= group.maxAge)?.name || null;
}

function findWeightClass(ageGroup: string, weight: number, gender: 'Men' | 'Women') {
    const formattedAgeGroup = ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1) as keyof typeof Weights;
    const weightClasses = Weights[formattedAgeGroup];
    if (!weightClasses) return null;

    return (
        weightClasses.find(wc => {
            const genderRange = wc[gender];
            return genderRange && weight >= genderRange.min && weight <= genderRange.max;
        })?.name || null
    );
}

// Function to process sparring competitors
function processSparringCompetitors(
    competitors: Competitor[],
    sparringBrackets: Record<string, { contactRule: string; competitors: Competitor[] }>,
    unmatchedSparring: Competitor[]
) {
    const grouped: Record<string, Competitor[]> = {};

    competitors.forEach(competitor => {
        const { age, weight, gender, belt } = competitor;

        // Normalize gender to ensure consistency
        const normalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
        if (normalizedGender !== 'Men' && normalizedGender !== 'Women') {
            unmatchedSparring.push({ ...competitor, reason: 'Invalid gender' });
            return;
        }

        // Find the age group
        const ageGroup = findAgeGroup(age);
        if (!ageGroup) {
            unmatchedSparring.push({ ...competitor, reason: 'Invalid age group' });
            return;
        }

        // Ensure weight is provided
        if (typeof weight !== 'number') {
            unmatchedSparring.push({ ...competitor, reason: 'Missing weight for sparring' });
            return;
        }

        // Find the weight class
        const weightClass = findWeightClass(ageGroup, weight, normalizedGender);
        if (!weightClass) {
            unmatchedSparring.push({ ...competitor, reason: 'No matching weight class for sparring' });
            return;
        }

        // Create a unique key for the bracket
        const bracketKey = `${ageGroup}-${belt}-${weightClass}-${gender}`;
        if (!grouped[bracketKey]) {
            grouped[bracketKey] = [];
        }
        grouped[bracketKey].push(competitor);
    });

    // Separate competitors into brackets or unmatched
    for (const [key, group] of Object.entries(grouped)) {
        if (group.length >= 2) {
            // Determine the contact rule for the bracket
            const [ageGroup, belt] = key.split('-');
            const contactRule = getContactRule(ageGroup, belt);

            sparringBrackets[key] = {
                contactRule,
                competitors: group
            };
        } else {
            unmatchedSparring.push({ ...group[0], reason: 'Only one competitor in bracket' });
        }
    }
}

// Helper function to get the contact rule based on age group and belt
function getContactRule(ageGroup: string, belt: string): string {
    const contactRuleEntry = ContactRules.find(rule => rule.ageGroup === ageGroup);
    if (!contactRuleEntry) return 'No contact rule found';

    if (contactRuleEntry.belts.all) {
        return contactRuleEntry.belts.all;
    }

    return contactRuleEntry.belts[belt as keyof typeof contactRuleEntry.belts] || 'No contact rule found';
}

// Function to process forms competitors
function processFormsCompetitors(
    competitors: Competitor[],
    formsGroups: Record<string, Competitor[]>,
    unmatchedForms: Competitor[]
) {
    const grouped: Record<string, Competitor[]> = {};

    competitors.forEach(competitor => {
        const { age, gender, belt } = competitor;

        // Find the age group
        const ageGroup = findAgeGroup(age);
        if (!ageGroup) {
            unmatchedForms.push({ ...competitor, reason: 'Invalid age group' });
            return;
        }

        // Create a unique key for the group
        const groupKey = `${ageGroup}-${belt}-${gender}`;
        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }
        grouped[groupKey].push(competitor);
    });

    // Separate competitors into groups or unmatched
    for (const [key, group] of Object.entries(grouped)) {
        if (group.length >= 2) {
            formsGroups[key] = group; // Add to groups if there are at least 2 competitors
        } else {
            unmatchedForms.push({ ...group[0], reason: 'Only one competitor in group' }); // Add to unmatched if only one competitor
        }
    }
}

// Function to process breaking competitors
function processBreakingCompetitors(
    competitors: Competitor[],
    breakingGroups: Record<string, Competitor[]>,
    unmatchedBreaking: Competitor[]
) {
    const grouped: Record<string, Competitor[]> = {};

    competitors.forEach(competitor => {
        const { age, gender, belt } = competitor;

        // Find the age group
        const ageGroup = findAgeGroup(age);
        if (!ageGroup) {
            unmatchedBreaking.push({ ...competitor, reason: 'Invalid age group' });
            return;
        }

        // Create a unique key for the group
        const groupKey = `${ageGroup}-${belt}-${gender}`;
        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }
        grouped[groupKey].push(competitor);
    });

    // Separate competitors into groups or unmatched
    for (const [key, group] of Object.entries(grouped)) {
        if (group.length >= 2) {
            breakingGroups[key] = group; // Add to groups if there are at least 2 competitors
        } else {
            unmatchedBreaking.push({ ...group[0], reason: 'Only one competitor in group' }); // Add to unmatched if only one competitor
        }
    }
}

// Main function to sort competitors
function sortCompetitors(competitors: Competitor[]) {
    const sparringBrackets: Record<string, { contactRule: string; competitors: Competitor[] }> = {};
    const formsGroups: Record<string, Competitor[]> = {};
    const breakingGroups: Record<string, Competitor[]> = {};
    const unmatchedSparring: Competitor[] = [];
    const unmatchedForms: Competitor[] = [];
    const unmatchedBreaking: Competitor[] = [];

    // Separate competitors by event type
    const sparringCompetitors = competitors.filter(c => c.event === 'sparring');
    const formsCompetitors = competitors.filter(c => c.event === 'forms');
    const breakingCompetitors = competitors.filter(c => c.event === 'breaking');

    // Process sparring competitors
    processSparringCompetitors(sparringCompetitors, sparringBrackets, unmatchedSparring);

    // Process forms competitors
    processFormsCompetitors(formsCompetitors, formsGroups, unmatchedForms);

    // Process breaking competitors
    processBreakingCompetitors(breakingCompetitors, breakingGroups, unmatchedBreaking);

    return {
        sparringBrackets,
        formsGroups,
        breakingGroups,
        unmatchedSparring,
        unmatchedForms,
        unmatchedBreaking
    };
}

export {
    findAgeGroup,
    findWeightClass,
    processSparringCompetitors,
    processFormsCompetitors,
    processBreakingCompetitors,
    sortCompetitors,
    Events,
    Belts,
    AgeGroups,
    Weights,
    ContactRules
};