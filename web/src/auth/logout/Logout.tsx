import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { auth } from '../../services/firebase.service';

export const Logout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  const onLogout = async () => {
    await signOut(auth);
    dispatch({ type: 'SET_USER_STATE', payload: null });
    navigate('/');
  };

  return (
    <button className="btn btn-outline-primary" onClick={() => onLogout()}>
      {t('logout')}
    </button>
  );
};
