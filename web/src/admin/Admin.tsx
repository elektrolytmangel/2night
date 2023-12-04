import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Authenticated } from '../components/authenticated/Authenticated';
import './Admin.css';

export const Admin = () => {
  const { t } = useTranslation();

  return (
    <div className="admin-container">
      <p className="fs-1 text-primary">{t('admin')}</p>
      <p className="fs-3 text-primary">{t('welcome_admin')}</p>
      <div className='admin-link-container'>
        <Authenticated rolesRequired={['admin']}>
          <Link className="btn btn-primary" to={'/admin/usermanagement'}>
            {t('user_management')}
          </Link>
        </Authenticated>
        <Link className="btn btn-primary" to={'/admin/eventmanagement'}>
          {t('event_management')}
        </Link>
      </div>
    </div>
  );
};
