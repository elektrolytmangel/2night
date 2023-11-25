import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Configuration } from '../../../model/app';
import { getConfiguration, updateConfiguration } from '../../../services/firebase-configuration.service';
import { CheckboxField } from '../../form/checkbox-field/CheckboxField';
import { EventLocationList } from './event-location-list/EventLocationList';
import { RoleManagement } from './role-management/RoleManagement';

const getInitialConfiguration = async (): Promise<Configuration> => {
  const config = await getConfiguration();
  if (config) {
    return config;
  }

  return {
    id: '',
    eventLocations: [],
    isActive: true,
  };
};

export const ConfigurationManagement = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState<string[]>([]);
  const methods = useForm<Configuration>({ defaultValues: getInitialConfiguration });
  const {
    handleSubmit,
    register,
    formState: { errors, defaultValues },
  } = methods;

  const onHandleSubmit = (data: Configuration) => {
    updateConfiguration(data);
  };

  useEffect(() => {
    const eventLocations = defaultValues?.eventLocations;
    if (roles.length === 0 && eventLocations && eventLocations.length > 0) {
      const roles: string[] = [];
      eventLocations.forEach((x) => {
        if (x?.rolesAllowed) {
          x.rolesAllowed.forEach((y) => {
            if (y && !roles.includes(y)) {
              roles.push(y);
            }
          });
        }
      });
      setRoles(roles);
    }
  }, [defaultValues, roles]);

  return (
    <FormProvider {...methods}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p className="fs-1 text-primary">{t('configuration')}</p>
        <div style={{ width: '100%', marginLeft: '0.5rem' }}>
          <RoleManagement roles={roles} setRoles={setRoles} />
        </div>
        <form onSubmit={handleSubmit((data) => onHandleSubmit(data))} style={{ width: '100%' }}>
          <p className="fs-3 text-primary" style={{ marginLeft: '0.5rem' }}>
            {t('event_locations')}
          </p>
          <EventLocationList roles={roles} />
          <CheckboxField
            label={t('is_active')}
            name="isActive"
            register={register('isActive')}
            errors={errors}
            disabled
          />
          <button type="submit" className="btn btn-primary mt-2">
            {t('save')}
          </button>
        </form>
      </div>
    </FormProvider>
  );
};
