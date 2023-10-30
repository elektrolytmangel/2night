import { PropsWithChildren } from "react";

export const TextMessage = (props: PropsWithChildren) => {
  if (!props.children) {
    return null;
  }

  return (
    <div className="d-flex flex-column justify-content-center  align-items-center pb-3 flex-grow-1">
      <p className="basic-text text-center">{props.children}</p>
    </div>
  );
};
