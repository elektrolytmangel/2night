import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../../services/firebase.service';
import { TextField } from '../form/text-field/TextField';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type UserLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLogin>();

  const handleLogin = (data: UserLogin) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // todo: navigate to admin or add depending on user logged in
        console.log(userCredentials.user.metadata);
        navigate('/admin');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady();
      if (auth.currentUser) {
        // todo: navigate to admin or add depending on user logged in
        navigate('/admin');
      }
    };
    init();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-2 text-primary">{t('login')}</p>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'start', gap: '0.5rem' }}
      >
        <TextField
          label={t('email')}
          name="email"
          type="email"
          register={register('email', { required: true })}
          errors={errors}
        />
        <TextField
          label={t('password')}
          name="password"
          type="password"
          register={register('password', { required: true })}
          errors={errors}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={'/register'} className="fs-6">
            {t('sign_up_question')}
          </Link>
          <Link to={'/passwordforgot'} className="fs-6">
            {t('forgot_password')}
          </Link>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          {t('login')}
        </button>
      </form>
      <p style={{ textAlign: 'center', color: 'white' }}>
        {(auth.currentUser?.displayName || auth.currentUser?.email) ?? 'not logged in'}
      </p>
    </div>
  );
};
