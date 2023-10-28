import { useTranslation } from "react-i18next";

type Props = {
  errorMessage: string;
};

export const ErrorText = (props: Props) => {
  const { t } = useTranslation();
  if (!props.errorMessage) {
    return null;
  }

  return (
    <div className="d-flex flex-column justify-content-center  align-items-center pb-3 flex-grow-1">
      <p className="basic-text text-center">
        {t("uups")}
        <span> 🎉</span>
      </p>
    </div>
  );
};
