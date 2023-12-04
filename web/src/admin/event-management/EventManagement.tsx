import { useTranslation } from 'react-i18next';
import EventList from './event-list/EventList';

export const EventManagement = () => {
  const { t } = useTranslation();

  return (
    <div className="admin-management-container">
      <p className="fs-1 text-primary">{t('event_management')}</p>
      <EventList />
    </div>
  );
};
