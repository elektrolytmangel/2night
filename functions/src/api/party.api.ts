import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';
import S from '../infrastructure/service-registry';
import { DeletePartyRequest, GetPartyRequest, PartyRequest } from '../model/app';
import { isUser2PartyAuthorized } from '../services/user-auth.service';
import { globalConfig } from './global-api.config';


export const postParty = onCall(globalConfig, async (req: CallableRequest<PartyRequest>) => {
  await isUser2PartyAuthorized(req);
  return S.partyService.createParty(req.data);
});

export const deleteParty = onCall(globalConfig, async (req: CallableRequest<DeletePartyRequest>) => {
  await isUser2PartyAuthorized(req);
  const partyId = req.data.id;
  if (!partyId) {
    throw new HttpsError('invalid-argument', 'No party id');
  }

  return S.partyService.deleteParty(partyId);
});

export const putParty = onCall(globalConfig, async (req: CallableRequest<PartyRequest>) => {
  await isUser2PartyAuthorized(req);
  const partyId = req.data.id;
  if (!partyId) {
    throw new HttpsError('invalid-argument', 'No party id');
  }

  return await S.partyService.updateParty(partyId, req.data);
});

export const getParty = onCall(globalConfig, async (req: CallableRequest<GetPartyRequest>) => {
  // validation should already be ok. This is a public endpoint
  const partyId = req.data.id;
  if (!partyId) {
    throw new HttpsError('invalid-argument', 'No party id');
  }

  return await S.partyService.getParty(partyId);
});

export const getParties = onCall(globalConfig, async (req) => {
  // validation should already be ok. This is a public endpoint
  return await S.partyService.getParties();
});
