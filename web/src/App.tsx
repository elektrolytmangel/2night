import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { WeeklyView } from "./components/weekly-view/WeeklyView";

function App() {
  return (
    <div className="vw-100 vh-100 bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeeklyView dayInWeek={new Date()} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
