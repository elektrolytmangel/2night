import { Party } from '../model/app';
import { getAll } from './firebase-party.service';

const filterParties = (parties: Party[], startDate?: Date, endDate?: Date) => {
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

export const getParties = async (startDate?: Date, endDate?: Date, signal?: AbortSignal): Promise<PartyResponse> => {
  try {
    const response = await getAll();
    return { data: filterParties(response, startDate, endDate) };
  } catch (error: any) {
    const msg = error.name !== 'CanceledError' ? error.message : '';
    return { data: [], errorMsg: msg };
  }
};
