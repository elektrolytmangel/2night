import { useTranslation } from 'react-i18next';
import { UserList } from './user-list/UserList';

export const UserManagement = () => {
  const { t } = useTranslation();

  return (
    <div className="admin-management-container">
      <p className="fs-1 text-primary">{t('user_management')}</p>
      <UserList />
    </div>
  );
};
