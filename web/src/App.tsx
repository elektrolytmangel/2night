import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Admin } from './components/admin/Admin';
import { Add } from './components/admin/add/Add';
import { AdminLayout } from './components/admin/admin-layout/AdminLayout';
import { ConfigurationManagement } from './components/admin/configuration-management/ConfigurationManagement';
import { UserManagement } from './components/admin/user-management/UserManagement';
import { Login } from './components/login/Login';
import { PasswordForgot } from './components/password-forgot/PasswordForgot';
import { Register } from './components/register/Register';
import { WeeklyView } from './components/weekly-view/WeeklyView';

function App() {
  return (
    <div className="vw-100 vh-100 bg-black" data-bs-theme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeeklyView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordforgot" element={<PasswordForgot />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index path="" element={<Admin />} />
            <Route path="usermanagement" element={<UserManagement />} />
            <Route path="eventmanagement" element={<Add />} />
            <Route path="configuration" element={<ConfigurationManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
