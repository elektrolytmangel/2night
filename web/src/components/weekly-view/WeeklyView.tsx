import { useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Party } from "../../model/party";
import {
  getMondaFromWeekDay,
  getSundayFromWeekDay,
  groupByDate,
} from "../../services/date.service";
import { getParties } from "../../services/party.service";
import { ErrorText } from "../error-text/ErrorText";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Loading } from "../loading/Loading";
import { PartyCard } from "../party-card/PartyCard";
import { Weekday } from "../weekday/Weekday";
import "./WeeklyView.css";

type State = {
  date: Date;
  parties: Party[];
  isLoading: boolean;
  error: string;
};

type Action = {
  type: "SET_DATE" | "SET_PARTIES" | "SET_LOADING" | "SET_ERROR";
  payload: any;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SET_PARTIES":
      return {
        ...state,
        parties: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
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
  const initialDate = getIniitialDate(searchParams.get("date"));
  const [state, dispatch] = useReducer(reducer, {
    date: initialDate,
    parties: [],
    isLoading: false,
    error: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const request = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const monday = getMondaFromWeekDay(state.date);
      const sunday = getSundayFromWeekDay(state.date);
      const data = await getParties(monday, sunday, abortController.signal);
      dispatch({ type: "SET_PARTIES", payload: data.data });
      dispatch({ type: "SET_ERROR", payload: data.errorMsg });
      dispatch({ type: "SET_LOADING", payload: false });
    };

    request();
    return () => {
      abortController.abort();
    };
  }, [state.date]);

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
      <div className="weekly-view-day-container">
        {state.isLoading ? <Loading /> : content}
        {state.parties.length === 0 && !state.isLoading && !state.error ? (
          <p className="text-center basic-text">{t("seems_calm_week")}</p>
        ) : null}
      </div>
      <ErrorText errorMessage={state.error} />
      <Footer />
    </div>
  );
};
