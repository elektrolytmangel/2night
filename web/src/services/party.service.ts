import axios from "axios";
import { Party } from "../model/party";

const EVENTS_URL =
  process.env.REACT_APP_PARTIES_URL ||
  "https://raw.githubusercontent.com/elektrolytmangel/2night/party-data/data/data.json";

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

export const getParties = async (
  startDate?: Date,
  endDate?: Date,
  signal?: AbortSignal
): Promise<PartyResponse> => {
  try {
    const response = await axios.get<Party[]>(EVENTS_URL, { signal: signal });
    if (response.status === 200) {
      return { data: filterParties(response.data, startDate, endDate) };
    }
  } catch (error: any) {
    const msg = error.name !== "CanceledError" ? error.message : "";
    return { data: [], errorMsg: msg };
  }

  return { data: [], errorMsg: "" };
};
