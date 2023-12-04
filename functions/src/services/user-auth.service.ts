import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import S from '../infrastructure/service-registry';
import { DeletePartyRequest, PartyRequest } from '../model/app';

export const isUserAuthenticated = async (req: CallableRequest<any>) => {
  const token = req.auth?.token;
  if (!token) {
    throw new HttpsError('unauthenticated', 'No token provided');
  }
};

export const isUser2PartyAuthorized = async (req: CallableRequest<PartyRequest | DeletePartyRequest>) => {
  const token = req.auth?.token;
  if (!token) {
    throw new HttpsError('unauthenticated', 'No token provided');
  }

  if (token.roles?.includes('admin')) {
    return;
  }

  const configuration = await S.configurationService.getConfiguration();
  const eventLocationIds: string[] = [];
  try {
    if (isPartyIdAvailable(req.data)) {
      const party = await S.partyService.getParty(req.data.id);
      eventLocationIds.push(party?.location.id);
    }

    if (isPartyLocationAvailable(req.data)) {
      eventLocationIds.push(req.data.location.id);
    }
  } catch (error) {
    console.log(error);
  }

  const permissions = configuration.eventLocations.filter((x) => eventLocationIds.includes(x.id));
  if (!permissions || permissions.length === 0) {
    throw new HttpsError('permission-denied', 'No permission for this location');
  }

  permissions.forEach((permission) => {
    token.roles?.forEach((role: string) => {
      const allowed = permission.rolesAllowed.includes(role);
      if (!allowed) {
        throw new HttpsError('permission-denied', 'No permission for this location');
      }
    });
  });
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

const isPartyIdAvailable = (obj: any): obj is DeletePartyRequest => {
  return obj.id !== undefined && obj.id !== null && obj.id !== '';
};

const isPartyLocationAvailable = (obj: any): obj is PartyRequest => {
  return obj.location !== undefined && obj.location !== null;
};
