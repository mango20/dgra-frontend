import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "../../Asset/Scss/Layout/Container/_pageContainer.scss";
const PageContainer = ({ children, barangay }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="pageContainer">
      <Navbar setShowSidebar={setShowSidebar} />
      <div className="pageContainerContent">
        <Sidebar show={showSidebar} />
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
