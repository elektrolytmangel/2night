import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { WeeklyView } from "./components/weekly-view/WeeklyView";
import { Admin } from "./components/admin/Admin";
import { Add } from "./components/add/Add";
import { Login } from "./components/login/Login";

function App() {
  return (
    <div className="vw-100 vh-100 bg-black" data-bs-theme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeeklyView />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
