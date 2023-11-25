import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Authenticated } from '../authenticated/Authenticated';

export const Admin = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
    >
      <p className="fs-1 text-primary">{t('admin')}</p>
      <p className="fs-3 text-primary">{t('welcome_admin')}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 2rem' }}>
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
