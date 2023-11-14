import { App } from 'firebase-admin/app';
import { Auth, ListUsersResult, getAuth } from 'firebase-admin/auth';
import { AssignUserRoleRequest, ListUserRequest } from '../model/app';
import { HttpsError } from 'firebase-functions/v2/https';

export class UserService {
  private auth: Auth;

  constructor(app: App) {
    this.auth = getAuth(app);
  }

  public listUsers = async (req: ListUserRequest): Promise<ListUsersResult> => {
    try {
      return await this.auth.listUsers(req.maxResults, req.pageToken);
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };

  public assignUserRole = async (req: AssignUserRoleRequest) => {
    try {
      await this.auth.setCustomUserClaims(req.userId, { roles: req.roles });
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };

  public assignAdminUser = async (uid: string) => {
    try {
      await this.auth.setCustomUserClaims(uid, { roles: ['admin'] });
    } catch (error: any) {
      throw new HttpsError('internal', error.message);
    }
  };
}
