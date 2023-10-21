import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import TeamMemberList from "./Content/TeamMemberList";
import AddTeamMember from "./Content/AddTeamMember";

const BDRRMCTeamMember = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addTeamMemberModal, setTeamMemberModal] = useState(false);
  const handleAdd = () => {
    setTeamMemberModal(true);
    console.log("Add button clicked");
  };

  const closeModal = () => {
    setTeamMemberModal(false);
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
      <ContentContainer title={"BDRRMC Team Member"}>
        <AddSearch
          addLabel="Add BDRRMC Team Member"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <TeamMemberList searchTerm={searchTerm} />
      </ContentContainer>
      <AddTeamMember
        addTeamMemberModal={addTeamMemberModal}
        closeModal={closeModal}
      />
    </PageContainer>
  );
};

export default BDRRMCTeamMember;
