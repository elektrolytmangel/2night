import {
  getMondaFromWeekDay,
  getSundayFromWeekDay,
} from "../../services/date.service";

type Props = {
  dayInWeek: Date;
};

export const Header = (props: Props) => {
  const monday = getMondaFromWeekDay(props.dayInWeek);
  const sunday = getSundayFromWeekDay(props.dayInWeek);

  return (
    <div className="w-100 d-flex mb-3">
      <p className="basic-text">
        {monday.toLocaleDateString()} - {sunday.toLocaleDateString()}
      </p>
    </div>
  );
};
