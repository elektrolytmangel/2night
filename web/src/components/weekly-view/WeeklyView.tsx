import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { PartyCard } from "../party-card/PartyCard";
import { Weekday } from "../weekday/Weekday";
import data from "../../data/data.json";
import { Party } from "../../model/party";
import { groupByDate } from "../../services/date.service";

type Props = {
  dayInWeek: Date;
};

export const WeeklyView = (props: Props) => {
  const sortedData = data.sort((a, b) => {
    return a.startDateTime < b.startDateTime ? -1 : 1;
  }) as any as Party[];

  const content: JSX.Element[] = [];
  groupByDate(sortedData, (d) => d.startDateTime).forEach((v, k) => {
    const dailyContent = v.map((x) => {
      return <PartyCard key={x.id} party={x} />;
    });
    content.push(
      <div className="col-sm-3">
        <Weekday key={k} day={new Date(k)}>
          {dailyContent}
        </Weekday>
      </div>
    );
  });

  return (
    <div className="overflow-auto h-100 p-5">
      <Header dayInWeek={props.dayInWeek} />
      <div className="d-flex gap-4 row">{content}</div>
      <Footer />
    </div>
  );
};
