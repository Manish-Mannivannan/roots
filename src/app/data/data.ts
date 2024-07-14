import { FamilyNode } from "../types/interfaces";

export const familyData: FamilyNode = {
  name: 'Great-Grandparent',
  id: '1',
  birthDate: '01.01.1940',
  address: {
    name: 'Eiffel Tower',
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10499.96680658501!2d2.2760488175283307!3d48.858368630958445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2suk!4v1720825274120!5m2!1sen!2suk&disable_default_ui=true&disableUI=true'
  },
  image: 'img1.png',
  children: [
    {
      name: 'Grandparent 1',
      id: '1.1',
      birthDate: '01.01.1965',
      image: 'img2.png',
      spouse: 'Grandparent 1 Spouse',
      spouseId: '1.1.S',
      spouseBD: '01.01.1966',
      spouseImage: 'img1.png',
      spouseAdd: {
        name: 'Louvre Museum',
        map: ''
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
      spouseImage: 'img2.png',
      spouseAdd: {
        name: 'Notre Dame Cathedral',
        map: ''
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
        map: ''
      },
      children: [
        { name: 'Parent 7', id: '1.3.1', birthDate: '01.01.1989', image: 'img1.png' },
        { name: 'Parent 8', id: '1.3.2', birthDate: '01.01.1992', image: 'img2.png' },
        { name: 'Parent 9', id: '1.3.3', birthDate: '01.01.1994', image: 'img1.png' },
      ],
    },
  ]
};
