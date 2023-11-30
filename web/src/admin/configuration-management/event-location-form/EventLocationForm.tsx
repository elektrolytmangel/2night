import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Configuration, EventLocationPermission } from '../../../model/app';
import { SelectField } from '../../../components/form/select-field/SelectField';
import { TextField } from '../../../components/form/text-field/TextField';

type Props = {
  item: EventLocationPermission | null;
  index?: number;
  roles: string[];
  onClose: () => void;
};

export const EventLocationForm = (props: Props) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<Configuration>();

  if (!props.item || props.index === undefined) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <p className="fs-2 text-primary">{t('event_location')}</p>
      <div key={props.item?.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        <div>
          <TextField
            label={t('id') + ' *'}
            errors={errors}
            name={`eventLocations.${props.index}.id`}
            register={register(`eventLocations.${props.index}.id`, { required: true })}
            type="number"
          />
        </div>
        <div>
          <TextField
            label={t('location_name') + ' *'}
            errors={errors}
            name={`eventLocations.${props.index}.locationName`}
            register={register(`eventLocations.${props.index}.locationName`, { required: true })}
            type="text"
          />
        </div>
        <div>
          <SelectField
            label={t('roles_allowed') + ' *'}
            errors={errors}
            name={`eventLocations.${props.index}.rolesAllowed`}
            register={register(`eventLocations.${props.index}.rolesAllowed`, { required: true })}
            options={props.roles.map((x) => {
              return { key: x, displayText: x };
            })}
            multiple={true}
          />
        </div>
        <button className="btn btn-primary" type="submit" onClick={() => props.onClose()}>
          {t('close')}
        </button>
      </div>
    </div>
  );
};
