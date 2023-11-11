import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import HouseholdMemberList from "./Content/HouseholdMemberList";
import AddHouseholdMember from "./Content/AddHouseholdMember";

const HouseholdMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addHouseholdMembers, setAddHouseholdMembers] = useState(false);

  const handleAdd = () => {
    setAddHouseholdMembers(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setAddHouseholdMembers(false);
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
      <ContentContainer title={"Household Member"}>
        <AddSearch
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <HouseholdMemberList searchTerm={searchTerm} />
      </ContentContainer>
      <AddHouseholdMember
        addHouseholdMembers={addHouseholdMembers}
        closeModal={closeModal}
      />
    </PageContainer>
  );
};

export default HouseholdMembers;
