import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../../context/userContext';
import { Configuration, Party } from '../../../model/app';
import { getConfiguration } from '../../../services/firebase-configuration.service';
import { getAll } from '../../../services/firebase-party.service';
import { filterPartiesByRole } from '../../../services/party.service';
import { EventForm } from '../event-form/EventForm';

const EventList: React.FC = () => {
  const { t } = useTranslation();
  const [parties, setParties] = useState<Party[]>([]);
  const [editParty, setEditParty] = useState<Party | undefined>(undefined);
  const [configuration, setConfiguration] = useState<Configuration | null>(null);
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

  const partyContent = parties.map((party) => {
    const startDateTime = new Date(party.startDateTime).toISOString();
    const endDateTime = new Date(party.endDateTime).toISOString();
    return (
      <tr key={party.id} style={{ textAlign: 'start' }}>
        <td className="user-list-mobile-hidden">{party.id}</td>
        <td>{party.eventName}</td>
        <td>{startDateTime}</td>
        <td>{endDateTime}</td>
        <td>{party.location.locationName}</td>
        <td>{party.artists}</td>
        <td>{party.description}</td>
        <td>{party.musicGenre}</td>
        <td>{party.price}</td>
        <td>
          <button className="btn btn-primary" onClick={() => setEditParty(party)}>
            {t('edit')}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table table-dark table-striped table-hover table-responsive">
        <thead>
          <tr style={{ textAlign: 'start' }}>
            <th scope="col" className="user-list-mobile-hidden ">
              {t('id')}
            </th>
            <th scope="col">{t('event_name')}</th>
            <th scope="col">{t('start_datetime')}</th>
            <th scope="col">{t('end_datetime')}</th>
            <th scope="col">{t('event_location')}</th>
            <th scope="col">{t('artists')}</th>
            <th scope="col">{t('description')}</th>
            <th scope="col">{t('music_genre')}</th>
            <th scope="col">{t('price')}</th>
            <th scope="col">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                {t('actions')}
                <button className="btn btn-outline-primary" onClick={() => setEditParty({ id: undefined } as Party)}>
                  {t('add_event')}
                </button>
              </div>
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
    </div>
  );
};

export default EventList;
