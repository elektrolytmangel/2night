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
          last_login: 'Last login',
          roles: 'Roles',
          user_management: 'User management',
          users: 'Users',
          save: 'Save',
          welcome_admin: 'Welcome on the admin page! Manage users, events and more.',
          event_management: 'Event management',
          admin: 'Admin',
          uid: 'UID',
          display_name: 'Display name',
          actions: 'Actions',
          edit: 'Edit',
          close: 'Close',
          edit_user: 'Edit user',
          logout: 'Logout',
          home: 'Home',
          configuration: 'Configuration',
          event_locations: 'Event locations',
          event_location: 'Event location',
          is_active: 'Is active',
          add: 'Add',
          id: 'ID',
          location_name: 'Location name',
          roles_allowed: 'Roles allowed',
          remove: 'Remove',
          add_role: 'Add role',
          role: 'Role',
        },
      },
      de: {
        translation: {},
      },
    },
  });

export default i18n;
