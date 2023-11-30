import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase.service';
import { TextField } from '../../components/form/text-field/TextField';

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
  const [signUpError, setSignUpError] = useState<string | undefined>(undefined);

  const onHandleSubmit = async (data: UserRegsiter) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      sendEmailVerification(userCredentials.user);
      updateProfile(userCredentials.user, { displayName: data.displayName });
      navigate('/admin');
    } catch (error: any) {
      setSignUpError(error.code);
    }
  };

  return (
    <div className="admin-common-container">
      <p className="fs-2 text-primary">{t('sign_up')}</p>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))} className="admin-common-form">
        <TextField
          label={t('name') + ' *'}
          name="displayName"
          type="text"
          register={register('displayName', { required: t('field_required') })}
          errors={errors}
        />
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
        <TextField
          label={t('repeat_password') + ' *'}
          name="repeatPassword"
          type="password"
          register={register('repeatPassword', {
            required: t('field_required'),
            validate: (value) => {
              return getValues('password') === value || t('passwords_dont_match');
            },
          })}
          errors={errors}
        />
        {signUpError && <div className="alert alert-danger m-0">{t(signUpError)}</div>}
        <button className="btn btn-primary" type="submit">
          {t('sign_up')}
        </button>
        <Link to="/login" className="btn btn-outline-primary">
          {t('back_to_login')}
        </Link>
      </form>
    </div>
  );
};
