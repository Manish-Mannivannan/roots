export interface FamilyNode {
  name: string;
  spouse?: string;
  children?: FamilyNode[];
}

export const familyData: FamilyNode = {
  name: 'Great-Grandparent',
  spouse: 'Great-Grandparent Spouse',
  children: [
    {
      name: 'Grandparent 1',
      spouse: 'Grandparent 1 Spouse',
      children: [
        { name: 'Parent 1' },
        { name: 'Parent 2' },
        { name: 'Parent 3' },
      ],
    },
    {
      name: 'Grandparent 2',
      spouse: 'Grandparent 2 Spouse',
      children: [
        { name: 'Parent 4' },
        { name: 'Parent 5' },
        { name: 'Parent 6' },
      ],
    },
    {
      name: 'Grandparent 3',
      spouse: 'Grandparent 3 Spouse',
      children: [
        { name: 'Parent 7' },
        { name: 'Parent 8' },
        { name: 'Parent 9' },
      ],
    },
  ],
};
