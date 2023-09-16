import React from "react";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/Asset/Scss/main.scss";
import BarangayProfile from "./Pages/BarangayProfile/BarangayProfile";
import CalendarOfEvents from "./Pages/CalendarOfEvents/CalendarOfEvents";
import Household from "./Pages/Household/Household";
import Advisory from "./Pages/Advisory/Advisory";
import SafetyTips from "./Pages/SafetyTips/SafetyTips";
import BDRRMC from "./Pages/BDRRMC/BDRRMC";
import Evacuation from "./Pages/Evacuation/Evacuation";
import Budget from "./Pages/Budget/Budget";
import Expenses from "./Pages/Budget/Expenses";
import Education from "./Pages/Education/Education";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/barangay-profile" element={<BarangayProfile />} />
          <Route path="/calendar-of-events" element={<CalendarOfEvents />} />
          <Route path="/household" element={<Household />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/bdrrmc-team" element={<BDRRMC />} />
          <Route path="/evacuation" element={<Evacuation />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/expenses/:id" element={<Expenses />} />
          <Route path="/education" element={<Education />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
