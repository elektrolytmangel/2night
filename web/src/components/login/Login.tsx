import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { getCurrentUserState } from '../../services/current-user.service';
import { auth } from '../../services/firebase.service';
import { TextField } from '../form/text-field/TextField';

type UserLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLogin>();
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const { state: userState, dispatch } = useUserContext();

  const handleLogin = async (data: UserLogin) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await getCurrentUserState();
      dispatch({ type: 'SET_USER_STATE', payload: user });
      navigate(state?.path || '/admin');
    } catch (error: any) {
      setLoginError(error.code);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (userState?.isAuthenticated) {
        navigate(state?.path || '/admin');
      }
    };
    init();
  }, [navigate, userState, state?.path]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-2 text-primary">{t('login')}</p>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          textAlign: 'start',
          gap: '0.5rem',
        }}
      >
        <TextField
          label={t('email') + ' *'}
          name="email"
          type="email"
          register={register('email', { required: t('field_required') })}
          errors={errors}
        />
        <TextField
          label={t('password') + ' *'}
          name="password"
          type="password"
          register={register('password', { required: t('field_required') })}
          errors={errors}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={'/passwordforgot'} className="fs-6">
            <small>{t('forgot_password')}</small>
          </Link>
        </div>
        {loginError && <div className="alert alert-danger m-0">{t(loginError)}</div>}
        <button className="btn btn-primary" type="submit">
          {t('login')}
        </button>
        <Link to={'/register'} className="btn btn-outline-primary">
          {t('or_sign_up')}
        </Link>
      </form>
    </div>
  );
};
