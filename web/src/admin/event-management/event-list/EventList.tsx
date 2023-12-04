import { DateTime } from 'luxon';
import React, { useCallback, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { useUserContext } from '../../../context/userContext';
import { Party } from '../../../model/app';
import { getConfiguration } from '../../../services/firebase-configuration.service';
import { add, getAll, remove, update } from '../../../services/firebase-party.service';
import { filterPartiesByRole } from '../../../services/party.service';
import { DeleteConfirmation } from '../delete-confirmation/DeleteConfirmation';
import { EventForm } from '../event-form/EventForm';

const compare = (a: Party, b: Party) => {
  if (a.startDateTime < b.startDateTime) {
    return 1;
  }
  if (a.startDateTime > b.startDateTime) {
    return -1;
  }
  return 0;
};

const EventList: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useUserContext();
  const [editParty, setEditParty] = useState<Party | undefined>(undefined);
  const [deleteParty, setDeleteParty] = useState<Party | undefined>(undefined);
  const { data: parties, mutate, isLoading, error } = useSWR('/parties', () => getAll());
  const { data: configuration } = useSWR('/configuration', () => getConfiguration());

  const handleSubmitParty = async (data: Party) => {
    if (data.id) {
      await mutate(async () => {
        await update(data);
        return parties?.map((party) => (party.id === data.id ? data : party));
      });
    } else {
      await mutate(async () => {
        const response = await add(data);
        if (response) {
          return [...(parties ?? []), response];
        }
      });
    }
    setEditParty(undefined);
  };

  const handleDeleteParty = useCallback(async () => {
    if (deleteParty) {
      await mutate(async () => {
        await remove(deleteParty.id ?? '');
        return parties?.filter((party) => party.id !== deleteParty.id);
      });
      setDeleteParty(undefined);
    }
  }, [deleteParty, mutate, parties]);

  const filteredParties = filterPartiesByRole(parties || [], state?.roles ?? [], configuration?.eventLocations ?? []);
  const partyContent = filteredParties
    .sort((a, b) => compare(a, b))
    .map((party) => {
      const startDateTime = DateTime.fromJSDate(new Date(party.startDateTime)).toLocaleString(DateTime.DATETIME_SHORT);
      const endDateTime = DateTime.fromJSDate(new Date(party.endDateTime)).toLocaleString(DateTime.DATETIME_SHORT);
      return (
        <tr key={party.id} style={{ textAlign: 'start' }}>
          <td className="mobile-hidden">{party.id}</td>
          <td>{party.eventName}</td>
          <td>{startDateTime}</td>
          <td className="mobile-hidden">{endDateTime}</td>
          <td>{party.location.locationName}</td>
          <td className="mobile-hidden">{party.artists}</td>
          <td className="mobile-hidden">{party.description}</td>
          <td className="mobile-hidden">{party.musicGenre}</td>
          <td className="mobile-hidden">{party.price}</td>
          <td className="">
            <button className="btn btn-primary mx-1" onClick={() => setEditParty(party)}>
              {t('edit')}
            </button>
            <button className="btn btn-outline-primary mx-1" onClick={() => setDeleteParty(party)}>
              {t('delete')}
            </button>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <button
        className="btn btn-primary mb-3 w-100 container "
        onClick={() => setEditParty({ id: undefined } as Party)}
      >
        {t('add_event')}
      </button>
      {error && <div className="alert alert-danger m-1 p-0">{error?.message}</div>}
      <table className="table table-dark table-striped table-hover table-responsive">
        <thead>
          <tr style={{ textAlign: 'start' }}>
            <th scope="col" className="mobile-hidden">
              {t('id')}
            </th>
            <th scope="col">{t('event_name')}</th>
            <th scope="col">{t('start_datetime')}</th>
            <th className="mobile-hidden" scope="col">
              {t('end_datetime')}
            </th>
            <th scope="col">{t('event_location')}</th>
            <th className="mobile-hidden" scope="col">
              {t('artists')}
            </th>
            <th className="mobile-hidden" scope="col">
              {t('description')}
            </th>
            <th className="mobile-hidden" scope="col">
              {t('music_genre')}
            </th>
            <th className="mobile-hidden" scope="col">
              {t('price')}
            </th>
            <th scope="col">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>{t('actions')}</div>
            </th>
          </tr>
        </thead>
        <tbody>{partyContent}</tbody>
      </table>
      <Modal show={editParty !== undefined} onHide={() => setEditParty(undefined)}>
        <div className="admin-modal-container" data-bs-theme="dark">
          <button
            type="button"
            className="btn-close admin-modal-close-btn"
            onClick={() => setEditParty(undefined)}
            aria-label={t('close')}
          ></button>
          <EventForm
            party={editParty}
            eventLocations={configuration?.eventLocations ?? []}
            onPartySubmit={(data) => handleSubmitParty(data)}
            isLoading={isLoading}
          />
        </div>
      </Modal>
      <DeleteConfirmation
        show={deleteParty !== undefined}
        text={deleteParty?.eventName ?? ''}
        onCancel={() => setDeleteParty(undefined)}
        onConfirm={() => handleDeleteParty()}
      />
    </div>
  );
};

export default EventList;
