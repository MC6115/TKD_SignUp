export const competitors = [
  // ✅ Matched Sparring Bracket: Junior - Blue - welter - Men
  { name: 'John Doe', age: 16, weight: 60, gender: 'Men', event: 'sparring', belt: 'blue' },
  { name: 'Quinno Violet', age: 17, weight: 60, gender: 'Men', event: 'sparring', belt: 'blue' },
  { name: 'Charlie White', age: 15, weight: 60, gender: 'Men', event: 'sparring', belt: 'blue' },

  // ✅ Matched Sparring Bracket: Cadet - Yellow - welter - Men
  { name: 'Henry Gold', age: 14, weight: 50, gender: 'Men', event: 'sparring', belt: 'yellow' },
  { name: 'Tim Orange', age: 13, weight: 50, gender: 'Men', event: 'sparring', belt: 'yellow' },

  // ✅ Matched Sparring Bracket: Youth - Yellow - Heavy - Women
  { name: 'Mona Cyan', age: 11, weight: 46, gender: 'Women', event: 'sparring', belt: 'yellow' },
  { name: 'Sally Green', age: 10, weight: 46, gender: 'Women', event: 'sparring', belt: 'yellow' },

  // ❌ Unmatched Sparring
  { name: 'Mary Johnson', age: 10, weight: 45, gender: 'Women', event: 'sparring', belt: 'red' }, // unmatched
  { name: 'Alice Johnson', age: 18, weight: 70, gender: 'Women', event: 'sparring', belt: 'red' }, // unmatched
  { name: 'Frank Blue', age: 22, weight: 80, gender: 'Men', event: 'sparring', belt: 'black' }, // unmatched
  { name: 'Isabel Orange', age: 27, weight: 62, gender: 'Women', event: 'sparring', belt: 'black' }, // unmatched
  { name: 'Nick Olive', age: 17, weight: 63, gender: 'Men', event: 'sparring', belt: 'red' }, // unmatched
  { name: 'Karen Gray', age: 13, weight: 52, gender: 'Women', event: 'sparring', belt: 'green' }, // unmatched

  // ✅ Matched Forms Group: Cadet - Green - Men
  { name: 'Bob Brown', age: 12, gender: 'Men', event: 'forms', belt: 'green' },
  { name: 'Tom Mint', age: 12, gender: 'Men', event: 'forms', belt: 'green' },

  // ✅ Matched Forms Group: Tigers - Yellow - Men
  { name: 'Jack Silver', age: 8, gender: 'Men', event: 'forms', belt: 'yellow' },
  { name: 'Liam Lime', age: 8, gender: 'Men', event: 'forms', belt: 'yellow' },

  // ❌ Unmatched Forms
  { name: 'Eve Black', age: 7, gender: 'Women', event: 'forms', belt: 'yellow' }, // unmatched
  { name: 'Olga Pink', age: 6, gender: 'Women', event: 'forms', belt: 'white' }, // unmatched

  // ✅ Matched Breaking Group: Senior - Black - Women
  { name: 'Diana Green', age: 33, gender: 'Women', event: 'breaking', belt: 'black' },
  { name: 'Nina Blue', age: 30, gender: 'Women', event: 'breaking', belt: 'black' },

  // ✅ Matched Breaking Group: Youth - Yellow - Women
  { name: 'Jane Smith', age: 10, gender: 'Women', event: 'breaking', belt: 'yellow' },
  { name: 'Clara Tan', age: 10, gender: 'Women', event: 'breaking', belt: 'yellow' },

  // ❌ Unmatched Breaking
  { name: 'Grace Red', age: 9, gender: 'Women', event: 'breaking', belt: 'green' }, // unmatched
  { name: 'Leo Bronze', age: 35, gender: 'Men', event: 'breaking', belt: 'black' }, // unmatched
  { name: 'Paul Indigo', age: 20, gender: 'Men', event: 'breaking', belt: 'blue' }, // unmatched
];
