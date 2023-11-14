import { useEffect, useReducer, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppUser } from '../../../../model/app';
import { list } from '../../../../services/firebase-user.service';
import { UserForm } from '../user-form/UserForm';

type UserAction = {
  type: string;
  payload: any;
};

type State = {
  resultsOnPage: number;
  pageNumber: number;
  pageUsers: AppUser[];
  nextPageToken?: string;
};

const initialState: State = { resultsOnPage: 10, pageNumber: 1, pageUsers: [], nextPageToken: '0' };

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

  const handleUserUpdated = () => {
    setEditUser(undefined);
    dispatch({ type: 'SET_NEXT_PAGE_TOKEN', payload: null });
  };

  const userContent = state.pageUsers.map((user) => {
    return (
      <tr key={user.uid} style={{ textAlign: 'start' }}>
        <td>{user.uid}</td>
        <td>{user.displayName ?? 'n/A'}</td>
        <td>{user.email}</td>
        <td>{user.metadata.lastSignInTime}</td>
        <td>{user.customClaims ? JSON.stringify(user.customClaims?.roles, null, ' ') : 'n/A'}</td>
        <td>
          <button className="btn btn-primary" onClick={() => setEditUser(user)}>
            {t('edit')}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr style={{ textAlign: 'start' }}>
            <th scope="col">{t('uid')}</th>
            <th scope="col">{t('display_name')}</th>
            <th scope="col">{t('email')}</th>
            <th scope="col">{t('last_login')}</th>
            <th scope="col">{t('roles')}</th>
            <th scope="col">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>{userContent}</tbody>
      </table>
      <Modal show={editUser !== undefined} onHide={() => setEditUser(undefined)} >
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
          <UserForm user={editUser} onUserUpdated={() => handleUserUpdated()} />
        </div>
      </Modal>
    </div>
  );
};
