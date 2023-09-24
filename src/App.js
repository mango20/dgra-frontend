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
import SystemUser from "./Pages/SystemTools/SystemUser/SystemUser";
import ChangePassword from "./Pages/SystemTools/ChangePassword/ChangePassword";
import EducationReport from "./Pages/Report/EducationReport/EducationReport";
import FinancialReport from "./Pages/Report/FinancialReport/FinancialReport";
import BarangayProfileReport from "./Pages/Report/BaragayProfileReport/BarangayProfileReport";
import DisasterRelated from "./Pages/Report/DisasterRelated/DisasterRelated";
import RiskArea from "./Pages/Forecast/RiskArea/RiskArea";
import Relief from "./Pages/Forecast/Relief/Relief";
import DisasterFund from "./Pages/Forecast/DisasterFund/DisasterFund";
import EvacuationCenter from "./Pages/Forecast/EvacuationCenter/EvacuationCenter";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/barangay-profile/about-barangay"
            element={<BarangayProfile />}
          />
          <Route
            path="/barangay-profile/calendar-of-events"
            element={<CalendarOfEvents />}
          />
          <Route path="/resident-profile/household" element={<Household />} />
          <Route path="/disaster-admin/advisory" element={<Advisory />} />
          <Route path="/disaster-admin/safety-tips" element={<SafetyTips />} />
          <Route path="/disaster-admin/bdrrmc-team" element={<BDRRMC />} />
          <Route
            path="/disaster-admin/evacuation-center"
            element={<Evacuation />}
          />
          <Route path="/financial/budget" element={<Budget />} />
          <Route path="/expenses/:id" element={<Expenses />} />
          <Route path="/education" element={<Education />} />
          <Route
            path="/report/education-report"
            element={<EducationReport />}
          />
          <Route
            path="/report/financial-report"
            element={<FinancialReport />}
          />
          <Route
            path="/report/barangay-profile-report"
            element={<BarangayProfileReport />}
          />
          <Route
            path="/report/disaster-related-job-report"
            element={<DisasterRelated />}
          />{" "}
          <Route path="/forecast/relief" element={<Relief />} />
          <Route path="/forecast/risk-area" element={<RiskArea />} />
          <Route
            path="/forecast/disaster-fund"
            element={<DisasterFund />}
          />{" "}
          <Route
            path="/forecast/evacuation-center"
            element={<EvacuationCenter />}
          />
          <Route path="/system-tools/system-users" element={<SystemUser />} />
          <Route
            path="/system-tools/change-password"
            element={<ChangePassword />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
