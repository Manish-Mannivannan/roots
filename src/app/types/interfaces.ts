export interface Address {
  name: string;
  map?: string;
}

export interface FamilyNode {
  email?: string;
  name: string;
  id: string;
  birthDate: string;
  deathDate?: string
  address?: Address;
  tlf?: string;
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

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  birth_date?: string | null;
  death_date?: string | null;
  phone?: string | null;
  address?: string | null;
  is_global_admin: boolean;
  created_at: string;
}

export type EditableProfile = {
  full_name: string;
  birth_date: string; // ISO date string: "YYYY-MM-DD"
  phone: string;
  address: string;
};
