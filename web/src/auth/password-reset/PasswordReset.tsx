import { confirmPasswordReset, signInWithEmailAndPassword, verifyPasswordResetCode } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../components/form/text-field/TextField';
import { auth } from '../../services/firebase.service';

type PasswordResetData = {
  email: string;
  password: string;
  repeatPassword: string;
};

type Props = {
  actionCode: string;
  continueUrl: string;
  lang: string;
};

export const PasswordReset = (props: Props) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<PasswordResetData>();
  const [resetError, setResetError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (props.lang) {
      i18n.changeLanguage(props.lang);
    }
  }, [i18n, props.lang]);

  const onHandleSubmit = async (data: PasswordResetData) => {
    try {
      const email = await verifyPasswordResetCode(auth, props.actionCode);
      await confirmPasswordReset(auth, props.actionCode, data.password);
      await signInWithEmailAndPassword(auth, email, data.password);
      navigate(props.continueUrl);
    } catch (error: any) {
      setResetError(error.code);
    }
  };

  return (
    <div className="admin-common-container">
      <p className="fs-2 text-primary">{t('reset_password')}</p>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))} className="admin-common-form">
        <TextField
          label={t('new_password') + ' *'}
          name="password"
          type="password"
          register={register('password', { required: t('field_required') })}
          errors={errors}
        />
        <TextField
          label={t('repeat_new_password') + ' *'}
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
        {resetError && <div className="alert alert-danger m-0">{t(resetError)}</div>}
        <button className="btn btn-primary" type="submit">
          {t('reset_password')}
        </button>
      </form>
    </div>
  );
};
