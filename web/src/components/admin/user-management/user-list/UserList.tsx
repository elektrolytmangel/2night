import { useEffect, useReducer, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { AppUser, Configuration } from '../../../../model/app';
import { getConfiguration } from '../../../../services/firebase-configuration.service';
import { list } from '../../../../services/firebase-user.service';
import { UserForm } from '../user-form/UserForm';
import './UserList.css';

type UserAction = {
  type: string;
  payload: any;
};

type State = {
  resultsOnPage: number;
  pageNumber: number;
  pageUsers: AppUser[];
  nextPageToken?: string;
  configuration: Configuration;
};

const initialState: State = {
  resultsOnPage: 10,
  pageNumber: 1,
  pageUsers: [],
  nextPageToken: '0',
  configuration: { id: '', isActive: false, eventLocations: [] },
};

const reducer = (state: State, action: UserAction): State => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action.payload,
      };
    case 'SET_PAGE_USERS':
      return {
        ...state,
        pageUsers: action.payload,
      };
    case 'SET_NEXT_PAGE_TOKEN':
      return {
        ...state,
        nextPageToken: action.payload,
      };
    case 'SET_CONFIGURATION':
      return {
        ...state,
        configuration: action.payload,
      };
    default:
      return state;
  }
};

export const UserList = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editUser, setEditUser] = useState<AppUser | undefined>(undefined);

  useEffect(() => {
    const listUsers = async () => {
      const result = await list({ maxResults: state.resultsOnPage, pageToken: state.nextPageToken || '0' });
      dispatch({ type: 'SET_PAGE_USERS', payload: result?.users });
      dispatch({ type: 'SET_PAGE_NUMBER', payload: result?.pageToken });
    };

    listUsers();
  }, [state.nextPageToken, state.resultsOnPage]);

  useEffect(() => {
    const loadConfig = async () => {
      const config = await getConfiguration();
      if (config) {
        dispatch({ type: 'SET_CONFIGURATION', payload: config });
      }
    };

    loadConfig();
  }, []);

  const handleUserUpdated = () => {
    setEditUser(undefined);
    dispatch({ type: 'SET_NEXT_PAGE_TOKEN', payload: null });
  };

  const userContent = state.pageUsers?.map((user) => {
    return (
      <tr key={user.uid} style={{ textAlign: 'start' }}>
        <td className="user-list-mobile-hidden">{user.uid}</td>
        <td>{user.displayName ?? 'n/A'}</td>
        <td>{user.email}</td>
        <td className="user-list-mobile-hidden">{user.metadata.lastSignInTime}</td>
        <td>{user.customClaims ? JSON.stringify(user.customClaims?.roles, null, ' ') : 'n/A'}</td>
        <td>
          <button className="btn btn-primary" onClick={() => setEditUser(user)}>
            {t('edit')}
          </button>
        </td>
      </tr>
    );
  });

  const roles = [...new Set(state.configuration.eventLocations.flatMap((x) => x.rolesAllowed))];
  return (
    <div>
      <table className="table table-dark table-striped table-hover table-responsive">
        <thead>
          <tr style={{ textAlign: 'start' }}>
            <th scope="col" className="user-list-mobile-hidden ">
              {t('uid')}
            </th>
            <th scope="col">{t('display_name')}</th>
            <th scope="col">{t('email')}</th>
            <th scope="col" className="user-list-mobile-hidden">
              {t('last_login')}
            </th>
            <th scope="col">{t('roles')}</th>
            <th scope="col">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>{userContent}</tbody>
      </table>
      <Modal show={editUser !== undefined} onHide={() => setEditUser(undefined)}>
        <div
          style={{
            display: 'flex',
            padding: '1rem',
            backgroundColor: 'black',
            border: '1px solid var(--bs-primary)',
            borderRadius: '8px',
          }}
          data-bs-theme="dark"
        >
          <button
            type="button"
            className="btn-close"
            onClick={() => setEditUser(undefined)}
            aria-label={t('close')}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          ></button>
          <UserForm user={editUser} onUserUpdated={() => handleUserUpdated()} roles={roles} />
        </div>
      </Modal>
    </div>
  );
};
