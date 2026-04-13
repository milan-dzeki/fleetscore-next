export interface OrganisationType {
  id: number;
  name: string;
  ownerId: number;
  country?: string;
  place?: string;
  postCode?: string;
  address?: string;
  email?: string;
  phone?: string;
}

export interface SailingClassType {
  id: number;
  worldSailingId: string;
  name: string;
  classCode: string | null;
  hullType: 'CENTERBOARD' | 'KEELBOAT' | 'KITEBOARDING' | 'MULTIHULL' | 'WINDSURFING';
  worldSailingStatus: 'INTERNATIONAL' | 'OLYMPIC';
  numberOfCrew: string | number;
  numberOfTrapeze: string | number | null;
  optimalCrewWeight: string | null;
  hullLength: string | null;
  beamLength: string | null;
  boatWeight: string | null;
  headsailArea: string | null;
  mainsailArea: string | null;
  spinnakerArea: string | null;
  classDesigner: string | null;
  yearDesigned: string | null;
}

export interface SailingNationType {
  id: number;
  code: string;
  country: string;
}

export interface RegattaType {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  country: string;
  place: string;
  postCode: string;
  address: string;
  email: string;
  phone: string;
  throwoutAfter: number;
  throwoutLimit: number;
  sailingClasses: {
    id: number;
    name: string;
  }[];
  organisers: number[];
  organisation: {
    id: number;
    name: string;
  };
  ownerId: string;
}

export interface ClubType {
  id: number;
  name: string;
  sailingNationId: number;
  sailingNationCode: string;
  sailingNationCountry: string;
  place: string;
  postCode: string;
  address: string;
  email: string;
  phone: string;
  organisationId: number;
  organisationName: string;
  ownerId: number;
}

export interface SailorType {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
}