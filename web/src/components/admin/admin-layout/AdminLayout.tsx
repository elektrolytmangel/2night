import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import { Logout } from '../../logout/Logout';
import './AdminLayout.css';

export const AdminLayout = () => {
  const { t } = useTranslation();
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
          <NavLink className="nav nav-link text-primary" to={'/admin/usermanagement'}>
            {t('user_management')}
          </NavLink>
          <NavLink className="nav nav-link text-primary" to={'/admin/configuration'}>
            {t('configuration')}
          </NavLink>
          <NavLink className="nav nav-link text-primary" to={'/admin/eventmanagement'}>
            {t('event_management')}
          </NavLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logout />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
