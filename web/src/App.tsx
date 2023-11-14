import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Admin } from './components/admin/Admin';
import { Add } from './components/admin/add/Add';
import { UserManagement } from './components/admin/manager-users/UserManagement';
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
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/PasswordForgot" element={<PasswordForgot />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/usermanagement" element={<UserManagement />} />
          <Route path="/admin/eventmanagement" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
