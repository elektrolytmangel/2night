import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';
import S from '../infrastructure/service-registry';
import { Configuration } from '../model/app';
import { isAdminUser } from '../services/user-auth.service';
import { globalConfig } from './global-api.config';

export const getConfiguration = onCall(globalConfig, async (req: CallableRequest) => {
  await isAdminUser(req);
  return await S.configurationService.getConfiguration();
});

export const postConfiguration = onCall(globalConfig, async (req: CallableRequest<Configuration>) => {
  await isAdminUser(req);
  return S.configurationService.createConfiguration(req.data);
});

export const putConfiguration = onCall(globalConfig, async (req: CallableRequest<Configuration>) => {
  await isAdminUser(req);
  if (!req.data.id) {
    throw new HttpsError('invalid-argument', 'No configuration id');
  }
  return await S.configurationService.upateConfiguration(req.data);
});
