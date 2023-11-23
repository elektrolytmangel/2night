import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../../services/firebase.service';
import { TextField } from '../form/text-field/TextField';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

  const handleLogin = (data: UserLogin) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(state?.path || '/admin');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady();
      if (auth.currentUser) {
        navigate(state?.path || '/admin');
      }
    };
    init();
  }, [navigate, state?.path]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-2 text-primary">{t('login')}</p>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'start', gap: '0.5rem' }}
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
        <button className="btn btn-primary mt-2" type="submit">
          {t('login')}
        </button>
        <Link to={'/register'} className="btn btn-outline-primary">
          {t('or_sign_up')}
        </Link>
      </form>
    </div>
  );
};
