import React from "react";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/Asset/Scss/main.scss";
import Advisory from "./Pages/DisasterAdmin/Advisory/Advisory";
import SafetyTips from "./Pages/DisasterAdmin/SafetyTips/SafetyTips";
import BDRRMC from "./Pages/DisasterAdmin/BDRRMC/BDRRMC";
import BDRRMCTeamMember from "./Pages/DisasterAdmin/BDRRMCTeamMember/BDRRMCTeamMember";
import Evacuation from "./Pages/DisasterAdmin/Evacuation/Evacuation";
import PreparednessKit from "./Pages/DisasterAdmin/PreparednessKit/PreparednessKit";
import Budget from "./Pages/Financial/Budget/Budget";
import Expenses from "./Pages/Financial/Budget/Expenses";
import Education from "./Pages/Education/Education";
import EducationReport from "./Pages/Report/EducationReport/EducationReport";
import FinancialReport from "./Pages/Report/FinancialReport/FinancialReport";
import DisasterRelated from "./Pages/Report/DisasterRelated/DisasterRelated";
import Relief from "./Pages/Forecast/Relief/Relief";
import RiskArea from "./Pages/Forecast/RiskArea/RiskArea";
import DisasterFund from "./Pages/Forecast/DisasterFund/DisasterFund";
import EvacuationCenter from "./Pages/Forecast/EvacuationCenter/EvacuationCenter";
import SystemUser from "./Pages/SystemTools/SystemUser/SystemUser";
import ChangePassword from "./Pages/SystemTools/ChangePassword/ChangePassword";
import AboutBarangay from "./Pages/BarangayProfile/AboutBarangay/AboutBarangay";
import CalendarOfEvents from "./Pages/BarangayProfile/CalendarOfEvents/CalendarOfEvents";
import Household from "./Pages/ResidentProfile/Household/Household";
import HouseholdMembers from "./Pages/ResidentProfile/HouseholdMembers/HouseholdMembers";
import BarangayProfileReport from "./Pages/Report/BaragayProfileReport/BarangayProfileReport";
import Supply from "./Pages/Financial/Supplies/Supplies";
import Equipment from "./Pages/Financial/Equipment/Equipment";
import AddSurvey from "./Pages/ResidentProfile/Household/Content/Action/AddSurvey";
import AddPage from "./Pages/AddPage/AddPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/barangay-profile/about-barangay"
            element={<AboutBarangay />}
          />
          <Route
            path="/barangay-profile/calendar-of-events"
            element={<CalendarOfEvents />}
          />
          <Route path="/resident-profile/household" element={<Household />} />
          <Route
            path="/resident-profile/household-members"
            element={<HouseholdMembers />}
          />
          <Route
            path="/resident-profile/household/add-survey/:id"
            element={<AddSurvey />}
          />
          <Route path="/disaster-admin/advisory" element={<Advisory />} />
          <Route path="/disaster-admin/safety-tips" element={<SafetyTips />} />
          <Route path="/disaster-admin/bdrrmc-team" element={<BDRRMC />} />
          <Route
            path="/disaster-admin/bdrrmc-team-members"
            element={<BDRRMCTeamMember />}
          />
          <Route
            path="/disaster-admin/evacuation-center"
            element={<Evacuation />}
          />
          <Route
            path="/disaster-admin/preparedness-kit"
            element={<PreparednessKit />}
          />
          <Route path="/financial/budget" element={<Budget />} />
          <Route path="/financial/supplies" element={<Supply />} />
          <Route path="/expenses/:id" element={<Expenses />} />
          <Route path="/financial/equipment" element={<Equipment />} />
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
          <Route path="/secret-add" element={<AddPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
