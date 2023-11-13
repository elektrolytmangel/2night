import { useForm } from 'react-hook-form';
import { auth } from '../../services/firebase.service';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { TextField } from '../form/text-field/TextField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type UserRegsiter = {
  displayName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<UserRegsiter>();
  const onHandleSubmit = async (data: UserRegsiter) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      sendEmailVerification(userCredentials.user);
      updateProfile(userCredentials.user, { displayName: data.displayName });
      navigate('/admin');
    } catch (error) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-2 text-primary">{t('sign_up')}</p>
      <form
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}
        style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'start', gap: '0.5rem' }}
      >
        <TextField
          label={t('name') + ' *'}
          name="displayName"
          type="text"
          register={register('displayName', { required: true })}
          errors={errors}
        />
        <TextField
          label={t('email') + ' *'}
          name="email"
          type="email"
          register={register('email', { required: true })}
          errors={errors}
        />
        <TextField
          label={t('password') + ' *'}
          name="password"
          type="password"
          register={register('password', { required: true })}
          errors={errors}
        />
        <TextField
          label={t('repeat_password') + ' *'}
          name="repeatPassword"
          type="password"
          register={register('repeatPassword', {
            required: true,
            validate: (value) => {
              return getValues('password') === value || t('passwords_dont_match');
            },
          })}
          errors={errors}
        />
        <button className="btn btn-primary mt-3" type="submit">
          {t('sign_up')}
        </button>
      </form>
    </div>
  );
};
