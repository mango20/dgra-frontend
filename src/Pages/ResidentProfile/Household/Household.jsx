import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import HouseholdList from "./Content/HouseholdList";
import AddHousehold from "./Content/AddHousehold";

const Household = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addHousehold, setAddHousehold] = useState(false);

  const handleAdd = () => {
    setAddHousehold(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setAddHousehold(false);
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
      <ContentContainer title={"Household"}>
        <AddSearch
          addLabel="Add Household"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <HouseholdList searchTerm={searchTerm} />
      </ContentContainer>
      <AddHousehold addHousehold={addHousehold} closeModal={closeModal} />
    </PageContainer>
  );
};

export default Household;
