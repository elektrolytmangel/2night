import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { Loading } from '../components/loading/Loading';
import { TextMessage } from '../components/text-message/TextMessage';
import { getMondayFromWeekDay, getSundayFromWeekDay, groupByDate } from '../services/date.service';
import { getParties } from '../services/party.service';
import './WeeklyView.css';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { PartyCard } from './party-card/PartyCard';
import { Weekday } from './weekday/Weekday';

const getIniitialDate = (dateQuery: string | null) => {
  if (dateQuery) {
    return new Date(dateQuery);
  } else {
    return new Date();
  }
};

export const WeeklyView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialDate = getIniitialDate(searchParams.get('date'));
  const {
    data: parties,
    isLoading,
    error,
  } = useSWR('parties', () => getParties(getMondayFromWeekDay(initialDate), getSundayFromWeekDay(initialDate)), {
    fallbackData: [],
  });

  const sortedData = parties.sort((a, b) => {
    return a.startDateTime < b.startDateTime ? -1 : 1;
  });

  const content: JSX.Element[] = [];
  groupByDate(sortedData, (d) => d.startDateTime).forEach((v, k) => {
    const dailyContent = v.map((x) => {
      return <PartyCard key={x.id} party={x} />;
    });
    content.push(
      <Weekday key={k} day={new Date(k)}>
        {dailyContent}
      </Weekday>
    );
  });

  const message = error ? t('uups') : parties.length === 0 && !isLoading ? t('seems_calm_week') : null;
  return (
    <div className="weekly-view">
      <Header dayInWeek={initialDate} />
      <div className="weekly-view-day-container">{isLoading ? <Loading /> : content}</div>
      <TextMessage>{message}</TextMessage>
      <Footer />
    </div>
  );
};
