import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Admin } from './components/admin/Admin';
import { AdminLayout } from './components/admin/admin-layout/AdminLayout';
import { ConfigurationManagement } from './components/admin/configuration-management/ConfigurationManagement';
import { EventManagement } from './components/admin/event-management/EventManagement';
import { UserManagement } from './components/admin/user-management/UserManagement';
import { Authenticated } from './components/authenticated/Authenticated';
import { Login } from './components/login/Login';
import { PasswordForgot } from './components/password-forgot/PasswordForgot';
import { Register } from './components/register/Register';
import { WeeklyView } from './components/weekly-view/WeeklyView';
import { useUserContext } from './context/userContext';
import { getCurrentUserState } from './services/current-user.service';

function App() {
  const { dispatch } = useUserContext();

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUserState();
      dispatch({ type: 'SET_USER_STATE', payload: user });
    };
    init();
  }, [dispatch]);

  return (
      <div className="vw-100 vh-100 bg-black" data-bs-theme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WeeklyView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/passwordforgot" element={<PasswordForgot />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                index
                path=""
                element={
                  <Authenticated unauthorizedAction="redirect">
                    <Admin />
                  </Authenticated>
                }
              />
              <Route
                path="usermanagement"
                element={
                  <Authenticated rolesRequired={['admin']} unauthorizedAction="unauthorized-page">
                    <UserManagement />
                  </Authenticated>
                }
              />
              <Route
                path="configuration"
                element={
                  <Authenticated rolesRequired={['admin']} unauthorizedAction="unauthorized-page">
                    <ConfigurationManagement />
                  </Authenticated>
                }
              />
              <Route
                path="eventmanagement"
                element={
                  <Authenticated unauthorizedAction="unauthorized-page">
                    <EventManagement />
                  </Authenticated>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
