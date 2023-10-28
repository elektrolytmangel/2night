import axios from "axios";
import { Party } from "../model/party";
import { getFakeParties } from "../test-data/fakeParties";

const EVENTS_URL =
  process.env.REACT_APP_PARTIES_URL ||
  "https://raw.githubusercontent.com/elektrolytmangel/2night/main/web/src/data/data.json";

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
  return {
    data: [
      ...getFakeParties(4, new Date()),
      ...getFakeParties(4, new Date("2023-10-26")),
      ...getFakeParties(4),
    ],
  };
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