import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase.service';

export const list = async () => {
  const listUsers = httpsCallable(functions, 'listUsers');
  return await listUsers()
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const assignRoles = async (uid: string, roles: string[]) => {
  const assignUserRoles = httpsCallable(functions, 'assignUserRoles');
  return await assignUserRoles({ uid, roles })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
