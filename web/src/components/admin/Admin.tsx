import { Link } from "react-router-dom";
import { List } from "./list/List";
import { useTranslation } from "react-i18next";

export const Admin = () => {
  const { t } = useTranslation();
  return (
    <div>
      <List />
      <Link to="/admin/add" className="btn btn-primary">
        {t("add")}
      </Link>
    </div>
  );
};
