import { IdTokenResult } from 'firebase/auth';
import { UserState } from '../model/app';
import { auth } from './firebase.service';

export const getCurrentUserState = async (): Promise<UserState | null> => {
  await auth.authStateReady();

  if (auth.currentUser) {
    const token = await auth.currentUser.getIdTokenResult(true);
    return {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName || '',
      email: auth.currentUser.email || '',
      token: token.token,
      roles: getUserRoles(token),
      isAuthenticated: token?.token !== null && token?.token !== undefined && token?.token !== '',
    };
  }

  return null;
};

const getUserRoles = (token: IdTokenResult): string[] => {
  if (token.claims?.roles) {
    return token.claims.roles as string[];
  }
  return [];
};
