import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';
import M from '../infrastructure/ioc-module';
import { DeletePartyRequest, GetPartyRequest, PartyRequest } from '../model/app';
import { isUserActionAuthorized } from '../services/user-auth.service';

export const postParty = onCall(async (req: CallableRequest<PartyRequest>) => {
  await isUserActionAuthorized(req);
  return M.getPartyService().createParty(req.data);
});

export const deleteParty = onCall(async (req: CallableRequest<DeletePartyRequest>) => {
  await isUserActionAuthorized(req);
  const partyId = req.data.id;
  if (!partyId) {
    throw new HttpsError('invalid-argument', 'No party id');
  }

  return M.getPartyService().deleteParty(partyId);
});

export const putParty = onCall(async (req: CallableRequest<PartyRequest>) => {
  await isUserActionAuthorized(req);
  const partyId = req.data.id;
  if (!partyId) {
    throw new HttpsError('invalid-argument', 'No party id');
  }

  return await M.getPartyService().updateParty(partyId, req.data);
});

export const getParty = onCall(async (req: CallableRequest<GetPartyRequest>) => {
  // validation should already be ok. This is a public endpoint
  const partyId = req.data.id;
  if (!partyId) {
    throw new HttpsError('invalid-argument', 'No party id');
  }

  return await M.getPartyService().getParty(partyId);
});

export const getParties = onCall(async (req) => {
  // validation should already be ok. This is a public endpoint
  return await M.getPartyService().getParties();
});
