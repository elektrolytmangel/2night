export interface Party {
  id?: string;
  location: EventLocation;
  eventName: string;
  description: string;
  artists: string[];
  musicGenre: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
}

export interface EventLocation {
  id: string;
  locationName: string;
}

export interface PartyRequest extends Party {}

export interface PartyResponse extends Party {
  id: string;
}

export interface GetPartyRequest {
  id: string;
}

export interface DeletePartyRequest {
  id: string;
}

export interface EventLocationPermission extends EventLocation {
  rolesAllowed: string[];
}

export interface Configuration {
  isActive: boolean;
  eventLocations: EventLocationPermission[];
}

export interface ListUserRequest {
  maxResults: number;
  pageToken: string;
}

export interface AssignUserRoleRequest {
  userId: string;
  roles: string[];
}
