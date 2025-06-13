export function sortCompetitors(competitors: any[]) {
  const AgeGroups = [
    { name: "dragons", minAge: 6, maxAge: 7 },
    { name: "tigers", minAge: 8, maxAge: 9 },
    { name: "youth", minAge: 10, maxAge: 11 },
    { name: "cadet", minAge: 12, maxAge: 14 },
    { name: "junior", minAge: 15, maxAge: 17 },
    { name: "senior", minAge: 18, maxAge: 33 },
    { name: "ultra", minAge: 32, maxAge: Number.POSITIVE_INFINITY },
  ]

  const WeightClasses = [
    { name: "light", maxWeight: 60 },
    { name: "medium", maxWeight: 75 },
    { name: "heavy", maxWeight: Number.POSITIVE_INFINITY },
  ]

  function findAgeGroup(age: number) {
    return AgeGroups.find((group) => age >= group.minAge && age <= group.maxAge)?.name || null
  }

  function findWeightClass(weight: number) {
    return WeightClasses.find((group) => weight <= group.maxWeight)?.name || null
  }

  const sparringBrackets: { [key: string]: { competitors: any[]; contactRule: string } } = {}
  const formsGroups: { [key: string]: any[] } = {}
  const breakingGroups: { [key: string]: any[] } = {}
  const unmatchedSparring: any[] = []
  const unmatchedForms: any[] = []
  const unmatchedBreaking: any[] = []

  // Process each competitor for each of their events
  competitors.forEach((competitor) => {
    const ageGroup = findAgeGroup(competitor.age)
    const weightClass = findWeightClass(competitor.weight)

    if (!ageGroup) {
      // Add to unmatched for each event they're registered for
      competitor.events.forEach((event: string) => {
        if (event === "sparring") {
          unmatchedSparring.push({ ...competitor, reason: "No age group found" })
        } else if (event === "forms") {
          unmatchedForms.push({ ...competitor, reason: "No age group found" })
        } else if (event === "breaking") {
          unmatchedBreaking.push({ ...competitor, reason: "No age group found" })
        }
      })
      return
    }
    
    // Process each event the competitor is registered for
    competitor.events.forEach((event: string) => {
      if (event === "sparring") {
        if (!weightClass) {
          unmatchedSparring.push({ ...competitor, reason: "No weight class found" })
          return
        }

        const bracketKey = `${ageGroup}-${competitor.gender}-${weightClass}-${competitor.belt}`
        if (!sparringBrackets[bracketKey]) {
          sparringBrackets[bracketKey] = { competitors: [], contactRule: "full" } // Default contact rule
        }
        sparringBrackets[bracketKey].competitors.push(competitor)
      } else if (event === "forms") {
        const formsKey = `${ageGroup}-${competitor.gender}-${competitor.belt}`
        if (!formsGroups[formsKey]) {
          formsGroups[formsKey] = []
        }
        formsGroups[formsKey].push(competitor)
      } else if (event === "breaking") {
        const breakingKey = `${ageGroup}-${competitor.gender}-${competitor.belt}`
        if (!breakingGroups[breakingKey]) {
          breakingGroups[breakingKey] = []
        }
        breakingGroups[breakingKey].push(competitor)
      }
    })
  })

  // Filter out brackets/groups with only one competitor and move them to unmatched
  Object.entries(sparringBrackets).forEach(([key, bracket]) => {
    if (bracket.competitors.length < 2) {
      bracket.competitors.forEach((competitor) => {
        unmatchedSparring.push({ ...competitor, reason: "Only one competitor in bracket" })
      })
      delete sparringBrackets[key]
    }
  })

  Object.entries(formsGroups).forEach(([key, group]) => {
    if (group.length < 2) {
      group.forEach((competitor) => {
        unmatchedForms.push({ ...competitor, reason: "Only one competitor in group" })
      })
      delete formsGroups[key]
    }
  })

  Object.entries(breakingGroups).forEach(([key, group]) => {
    if (group.length < 2) {
      group.forEach((competitor) => {
        unmatchedBreaking.push({ ...competitor, reason: "Only one competitor in group" })
      })
      delete breakingGroups[key]
    }
  })

  return {
    sparringBrackets,
    formsGroups,
    breakingGroups,
    unmatchedSparring,
    unmatchedForms,
    unmatchedBreaking,
  }
}
