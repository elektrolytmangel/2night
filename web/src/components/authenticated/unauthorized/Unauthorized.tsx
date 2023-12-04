import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '0.5rem',
        marginTop: '2rem',
      }}
    >
      <h1 className="text-primary">{t('unauthorized')}</h1>
      <p className="text-primary">{t('you_are_unauthorized_your_options')}</p>
      <Link className="btn btn-primary" to="/">
        {t('home')}
      </Link>
      <Link className="btn btn-primary" to="/login">
        {t('login')}
      </Link>
      <Link className="btn btn-primary" to="/register">
        {t('sign_up')}
      </Link>
    </div>
  );
};
