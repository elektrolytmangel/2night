import { sendPasswordResetEmail } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../components/form/text-field/TextField';
import { auth } from '../../services/firebase.service';

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

  const onHandleSubmit = async (data: ForgotPassword) => {
    await sendPasswordResetEmail(auth, data.email);
    navigate('/');
  };

  return (
    <div className="admin-common-container">
      <p className="fs-2 text-primary">{t('send_password_reset_email')}</p>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))} className="admin-common-form">
        <TextField
          label={t('email') + ' *'}
          name="email"
          type="email"
          register={register('email', { required: t('field_required') })}
          errors={errors}
        />
        <button className="btn btn-primary mt-3">{t('send_password_reset_email')}</button>
      </form>
    </div>
  );
};
