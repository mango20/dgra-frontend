import React, { useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import ContentContainer from "../../../Layout/Container/ContentContainer";
import AddSearch from "../../../Components/UI/AddSearch/AddSearch";
import HazardList from "./Content/HazardList";
import AddHazard from "./Content/AddHazard";

const SafetyTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addHazard, setAddHazard] = useState(false);
  const [editHazardModal, setEditHazardModal] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState(null);

  const handleAdd = () => {
    setAddHazard(true);
    setSelectedHazard(null); // Clear any previously selected event for editing
  };

  const handleEdit = (event) => {
    setSelectedHazard(event);
    setEditHazardModal(true);
    setAddHazard(true);
  };

  const closeModal = () => {
    setAddHazard(false);
    setEditHazardModal(false);
    setSelectedHazard(null);
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
      <ContentContainer title={"Safety Tips"}>
        <AddSearch
          addLabel="Add Hazard"
          onAdd={handleAdd}
          onSearch={handleSearch}
          onViewAll={handleViewAll}
        />
        <HazardList searchTerm={searchTerm} onEdit={handleEdit} />
      </ContentContainer>
      <AddHazard
        addHazard={addHazard}
        closeModal={closeModal}
        editHazardModal={editHazardModal}
        selectedHazard={selectedHazard}
      />
    </PageContainer>
  );
};

export default SafetyTips;
