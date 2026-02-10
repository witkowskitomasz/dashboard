import { Link, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const setTrue = () => {
    setIsLogged(true);
    console.log(isLogged)
  }

  return (
    <>
      <div className="h-full">
        <div className="bg-slate-700/50 text-white h-24 flex items-center justify-between gap-x-4 text-2xl font-bold px-8 mx-4 mt-4 rounded-xl">
          <div>Dashboard</div>
          <div className="flex gap-4">
            {isLogged ? (
              <>
                <Link to="/dashboard">Home</Link>
                <Link to="/calendar">Kalendarz</Link>
                <Link to="/">Logout</Link>
              </>
            ) : (
              <Link to="/">Login</Link>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={isLogged ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/calendar" element={isLogged ? <Calendar /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={isLogged ? <Home /> : <Login setTrue={setTrue} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
