import { FaInstagram } from 'react-icons/fa6';
import { getMondaFromWeekDay, getSundayFromWeekDay } from '../../services/date.service';
import './Header.css';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  dayInWeek: Date;
};

export const Header = (props: Props) => {
  const { t } = useTranslation();
  const monday = DateTime.fromJSDate(getMondaFromWeekDay(props.dayInWeek));
  const sunday = DateTime.fromJSDate(getSundayFromWeekDay(props.dayInWeek));

  return (
    <div className="w-100 d-flex gap-1 mb-3 d-flex align-items-center justify-content-between">
      <p className="basic-text">
        {monday.toFormat('dd.MM.yyyy')} - {sunday.toFormat('dd.MM.yyyy')}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="https://www.instagram.com/2night.ch/" target="__blank">
          <FaInstagram color="#eb539f" size={'2rem'} />
        </a>
        <Link to={'/login'}>{t('login')}</Link>
      </div>
    </div>
  );
};
