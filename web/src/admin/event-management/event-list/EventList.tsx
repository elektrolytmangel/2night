import { DateTime } from 'luxon';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/userContext';
import { Configuration, Party } from '../../../model/app';
import { getConfiguration } from '../../../services/firebase-configuration.service';
import { getAll, remove } from '../../../services/firebase-party.service';
import { filterPartiesByRole } from '../../../services/party.service';
import { DeleteConfirmation } from '../delete-confirmation/DeleteConfirmation';
import { EventForm } from '../event-form/EventForm';

const EventList: React.FC = () => {
  const { t } = useTranslation();
  const [parties, setParties] = useState<Party[]>([]);
  const [editParty, setEditParty] = useState<Party | undefined>(undefined);
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
  const [deletePartyId, setDeletePartyId] = useState<string | undefined>(undefined);
  const { state } = useUserContext();

  const refreshData = useCallback(async () => {
    const config = await getConfiguration();
    setConfiguration(config);
    const allParties = await getAll();
    const filteredParties = filterPartiesByRole(allParties, state?.roles ?? [], config?.eventLocations ?? []);
    setParties(filteredParties);
  }, [state]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleSubmitParty = async () => {
    setEditParty(undefined);
    refreshData();
  };

  const handleDeleteParty = useCallback(async () => {
    if (deletePartyId) {
      await remove(deletePartyId);
      setDeletePartyId(undefined);
      refreshData();
    }
  }, [deletePartyId, refreshData]);

  const partyContent = parties.map((party) => {
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
          <button className="btn btn-outline-primary mx-1" onClick={() => setDeletePartyId(party.id)}>
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
            onPartySubmit={() => handleSubmitParty()}
          />
        </div>
      </Modal>
      <DeleteConfirmation
        show={deletePartyId !== undefined}
        onCancel={() => setDeletePartyId(undefined)}
        onConfirm={() => handleDeleteParty()}
      />
    </div>
  );
};

export default EventList;
