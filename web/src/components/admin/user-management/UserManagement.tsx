import { useTranslation } from 'react-i18next';
import { UserList } from './user-list/UserList';

export const UserManagement = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <p className="fs-1 text-primary">{t('user_management')}</p>
      <UserList />
    </div>
  );
};
