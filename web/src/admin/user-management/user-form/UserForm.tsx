import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AppUser } from '../../../model/app';
import { assignRoles } from '../../../services/firebase-user.service';
import { SelectField } from '../../../components/form/select-field/SelectField';
import { TextField } from '../../../components/form/text-field/TextField';

interface UserFormData {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  roles: string[] | null;
}

type Props = {
  user?: AppUser;
  roles: string[];
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
    <div className="admin-form-container">
      <p className="text-primary fs-2">{t('edit_user')}</p>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))} className="admin-form">
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
          options={props.roles.map((x) => {
            return { key: x, displayText: x };
          })}
        />
        <button className="btn btn-primary" type="submit">
          {t('save')}
        </button>
      </form>
    </div>
  );
};
