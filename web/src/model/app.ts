import { User } from 'firebase/auth';

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
