export interface OrganisationType {
  id: number;
  name: string;
  owberId: number;
  country?: string;
  place?: string;
  postCode?: string;
  address?: string;
  email?: string;
  phone?: string;
}