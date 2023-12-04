import { useSearchParams } from 'react-router-dom';
import { NotFound } from '../../components/error-pages/not-found/NotFound';
import { PasswordReset } from '../password-reset/PasswordReset';

export const ActionHandler = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const actionCode = searchParams.get('oobCode') || '';
  const continueUrl = searchParams.get('continueUrl') || '/admin';
  const lang = searchParams.get('lang') || '';

  switch (mode) {
    case 'resetPassword':
      return <PasswordReset actionCode={actionCode} continueUrl={continueUrl} lang={lang} />;
    case 'recoverEmail':
    case 'verifyEmail':
    default:
      return <NotFound />;
  }
};
