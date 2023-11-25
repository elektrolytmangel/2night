import { EventLocationPermission, Party } from '../model/app';
import { getAll } from './firebase-party.service';

const filterPartiesByDate = (parties: Party[], startDate?: Date, endDate?: Date) => {
  if (startDate && endDate) {
    return parties.filter((party) => {
      const partyDate = new Date(party.startDateTime);
      return partyDate >= startDate && partyDate <= endDate;
    });
  }
  return parties;
};

interface PartyResponse {
  data: Party[];
  errorMsg?: string;
}

export const getParties = async (startDate?: Date, endDate?: Date): Promise<PartyResponse> => {
  try {
    const response = await getAll();
    return { data: filterPartiesByDate(response, startDate, endDate) };
  } catch (error: any) {
    return { data: [], errorMsg: error.message };
  }
};

export const filterPartiesByRole = (parties: Party[], roles: string[], permissions: EventLocationPermission[]) => {
  try {
    if (roles.includes('admin')) {
      return parties;
    } else {
      return parties.filter((party) => {
        const eventLocation = permissions.find((permission) => permission.id === party.location.id);
        if (eventLocation) {
          const result = roles.reduce((a, b) => eventLocation.rolesAllowed.includes(b) || a, false);
          return result;
        }
        return false;
      });
    }
  } catch (error: any) {
    return [];
  }
};
