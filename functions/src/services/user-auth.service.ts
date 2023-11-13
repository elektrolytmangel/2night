import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import S from '../infrastructure/service-registry';
import { DeletePartyRequest, PartyRequest } from '../model/app';

export const isUser2PartyAuthorized = async (req: CallableRequest<PartyRequest | DeletePartyRequest>) => {
  const token = req.auth?.token;
  if (!token) {
    throw new HttpsError('unauthenticated', 'No token provided');
  }

  const configuration = await S.configurationService.getConfiguration();
  let eventLocationId: string | undefined;
  if (isDeletePartyRequest(req.data)) {
    const party = await S.partyService.getParty(req.data.id);
    eventLocationId = party?.location.id;
  } else {
    eventLocationId = req.data.location.id;
  }

  const permission = configuration.eventLocations.find((x) => x.id === eventLocationId);
  if (!permission) {
    throw new HttpsError('permission-denied', 'No permission for this location');
  }

  let allowed: boolean = false;
  permission.rolesAllowed.forEach((role) => {
    allowed = token.roles?.includes(role) || allowed;
  });

  if (!allowed) {
    throw new HttpsError('permission-denied', 'No permission for this location');
  }
};

const isDeletePartyRequest = (obj: any): obj is DeletePartyRequest => {
  return obj.id !== undefined;
};

export const isAdminUser = async (req: CallableRequest<any>) => {
  const token = req.auth?.token;
  if (!token) {
    throw new HttpsError('unauthenticated', 'No token provided');
  }

  if (!token.roles?.includes('admin')) {
    throw new HttpsError('permission-denied', 'No permission for this action');
  }
};
