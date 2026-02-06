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