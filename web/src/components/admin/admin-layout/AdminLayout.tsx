import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import { useUserContext } from '../../../context/userContext';
import { Authenticated } from '../../authenticated/Authenticated';
import { Logout } from '../../logout/Logout';
import './AdminLayout.css';

export const AdminLayout = () => {
  const { t } = useTranslation();
  const { state } = useUserContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', height: '100%' }}>
      <div className="container-fluid border-bottom border-primary">
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            justifyContent: 'space-between',
            width: '100%',
          }}
          className="navbar navbar-expand-lg "
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#admin-nav"
            aria-controls="admin-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon primary"></span>
          </button>
          <div className="collapse navbar-collapse" id="admin-nav">
            <NavLink className="nav-item nav nav-link text-primary" to={'/'} end>
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '0.5rem' }}>
            <p className="text-primary" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              {t('logged_in_as')} <strong>{state?.displayName}</strong>
            </p>
            <Logout />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
