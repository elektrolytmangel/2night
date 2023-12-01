import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <p className="fs-1 text-primary">{t('not_found')}</p>
      <Link to="/" className="btn btn-primary">
        {t('go_to_start_page')}
      </Link>
    </div>
  );
};
