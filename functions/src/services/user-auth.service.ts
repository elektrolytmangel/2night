import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import M from '../infrastructure/ioc-module';
import { DeletePartyRequest, PartyRequest } from '../model/app';

export const isUserActionAuthorized = async (req: CallableRequest<PartyRequest | DeletePartyRequest>) => {
  const token = req.auth?.token;
  if (!token) {
    throw new HttpsError('unauthenticated', 'No token provided');
  }

  const configuration = await M.getConfigurationService().getConfiguration();
  let eventLocationId: string | undefined;
  if (isDeletePartyRequest(req.data)) {
    const party = await M.getPartyService().getParty(req.data.id);
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
    allowed = req.auth?.token?.roles?.includes(role) || allowed;
  });

  if (!allowed) {
    throw new HttpsError('permission-denied', 'No permission for this location');
  }
};

const isDeletePartyRequest = (obj: any): obj is DeletePartyRequest => {
  return obj.id !== undefined;
};
