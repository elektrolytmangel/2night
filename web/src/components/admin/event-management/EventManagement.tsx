import { useTranslation } from 'react-i18next';
import EventList from './event-list/EventList';

export const EventManagement = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      <p className="fs-1 text-primary">{t('event_management')}</p>
      <EventList />
    </div>
  );
};
