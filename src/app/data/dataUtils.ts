import { FamilyNode, Address } from '../types/interfaces';
import { familyData } from '../data/data';

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