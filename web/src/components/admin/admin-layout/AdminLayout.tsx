import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../../../services/firebase.service';
import { Authenticated } from '../../authenticated/Authenticated';
import { Logout } from '../../logout/Logout';
import './AdminLayout.css';

export const AdminLayout = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserName = async () => {
      await auth.authStateReady();
      const name = auth.currentUser?.displayName;
      setUserName(name || '');
    };
    getUserName();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', justifyContent: 'space-between' }}
        className=" border-bottom border-primary"
      >
        <div
          className="navbar"
          style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', justifyContent: 'center' }}
        >
          <NavLink className="nav nav-link text-primary" to={'/'} end>
            {t('home')}
          </NavLink>
          <NavLink className="nav nav-link text-primary" to={'/admin'} end>
            {t('admin')}
          </NavLink>
          <Authenticated rolesRequired={['admin']}>
            <NavLink className="nav nav-link text-primary" to={'/admin/usermanagement'}>
              {t('user_management')}
            </NavLink>
            <NavLink className="nav nav-link text-primary" to={'/admin/configuration'}>
              {t('configuration')}
            </NavLink>
          </Authenticated>
          <Authenticated>
            <NavLink className="nav nav-link text-primary" to={'/admin/eventmanagement'}>
              {t('event_management')}
            </NavLink>
          </Authenticated>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <p className="text-primary" style={{ margin: 'auto' }}>
            {t('logged_in_as')} <strong>{userName}</strong>
          </p>
          <Logout />
        </div>
      </div>
      <Outlet />
    </div>
  );
};