import React, { useState } from "react";
import BDRRMCList from "./Content/BDRRMCList";
import AddBDRRMC from "./Content/AddBDRRMC";
import ContentContainer from "../../Layout/Container/ContentContainer";
import AddSearch from "../../Components/UI/AddSearch/AddSearch";
import PageContainer from "../../Layout/Container/PageContainer";

const BDRRMC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addBDRRMC, setAddBDRRMC] = useState(false);

  const handleAdd = () => {
    setAddBDRRMC(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setAddBDRRMC(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log("Search term:", searchTerm);
  };

  const handleViewAll = () => {
    setSearchTerm("");
    console.log("View all button clicked");
  };
  return (
    <PageContainer>
      <ContentContainer title={"BDRRMC Team"}>
        <AddSearch
          addLabel="Add BDRRMC Team"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <BDRRMCList searchTerm={searchTerm} />
      </ContentContainer>
      <AddBDRRMC addBDRRMC={addBDRRMC} closeModal={closeModal} />
    </PageContainer>
  );
};

export default BDRRMC;
