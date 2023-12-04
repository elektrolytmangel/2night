import { User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase.service';

export interface ListUserRequest {
  maxResults: number;
  pageToken: string;
}

interface ListUserResponse {
  users: User[];
  pageToken: string;
}

export const list = async (req: ListUserRequest) => {
  const listUsers = httpsCallable(functions, 'listUsers');
  return await listUsers(req)
    .then((result) => {
      return result.data as ListUserResponse;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const assignRoles = async (userId: string, roles: string[]) => {
  const assignUserRoles = httpsCallable(functions, 'assignUserRoles');
  return await assignUserRoles({ userId, roles })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
