import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { Configuration, Party } from '../../../../model/app';
import { getAll } from '../../../../services/firebase-party.service';
import { EventForm } from '../event-form/EventForm';
import { getConfiguration } from '../../../../services/firebase-configuration.service';

const EventList: React.FC = () => {
  const { t } = useTranslation();
  const [parties, setParties] = useState<Party[]>([]);
  const [editParty, setEditParty] = useState<Party | undefined>(undefined);
  const [configuration, setConfiguration] = useState<Configuration | null>(null);

  const refreshData = async () => {
    const configuration = await getConfiguration();
    setConfiguration(configuration);
    const parties = await getAll();
    setParties(parties);
  };

  useEffect(() => {
    refreshData();
  }, []);

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
            onClick={() => setEditParty(undefined)}
            aria-label={t('close')}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
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
