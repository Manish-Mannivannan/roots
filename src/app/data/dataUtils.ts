import { FamilyNode, Address } from '../types/interfaces';
import familyData from './familyData';
import moment from "moment";

export const getNodeById = (node: FamilyNode, id: string): FamilyNode | null => {
  // Check for exact match
  if (node.id === id) {
    return node;
  }
  // Check for spouse match
  if (node.spouseId === id) {
    return node;
  }
  // Recursively check children
  if (node.children) {
    for (const child of node.children) {
      const found = getNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const getNodesByIDs = (IDs: string[]): FamilyNode[] => {
  const result: FamilyNode[] = [];

  if (IDs.length < 0 || IDs === null) return result;

  IDs.forEach(id => {
    const IdResult = getNodeById(familyData, id);
    if (IdResult != null) result.push(IdResult);
  });

  return result;
};

export const getParentId = (id: string): string | null => {
  const parts = id.split('.');
  if (parts.length <= 1) return null;
  parts.pop(); // Remove the last part to get the parent id
  return parts.join('.');
};

export const parentAddress = (id: string): Address | null => {
  const parentId = getParentId(id);
  if (!parentId) return null;

  const parentNode = getNodeById(familyData, parentId);
  if (parentNode && parentNode.address && parentNode.address.name) {
    return parentNode.address;
  }
  return null;
};

export const calculateAge = (familyNode: FamilyNode, isSpouse: boolean): string | string[] => {
  const birthDate = isSpouse ? familyNode.spouseBD : familyNode.birthDate;
  const deathDate = isSpouse ? familyNode.spouseDD : familyNode.deathDate;

  if (!birthDate) return 'Invalid birth date';

  const birthMoment = moment(birthDate, 'DD.MM.YYYY');
  const deathMoment = deathDate ? moment(deathDate, 'DD.MM.YYYY') : moment();

  if (!birthMoment.isValid() || !deathMoment.isValid()) return 'Invalid date';

  const years = deathMoment.diff(birthMoment, 'years');
  birthMoment.add(years, 'years');

  const months = deathMoment.diff(birthMoment, 'months');

  return [`${years}` + " years",`${months}`+ " months"];
};

export const getMembersWithName = (searchTerm: string): FamilyNode[] => {
  const result: FamilyNode[] = [];

  if (searchTerm === "" || searchTerm === null) return result; 

  const searchFamilyTree = (node: FamilyNode) => {
    if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      result.push(node);
    }

    if (node.spouse && node.spouse.toLowerCase().includes(searchTerm.toLowerCase())) {
      result.push({
        ...node,
        name: node.spouse,
        id: node.spouseId || "",
        birthDate: node.spouseBD || "",
        deathDate: node.spouseDD,
        address: node.spouseAdd,
        image: node.spouseImage,
        children: []
      });
    }

    if (node.children) {
      node.children.forEach(searchFamilyTree);
    }
  };

  searchFamilyTree(familyData);

  return result;
};