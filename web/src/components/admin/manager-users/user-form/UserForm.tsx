import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AppUser } from '../../../../model/app';
import { assignRoles } from '../../../../services/firebase-user.service';
import { SelectField } from '../../../form/select-field/SelectField';
import { TextField } from '../../../form/text-field/TextField';

interface UserFormData {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  roles: string[] | null;
}

type Props = {
  user?: AppUser;
  onUserUpdated: () => void;
};

export const UserForm = (props: Props) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      uid: props.user?.uid,
      displayName: props.user?.displayName,
      email: props.user?.email,
      roles: props.user?.customClaims?.roles,
    },
  });

  const onHandleSubmit = async (data: UserFormData) => {
    if (data.uid) {
      await assignRoles(data.uid, data.roles ?? []);
      props.onUserUpdated();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <p className="text-primary fs-2">{t('edit_user')}</p>
      <form
        onSubmit={handleSubmit((data) => onHandleSubmit(data))}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}
      >
        <TextField label={t('uid')} name="uid" register={register('uid')} type="text" errors={errors} disabled />
        <TextField
          label={t('display_name')}
          name="displayName"
          register={register('displayName')}
          type="text"
          errors={errors}
          disabled
        />
        <TextField label={t('email')} name="email" register={register('email')} type="text" errors={errors} disabled />
        <SelectField
          label={t('roles')}
          name="roles"
          register={register('roles')}
          multiple={true}
          errors={errors}
          options={[
            { key: '24', displayText: 'slf' },
            { key: 'admin', displayText: 'admin' },
          ]}
        />
        <button className="btn btn-primary" type="submit">
          {t('save')}
        </button>
      </form>
    </div>
  );
};
