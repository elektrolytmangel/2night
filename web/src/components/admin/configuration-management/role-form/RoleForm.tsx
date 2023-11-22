import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../../form/text-field/TextField';

type Role = {
  name: string;
};

type RoleFormData = {
  roles: Role[];
};

type Props = {
  initalRoles: string[];
  setRoles: (roles: string[]) => void;
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onHandleSubmit(data))}>
        <div style={{ display: 'flex' }}>
          <p className="fs-2 text-primary">{t('roles')}</p>
          <button className="btn btn-outline-primary" onClick={() => append({ name: '' })}>
            {t('add')}
          </button>
        </div>
        <div style={{ height: '300px', overflow: 'auto' }}>
          {fields.map((item, index) => (
            <div key={item.id} style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem' }}>
              <TextField
                label={t('role') + ' *'}
                errors={errors}
                name={`roles.${index}.name`}
                register={register(`roles.${index}.name`, { required: true })}
                type="text"
              />
              <button className="btn btn-outline-primary" onClick={() => remove(index)}>
                {t('remove')}
              </button>
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
