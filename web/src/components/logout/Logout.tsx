import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../services/firebase.service';

export const Logout = () => {
  const { t } = useTranslation();

  const onLogout = async () => {
    await signOut(auth);
  };

  return (
    <button className="btn btn-primary" onClick={() => onLogout()}>
      {t('logout')}
    </button>
  );
};
