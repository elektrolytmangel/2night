import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          without_warranty: 'Infos without warranty, see ya in the club',
          uups: 'Uups, something went wrong :(. Party probably already started',
          seems_calm_week: 'Recovery time, nothing is going on this week yet',
          email: 'Email',
          password: 'Password',
          repeat_password: 'Repeat password',
          reset_password: 'Reset password',
          login: 'Login',
          send_password_reset_email: 'Send password reset email',
          sign_up: 'Sign up',
          sign_up_question: 'Sign up?',
          forgot_password: 'Forgot password?',
          name: 'Name',
        },
      },
      de: {
        translation: {},
      },
    },
  });

export default i18n;
