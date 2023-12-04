import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { Unauthorized } from './unauthorized/Unauthorized';

const validateRequiredRoles = (rolesRequired: string[], userRoles?: string[]): boolean => {
  let allowed: boolean = false;
  rolesRequired?.forEach((role) => {
    allowed = userRoles?.includes(role) || allowed;
  });
  return allowed;
};

interface Props extends PropsWithChildren {
  rolesRequired?: string[];
  unauthorizedAction?: 'redirect' | 'hide' | 'unauthorized-page';
}

export const Authenticated = (props: Props) => {
  const location = useLocation();
  const [state, setState] = useState<'waiting' | 'authorized' | 'rejected'>('waiting');
  const { state: userState } = useUserContext();

  useEffect(() => {
    const checkIfAuthorized = async () => {
      let allowed = userState?.isAuthenticated ?? false;
      if (props.rolesRequired && allowed) {
        allowed = validateRequiredRoles(props.rolesRequired, userState?.roles);
      }
      setState(allowed ? 'authorized' : 'rejected');
    };

    checkIfAuthorized();
  }, [userState, props.rolesRequired]);

  const getUnauthorizedResult = () => {
    switch (props.unauthorizedAction) {
      case 'unauthorized-page':
        return <Unauthorized />;
      case 'redirect':
        return <Navigate to="/login" replace state={{ path: location.pathname }} />;
      case 'hide':
      default:
        return null;
    }
  };

  let result: ReactNode | null = null;
  switch (state) {
    case 'waiting':
      result = null;
      break;
    case 'rejected':
      result = getUnauthorizedResult();
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
