import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "../../Asset/Scss/Layout/Container/_pageContainer.scss";
const PageContainer = ({ children, barangay }) => {
  return (
    <div className="pageContainer">
      <Navbar />
      <div className="pageContainerContent">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
