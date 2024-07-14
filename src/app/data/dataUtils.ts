import { FamilyNode, Address } from '../types/interfaces';
import { familyData } from '../data/data';
import moment from "moment";

export const findNodeById = (node: FamilyNode, id: string): FamilyNode | null => {
  if (node.id === id) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
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

  const parentNode = findNodeById(familyData, parentId);
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