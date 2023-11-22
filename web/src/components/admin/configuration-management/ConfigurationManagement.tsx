import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Configuration } from '../../../model/app';
import { getConfiguration, updateConfiguration } from '../../../services/firebase-configuration.service';
import { CheckboxField } from '../../form/checkbox-field/CheckboxField';
import { EventLocationList } from './event-location-list/EventLocationList';
import { RoleForm } from './role-form/RoleForm';

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
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
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
          height: '100%',
          width: '100%',
        }}
      >
        <p className="fs-1 text-primary">{t('configuration')}</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <p className="text-primary">
            {t('available_roles')}: {JSON.stringify(roles)}
          </p>
          <button className="btn btn-outline-primary" onClick={() => setShowAddRoleForm(true)}>
            {t('add_role')}
          </button>
        </div>
        <form onSubmit={handleSubmit((data) => onHandleSubmit(data))}>
          <p className="fs-2 text-primary">{t('event_locations')}</p>
          <EventLocationList roles={roles} />
          <CheckboxField
            label={t('is_active')}
            name="isActive"
            register={register('isActive')}
            errors={errors}
            disabled
          />
          <button type="submit" className="btn btn-primary">
            {t('save')}
          </button>
        </form>
        <Modal show={showAddRoleForm} onHide={() => setShowAddRoleForm(false)}>
          <div
            style={{
              display: 'flex',
              padding: '1rem',
              backgroundColor: 'black',
              border: '1px solid var(--bs-primary)',
              borderRadius: '8px',
            }}
            data-bs-theme="dark"
          >
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowAddRoleForm(false)}
              aria-label={t('close')}
              style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            ></button>
            <RoleForm initalRoles={roles} setRoles={(r) => setRoles(r)} />
          </div>
        </Modal>
      </div>
    </FormProvider>
  );
};
