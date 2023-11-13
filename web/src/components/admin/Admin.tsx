import { Link } from 'react-router-dom';
import { UserList } from './user-list/UserList';
import { useTranslation } from 'react-i18next';

export const Admin = () => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-1 text-primary">{t('admin')}</p>
      <UserList />
    </div>
  );
};
