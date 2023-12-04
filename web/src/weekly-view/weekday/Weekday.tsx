import { DateTime } from "luxon";
import "./Weekday.css";

interface Props extends React.PropsWithChildren {
  day: Date;
}

export const Weekday = (props: Props) => {
  const weekdayText = DateTime.fromJSDate(props.day).toLocaleString({
    weekday: "long",
  });

  return (
    <div
      key={props.day.toISOString()}
      className="weekday animate__animated animate__fadeIn"
    >
      <p className="weekday-text">{weekdayText}</p>
      <div className="d-flex gap-4 flex-column">{props.children}</div>
    </div>
  );
};
