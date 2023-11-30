import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CookieConsent.css';
import { analytics } from '../../services/firebase.service';
export const CookieConsent = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    setShow(!cookieConsent);

    analytics.app.automaticDataCollectionEnabled = cookieConsent === 'true';
  }, []);

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setShow(false);
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="cookie-container">
      <p className="text-light fs-5 m-0">{t('we_use_cookies')}</p>
      <div className="d-flex gap-2">
        <button className="btn btn-light" onClick={() => handleAccept()}>
          {t('accept')}
        </button>
        <button className="btn btn-outline-light" onClick={() => handleDecline()}>
          {t('decline')}
        </button>
      </div>
    </div>
  );
};
