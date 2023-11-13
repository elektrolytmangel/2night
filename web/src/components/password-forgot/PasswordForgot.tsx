import { useTranslation } from 'react-i18next';
import { TextField } from '../form/text-field/TextField';
import { useForm } from 'react-hook-form';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase.service';
import { useNavigate } from 'react-router-dom';

type ForgotPassword = {
  email: string;
};

export const PasswordForgot = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPassword>();

  const onHandleSubmit = (data: ForgotPassword) => {
    sendPasswordResetEmail(auth, data.email);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'center' }}>
      <p className="fs-2 text-primary">{t('send_password_reset_email')}</p>
      <form
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}
        style={{ display: 'flex', flexDirection: 'column', margin: 'auto', textAlign: 'start', gap: '0.5rem' }}
      >
        <TextField
          label={t('email') + ' *'}
          name="email"
          type="email"
          register={register('email', { required: true })}
          errors={errors}
        />
        <button className="btn btn-primary mt-3">{t('send_password_reset_email')}</button>
      </form>
    </div>
  );
};
