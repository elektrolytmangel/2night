import { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Party } from '../../model/app';
import { getMondaFromWeekDay, getSundayFromWeekDay, groupByDate } from '../../services/date.service';
import { getParties } from '../../services/party.service';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Loading } from '../loading/Loading';
import { PartyCard } from '../party-card/PartyCard';
import { TextMessage } from '../text-message/TextMessage';
import { Weekday } from '../weekday/Weekday';
import './WeeklyView.css';

type State = {
  date: Date;
  parties: Party[];
  isLoading: 'init' | 'loading' | 'done';
  message: JSX.Element | string;
};

type Action = {
  type: 'SET_DATE' | 'SET_PARTIES' | 'SET_LOADING' | 'SET_MESSAGE';
  payload: any;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATE':
      return {
        ...state,
        date: action.payload,
      };
    case 'SET_PARTIES':
      return {
        ...state,
        parties: action.payload,
        message: '',
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(reducer, {
    date: initialDate,
    parties: [],
    isLoading: 'init',
    message: '',
  });

  useEffect(() => {
    const abortController = new AbortController();
    const request = async () => {
      dispatch({ type: 'SET_LOADING', payload: 'loading' });
      const monday = getMondaFromWeekDay(state.date);
      const sunday = getSundayFromWeekDay(state.date);
      const data = await getParties(monday, sunday, abortController.signal);
      dispatch({ type: 'SET_PARTIES', payload: data.data });
      if (data.errorMsg) {
        dispatch({ type: 'SET_MESSAGE', payload: t('uups') });
      } else if (data.data.length === 0) {
        const msg = <span>{t('seems_calm_week')} 😴</span>;
        dispatch({ type: 'SET_MESSAGE', payload: msg });
      }
      dispatch({ type: 'SET_LOADING', payload: 'done' });
    };

    request();
    return () => {
      abortController.abort();
    };
  }, [state.date, t]);

  const sortedData = state.parties.sort((a, b) => {
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

  return (
    <div className="weekly-view">
      <Header dayInWeek={state.date} />
      <div className="weekly-view-day-container">{state.isLoading === 'loading' ? <Loading /> : content}</div>
      <TextMessage>{state.message}</TextMessage>
      <Footer />
    </div>
  );
};
