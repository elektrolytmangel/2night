import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Configuration, EventLocationPermission } from '../../../model/app';
import { EventLocationForm } from '../event-location-form/EventLocationForm';

interface EventLocationFormData extends EventLocationPermission {
  index: number;
}

type Props = {
  roles: string[];
};

export const EventLocationList = (props: Props) => {
  const { t } = useTranslation();
  const [editLocation, setEditLocation] = useState<EventLocationFormData | null>(null);
  const { control, getValues } = useFormContext<Configuration>();
  const {
    fields: eventLocations,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'eventLocations',
    keyName: 'fieldId',
  });

  const eventLocationContent = eventLocations?.map((location, index) => {
    const rolesAllowed = getValues(`eventLocations.${index}.rolesAllowed`)
      ? JSON.stringify(getValues(`eventLocations.${index}.rolesAllowed`), null, ' ')
      : 'n/A';
    const isAdminOnlyLocation = location.rolesAllowed.includes('admin') && location.rolesAllowed.length === 1;
    return (
      <tr key={location.id} style={{ textAlign: 'start' }}>
        <td>{getValues(`eventLocations.${index}.id`)}</td>
        <td>{getValues(`eventLocations.${index}.locationName`)}</td>
        <td>{rolesAllowed}</td>
        <td>
          <button
            className="btn btn-primary me-2"
            onClick={() => setEditLocation({ ...location, index })}
            disabled={isAdminOnlyLocation}
          >
            {t('edit')}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => remove(index)}
            disabled={isAdminOnlyLocation}
          >
            {t('remove')}
          </button>
        </td>
      </tr>
    );
  });

  const nextId = eventLocations.map((x) => parseInt(x.id)).reduce((a, b) => (a - b > 0 ? a : b), 1) + 1;
  return (
    <>
      <table className="table table-dark table-striped table-hover table-responsive">
        <thead>
          <tr style={{ textAlign: 'start' }}>
            <th scope="col">{t('id')}</th>
            <th scope="col">{t('location_name')}</th>
            <th scope="col">{t('roles_allowed')}</th>
            <th scope="col">
              {t('actions')}
              <button
                className="btn btn-outline-primary ms-2"
                onClick={() =>
                  append({
                    id: `${nextId}`,
                    locationName: '',
                    rolesAllowed: [],
                  })
                }
              >
                {t('add')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{eventLocationContent}</tbody>
      </table>
      <Modal show={editLocation !== null} onHide={() => setEditLocation(null)}>
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
            onClick={() => setEditLocation(null)}
            aria-label={t('close')}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
          ></button>
          <EventLocationForm
            item={editLocation}
            index={editLocation?.index}
            roles={props.roles}
            onClose={() => setEditLocation(null)}
          />
        </div>
      </Modal>
    </>
  );
};
