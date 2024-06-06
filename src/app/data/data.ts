export interface FamilyNode {
    name: string;
    children?: FamilyNode[];
  }
  
  export const familyData: FamilyNode = {
    name: 'Great-Grandparent',
    children: [
      {
        name: 'Grandparent 1',
        children: [
          { name: 'Parent 1' },
          { name: 'Parent 2' },
          { name: 'Parent 3' },
        ],
      },
      {
        name: 'Grandparent 2',
        children: [
          { name: 'Parent 4' },
          { name: 'Parent 5' },
          { name: 'Parent 6' },
        ],
      },
      {
        name: 'Grandparent 3',
        children: [
          { name: 'Parent 7' },
          { name: 'Parent 8' },
          { name: 'Parent 9' },
        ],
      },
    ],
  };
  