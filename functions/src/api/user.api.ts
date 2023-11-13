import { CallableRequest, onCall } from 'firebase-functions/v2/https';
import S from '../infrastructure/service-registry';
import { AssignUserRoleRequest, ListUserRequest } from '../model/app';
import { isAdminUser } from '../services/user-auth.service';
import { globalConfig } from './global-api.config';

export const listUsers = onCall(globalConfig, async (req: CallableRequest<ListUserRequest>) => {
  //await isAdminUser(req);
  return await S.userService.listUsers(req.data);
});

export const assignUserRoles = onCall(globalConfig, async (req: CallableRequest<AssignUserRoleRequest>) => {
  await isAdminUser(req);
  return await S.userService.assignUserRole(req.data);
});
