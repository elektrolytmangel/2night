import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase.service';

export const Admin = () => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIfAdmin = async () => {
      await auth.authStateReady();
      const token = await auth.currentUser?.getIdTokenResult(true);
      setIsAdmin((token?.claims.roles as string[]).includes('admin'));
    };
    checkIfAdmin();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-1 text-primary">{t('admin')}</p>
      <p className="fs-3 text-primary">{t('welcome_admin')}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0 2rem' }}>
        <Link className="btn btn-primary" to={'/admin/usermanagement'} hidden={!isAdmin}>
          {t('user_management')}
        </Link>
        <Link className="btn btn-primary" to={'/admin/eventmanagement'}>
          {t('event_management')}
        </Link>
      </div>
    </div>
  );
};
