export interface Address {
  name: string;
  map: string;
}

export interface FamilyNode {
  name: string;
  id: string;
  birthDate: string;
  address?: Address;
  spouse?: string;
  spouseId?: string;
  children?: FamilyNode[];
  image?: string;
}
