export interface Party {
  id: string;
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
