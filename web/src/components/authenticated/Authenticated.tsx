import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../services/firebase.service';

const validateRquiredRoles = (rolesRequired: string[], userRoles?: string[]): boolean => {
  let allowed: boolean = false;
  rolesRequired?.forEach((role) => {
    allowed = userRoles?.includes(role) || allowed;
  });
  return allowed;
};

interface Props extends PropsWithChildren {
  rolesRequired?: string[];
  redirectToLogin?: boolean;
}

export const Authenticated = (props: Props) => {
  const location = useLocation();
  const [state, setState] = useState<'waiting' | 'authorized' | 'rejected'>('waiting');

  useEffect(() => {
    const checkIfAuthorized = async () => {
      await auth.authStateReady();
      const token = await auth.currentUser?.getIdTokenResult(true);
      let allowed = token?.token !== undefined && token?.token !== null && token?.token !== '';
      if (props.rolesRequired && token) {
        const userRoles = token.claims.roles as string[];
        allowed = validateRquiredRoles(props.rolesRequired, userRoles) && allowed;
      }

      setState(allowed ? 'authorized' : 'rejected');
    };
    checkIfAuthorized();
  }, [props.rolesRequired]);

  let result: ReactNode | null = null;
  switch (state) {
    case 'waiting':
      result = null;
      break;
    case 'rejected':
      result = props.redirectToLogin ? <Navigate to="/login" replace state={{ path: location.pathname }} /> : null;
      break;
    case 'authorized':
      result = props.children;
      break;
    default:
      result = null;
      break;
  }

  return <>{result}</>;
};
