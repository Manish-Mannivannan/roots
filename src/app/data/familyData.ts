import { FamilyNode } from "../types/interfaces";

const familyData: FamilyNode = {
  name: 'Great-Grandparent',
  id: '1',
  birthDate: '01.01.1940',
  deathDate: '08.07.2003',
  address: {
    name: 'Eiffel Tower',
  },
  image: 'img1.png',
  children: [
    {
      name: 'Grandparent 1',
      id: '1.1',
      birthDate: '01.01.1965',
      deathDate: '13.02.2011',
      image: 'img2.png',
      spouse: 'Grandparent 1 Spouse',
      spouseId: '1.1.S',
      spouseBD: '01.01.1966',
      spouseImage: 'img1.png',
      spouseAdd: {
        name: 'Louvre Museum',
      },
      children: [
        { name: 'Parent 1', id: '1.1.1', birthDate: '01.01.1985', image: 'img1.png' },
        { name: 'Parent 2', id: '1.1.2', birthDate: '01.01.1987', image: 'img2.png' },
        { name: 'Parent 3', id: '1.1.3', birthDate: '01.01.1990', image: 'img1.png' },
      ],
    },
    {
      name: 'Grandparent 2',
      id: '1.2',
      birthDate: '01.01.1967',
      image: 'img1.png',
      spouse: 'Grandparent 2 Spouse',
      spouseId: '1.2.S',
      spouseBD: '01.01.1968',
      spouseDD: '05.07.2021',
      spouseImage: 'img2.png',
      spouseAdd: {
        name: 'Notre Dame Cathedral',
      },
      children: [
        { name: 'Parent 4', id: '1.2.1', birthDate: '01.01.1986', image: 'img2.png' },
        { name: 'Parent 5', id: '1.2.2', birthDate: '01.01.1988', image: 'img1.png' },
        { name: 'Parent 6', id: '1.2.3', birthDate: '01.01.1991', image: 'img2.png' },
      ],
    },
    {
      name: 'Grandparent 3',
      id: '1.3',
      birthDate: '01.01.1970',
      image: 'img2.png',
      spouse: 'Grandparent 3 Spouse',
      spouseId: '1.3.S',
      spouseBD: '01.01.1971',
      spouseImage: 'img1.png',
      spouseAdd: {
        name: 'Arc de Triomphe',
      },
      children: [
        { name: 'Parent 7', id: '1.3.1', birthDate: '01.01.1989', image: 'img1.png' },
        { name: 'Parent 8', id: '1.3.2', birthDate: '01.01.1992', image: 'img2.png' },
        { name: 'Parent 9', id: '1.3.3', birthDate: '01.01.1994', image: 'img1.png' },
      ],
    },
  ]
};

export default familyData;