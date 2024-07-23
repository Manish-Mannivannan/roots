export interface Address {
  name: string;
  map: string;
}

export interface FamilyNode {
  name: string;
  id: string;
  birthDate: string;
  deathDate?: string
  address?: Address;
  image?: string;
  spouse?: string;
  spouseId?: string;
  spouseBD?: string;
  spouseDD?: string;
  spouseAdd?: Address;
  spouseImage?: string;
  children?: FamilyNode[];
}

export interface AboutEvent {
  familymemberId: string;
  date: string; // in dd-mm-yyyy format
  title: string;
  description: string;
}