import { useTranslation } from "react-i18next";
import img from "../../assets/images/tits.png";
import "./Footer.css";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <p className="footer-text">{t("without_warranty")}</p>
      <img src={img} alt="tits" height={60} />
    </div>
  );
};
