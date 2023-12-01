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

export const getParties = async (startDate?: Date, endDate?: Date): Promise<Party[]> => {
  const response = await getAll();
  return filterPartiesByDate(response, startDate, endDate);
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

export const filterPermissionsByRoles = (roles: string[] | undefined, permissions: EventLocationPermission[]) => {
  if (!roles) return [];
  try {
    if (roles.includes('admin')) {
      return permissions;
    } else {
      return permissions.filter((eventLocation) => {
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
