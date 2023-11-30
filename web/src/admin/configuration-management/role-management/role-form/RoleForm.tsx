import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../../../components/form/text-field/TextField';
import { ErrorText } from '../../../../components/form/error-text/ErrorText';

type Role = {
  name: string;
};

type RoleFormData = {
  roles: Role[];
};

type Props = {
  initalRoles: string[];
  setRoles: (roles: string[]) => void;
  onClose: () => void;
};

export const RoleForm = (props: Props) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<RoleFormData>({
    defaultValues: {
      roles: props.initalRoles.map((x) => {
        return {
          name: x,
        };
      }),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'roles',
  });

  const onHandleSubmit = (data: RoleFormData) => {
    props.setRoles(data.roles.map((x) => x.name));
    props.onClose();
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <p className="fs-2 text-primary my-auto">{t('roles')}</p>
          <button className="btn btn-outline-primary" onClick={() => append({ name: '' })}>
            {t('add')}
          </button>
        </div>
        <div style={{ height: '30rem', overflow: 'auto', width: '100%' }}>
          {fields.map((item, index) => (
            <div key={item.id}>
              <div
                style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'flex-end', width: '100%' }}
              >
                <TextField
                  label={t('role') + ' *'}
                  name={`roles.${index}.name`}
                  register={register(`roles.${index}.name`, { required: t('field_required') })}
                  type="text"
                />
                <button className="btn btn-outline-primary" onClick={() => remove(index)}>
                  {t('remove')}
                </button>
              </div>
              <ErrorText errors={errors} name={`roles.${index}.name`} />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          {t('save')}
        </button>
      </form>
    </div>
  );
};
