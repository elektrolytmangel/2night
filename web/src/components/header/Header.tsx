import { FaInstagram } from "react-icons/fa6";
import {
  getMondaFromWeekDay,
  getSundayFromWeekDay,
} from "../../services/date.service";
import "./Header.css";

type Props = {
  dayInWeek: Date;
};

export const Header = (props: Props) => {
  const monday = getMondaFromWeekDay(props.dayInWeek);
  const sunday = getSundayFromWeekDay(props.dayInWeek);

  return (
    <div className="w-100 d-flex gap-1 mb-3 d-flex align-items-center justify-content-between">
      <p className="basic-text">
        {monday.toLocaleDateString()} - {sunday.toLocaleDateString()}
      </p>
      <a href="https://www.instagram.com/2night.ch/" target="__blank">
        <FaInstagram color="#eb539f" size={"2rem"} />
      </a>
    </div>
  );
};
