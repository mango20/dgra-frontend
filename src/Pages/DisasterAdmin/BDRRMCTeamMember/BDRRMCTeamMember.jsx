import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import TeamMemberList from "./Content/TeamMemberList";
import AddTeamMember from "./Content/AddTeamMember";

const BDRRMCTeamMember = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addTeamMemberModal, setTeamMemberModal] = useState(false);
  const [editTeamMemberModal, setEditTeamMemberModal] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const handleAdd = () => {
    setTeamMemberModal(true);
    setSelectedTeamMember(null); // Clear any previously selected event for editing
  };

  const handleEdit = (event) => {
    setSelectedTeamMember(event);
    setEditTeamMemberModal(true);
    setTeamMemberModal(true);
  };

  const closeModal = () => {
    setTeamMemberModal(false);
    setEditTeamMemberModal(false);
    setSelectedTeamMember(null);
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
        <TeamMemberList searchTerm={searchTerm} onEdit={handleEdit} />
      </ContentContainer>
      <AddTeamMember
        addTeamMemberModal={addTeamMemberModal}
        closeModal={closeModal}
        editTeamMemberModal={editTeamMemberModal}
        selectedTeamMember={selectedTeamMember}
      />
    </PageContainer>
  );
};

export default BDRRMCTeamMember;
