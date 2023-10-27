import React from "react";
import { Party } from "../../model/party";
import "./PartyCard.css";

const formatHour = (inputDate: Date) => {
  if (!inputDate) {
    return null;
  }
  const date = new Date(inputDate);
  if (date.getMinutes() === 0) {
    return date.getHours().toString().padStart(2, "0");
  } else {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
};

type Props = {
  party: Party;
};

export const PartyCard: React.FC<Props> = (props) => {
  const startTime = formatHour(props.party.startDateTime);
  const endTime = formatHour(props.party.endDateTime);

  const timeContent = [startTime, endTime]
    .filter((x) => x !== null)
    .map((x) => `${x}H`)
    .join(" - ");
  return (
    <div className="d-flex flex-column" key={props.party.id}>
      <p className="basic-text">{props.party.eventName}</p>
      <p className="basic-text">{props.party.location.locationName}</p>
      <p className="basic-text">{timeContent}</p>
      {props.party.artists.map((artist, index) => (
        <p key={index} className="basic-text">
          {artist}
        </p>
      ))}
    </div>
  );
};
