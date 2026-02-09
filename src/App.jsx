import { Link, Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="h-full">
        <div className="bg-amber-400 h-24 flex items-center justify-between gap-x-4 text-2xl font-bold px-8 mx-4 mt-4 rounded-xl">
          <div>Logo</div>
          <div className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/calendar">Kalendarz</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
