import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../../services/firebase.service';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <button className="btn btn-outline-primary" onClick={() => onLogout()}>
      {t('logout')}
    </button>
  );
};
