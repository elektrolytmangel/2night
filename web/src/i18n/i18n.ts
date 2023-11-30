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
          or_sign_up: 'Not registered yet? Sign up here!',
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
          edit_roles: 'Edit roles',
          role: 'Role',
          field_required: 'This field is required',
          back_to_login: 'Back to login',
          logged_in_as: 'Logged in as',
          event_name: 'Event name',
          description: 'Description',
          artists: 'Artists',
          music_genre: 'Music genre',
          start_datetime: 'Start date and time',
          end_datetime: 'End date and time',
          price: 'Price',
          add_event: 'Add event',
          create_edit_party: 'Create / Edit party',
          'auth/user-not-found': 'User not found or wrong password',
          'auth/wrong-password': 'User not found or wrong password',
          unauthorized: 'Unauthorized',
          you_are_unauthorized_your_options:
            'You are unauthorized to see this page. Login or SignUp to see this page and contact our support to get the correct access rights for your company.',
          delete: 'Delete',
          delete_party_question: 'Do you really want to delete this party?',
          cancel: 'Cancel',
          we_use_cookies: 'We use cookies to improve your experience on our website.',
          accept: 'Accept',
          decline: 'Decline',
        },
      },
      de: {
        translation: {},
      },
    },
  });

export default i18n;
