import { User } from 'firebase/auth';

export interface Party {
  id?: string;
  location: EventLocation;
  eventName: string;
  description: string;
  artists: string;
  musicGenre: string;
  startDateTime: Date;
  endDateTime: Date;
  price: number;
}

export interface EventLocation {
  id: string;
  locationName: string;
}

export interface UserState {
  uid: string;
  displayName: string;
  email: string;
  token: string;
  roles: string[];
  isAuthenticated: boolean;
}

export interface AppUser extends User {
  customClaims?: {
    roles?: string[];
  };
}

export interface EventLocationPermission extends EventLocation {
  rolesAllowed: string[];
}

export interface Configuration {
  id: string;
  isActive: boolean;
  eventLocations: EventLocationPermission[];
}
